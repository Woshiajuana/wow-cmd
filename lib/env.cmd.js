
const fs = require('fs-extra');
const path = require('path');
const output = require('../utils/output.util');
const cmdPath = process.cwd();



const Handle = (options, data, next) => {
    let {
        params,
    } = options;
    let env = params ? params.toLocaleLowerCase() : '';
    if (!env) {
        console.log('\x1b[91m','message', '\x1b[0m')
    }
    let regular = ['bd', 'cs', 'zsc', 'sc'];
    if (regular.indexOf(env) === -1)
        return console.log(`设置失败：环境设置错误，环境为：${env}`,);







    return next();
};

// 参数 options
Handle.options = {
    cmd: ['-e', '--env'],
};

module.exports = Handle;

function setRelease(env, reject) {
    try {
        let content_env = fs.readFileSync(path.join(__dirname, `./../src/config/env.${env}.config.js`));
        log(`${env}环境内容如下：\n${content_env}`);
        content_env = `import env from './env.${env}.config';\nexport default env;`;
        fs.writeFileSync(path.join(__dirname, './../src/config/env.config.js'), content_env);
    } catch (e) {
        return reject(`设置错误：${e}`, '004');
    }
}
