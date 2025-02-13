# Development helpers and config for Patternslib and add-ons.

This repository includes base files which are extended in Patternslib, Mockup or other projects.

It includes a Makefile which helps in installing and releasing packages.

## Upgrading

Run `make upgrade` in your project.

Alternatively, if there is a new `@patternslib/dev` version installed, the `postinstall` package.json script will automatically run `make upgrade` in the directory where package installer was invoked, that is your project directory which depends on `@patternslib/dev`.


## Code style

The release process based on release-it includes automatic changelog generation via conventional-commit, commitlint and a git pre-commit hook.
Please check the [code style guide](https://github.com/Patternslib/Patterns/blob/master/docs/developer/styleguide.md#commits-messages) for the commit specification!
