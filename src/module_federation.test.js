jest.mock("../webpack/module_federation--dynamic-federation", () => ({
    __esModule: true,
    default: jest.fn(async (remote) => globalThis[remote]),
}));

describe("webpack/module_federation", () => {
    const FAKE = "__patternslib_mf__fake";
    const BROKEN = "__patternslib_mf__broken";
    let events;
    const on_loaded = () => events.push("loaded");

    beforeEach(() => {
        jest.resetModules();
        events = [];
        document.addEventListener("patternslib__mf--loaded", on_loaded);
    });

    afterEach(() => {
        document.removeEventListener("patternslib__mf--loaded", on_loaded);
        delete window[FAKE];
        delete window[BROKEN];
        delete window.__patternslib_mf_initialized;
        delete window.__patternslib_container_map;
        jest.restoreAllMocks();
    });

    it("resolves the initialization promise only after all remotes are initialized", async () => {
        let release;
        const factory = jest.fn(() => ({}));
        window[FAKE] = {
            get: jest.fn(
                () => new Promise((resolve) => (release = () => resolve(factory))),
            ),
        };

        require("../webpack/module_federation");

        const promise = window.__patternslib_mf_initialized;
        expect(promise).toBeInstanceOf(Promise);

        let settled = false;
        promise.then(() => (settled = true));

        // document ready has fired, the remote is being loaded but not done yet.
        await new Promise((resolve) => setTimeout(resolve, 10));
        expect(window[FAKE].get).toHaveBeenCalledWith("./main");
        expect(settled).toBe(false);
        expect(events).toEqual([]);

        release();
        const bundles = await promise;

        expect(bundles).toEqual([FAKE]);
        expect(factory).toHaveBeenCalled();
        expect(window.__patternslib_container_map[`${FAKE}-./main`]).toBe(true);
        // The event is dispatched after the promise resolved.
        expect(events).toEqual(["loaded"]);
    });

    it("resolves even when a remote fails to initialize", async () => {
        const error_spy = jest.spyOn(console, "error").mockImplementation(() => {});
        window[BROKEN] = {
            get: jest.fn(async () => {
                throw new Error("boom");
            }),
        };
        window[FAKE] = { get: jest.fn(async () => () => ({})) };

        require("../webpack/module_federation");
        const bundles = await window.__patternslib_mf_initialized;

        expect(bundles.sort()).toEqual([BROKEN, FAKE].sort());
        expect(error_spy).toHaveBeenCalledWith(
            expect.stringContaining(BROKEN),
            expect.any(Error),
        );
        expect(window.__patternslib_container_map[`${FAKE}-./main`]).toBe(true);
        expect(window.__patternslib_container_map[`${BROKEN}-./main`]).toBeUndefined();
        expect(events).toEqual(["loaded"]);
    });

    it("waits for the promise a remote's main module exports as default", async () => {
        let release;
        const bundle_code = jest.fn();
        // The main module only starts the dynamic import of the bundle code and
        // exports that promise.
        const main_module = {
            default: new Promise((resolve) => (release = () => resolve(bundle_code()))),
        };
        window[FAKE] = { get: jest.fn(async () => () => main_module) };

        require("../webpack/module_federation");

        let settled = false;
        window.__patternslib_mf_initialized.then(() => (settled = true));
        await new Promise((resolve) => setTimeout(resolve, 10));

        // main has run, but the bundle code has not — still waiting.
        expect(window[FAKE].get).toHaveBeenCalled();
        expect(settled).toBe(false);
        expect(events).toEqual([]);

        release();
        await window.__patternslib_mf_initialized;

        expect(bundle_code).toHaveBeenCalled();
        expect(events).toEqual(["loaded"]);
    });

    it("resolves immediately when no remotes are registered", async () => {
        require("../webpack/module_federation");
        const bundles = await window.__patternslib_mf_initialized;
        expect(bundles).toEqual([]);
        expect(events).toEqual(["loaded"]);
    });
});
