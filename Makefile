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

.PHONY: install
stamp-yarn install:
	$(YARN) install
	# Install pre commit hook
	$(YARN) husky install
	touch stamp-yarn


clean-dist:
	rm -Rf dist/


.PHONY: clean
clean: clean-dist
	rm -f stamp-yarn
	rm -Rf node_modules/


.PHONY: eslint
eslint: stamp-yarn
	$(ESLINT) ./src


.PHONY: check
check: stamp-yarn eslint
	$(YARN) run test


bundle-pre:
	@# Override this in your project to add some tasks before the bundle is built.
	@# Example: Unlink any linked dependencies.
	@#     bundle-pre:
	@#         -yarn unlink @patternslib/patternslib
	@#         yarn install --force


# Compile the bundle.
.PHONY: bundle
bundle: bundle-pre stamp-yarn
ifneq "$(PACKAGE_NAME)" "$(PACKAGE_DEV)"
	@# Do not build a bundle for @patternslib/dev
	$(YARN) run build
endif


# Create a ZIP file from the bundle which is uploaded to the GitHub release tag.
release-zip: clean-dist bundle
ifneq "$(PACKAGE_NAME)" "$(PACKAGE_DEV)"
	@# Do not create a zip release for @patternslib/dev
	$(eval PACKAGE_VERSION := $(shell node -p "require('./package.json').version"))
	@echo Creating $(BUNDLE_NAME)-bundle-$(PACKAGE_VERSION).zip
	mkdir -p $(BUNDLE_NAME)-bundle-$(PACKAGE_VERSION)
	-cp -R dist/* $(BUNDLE_NAME)-bundle-$(PACKAGE_VERSION)
	zip -r $(BUNDLE_NAME)-bundle-$(PACKAGE_VERSION).zip $(BUNDLE_NAME)-bundle-$(PACKAGE_VERSION)/
	rm -Rf $(BUNDLE_NAME)-bundle-$(PACKAGE_VERSION)
endif


# Update the package.json version with NEXT_VERSION
define write_package_json
const fs = require("fs"); \
const package_json = require("./package.json"); \
package_json.version = "$(NEXT_VERSION)"; \
const data = JSON.stringify(package_json, null, 4); \
fs.writeFileSync("package.json", data);
endef

prepare-release:
	@# Get the current package version.
	$(eval CURRENT_VERSION := $(shell node -p "require('./package.json').version"))
ifeq ($(LEVEL),$(filter $(LEVEL), alpha beta))
	@# case alpha or beta pre-release

	@# Set level argument for release-it.
	$(eval RELEASE_IT_LEVEL := "--preRelease=$(LEVEL)")
	@# Get the next version via semver.
	$(eval NEXT_VERSION := $(shell npx semver --increment premajor --preid $(LEVEL) $(CURRENT_VERSION)))
else
	@# case normal major/minor/patch release

	@# Set level argument for release-it.
	$(eval RELEASE_IT_LEVEL := $(LEVEL))
	@# Get the next version via semver.
	$(eval NEXT_VERSION := $(shell npx semver --increment $(LEVEL) $(CURRENT_VERSION)))
endif
	@echo Next version is: $(NEXT_VERSION)

	@# Temporarily write the NEXT_VERSION to package.json, so that the bundle
	@# and release-zip generate correct version strings.
	node -p '$(write_package_json)'


release: clean install check prepare-release release-zip
	@# RELEASE_IT_LEVEL and NEXT_VERSION set by prepare-release

	@# Note: If you want to include the compiled bundle in your npm package you
	@#       have to allow it in a .npmignore file.

	@# Checkout package.json which was modified by prepare-release and read by
	@# release-zip.
	git checkout .

	@# 1) Release on npm.
	@# 2) When successful, update release on GitHub
	@# 3) Checkout CHANGES.md, which was modified by step 2)
	npx release-it $(RELEASE_IT_LEVEL) \
		&& npx release-it \
			--github.release \
			--github.update \
			--github.assets=$(BUNDLE_NAME)-bundle-$(NEXT_VERSION).zip \
			--no-github.draft \
			--no-increment \
			--no-git \
			--no-npm \
		&& git checkout CHANGES.md

	@# Remove the bundle from release-zip again.
	@# But don't break if it doesn't exist.
	-rm $(BUNDLE_NAME)-bundle-$(PACKAGE_VERSION).zip


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
serve: stamp-yarn
	$(YARN) run start


#
