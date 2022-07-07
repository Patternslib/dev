const { ModuleFederationPlugin } = require("webpack").container;

// Patternslib Module Federation bundle prefix.
// This is used to filter for module federation enabled bundles.
// NOTE: This is also defined in ``module_federation.js``.
const MF_NAME_PREFIX = "__patternslib_mf__";

/**
 * Get dependencies and versions for the module federation plugin from
 * package.json dependency lists.
 *
 * @param {Object} dependencies - Object with dependency name - version specifier pairs.
 * @param {Object} sharing_hints - Object with optional sharing hints for dependencies. key -> dependency name, value -> sharing hint.
 * @returns {Object} - Object with dependencies for the module federation plugin.
 */
function shared_from_dependencies(dependencies, sharing_hints) {
    const shared = {};
    for (const [name, version] of Object.entries(dependencies)) {
        let hints = {
            singleton: true,
            requiredVersion: version,
        }
        if(name in sharing_hints) {
            hints = {
                ...hints,
                ...sharing_hints[name],
            }
        }
        shared[name] = hints;
    }
    return shared;
}

/**
 * Webpack module federation config factory.
 *
 * Use this to extend your webpack configuration for module federation support.
 *
 * @param {String} name - Bundle/remote name. If not given, the package.json name is used.
 * @param {String} remote_entry - Path to which the new remote entry file is written to.
 * @param {String} filename - Name of the generated remote entry file. Default ``remote.min.js``.
 * @param {Object} dependencies - Object with dependency name - version specifier pairs. Is used to set up the shared dependencies including their version requirements.
 * @param {Object} sharing_hints - Object with sharing hints for modules defined in dependencies. Is used to add/override the default sharing hints.
 * @returns {Object} - Webpack config partial with instantiated module federation plugins.
 */
function config({ name, remote_entry, filename = "remote.min.js", dependencies = {}, sharing_hints = {} }) {
    // Create a JS-variable compatible name and add a prefix.
    const normalized_bundle_name =
        MF_NAME_PREFIX + name.match(/([_$A-Za-z0-9])/g).join("");

    return new ModuleFederationPlugin({
        name: normalized_bundle_name,
        ...(remote_entry && {
            filename: filename,
            exposes: {
                "./main": remote_entry,
            },
        }),
        shared: shared_from_dependencies(dependencies, sharing_hints),
    });
}

// Default export
const module_exports = (module.exports = config);

// Named exports
module_exports.config = config;
module_exports.MF_NAME_PREFIX = MF_NAME_PREFIX;
module_exports.shared_from_dependencies = shared_from_dependencies;
