module.exports = (api) => {
    let config = {
        presets: [
            [
                "@babel/preset-env",
                {
                    modules: "auto",
                },
            ],
        ],
    };

    // passed via NODE_ENV=development environment variable.
    if (api.env() === "development") {
        // For development, do less transformations for better readability.
        config = {
            presets: [
                [
                    "@babel/preset-env",
                    {
                        debug: true,
                        modules: false,
                    },
                ],
            ],
            targets: "last 1 Chrome version, last 1 Firefox version",
        };
    }

    return config;
};
