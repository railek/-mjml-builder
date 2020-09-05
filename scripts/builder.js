const fs = require('fs');
const glob = require('glob');
const mjml = require('mjml');
const mkdirp = require('mkdirp');
const path = require('path');
const { pick } = require('./inquirer');

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

async function compile(templatePaths) {
  return templatePaths.map(templatePath => {
    const fileData = JSON.parse(fs.readFileSync('companies.json'));
    const strings = templatePath.split('/');
    const company = strings.find(item => fileData.includes(item));
    const templateName = strings[strings.length - 1];
    const name = templateName.replace(/(.+?)\.mjml/, '$1');
    const body = mjml(fs.readFileSync(templatePath, 'utf8'));

    return {
      name,
      company,
      body,
    };
  });
}

async function build() {
  const companies = JSON.parse(fs.readFileSync('companies.json'));

  if (!companies.length) {
    console.error('Create a company before building. (ie: npm run create "acme")');
    return;
  }

  const choice = await pick();
  const templatePaths = glob.sync(`companies/${choice.company}/templates/*.mjml`);
  const compiledFiles = await compile(templatePaths);

  compiledFiles.forEach(({ company, name, body }) => {
    fs.writeFileSync(`companies/${company}/build/${name}.html`, body.html);
  });
}

module.exports = {
  create,
  build,
};
