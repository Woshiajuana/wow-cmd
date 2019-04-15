
import fs from 'fs-extra'
import path from 'path'

const Handle = (options, data, next) => {
    let {
        params,
    } = options;
    if (!params)
        return next();
    try {
        let [ from, to, ] = params.split(':');
        from = path.join(__dirname, from);
        to = path.join(__dirname, to);
        CopyUtil.run(from, to);

    } catch (e) {
        console.error(e);
    } finally {
        next();
    }
};

// 参数 options
Handle.options = {
    cmd: ['-c', '--copy'],
};

export default Handle;


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