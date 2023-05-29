const fs = require("fs");
const path = require("path");

const commits_template = fs
    .readFileSync(
        path.resolve(__dirname, "release-it", "conventional-changelog-commit.hbs")
    )
    .toString();

module.exports = {
    npm: {
        publish: true,
    },
    git: {
        requireBranch: ["master", "main"],
        commitMessage: "Release new version.",
        commitArgs: ["-n"],
    },
    plugins: {
        "@release-it/conventional-changelog": {
            infile: "CHANGES.md",
            header: "# Changelog\n\n",
            ignoreRecommendedBump: true,
            preset: {
                name: "conventionalcommits",
                types: [
                    {
                        type: "breaking",
                        section: "Breaking Changes",
                    },
                    {
                        type: "feat",
                        section: "Features",
                    },
                    {
                        type: "fix",
                        section: "Bug Fixes",
                    },
                    {
                        type: "maint",
                        section: "Maintenance",
                    },
                ],
            },
            writerOpts: {
                commitPartial: commits_template,
            },
            hooks: {
                // Run `make build` after the version is bumped to get a build
                // with the new version number comment in the entry scripts.
                // Use the make target which does a check to not build if the
                // package is this `@patternslib/dev` package.
                "after:bump": "make build",
            },
        },
    },
};
