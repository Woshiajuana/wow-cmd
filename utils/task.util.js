module.exports = {
    run () {
        let taskArr = Array.prototype.slice.apply(arguments);
        let index = 0;
        let len = taskArr.length;
        let next = (data) => {
            if(index >= len)
                return null;
            ((i) => {
                index++;
                let {
                    fireFun,
                    options,
                } = taskArr[i];
                let fn = fireFun(options, data, next);
                if (fn instanceof Promise) {
                    fn.then((res) => {
                        fireFun.success && fireFun.success(res, next);
                    }).catch((err) => {
                        fireFun.error && fireFun.error(err, next);
                    });
                }
            })(index);
        };
        next();
    },
};
