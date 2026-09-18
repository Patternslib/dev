const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

it("builds SVG URL dependencies as files while preserving raw SVG imports", () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "patternslib-assets-"));
    const svg = '<svg xmlns="http://www.w3.org/2000/svg"><path fill="#fff"/></svg>';

    try {
        fs.writeFileSync(path.join(directory, "icon.svg"), svg);
        fs.writeFileSync(
            path.join(directory, "style.css"),
            '.icon { background-image: url("./icon.svg"); }',
        );
        // .mjs avoids unrelated Babel processing of this small fixture.
        fs.writeFileSync(
            path.join(directory, "entry.mjs"),
            `import svg from "./icon.svg";
             import css from "./style.css";
             export { svg };
             export const styles = css.toString();
             export const url = new URL("./icon.svg", import.meta.url).href;`,
        );

        // Run Webpack and the generated bundle in Node, outside Jest's module
        // transforms and CSS/SVG mocks. No browser is needed for this build.
        const result = JSON.parse(
            execFileSync(
                process.execPath,
                [
                    "-e",
                    `const path = require("node:path");
                     const webpack = require("webpack");
                     const directory = process.argv[1];
                     const config = require("./webpack/webpack.config").config({
                         config: {
                             mode: "development",
                             target: "node",
                             context: directory,
                             entry: "./entry.mjs",
                             devtool: false,
                             optimization: { minimize: false },
                         },
                     });
                     config.output = {
                         ...config.output,
                         path: path.join(directory, "dist"),
                         filename: "bundle.cjs",
                         publicPath: "https://example.test/assets/",
                         library: { type: "commonjs2" },
                     };
                     config.resolveLoader = {
                         modules: [path.resolve("node_modules")],
                     };
                     // Export the CSS string instead of injecting a style tag.
                     const cssRule = config.module.rules.find(rule => rule.test.test("style.css"));
                     cssRule.use = cssRule.use.filter(item => item.loader !== "style-loader");
                     const compiler = webpack(config);
                     compiler.run((error, stats) => {
                         compiler.close(closeError => {
                             if (error || closeError) throw error || closeError;
                             if (stats.hasErrors()) throw new Error(stats.toString());
                             const result = require(path.join(directory, "dist/bundle.cjs"));
                             process.stdout.write(JSON.stringify(result));
                         });
                     });`,
                    directory,
                ],
                {
                    cwd: path.resolve(__dirname, ".."),
                    env: { ...process.env, NODE_ENV: "test" },
                    encoding: "utf8",
                    timeout: 30000,
                },
            ),
        );

        expect(result.svg).toBe(svg);
        const files = fs.readdirSync(path.join(directory, "dist"));
        const svgFiles = files.filter((file) => file.endsWith(".svg"));
        expect(svgFiles).toHaveLength(1);
        const assetUrl = `https://example.test/assets/${svgFiles[0]}`;
        expect(result.styles).toContain(`url(${assetUrl})`);
        expect(result.url).toBe(assetUrl);
        expect(fs.readFileSync(path.join(directory, "dist", svgFiles[0]), "utf8")).toBe(
            svg,
        );
    } finally {
        fs.rmSync(directory, { recursive: true, force: true });
    }
}, 35000);
