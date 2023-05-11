# Changelog



## [3.3.2](https://github.com/patternslib/dev/compare/3.3.1...3.3.2) (2023-05-11)


### Maintenance


* Upgrade dependencies. ([0075b94](https://github.com/patternslib/dev/commit/0075b947c5f3490627b2a20fea46c6acac71dd52))

## [3.3.2](https://github.com/patternslib/dev/compare/3.3.1...3.3.2) (2023-05-11)


### Maintenance


* Upgrade dependencies. ([0075b94](https://github.com/patternslib/dev/commit/0075b947c5f3490627b2a20fea46c6acac71dd52))

## [3.3.1](https://github.com/patternslib/dev/compare/3.3.0...3.3.1) (2023-04-21)


### Maintenance

* Upgrade dependencies. ([2797100](https://github.com/patternslib/dev/commit/2797100e3ece150f8b58d5a7f62205a59601c489))


## [3.3.0](https://github.com/patternslib/dev/compare/3.2.0...3.3.0) (2023-04-17)


### Bug Fixes


* Simplify release make commands. ([49077d2](https://github.com/patternslib/dev/commit/49077d2c6d79d7b98898c6576d0aaa01e003a0d6))

  Change the prerelease commands back to pre-3.2.0 names.
This was necessary because the previous change did create for each
command a new increment, which was not what we wanted.
Instead the Makefile is now restructured:
- First the npm release is done and the package.json written with the
  correct version. If no increment is given (in case of the prerelease
  targets) an interactive prompt asks the user to define one.
- Second the GitHub release is done. It's no more necessary to guess the
  next version before the npm version was done. Instead we now rely on
  release-it choosing it for us.
Now we do have again the "prerelease-alpha" and "prerelease-beta"
Makefile targets.

## [3.2.0](https://github.com/patternslib/dev/compare/3.1.13...3.2.0) (2023-04-17)


### Features


* Change prerelease commands to prerelease-INCREMENT-PREID ([6b488e1](https://github.com/patternslib/dev/commit/6b488e120761951ba01eae524563bdd490a9b739))

  Change the prerelease commands to define the increment level.
Instead of "prerelease-alpha" there are now "prerelease-major-alpha",
"prerelease-minor-alpha" and "prerelease-patch-alpha".
Instead of "prerelease-beta" there are now "prerelease-major-beta",
"prerelease-minor-beta" and "prerelease-patch-beta".
This fixes a problem where the first prerelease for major or minor
increments got only a patch-level increment.



### Maintenance


* Upgrade dependencies. ([68f4ca8](https://github.com/patternslib/dev/commit/68f4ca8b4d243f1b1b25ffacb404be71103b86aa))

## [3.2.0](https://github.com/patternslib/dev/compare/3.1.13...3.2.0) (2023-04-17)


### Features


* Change prerelease commands to prerelease-INCREMENT-PREID ([6b488e1](https://github.com/patternslib/dev/commit/6b488e120761951ba01eae524563bdd490a9b739))

  Change the prerelease commands to define the increment level.
Instead of "prerelease-alpha" there are now "prerelease-major-alpha",
"prerelease-minor-alpha" and "prerelease-patch-alpha".
Instead of "prerelease-beta" there are now "prerelease-major-beta",
"prerelease-minor-beta" and "prerelease-patch-beta".
This fixes a problem where the first prerelease for major or minor
increments got only a patch-level increment.



### Maintenance


* Upgrade dependencies. ([68f4ca8](https://github.com/patternslib/dev/commit/68f4ca8b4d243f1b1b25ffacb404be71103b86aa))

## [3.1.13](https://github.com/patternslib/dev/compare/3.1.12...3.1.13) (2023-04-17)


### Bug Fixes


* Improve the release-it commit template to include a newline between each commit and add any commit references to the end. ([1603d0b](https://github.com/patternslib/dev/commit/1603d0b1a08aab290f021b20562c92dab45f75c1))


* Improve the release-it commit template to include a newline between header and body text. ([14ace2b](https://github.com/patternslib/dev/commit/14ace2b2c2c2dd2bc77c4cd0cf9b47744d5ca1c1))


* Include all changes since last regular release only in GitHub releases. ([ec86755](https://github.com/patternslib/dev/commit/ec8675589217f5c66ffcfab273942c11b845a79c))

  When doing regular releases include all the changes since the last
regular release - including changes from pre-releases in the release
notes on GitHub, but not in the CHANGES.md file. In the CHANGES.md file
every change can be seen at once. Including all the changes since the
previous regular release is useful for the GitHub release page only.



### Maintenance


* Update dependencies. ([b02c37b](https://github.com/patternslib/dev/commit/b02c37b0a41a347f955a7a7a8fb47d8e1f4c4f11))

## [3.1.13](https://github.com/patternslib/dev/compare/3.1.12...3.1.13) (2023-04-17)


### Bug Fixes


* Improve the release-it commit template to include a newline between each commit and add any commit references to the end. ([1603d0b](https://github.com/patternslib/dev/commit/1603d0b1a08aab290f021b20562c92dab45f75c1))


* Improve the release-it commit template to include a newline between header and body text. ([14ace2b](https://github.com/patternslib/dev/commit/14ace2b2c2c2dd2bc77c4cd0cf9b47744d5ca1c1))


* Include all changes since last regular release only in GitHub releases. ([ec86755](https://github.com/patternslib/dev/commit/ec8675589217f5c66ffcfab273942c11b845a79c))

  When doing regular releases include all the changes since the last
regular release - including changes from pre-releases in the release
notes on GitHub, but not in the CHANGES.md file. In the CHANGES.md file
every change can be seen at once. Including all the changes since the
previous regular release is useful for the GitHub release page only.



### Maintenance


* Update dependencies. ([b02c37b](https://github.com/patternslib/dev/commit/b02c37b0a41a347f955a7a7a8fb47d8e1f4c4f11))

## [3.1.12](https://github.com/patternslib/dev/compare/3.1.11...3.1.12) (2023-04-03)


### Maintenance


* Upgrade dependencies. ([b3930ef](https://github.com/patternslib/dev/commit/b3930efa5b2d5aebe5182d15e07e75f65ea7fed1))

## [3.1.11](https://github.com/patternslib/dev/compare/3.1.10...3.1.11) (2023-03-09)


### Maintenance


* Upgrade dependencies. ([cc4a9be](https://github.com/patternslib/dev/commit/cc4a9be73406070bd9e057f395a7baaf991a4120))

## [3.1.10](https://github.com/patternslib/dev/compare/3.1.9...3.1.10) (2023-02-14)


### Maintenance


* Upgrade dependencies. ([4aad9c8](https://github.com/patternslib/dev/commit/4aad9c8fc76df2d098f0d5abbac6c271cbe8edbe))

* When doing a final release, set tagExclude to ignore pre-releases when finding the last release. This should include all changelog entrief from the pre-releases. ([4abf750](https://github.com/patternslib/dev/commit/4abf750b95b2c3d106feccb19c7f0c27d7bfc8c4))

## [3.1.9](https://github.com/patternslib/dev/compare/3.1.8...3.1.9) (2023-01-25)


### Maintenance


* enable source maps for development again. ([fdf8a86](https://github.com/patternslib/dev/commit/fdf8a86086053f8021f74514810fdccb5d7b7724))

* Upgrade dependencies. ([feb26ce](https://github.com/patternslib/dev/commit/feb26cee1a2cb805c6b13407f37f6d9e85b817d6))

## [3.1.9](https://github.com/patternslib/dev/compare/3.1.8...3.1.9) (2023-01-25)


### Maintenance


* enable source maps for development again. ([fdf8a86](https://github.com/patternslib/dev/commit/fdf8a86086053f8021f74514810fdccb5d7b7724))

* Upgrade dependencies. ([feb26ce](https://github.com/patternslib/dev/commit/feb26cee1a2cb805c6b13407f37f6d9e85b817d6))

## [3.1.8](https://github.com/patternslib/dev/compare/3.1.7...3.1.8) (2022-12-19)


### Maintenance


* For non-minified development builds, do not generate source maps. ([babf289](https://github.com/patternslib/dev/commit/babf2893638b17f84e651a79c3e67fbbd81d1914))

* Upgrade dependencies. ([20f7b31](https://github.com/patternslib/dev/commit/20f7b315e1b0f6fa110c96ddc7c97ae206203676))

## [3.1.8](https://github.com/patternslib/dev/compare/3.1.7...3.1.8) (2022-12-19)


### Maintenance


* For non-minified development builds, do not generate source maps. ([babf289](https://github.com/patternslib/dev/commit/babf2893638b17f84e651a79c3e67fbbd81d1914))

* Upgrade dependencies. ([20f7b31](https://github.com/patternslib/dev/commit/20f7b315e1b0f6fa110c96ddc7c97ae206203676))

## [3.1.7](https://github.com/patternslib/dev/compare/3.1.6...3.1.7) (2022-12-11)


### Maintenance


* Include changelog from pre-releases in final. ([b053a10](https://github.com/patternslib/dev/commit/b053a103ae859b1c33904d48fd80076cbec040eb))When doing a final release after a series of pre-releases, include all
the pre-releases changelog items in the final release.
See: https://github.com/release-it/release-it/blob/master/docs/pre-releases.md

* Upgrade dependencies. ([98d81a3](https://github.com/patternslib/dev/commit/98d81a3682ba68058bdc3e263300c0a131f5a4c5))

## [3.1.7](https://github.com/patternslib/dev/compare/3.1.6...3.1.7) (2022-12-11)


### Maintenance


* Include changelog from pre-releases in final. ([b053a10](https://github.com/patternslib/dev/commit/b053a103ae859b1c33904d48fd80076cbec040eb))When doing a final release after a series of pre-releases, include all
the pre-releases changelog items in the final release.
See: https://github.com/release-it/release-it/blob/master/docs/pre-releases.md

* Upgrade dependencies. ([98d81a3](https://github.com/patternslib/dev/commit/98d81a3682ba68058bdc3e263300c0a131f5a4c5))

## [3.1.6](https://github.com/patternslib/dev/compare/3.1.5...3.1.6) (2022-12-07)


### Maintenance


* Remove core-js. ([2abfe2b](https://github.com/patternslib/dev/commit/2abfe2b1904aec7a61c498f83b69f44f4b2161ba))

* Upgrade dependencies. ([0a1b506](https://github.com/patternslib/dev/commit/0a1b5068e724c049acc4dc9caca0c4ce420f5178))

## [3.1.5](https://github.com/patternslib/dev/compare/3.1.4...3.1.5) (2022-11-18)


### Bug Fixes


* **Build:** Get the correct version increment for prereleases. ([8947884](https://github.com/patternslib/dev/commit/8947884e2a91fd39305ea9499d112c2dd8c845ae))

## [3.1.4](https://github.com/patternslib/dev/compare/3.1.3...3.1.4) (2022-11-18)


### Bug Fixes


* **Makefile:** Change the 'check' target to not be a double-colon rule, which cannot be overwritten. See: https://www.gnu.org/software/make/manual/html_node/Double_002dColon.html ([5f0f08c](https://github.com/patternslib/dev/commit/5f0f08cd8266f5c2cf5689f3b95a6294990e3dd6))

## [3.1.3](https://github.com/patternslib/dev/compare/3.1.2...3.1.3) (2022-11-18)


### Bug Fixes


* **Webpack:** Add the version banner only to the entry point files. ([6f82df1](https://github.com/patternslib/dev/commit/6f82df1d3215c07d4ff4cc00d3d6fc56f9f1fdca))This fixes a problem where each chunk file was changed with a new release, even if nothing else than the version has changed.
Adding the version banner only to the entry points still allows to check the version while keeping the changeset for releases small.


### Maintenance


* Upgrade dependencies. ([b2167b4](https://github.com/patternslib/dev/commit/b2167b458711f73480797505e18e75cf3ef8ce33))

## [3.1.2](https://github.com/patternslib/dev/compare/3.1.1...3.1.2) (2022-11-15)


### Bug Fixes


* Fix Makefile to not emit an error when no compiled bundle is found. ([15363a7](https://github.com/patternslib/dev/commit/15363a7e50bc290a7b394f7d3aeeac1634e8ab1d))

## [3.1.1](https://github.com/patternslib/dev/compare/3.1.0...3.1.1) (2022-11-15)


### Bug Fixes


* Fix Makefile error with GitHub release. ([7df20db](https://github.com/patternslib/dev/commit/7df20db4ef54c820b07e49db9123823b23ee1161))

## [3.1.0](https://github.com/patternslib/dev/compare/3.0.0...3.1.0) (2022-11-15)


### Features


* Allow to add the compiled bundles to npm packages. ([84bdefd](https://github.com/patternslib/dev/commit/84bdefd339b9aa553ef78e9448e4cdd998178d40))Creating a npm release with the Makefile prepares now a bundle build
with the correct package version added as a comment to the bundle files.
The compiled bundle can then be uploaded to npm if it is part of the git
repository (included by .gitignore) or part of the npm release
(preferred, included by .npmignore).

Adding the compiled bundle to npm allows to directly include it via a
CDN like so:

https://cdn.jsdelivr.net/npm/@patternslib/patternslib@9.7.0-alpha.2/dist/bundle.min.js
or
https://unpkg.com/@patternslib/patternslib@9.7.0-alpha.2/dist/bundle.min.js

We have to compile the bundle with the correct version BEFORE the npm
package is created with release-it. The next version is queried using
the LEVEL parameter (set by the different release targets) and the
"semver" tool.


### Maintenance


* Upgrade dependencies. ([e687405](https://github.com/patternslib/dev/commit/e6874052cf9ae2cd359996659c091de532b6f5cb))

## [3.0.0](https://github.com/patternslib/dev/compare/2.7.2...3.0.0) (2022-10-15)


### Features


* **Build:** Add Module Federation configuration for webpack. ([b84c2fb](https://github.com/patternslib/dev/commit/b84c2fb8053837206c044e3148522d9a54afa300))


### Breaking Changes


* **Build:** Remove the showdown-prettify loading config and the now unused imports-loader. ([27ba90f](https://github.com/patternslib/dev/commit/27ba90fc9e615c57b4be0ae20b84c2f16a918759))

* **Tests:** Remove dependency on jQuery. ([259d801](https://github.com/patternslib/dev/commit/259d801ab0a203ea64073e3cc0366976a38f1e0c))Use the following in your test setup to provide jQuery to external
libraries if they depend on a global jQuery object or extend from the
jest config from @patternslib/patternslib:

```js
import jquery from "jquery";
global.$ = global.jQuery = jquery;
```

* **Tests:** Remove the Dependency on @patternslib/patternslib. ([afe8fee](https://github.com/patternslib/dev/commit/afe8feec6304d2ce184afd587d429f3ae5bd533c))If you need Patternslib specific test setup, extend from Patternslib.


### Maintenance


* Upgrade dependencies. ([f868454](https://github.com/patternslib/dev/commit/f868454982447190e968ab9eab4988bfee01c43a))

## [2.7.2](https://github.com/patternslib/dev/compare/2.7.1...2.7.2) (2022-09-28)


### Maintenance


* Upgrade dependencies. ([1edd750](https://github.com/patternslib/dev/commit/1edd7508ff8571110c00939f29843ab9a99986d5))

## [2.7.1](https://github.com/patternslib/dev/compare/2.7.0...2.7.1) (2022-09-20)


### Maintenance


* Upgrade dependencies. ([2fa0672](https://github.com/patternslib/dev/commit/2fa067203c73524e95c3e1a5f70b198a8b8d56da))

## [2.7.0](https://github.com/patternslib/dev/compare/2.6.0...2.7.0) (2022-09-15)


### Features


* Define the close, show and showModal methods in dialog elements. ([3b59aed](https://github.com/patternslib/dev/commit/3b59aed8556c5103ada9efa175896f83e0fac6c0))


### Maintenance


* Upgrade dependencies. ([087dca5](https://github.com/patternslib/dev/commit/087dca5d9de49423f80ce670e342bef9629dab1c))

## [2.6.0](https://github.com/patternslib/dev/compare/2.5.0...2.6.0) (2022-09-05)


### Bug Fixes


* Fix GitHub Actions branch name. ([e59126a](https://github.com/patternslib/dev/commit/e59126ab8ba9cc1b284c7b964dabe905de9f9fd1))


### Maintenance


* Upgrade dependencies. ([0720aad](https://github.com/patternslib/dev/commit/0720aadc0d8f8064996b8ec5568ee8d30c84a70c))

## [2.5.0](https://github.com/patternslib/dev/compare/2.4.0...2.5.0) (2022-08-19)


### Features


* **Makefile:** Add empty bundle-pre target for customization. ([0290e61](https://github.com/patternslib/dev/commit/0290e61fac9230e24428dd0b846c5bace145f56d))The empty bundle-pre target is run before the bundle target and can be
overwritten in extending projects to add some tasks before bundle generation.
This can be used to unlink and reinstall any dependencies before bundle generation.


### Maintenance


* Upgrade dependencies. ([64094da](https://github.com/patternslib/dev/commit/64094da766b42c245dad7640216009b1d0c2701e))

## [2.4.0](https://github.com/patternslib/dev/compare/2.3.0...2.4.0) (2022-08-11)


### Features


* **Webpack:** Add bundle name and version to the banner. ([1058b6d](https://github.com/patternslib/dev/commit/1058b6d58b6e05c0c841a02a753a7fd823688595))For this, you have to pass your project's package.json as argument to the webpack config factory.
Both values - name and version - are taken from the package.json data.

* **Webpack:** Add config export with named parameters. ([f7b2471](https://github.com/patternslib/dev/commit/f7b24711ce223eaa51e0ea819643a656cae846f3))Add config export along with the default export to support named parameters via parameter destructuring.


### Maintenance


* Upgrade dependencies. ([9039642](https://github.com/patternslib/dev/commit/90396428d8b00dc6d60137387280e26f335d6128))

* **Webpack:** Correct API doc for shared_from_dependencies. ([f2b0031](https://github.com/patternslib/dev/commit/f2b003193312a332a100b8e1f6939dedcdc0e23d))

## [2.3.0](https://github.com/patternslib/dev/compare/2.2.1...2.3.0) (2022-07-07)


### Features


* **Module Federation:** Add a shared parameter for MF config factory. ([22e4b5e](https://github.com/patternslib/dev/commit/22e4b5e0a4d933a61008c5f203c90ad94d6b084f))The shared parameter allows to directly provide the shared object for the Webpack Module Federation Plugin.
It extends generated shared definitions from the dependencies object and will overwrite existing entries.

## [2.2.1](https://github.com/patternslib/dev/compare/2.2.0...2.2.1) (2022-07-06)


### Maintenance


* Upgrade dependencies. ([41adefd](https://github.com/patternslib/dev/commit/41adefd711a2ba68ba7327236a365889b4f76205))

## [2.2.0](https://github.com/patternslib/dev/compare/2.1.0...2.2.0) (2022-06-27)


### Bug Fixes


* Fix missing parentheses in release-zip. ([72d435d](https://github.com/patternslib/dev/commit/72d435d500cbf9ec460bf4f5961027025e554221))


### Breaking Changes


* **webpack module federation:** Make wepack module federation config factory more explicit. ([efd266c](https://github.com/patternslib/dev/commit/efd266cfc82372c467eb6a8b470360b72647b9bd))Change signature of the webpack mf config factory to make it simpler, more flexible and more explicit at the cost of having to pass more options.

 - Remove parameters ``package_json`` and ``shared`` in favor of ``dependencies``.
 - Explicitly pass all dependencies via ``dependencies``, also the base ones from @patternslib/patternslib if wanted.
 - Always explicitly pass the module federation name (e.g. the package.json's package name).

This makes the MF config factory simpler although you probably have to pass more options.
You now can easily just add the dependencies you want instead of having
always @patternslib/patternslib dependencies added.


### Maintenance


* Add [@plone](https://github.com/plone) to jest and webpack transform ignores. ([678bf09](https://github.com/patternslib/dev/commit/678bf090be043c90c462075980db5ac1a9470d39))

* Remove unnecessary import from webpack.config.js. ([6658497](https://github.com/patternslib/dev/commit/6658497746e9fd948dbbacd5ad6cfa42b98168af))

* Upgrade dependencies. ([e1e423e](https://github.com/patternslib/dev/commit/e1e423eb3371f5c4792ad246e9df8ed2d3d434d9))

## [2.1.0](https://github.com/patternslib/dev/compare/2.0.0...2.1.0) (2022-06-25)


### Features


* Do not build a bundle and a release-zip for @patternslib/dev. ([085a019](https://github.com/patternslib/dev/commit/085a019c16a8494a2d6fa0203d880325c996aba6))Still, we have the Makefile targets ``bundle`` and ``release-zip``
defined in the Makefile, making it possible to let other packages
include this Makefile and extend from it while it is fully functioning
for @patternslib/dev too.


### Maintenance


* Add jquery and @patternslib/patternslib to devDependencies, so that setup_tests.js does not fail when testing this package. ([edae3f7](https://github.com/patternslib/dev/commit/edae3f771ac71f0a26e87c2e78d16e0b2aaaf122))

* Also remove eventual @plone/ from bundle name. ([7696d7d](https://github.com/patternslib/dev/commit/7696d7d2ec8dd1600dc8f2e0cdb85b8aabc44930))

* Ignore .git directory when watching for changes. ([14ff7e9](https://github.com/patternslib/dev/commit/14ff7e905794a340ce23f8afe1c77a2e20b987ca))

* Make @patternslib/patternslib a peer dependency which must be installed if e.g. the webpack.mf.js Webpack config is used. ([987b421](https://github.com/patternslib/dev/commit/987b42175acbf3fc4d2df5416dd3329b610c8116))

* Upgrade dependencies. ([7fac8d7](https://github.com/patternslib/dev/commit/7fac8d79b4ce0e3acd62861bd7bcbe3866f32adc))

* Upgrade dependencies. ([c632f09](https://github.com/patternslib/dev/commit/c632f099f0ba3b542af136feba89b28aeb457385))

## 2.0.0 (2022-06-15)


### Maintenance


* Add test script to package.json. ([55e8a8b](https://github.com/patternslib/dev/commit/55e8a8b00a645b9c3ff1d2f395ee2170c9f64bfb))

* Allow releases from master and from main branches. ([f4f9528](https://github.com/patternslib/dev/commit/f4f952893a67c790bd1d14a151e62e9c84aff4ea))

* Configure commitlint for extendability. ([6488bba](https://github.com/patternslib/dev/commit/6488bbac33e82d713a7d14cf7c94e6206f957983))

* Configure dependencies. ([4db723d](https://github.com/patternslib/dev/commit/4db723dedd245f2c71fe9367b7f82bec1179c024))Use dependencies field in package.json to install all development dependencies.
This way, when another package depends on it via ``devDependencies``,
all dependencies will be installed.

* Configure jest for extendability. ([f4eeb3c](https://github.com/patternslib/dev/commit/f4eeb3cdbe63e63c3d7f9a79dd6f66759837a417))

* Configure prettier for extendability. ([0f27162](https://github.com/patternslib/dev/commit/0f2716286fff157b66a7d6e16b1048d35e00b6f2))

* Configure release-it for extendability. ([4aedd68](https://github.com/patternslib/dev/commit/4aedd68faea2a6b7a56850ce07e28e03af367b6a))

* Configure webpack for extendability. ([f805856](https://github.com/patternslib/dev/commit/f805856274ccae9f3cad17186dbf5029f8524b9c))

* Initial dev setup, based on @patternslib/patternslib. ([12968fb](https://github.com/patternslib/dev/commit/12968fb0c9ee8d0b858acc88d8d3077a70cfa6d2))

* Upgrade dependencies. ([134295d](https://github.com/patternslib/dev/commit/134295d67fe7c479c73c7878fd1d3ef0a07e5a83))