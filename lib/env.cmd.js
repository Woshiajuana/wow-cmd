
const fs = require('fs-extra');
const path = require('path');
const output = require('../utils/output.util');
const cmdPath = process.cwd();

const Handle = (options, data, next) => {
    let {
        params,
    } = options;
    params = params || '';
    if (!params) {
        output.warn('env.cmd=>', '未指定设置环境');
        return next();
    }
    try {
        let parArr = params.split(':');
        let dir = path.join(cmdPath, parArr[1]);
        let env = parArr[0];
        let envDir = path.join(`${dir}/env.${env}.config.js`);
        output.info('env.cmd=>', `开始设置环境${env}`);
        output.info('env.cmd=>', `设置环境地址${envDir}`);
        let content = fs.readFileSync(envDir);
        output.info('env.cmd=>', `环境内容如下${content}`);
        content = `import env from './env.${env}.config';\nexport default env;`;
        fs.writeFileSync(path.join(`${dir}/env.config.js`), content);
    } catch (e) {
        output.error('env.cmd=>', `环境${params}设置失败${e}`);
    } finally {
        next();
    }
};

// 参数 options
Handle.options = {
    cmd: ['-e', '--env'],
};

module.exports = Handle;

