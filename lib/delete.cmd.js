
import fs from 'fs-extra'
import path from 'path'

const Handle = (options, data, next) => {
    let {
        params,
    } = options;
    params = params || '';
    if (!params) {
        console.warn('清除警告：未指定清除目录');
        return next();
    }
    let dir = path.join(__dirname, params);
    emptyDir(dir);
    console.log(`清除目录：${dir}成功`);
    return next();
};

// 参数 options
Handle.options = {
    cmd: ['-d', '--delete'],
};

export default Handle;

function emptyDir(fileUrl) {
    try {
        fs.emptyDirSync(fileUrl)
    } catch(e) {
        console.error(`清除目录${fileUrl}失败：${e}`);
        console.log(`重新清除${fileUrl}目录`);
        emptyDir(fileUrl);
    }
}