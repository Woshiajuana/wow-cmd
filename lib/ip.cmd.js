
const fs = require('fs-extra');
const path = require('path');
const output = require('../utils/output.util');
const cmdPath = process.cwd();

const Handle = (options, data, next) => {
    let {
        params,
        parameters,
    } = options;
    try {
        let regular = /^\d+\.\d+\.\d+\.\d+$/;
        if (!params) params = '';
        let [ip, dir] = params.split(':');
        if (!regular.test(ip)) {
            output.warn('设置IP=>', `即将使用本地IP地址`);
            ip = getIp();
        }
        fs.ensureDirSync(path.join(cmdPath, `${dir || 'config'}`));
        fs.writeFileSync(path.join(cmdPath, `${dir || 'config'}/ip.config.js`), `export default "${ip}";`);
        output.success('设置IP=>', `IP地址 => ${ ip }`);
    } catch (e) {
        output.error('设置IP=>', `设置IP：${e}`);
    } finally {
        next();
    }
};

// 参数 options
Handle.options = {
    cmd: ['-i', '--ip'],
};

module.exports = Handle;

function getIp() {
    let interfaces = require('os').networkInterfaces();
    for (let devName in interfaces){
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++){
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
}
