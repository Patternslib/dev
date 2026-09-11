/**
 * Initialize dynamic module federation.
 */
import get_container from "./module_federation--dynamic-federation";

// Patternslib Module Federation bundle prefix.
// This is used to filter for module federation enabled bundles.
// NOTE: This is also defined in ``webpack.mf.js``.
export const MF_NAME_PREFIX = "__patternslib_mf__";

if (typeof window.__patternslib_container_map === "undefined") {
    window.__patternslib_container_map = {};
}
const container_map = window.__patternslib_container_map;

export async function initialize_remote({ remote_name, exposed_module = "./main" }) {
    if (container_map[`${remote_name}-${exposed_module}`]) {
        // already initialized, return.
        return;
    }
    const container = await get_container(remote_name);
    const factory = await container.get(exposed_module);
    const module = factory();

    // A remote's main module usually only does a dynamic import of the
    // actual bundle code (``import("./bundle")``) — the async boundary
    // webpack needs to consume shared modules. The patterns and components
    // are only registered once that chunk has run. If the main module
    // exports that import promise as its default export
    // (``export default import("./bundle")``), wait for it, so that
    // ``__patternslib_mf_initialized`` really resolves after the remote's
    // registrations are done. Remotes without such an export keep working
    // as before.
    if (typeof module?.default?.then === "function") {
        await module.default;
    }

    container_map[`${remote_name}-${exposed_module}`] = true;

    console.debug(
        `Patternslib Module Federation: Loaded and initialized bundle "${remote_name}".`,
    );

    return module;
}

function document_ready(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

// A promise which resolves once all Module Federation enabled bundles have
// been loaded and initialized (or failed to do so). It is created right at
// module load time, so consumers like the Patternslib registry can wait for
// it no matter whether they run before or after document ready.
// The Patternslib registry uses this to defer the initial DOM scan until all
// remote bundles had the chance to register their patterns and components.
let resolve_initialized;
window.__patternslib_mf_initialized = new Promise((resolve) => {
    resolve_initialized = resolve;
});

document_ready(async function () {
    // Automatically initialize all Module Federation enabled Patternslib based
    // bundles by filtering for the prefix ``__patternslib_mf__``.
    // Do this on document ready, as this is the time where all MF bundles have
    // been registered in the global namespace.
    const bundles = Object.keys(window).filter((it) => it.indexOf(MF_NAME_PREFIX) === 0);

    // Load + initialize all bundles in parallel and wait for all of them to
    // settle. A failing bundle must not block the others, nor the
    // initialization of the page.
    const results = await Promise.allSettled(
        bundles.map((bundle_name) => initialize_remote({ remote_name: bundle_name })),
    );
    for (const [index, result] of results.entries()) {
        if (result.status === "rejected") {
            console.error(
                `Patternslib Module Federation: Failed to initialize bundle "${bundles[index]}".`,
                result.reason,
            );
        }
    }

    resolve_initialized(bundles);
    document.dispatchEvent(
        new Event("patternslib__mf--loaded", { bubbles: true, cancelable: false }),
    );
});
