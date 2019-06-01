
const fs = require('fs-extra');
const path = require('path');
const output = require('../utils/output.util');
const cmdPath = process.cwd();

const Handle = (options, data, next) => {
    let {
        params,
    } = options;
    params = params ? params.toLocaleLowerCase() : '';
    let [env, dir] = params.split(':');
    if (!env) {
        output.warn('release.cmd=>', '未指定设置环境');
        return next();
    }
    let regular = ['bd', 'cs', 'zsc', 'sc'];
    if (regular.indexOf(env) === -1) {
        output.error('release.cmd=>', `环境设置错误，环境为：${env}`);
        return next();
    }
    try {
        output.info('release.cmd=>', `设置环境 => ${env}`);
        let content_env = fs.readFileSync(path.join(cmdPath, `src/config/env.${env}.config.js`));
        output.info('release.cmd=>', `${env}环境内容如下：\n${content_env}`);
        content_env = `import env from './env.${env}.config';\nexport default env;`;
        fs.writeFileSync(path.join(cmdPath, 'src/config/env.config.js'), content_env);
        output.success('release.cmd=>', `设置环境成功 => ${env}`);
    } catch (e) {
        output.error('release.cmd=>', `设置环境错误：${e}`);
    } finally {
        next();
    }
};

// 参数 options
Handle.options = {
    cmd: ['-r', '--release'],
};

module.exports = Handle;
