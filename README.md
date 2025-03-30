# create-dedevs-app

A CLI tool with starter [`apps`](./apps) to create a new dev app.

# Instant Installation

```bash
sudo npm install -g create-dedevs-app
```

## Table of Contents
- [System Requirements](#system-requirements)
- [Setup Instructions](#setup-instructions)
- [Usage Examples](#usage-examples)
- [Architecture Overview](#architecture-overview)
- [Contribution Guidelines](#contribution-guidelines)

## System Requirements
- Node.js v22 or later
- pnpm

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/DeDevsClub/create-dedevs-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd create-dedevs-app
   ```
3. Install dependencies (*for all apps*):

   ```bash
   pnpm apps:install
   ```

4. Build all apps:
   ```bash
   pnpm apps:build
   ```

5. Start all apps:
   ```bash
   pnpm apps:dev
   ```

## Usage Examples
To create a new project, run the following command and follow the prompts:
```bash
pnpm start
```
You can also use the CLI command if installed globally:
```bash
create-dedevs-app
```

## Architecture Overview
- **index.js**: Main entry point for the CLI tool, handles user prompts and project creation.
- **apps/**: Contains starter templates for different types of projects.
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