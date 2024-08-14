process.traceDeprecation = true;
const webpack = require("webpack");
const webpack_helpers = require("./webpack-helpers");

// plugins
const TerserPlugin = require("terser-webpack-plugin");

const config_factory = (env, argv, config, babel_include = [], package_json) => {
    // Webpack config

    // Packages in node_modules to NOT exclude from babel processing.
    // We exclude everything under `node_modules` except packages listed in
    // babel_include, like any packages within `@patternslib`, any other
    // `pat-*` and other packges which need babel processing so that node can
    // make sense of it when compiling.
    babel_include = new Set([
        "@patternslib/.*",
        "@plone/.*",
        "pat-.*",
        "screenfull",
        ...babel_include,
    ]);
    let babel_exclude = "";
    for (const it of babel_include) {
        babel_exclude += `(?!(${it})/)`;
    }
    babel_exclude = `node_modules/${babel_exclude}.*`;

    const base_config = {
        entry: {}, // Entry point files for your JavaScript application.
        externals: [
            {
                window: "window",
            },
        ],
        output: {
            filename: "[name].js",
            chunkFilename: "chunks/[name].[contenthash].min.js",
            // output.path: Set default to "dist/" which probably will work in
            // projects which extend this webpack config.
            // Note the extendee's webpack config should be in the top-level that
            // "dist" can be found in the top level too.
            path: "./dist",
            clean: true, // Clean directory before compiling
            publicPath: "auto",
        },
        optimization: {},
        module: {
            rules: [
                {
                    test: /\.js$/,
                    // Exclude node modules except patternslib, pat-* and mockup packgages.
                    // Allows for extending this file without needing to override for a successful webpack build.
                    exclude: new RegExp(babel_exclude),
                    loader: "babel-loader",
                },
                {
                    test: /\.(?:sass|scss|css)$/i,
                    use: [
                        {
                            loader: "style-loader",
                            options: {
                                insert: webpack_helpers.top_head_insert,
                            },
                        },
                        "css-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.*(?:html|xml|svg)$/i,
                    type: "asset/source",
                },
                {
                    test: /\.(eot|woff|woff2|ttf|png|jpe?g|gif|webp)$/i,
                    type: "asset/resource",
                },
            ],
        },
        resolve: {
            alias: {},
        },
        plugins: [
            new webpack.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/,
            }),
        ],
    };

    if (package_json && package_json.version && package_json.name) {
        // Add a banner to the generated bundle with the bundle name and version.
        base_config.plugins.push(
            new webpack.BannerPlugin({
                banner: `${package_json.name} ${package_json.version}`,
                entryOnly: true,
            }),
        );
    }

    // Override base_config with entries from config.
    // Most useful the ``entry`` entry.
    config = Object.assign(base_config, config);

    if (process.env.NODE_ENV === "development") {
        // Add a dev server.
        config.devServer = {
            static: {
                directory: "./",
            },
            port: "3001",
            host: "0.0.0.0",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        };
        config.optimization.minimize = false;
        config.devtool = "source-map"; // Slowest option. False for no source maps.
        config.watchOptions = {
            ignored: ["node_modules/**", "docs/**", ".git/**"],
        };
    }
    if (process.env.NODE_ENV === "production") {
        // Minify all JS files in production mode.
        config.optimization.minimizer = [
            new TerserPlugin({
                include: /(\.js$)/,
                extractComments: false,
            }),
        ];
        config.devtool = "source-map"; // Slowest option. False for no source maps.
    }
    return config;
};

// Default export
const module_exports = (module.exports = config_factory);

// Named exports
module_exports.config = ({ env, argv, config, babel_include = [], package_json }) => {
    return config_factory(env, argv, config, babel_include, package_json);
};
