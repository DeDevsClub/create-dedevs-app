# Changelog

## [v0.1.3] - 2025-03-27

### Added
- Added `PORT` environment variable to `dev` scripts in `apps/api`, `apps/nextjs`, and `apps/portfolio` to specify different ports.

### Changed
- Updated `Makefile` to run apps in parallel using `&`.
- Updated README to reflect new commands for installing, building, and starting apps.

### Fixed
- Resolved issues with Tailwind CSS configuration by upgrading to the latest version.

## [v0.1.2] - 2025-03-27

### Changed
- Updated `devCommand` to use `yarn dev` instead of `yarn run dev` in [index.js](cci:7://file:///Users/buns/Documents/GitHub/DeDevsClub/create-dedevs-app/index.js:0:0-0:0).

### Added
- Added `dev:docs` script to `package.json` for easier documentation development.

### Fixed
- Resolved `EAGAIN` error by adjusting the command execution in [index.js](cci:7://file:///Users/buns/Documents/GitHub/DeDevsClub/create-dedevs-app/index.js:0:0-0:0).

## [v0.1.1] - 2025-03-27

### Added
- Dynamic port detection in [index.js](cci:7://file:///Users/buns/Documents/GitHub/DeDevsClub/create-dedevs-app/index.js:0:0-0:0) for the development server.
- [.gitignore](cci:7://file:///Users/buns/Documents/GitHub/DeDevsClub/create-dedevs-app/.gitignore:0:0-0:0) and [.npmignore](cci:7://file:///Users/buns/Documents/GitHub/DeDevsClub/create-dedevs-app/.npmignore:0:0-0:0) files updated with comprehensive rules for dependencies, testing, next.js, production, and more.

### Changed
- Integrated `child_process.exec` to run package manager and development server commands in [index.js](cci:7://file:///Users/buns/Documents/GitHub/DeDevsClub/create-dedevs-app/index.js:0:0-0:0).
- Modified prompt messages and default project name in [index.js](cci:7://file:///Users/buns/Documents/GitHub/DeDevsClub/create-dedevs-app/index.js:0:0-0:0) for improved user interaction.

### Fixed
- Updated ESLint configuration and ran `yarn lint` to ensure code quality.
- Fixed issue with undefined `answers` in the default project name logic in [index.js](cci:7://file:///Users/buns/Documents/GitHub/DeDevsClub/create-dedevs-app/index.js:0:0-0:0).

### Removed
- Deleted unnecessary (i.e. all) filesin `examples` directory.

## [v0.1.0] - Initial release