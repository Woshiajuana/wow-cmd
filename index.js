
const path = require('path');
const walk = require('./utils/walk.util');
const task = require('./utils/task.util');
const dupl = require('./utils/dupl.util');
const logs = require('./utils/log.util');
const output = require('./utils/output.util');


const argv = [...process.argv];
const parameters = argv.splice(2);


module.exports = function (opt = { cmdPath: '', options: { include: ['.cmd.js'], exclude: [], }}) {
    const libPath = path.join(__dirname, '/lib');
    let result = walk.run(libPath, {
        include: ['cmd.js'],
        exclude: [],
    });
    let {
        cmdPath,
        options,
    } = opt;
    if (cmdPath) {
        let cmdTask = walk.run(cmdPath, options);
        result = dupl.run(cmdTask, result);
    }
    if (!parameters.length)
        return;
    let fireFunArr = [];
    const query = {};
    parameters.filter(item => item.includes('=')).forEach(item => {
        let [key, value] = item.split('=');
        query[key] = value;
    });
    parameters.forEach((item, index) => {
        result.forEach((fireFun) => {
            if (typeof fireFun !== 'function'
                || !fireFun.options
                || !fireFun.options.cmd)
                return null;
            let cmd = fireFun.options.cmd;
            let type = false;
            cmd.forEach((c) => {
                if (item === c)
                    type = true;
            });
            if (!type)
                return null;
            let options = {
                params: parameters[index + 1],
                parameters,
                query,
            };
            fireFunArr.push({
                fireFun,
                options,
            });
        })
    });
    if (!fireFunArr.length)
        return null;
    task.run(...fireFunArr);
    return null;
};

module.exports.log = logs;
module.exports.output = output;
