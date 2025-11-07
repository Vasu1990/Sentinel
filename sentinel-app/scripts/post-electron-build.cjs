
const fs = require('fs');
const path = require('path');

const electronDistPath = path.join(__dirname, '../dist-electron');

fs.readdirSync(electronDistPath).forEach(file => {
  if (file.endsWith('.js')) {
    fs.renameSync(
      path.join(electronDistPath, file),
      path.join(electronDistPath, file.replace(/\.js$/, '.cjs'))
    );
  }
});
