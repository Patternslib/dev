# Changelog



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