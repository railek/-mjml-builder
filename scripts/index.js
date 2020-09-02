const program = require('commander');
const { create } = require('./builder');

program.option('-c --create', 'Create').parse(process.argv);

if (program.create) {
  if (program.args.length === 1 && typeof program.args[0] === 'string') {
    create(program.args[0]);
  } else {
    console.error('Please ensure you are passing in a company name. (ie: npm run create "acme")');
  }
}
