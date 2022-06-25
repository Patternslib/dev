-include .env
export

ESLINT ?= npx eslint
YARN   ?= npx yarn

PACKAGE_DEV=@patternslib/dev
PACKAGE_NAME := $(shell node -p "require('./package.json').name")

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
check:: stamp-yarn eslint
	$(YARN) run test


.PHONY: bundle
bundle: stamp-yarn
ifneq "$(PACKAGE_NAME)" "$(PACKAGE_DEV)"
	@# Do not build a bundle for @patternslib/dev
	$(YARN) run build
endif


# If you want to release on GitHub, make sure to have a .env file with a GITHUB_TOKEN.
# Also see:
#	https://github.com/settings/tokens
#	and https://github.com/release-it/release-it/blob/master/docs/github-releases.md#automated


release-zip: clean-dist bundle
ifneq "$(PACKAGE_NAME)" "$(PACKAGE_DEV)"
	@# Do not create a zip release for @patternslib/dev
	$(eval BUNDLE_NAME := $(subst @patternslib/,,$(subst @plone/,,$(PACKAGE_NAME))))
	$(eval PACKAGE_VERSION := $(shell node -p "require('./package.json').version"))
	@echo Creating $(BUNDLE_NAME)-bundle-$(PACKAGE_VERSION).zip
	mkdir -p dist/$(BUNDLE_NAME)-bundle-$(PACKAGE_VERSION)
	-mv dist/* dist/$(BUNDLE_NAME)-bundle-$(PACKAGE_VERSION)
	cd dist/ && zip -r $(BUNDLE_NAME)-bundle-$(PACKAGE_VERSION).zip $(BUNDLE_NAME)-bundle-$(PACKAGE_VERSION)/
endif


.PHONY: release-major
release-major: check
	npx release-it major && \
		make release-zip && \
		npx release-it --github.release --github.update --github.assets=dist/*.zip --no-github.draft --no-increment --no-git --no-npm && \
		git checkout CHANGES.md

.PHONY: release-minor
release-minor: check
	npx release-it minor && \
		make release-zip && \
		npx release-it --github.release --github.update --github.assets=dist/*.zip --no-github.draft --no-increment --no-git --no-npm && \
		git checkout CHANGES.md

.PHONY: release-patch
release-patch: check
	npx release-it patch && \
		make release-zip && \
		npx release-it --github.release --github.update --github.assets=dist/*.zip --no-github.draft --no-increment --no-git --no-npm && \
		git checkout CHANGES.md

.PHONY: prerelease-alpha
prerelease-alpha: clean install
	npx release-it --preRelease=alpha && \
		make release-zip && \
		npx release-it --github.release --github.update --github.assets=dist/*.zip --no-github.draft --no-increment --no-git --no-npm && \
		git checkout CHANGES.md

.PHONY: prerelease-beta
prerelease-beta: clean install
	npx release-it --preRelease=beta && \
		make release-zip && \
		npx release-it --github.release --github.update --github.assets=dist/*.zip --no-github.draft --no-increment --no-git --no-npm && \
		git checkout CHANGES.md


.PHONY: serve
serve: stamp-yarn
	$(YARN) run start


#
