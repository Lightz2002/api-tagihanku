const fs = require('fs');
const path = require('path');
const logger = require('./src/util/logger');

const srcPath = path.join(__dirname, 'src');

const getAllJsFiles = (dir) => {
  const files = fs.readdirSync(dir);
  const jsFiles = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      jsFiles.push(...getAllJsFiles(filePath));
    } else if (file.endsWith('.js')) {
      jsFiles.push(filePath);
    }
  });

  return jsFiles;
};

const jsFiles = getAllJsFiles(srcPath);

const jsdocCommand = '.\\node_modules\\.bin\\jsdoc ' + jsFiles.join(' ');

// const jsdocCommand = `./node_modules/.bin/jsdoc ${jsFiles.join(' ')}`;

logger.log({
  level: 'info',
  message: 'Running JSDoc Command' + jsdocCommand,
});

const { exec } = require('child_process');

exec(jsdocCommand, (error, stdout, stderr) => {
  if (error) {
    logger.log({
      level: 'error',
      message: 'Error running JSDoc:' + error,
    });
  } else {
    logger.log({
      level: 'info',
      message: 'JSDoc completed successfully:' + stdout,
    });
  }
});
