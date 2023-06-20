const fs = require('fs');
const path = require('path');

console.log(__dirname);
console.log(path.join(__dirname, '001-helloworld.js'))

fs.readFile(path.join(__dirname, './001-helloworld.js'), 'utf8', (err, doc) => {
    console.log(err);
    console.log(doc);
});