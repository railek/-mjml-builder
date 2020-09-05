const fs = require('fs');
const { prompt } = require('inquirer');

module.exports = {
  pick: () => {
    return prompt([
      {
        type: 'list',
        name: 'company',
        message: 'Pick a company to build:',
        choices: JSON.parse(fs.readFileSync('companies.json')),
      },
    ]);
  },
};
