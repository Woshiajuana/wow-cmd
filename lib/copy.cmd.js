
const fs = require('fs-extra');
const path = require('path');
const cmdPath = process.cwd();

const Handle = (options, data, next) => {
    let {
        params,
    } = options;
    if (!params) {
        console.warn('复制警告：未指定复制目录');
        return next();
    }
    try {
        let [ from, to, ] = params.split(':');
        from = path.join(cmdPath, from);
        to = path.join(cmdPath, to);
        CopyUtil.run(from, to);
        console.log(`复制${from}到${to}目录成功`);
    } catch (e) {
        console.error(`复制${params}目录失败：${e}`);
    } finally {
        next();
    }
};

// 参数 options
Handle.options = {
    cmd: ['-c', '--copy'],
};

module.exports = Handle;

const CopyUtil = {

    run (from, to) {
        this.mkDir(to);
        let loop;
        (loop = (fromDir, toDir) => {
            let fromFiles = fs.readdirSync(fromDir);
            fromFiles.forEach((file) => {
                let fromFilePath = path.join(fromDir, '/' + file);
                let toFilePath = path.join(toDir, '/' + file);
                let fromFileStat = fs.statSync(fromFilePath);
                if (fromFileStat.isFile()) {
                    let readable = fs.createReadStream(fromFilePath);       // 创建读取流
                    let writable = fs.createWriteStream(toFilePath);      // 创建写入流
                    readable.pipe(writable);
                } else if (fromFileStat.isDirectory()) {
                    if (!fs.existsSync(toFilePath)) {
                        fs.mkdirSync(toFilePath);
                    }
                    loop(fromFilePath, toFilePath);
                }
            })
        })(from, to);
    },

    mkDir (to) {
        let paths = to.split(path.sep);
        let filePath = '';
        paths.forEach((dir, index) => {
            !dir && (dir = '/');
            filePath = filePath ? path.join(filePath, dir) : dir;
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath);
            }
        });
    },

};