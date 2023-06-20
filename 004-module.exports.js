const greeting = name => `hello ${name}`;
const x = 100;
exports.x = x;
module.exports.greeting = greeting;

module.exports = {
    name: 'zhangsan'
}

exports = {
    age: 20
}