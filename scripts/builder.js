const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');

function writeData(formattedName) {
  const fileData = JSON.parse(fs.readFileSync('companies.json'));
  fileData.push(formattedName);
  fs.writeFileSync('companies.json', JSON.stringify(fileData, null, 2));
}

function create(name) {
  const formattedName = name.toLowerCase().replace(/[^a-zA-Z]/g, '');
  const rootPath = path.resolve(__dirname, '../companies/');
  const newPath = `${rootPath}/${formattedName}`;
  const directories = ['templates', 'build', 'components'];

  if (!fs.existsSync('companies.json')) {
    console.log(`Creating data file since it doesn't exist.`);
    fs.writeFileSync('companies.json', JSON.stringify([], null, 2));
  }

  directories.forEach(directory => {
    mkdirp(`${newPath}/${directory}`, error => {
      if (error) {
        console.error(error);
      }
    });
  });

  writeData(formattedName);

  console.log(`✔ ${formattedName} was successfully created.`);
}

module.exports = {
  create,
};
