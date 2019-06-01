
const fs = require('fs-extra');
const path = require('path');
const output = require('../utils/output.util');
const cmdPath = process.cwd();

const Handle = (options, data, next) => {
    let {
        params,
        parameters,
    } = options;
    let regular = /^\d+\.\d+\.\d+\.\d+$/;
    if (!regular.test(params)) {
        log(`IP格式错误，IP为：${params}`, '004');
        log('即将使用本地IP地址');
        params = getIp();
    }
    try {
        const content = `export default "${params}";`;
        fs.writeFileSync(path.join(__dirname, `./../config/ip.config.js`), content)
    } catch (e) {
        return reject(`设置IP错误，错误：${e}`)
    }
    return resolve(`设置IP地址 => ${ params }`);
};

// 参数 options
Handle.options = {
    cmd: ['-i', '--ip'],
};

export default Handle;

function getIp() {
    let interfaces = require('os').networkInterfaces();
    for(let devName in interfaces){
        let iface = interfaces[devName];
        for(let i=0;i<iface.length;i++){
            let alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
}
