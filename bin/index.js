require('babel-core/register');

const cmd = require('../index');
const path = require('path');

cmd({
    cmdPath: path.join(__dirname, '../template'),
    options: {
        include: ['.cmd.js'],
        exclude: [],
    }
});