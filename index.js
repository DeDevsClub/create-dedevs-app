#!/usr/bin/env node

import inquirer from 'inquirer';
import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import createContents from './createContents.js';
import { exec } from 'child_process';

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
    message: '\u2728 Select starter template:',
    choices: CHOICES,
  },
  {
    name: 'project-name',
    type: 'input',
    message: '\u2728 Enter your project name:',
    default: 'my-dedevs-app',
    validate: function (input) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    },
  },
  // {
  //   name: 'package-manager',
  //   type: 'list',
  //   message: 'Select package manager:',
  //   choices: ['npm', 'yarn', 'pnpm', 'bun'],
  // },
];

// Prompts: user for project creation.
inquirer.prompt(QUESTIONS).then(answers => {
  const projectChoice = answers['project-choice'];
  const projectName = answers['project-name'];
  const starterPath = `${__dirname}/starters/${projectChoice}`;
  // const packageManager = answers['package-manager'];
  const installCommand = 'yarn'
  const doInstallCommand = `cd ${CURR_DIR}/${projectName} && ${installCommand}`;
  const devCommand = 'yarn run dev'
  const doDevCommand = `cd ${CURR_DIR}/${projectName} && ${devCommand}`;

  // Creates: project directory.
  fs.mkdirSync(`${CURR_DIR}/${projectName}`);

  // Creates: project files.
  createContents(starterPath, projectName);

  // Renames: .npmignore to .gitignore.
  if (fs.existsSync(`${CURR_DIR}/${projectName}/.npmignore`)) {
    fs.renameSync(`${CURR_DIR}/${projectName}/.npmignore`, `${CURR_DIR}/${projectName}/.gitignore`);
  }

  // Runs: package manager in the project directory.
  console.log(`\nRunning '${installCommand}' in the project directory...\n`);

  exec(doInstallCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(stdout);
    console.log(`\n \u2728 Project installed successfully <3\n`);

    exec(doDevCommand, (error, stdout, stderr) => {
      // Runs: development server in the project directory after installation completes.
      console.log(`\n \u2728 Running '${devCommand}' in the project directory...\n`);
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }

      console.log(stdout);

      // Regex to find the port number in the output
      const portMatch = stdout.match(/http:\/\/localhost:(\d+)/);
      const port = portMatch ? portMatch[1] : '3000'; // Default to 3000 if not found

      console.log(`\n \u2728 Project started successfully <3\n Visit http://localhost:${port}`);
    });
  })
});
