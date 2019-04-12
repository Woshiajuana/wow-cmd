
const Handle = (options, data) => new Promise((resolve, reject) => {
    console.log('执行示例代码, 配置参数', options);
    console.log('执行示例代码, 上一个任务传递的数据参数', data);
    resolve();
});

// 参数 options
Handle.options = {
    cmd: ['-t', '--template'],
};

// 成功
Handle.success = (res, next) => {
    console.log('template 执行成功');
    next(res);
};

// 失败
Handle.error = (err, next) => {
    console.log('template 执行失败');
    next(err);
};

module.exports = Handle;

