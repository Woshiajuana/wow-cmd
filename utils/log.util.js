
module.exports = function (str, stage) {
    switch (stage) {
        case '000':
            return console.log(`成功=> ===== ${str}`);
        case '001':
            return console.warn(`警告=> ===== ${str}`);
        case '004':
            return console.error(`错误=> ===== ${str}`);
        default:
            return console.log(`提示=> ===== ${str}`);

    }
};
