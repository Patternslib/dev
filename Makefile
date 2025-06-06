# This Makefile is meant to be exported by Patternslib or Mockup packages.

# .evn include, mainly for a GITHUB_TOKEN.
-include .env
export


# If you want to release on GitHub, make sure to have a .env file with a GITHUB_TOKEN.
# Also see:
#	https://github.com/settings/tokens
#	and https://github.com/release-it/release-it/blob/master/docs/github-releases.md#automated


ESLINT ?= npx eslint
YARN   ?= npx yarn

PACKAGE_DEV=@patternslib/dev
PACKAGE_NAME := $(shell node -p "require('./package.json').name")
BUNDLE_NAME := $(subst @patternslib/,,$(subst @plone/,,$(PACKAGE_NAME)))


yarn.lock install: .git/hooks/commit-msg
	$(YARN) install


.git/hooks/commit-msg:
	echo "npx commitlint --edit" > .git/hooks/commit-msg
	chmod u+x .git/hooks/commit-msg


.PHONY: clean
clean-dist:
	rm -Rf dist/


.PHONY: clean
clean: clean-dist
	rm -Rf node_modules/


.PHONY: eslint
eslint: install
	$(ESLINT) ./src


.PHONY: check
check: install eslint
	$(YARN) run test


.PHONY: bundle-pre
bundle-pre:
	@# Override this in your project to add some tasks before the bundle is built.
	@# Example: Unlink any linked dependencies.
	@#     bundle-pre:
	@#         -yarn unlink @patternslib/patternslib
	@#         yarn install --force


# Compile the bundle.
# NOTE: When using the normal workflow - e.g. `make release-minor`, the
# relase-it config runs `make bundle` after the version bump.
.PHONY: bundle
bundle: clean-dist bundle-pre install
ifneq "$(PACKAGE_NAME)" "$(PACKAGE_DEV)"
	@# Do not build a bundle for @patternslib/dev
	$(YARN) run build
endif


# Create a ZIP file from the bundle which is uploaded to the GitHub release tag.
.PHONY: release-zip
release-zip:
ifneq "$(PACKAGE_NAME)" "$(PACKAGE_DEV)"
	@# Do not create a zip release for @patternslib/dev
	$(eval PACKAGE_VERSION := $(shell node -p "require('./package.json').version"))
	@echo Creating $(BUNDLE_NAME)-bundle-$(PACKAGE_VERSION).zip
	mkdir -p $(BUNDLE_NAME)-bundle-$(PACKAGE_VERSION)
	-cp -R dist/* $(BUNDLE_NAME)-bundle-$(PACKAGE_VERSION)
	zip -r $(BUNDLE_NAME)-bundle-$(PACKAGE_VERSION).zip $(BUNDLE_NAME)-bundle-$(PACKAGE_VERSION)/
	rm -Rf $(BUNDLE_NAME)-bundle-$(PACKAGE_VERSION)
endif


# Prepare some necessary variables.
.PHONY: prepare-release
prepare-release:
ifeq ($(LEVEL),$(filter $(LEVEL), alpha beta))
	@# case alpha or beta pre-release

	@# Changelog for the GitHub release when doing prereleases:
	@# Include all the changes since the previous pre- or regular release.
	$(eval RELEASE_IT_GITHUB_OPTIONS := "")

	@# Set level argument for release-it.
	$(eval RELEASE_IT_LEVEL := "--preRelease=$(LEVEL)")
else
	@# case normal major/minor/patch release

	@# Changelog for the GitHub release when doing regular releases:
	@# Include all changes since the previous regular release, also including
	@# changes from pre-releases.
	@# See: https://github.com/release-it/release-it/blob/master/docs/pre-releases.md
	$(eval RELEASE_IT_GITHUB_OPTIONS := "--git.tagExclude='*[-]*'")

	@# Set level argument for release-it.
	$(eval RELEASE_IT_LEVEL := $(LEVEL))
endif


# Do the npm release.
.PHONY: release-npm
release-npm: prepare-release
	npx release-it $(RELEASE_IT_LEVEL)


# Do the GitHub release.
.PHONY: release-github
release-github: prepare-release release-zip
	@# NOTE: PACKAGE_VERSION is defined in release-zip

	npx release-it \
			--no-increment \
			--no-git \
			--no-npm \
			--github.release \
			--github.update \
			--github.assets=$(BUNDLE_NAME)-bundle-$(PACKAGE_VERSION).zip \
			--no-github.draft \
			$(RELEASE_IT_GITHUB_OPTIONS)

	@# Checkout CHANGES.md, which was modified just before
	git checkout CHANGES.md

	@# Remove the bundle from release-zip again.
	@# But don't break if it doesn't exist.
	-rm $(BUNDLE_NAME)-bundle-$(PACKAGE_VERSION).zip


.PHONY: release
release: clean install check release-npm release-github
	@# Note: If you want to include the compiled bundle in your npm package you
	@#       have to allow it in a .npmignore file.


.PHONY: release-major
release-major:
	make LEVEL=major release


.PHONY: release-minor
release-minor:
	make LEVEL=minor release


.PHONY: release-patch
release-patch:
	make LEVEL=patch release

.PHONY: prerelease-alpha
prerelease-alpha:
	make LEVEL=alpha release

.PHONY: prerelease-beta
prerelease-beta:
	make LEVEL=beta release


.PHONY: serve
serve: install
	$(YARN) run start


upgrade:\
	.git/hooks/commit-msg\
	upgrade-remove-husky\
	upgrade-eslint
	@# Upgrade target, depends on other upgrades


upgrade-remove-husky:
	test -d .husky\
		&& rm -R .husky\
		&& git add .husky\
		&& git commit -m"maint: @patternslib/dev upgrade - remove .husky directory in favor of git hooks."\
		|| :
	-git config --unset core.hooksPath


eslint.config.js upgrade-eslint:
	test -f "eslint.config.js"\
		|| (\
			echo 'module.exports = require("@patternslib/dev/eslint.config.js");' > eslint.config.js\
			&& git add eslint.config.js\
			&& git commit -m"maint: @patternslib/dev upgrade - create eslint.config.js."\
		)
	test -f ".eslintrc.js"\
		&& rm .eslintrc.js\
		&& git add .eslintrc.js\
		&& git commit -m"maint: @patternslib/dev upgrade - remove old .eslintrc.js."\
		|| :
