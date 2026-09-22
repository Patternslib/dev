# Development helpers and config for Patternslib and add-ons.

This repository includes base files which are extended in Patternslib, Mockup or other projects.

It includes a Makefile which helps in installing and releasing packages.

## Upgrading

Run `make upgrade` in your project.

Alternatively, if there is a new `@patternslib/dev` version installed, the `postinstall` package.json script will automatically run `make upgrade` in the directory where package installer was invoked, that is your project directory which depends on `@patternslib/dev`.

## Migrating a consuming package to pnpm

Installing `@patternslib/dev` does not require switching your project from Yarn to pnpm.
If you choose to migrate, update the consuming project's configuration and workflows explicitly.
The shared Makefile uses pnpm for installation and for running build, test, and start scripts.

1. Pin the pnpm version you intend to use and pin it in your project's `package.json`:

    ```json
    "packageManager": "pnpm@12.3.4",
    ```

2. Add a `pnpm-workspace.yaml` file at the project's workspace root:

    ```yaml
    # No nested node_modules for Module Federation.
    shamefullyHoist: true
    ```

    You might also want to include the following to allow to build "@patternslib/dev" and to include releases of "@patternslib/dev" which are younger than the "minimumReleaseAge":

    ```yaml
    allowBuilds:
        "@patternslib/dev": true

    minimumReleaseAgeExclude:
        - "@patternslib/dev"
    ```

    For more information, see the [pnpm configuration reference](https://pnpm.io/settings).

3. Change the `yarn` references in the Makefile to use `pnpm`.

```makefile
PNPM ?= npx pnpm

-include node_modules/@patternslib/dev/Makefile

.PHONY: install
pnpm-lock.yaml install:
	$(PNPM) install
```

If you use `yarn link` or `yarn unlink` in your Makefile, update it to fit the new [pnpm syntax](https://pnpm.io/cli/link).

4. You might need to include pnpm to the `transformIgnorePatterns` field in Jest configuration to make the tests pass. This files `jest.setup.js` for an example.

5. Update the CI configuration to use the pnpm cache - see this projects `.github/workflows/test.yml`.

6. Run `make install`, add `pnpm-lock.yaml` to the git repository and remove `yarn.lock`.

## Code style

The release process based on release-it includes automatic changelog generation via conventional-commit, commitlint and a git pre-commit hook.
Please check the [code style guide](https://github.com/Patternslib/Patterns/blob/master/docs/developer/styleguide.md#commits-messages) for the commit specification!
