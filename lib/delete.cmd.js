
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
        output.warn('delete.cmd=>', '未指定清除目录');
        return next();
    }
    let dir = path.join(cmdPath, params);
    output.info('delete.cmd=>', `开始清除目录${dir}`);
    emptyDir(dir);
    output.success('delete.cmd=>', `清除目录${dir}成功`);
    return next();
};

// 参数 options
Handle.options = {
    cmd: ['-d', '--delete'],
};

module.exports = Handle;

function emptyDir(fileUrl) {
    try {
        fs.emptyDirSync(fileUrl)
    } catch(e) {
        output.warn('delete.cmd=>', `清除目录${fileUrl}失败：${e}`);
        output.info('delete.cmd=>', `重新清除${fileUrl}目录`);
        emptyDir(fileUrl);
    }
}