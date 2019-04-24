

const output = require('./output.util');

module.exports = function (str, stage) {
    switch (stage) {
        case '000':
            return output.success(`成功=> ===== ${str}`);
        case '001':
            return output.warn(`警告=> ===== ${str}`);
        case '004':
            return output.error(`错误=> ===== ${str}`);
        default:
            return output.info(`提示=> ===== ${str}`);

    }
};
