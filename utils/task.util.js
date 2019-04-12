module.exports = {
    run () {
        let taskArr = Array.prototype.slice.apply(arguments);
        let index = 0;
        let len = taskArr.length;
        let next = (data) => {
            if(index >= len) return;
            ((i) => {
                let {
                    fireFun,
                    options,
                } = taskArr[i];
                fireFun(options, data).then((res) => {
                    fireFun.success && fireFun.success(res, next);
                }).catch((err) => {
                    fireFun.error && fireFun.error(err, next);
                });
            })(index);
            index++;
        };
        next();
    },
};
