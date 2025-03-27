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
  }
];

// Prompts: user for project creation.
inquirer.prompt(QUESTIONS).then(answers => {
  const projectChoice = answers['project-choice'];
  const projectName = answers['project-name'];
  const starterPath = `${__dirname}/starters/${projectChoice}`;

  // Creates: project directory.
  fs.mkdirSync(`${CURR_DIR}/${projectName}`);

  // Creates: project files.
  createContents(starterPath, projectName);
});
