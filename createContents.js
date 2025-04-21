import * as fs from 'fs';
const CURR_DIR = process.cwd();

// Read the root .gitignore content once
const rootGitignorePath = `${CURR_DIR}/.gitignore`;
let rootGitignoreContent = '';
try {
  rootGitignoreContent = fs.readFileSync(rootGitignorePath, 'utf8');
} catch (err) {
  console.error(`Error reading root .gitignore file at ${rootGitignorePath}:`, err);
  // Decide how to handle: exit, use default, or continue without gitignore?
  // For now, let's log and continue, resulting in no .gitignore if template is missing.
}

const createContents = (templatePath, newProjectPath, projectDescription, projectAuthor, projectGit, isRoot = true) => {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    // Skip copying template's gitignore or npmignore
    if (file === '.gitignore' || file === '.npmignore') {
      return; // Don't copy these, we'll create our own at the root
    }

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');
      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      // Skip node_modules
      if (file === 'node_modules') {
        return;
      }
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      // recursive call - pass false for isRoot
      createContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`, projectDescription, projectAuthor, projectGit, false);
    }
  });

  // After processing all files/dirs at this level, if it was the root call, add the definitive .gitignore
  if (isRoot && rootGitignoreContent) {
    const gitignoreWritePath = `${CURR_DIR}/${newProjectPath}/.gitignore`;
    fs.writeFileSync(gitignoreWritePath, rootGitignoreContent, 'utf8');
    console.log(`Created .gitignore in ${newProjectPath}`);
  }
};

export default createContents;
