#!/usr/bin/env node

import inquirer from 'inquirer';
import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import createContents from './createContents.js';

// Gets: current working directory.
const CURR_DIR = process.cwd();

// Gets: directory name of the current module.
const __dirname = dirname(fileURLToPath(import.meta.url));

// Lists: available starter templates from the 'starters' directory.
const CHOICES = fs.readdirSync(`${__dirname}/starters`);

// Defines: prompts for project creation.
const QUESTIONS = [
  {
    name: 'project-choice',
    type: 'list',
    message: 'Select starter template:',
    choices: CHOICES,
  },
  {
    name: 'project-name',
    type: 'input',
    message: 'Enter your project name:',
    validate: function (input) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    },
  },
  {
    name: 'package-manager',
    type: 'list',
    message: 'Select package manager:',
    choices: ['npm', 'yarn', 'pnpm'],
  },
];

// Prompts: user for project creation.
inquirer.prompt(QUESTIONS).then(answers => {
  const projectChoice = answers['project-choice'];
  const projectName = answers['project-name'];
  const starterPath = `${__dirname}/starters/${projectChoice}`;
  const packageManager = answers['package-manager'];
  const devCommand = `cd ${CURR_DIR}/${projectName} && ${packageManager} run dev`;

  // Creates: project directory.
  fs.mkdirSync(`${CURR_DIR}/${projectName}`);

  // Creates: project files.
  createContents(starterPath, projectName);

  // Renames: .npmignore to .gitignore.
  if (fs.existsSync(`${CURR_DIR}/${projectName}/.npmignore`)) {
    fs.renameSync(`${CURR_DIR}/${projectName}/.npmignore`, `${CURR_DIR}/${projectName}/.gitignore`);
  }
  console.log(`\nProject created successfully <3\n`);

  // Runs: package manager in the project directory.
  const installCommand = `cd ${CURR_DIR}/${projectName} && ${packageManager} install`;
  console.log(`\nRunning '${packageManager}' in the project directory...\n`);
  console.log(`$ ${installCommand}\n`);
  console.log(`\nProject installed successfully <3\n`);

  // Runs: package manager in the project directory.
  console.log(`\nRunning '${packageManager}' dev in the project directory...\n`);
  console.log(`$ ${devCommand}\n`);
  console.log(`\nProject started successfully <3\n`);
});
