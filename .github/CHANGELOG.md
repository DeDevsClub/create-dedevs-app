# Changelog

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
- Deleted unnecessary files in `starters/basic-api` directory.

## [v0.1.0] - Initial release