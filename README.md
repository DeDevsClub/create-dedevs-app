# create-dev-app

A CLI tool with starters to create a new dev app.

## Table of Contents
- [System Requirements](#system-requirements)
- [Setup Instructions](#setup-instructions)
- [Usage Examples](#usage-examples)
- [Architecture Overview](#architecture-overview)
- [Contribution Guidelines](#contribution-guidelines)

## System Requirements
- Node.js v14 or later
- npm or yarn package manager

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/DeDevsClub/create-dev-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd create-dev-app
   ```
3. Install dependencies:
   ```bash
   yarn install
   ```
   or
   ```bash
   npm install
   ```

## Usage Examples
To create a new project, run the following command and follow the prompts:
```bash
node index.js
```
You can also use the CLI command if installed globally:
```bash
create-dev-app
```

## Architecture Overview
- **index.js**: Main entry point for the CLI tool, handles user prompts and project creation.
- **starters/**: Contains starter templates for different types of projects.
- **package.json**: Contains project metadata and dependencies.

## Contribution Guidelines
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.