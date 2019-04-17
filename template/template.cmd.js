
const Handle = (options, data, next) => {
    console.log('执行示例代码, 配置参数', options);
    console.log('执行示例代码, 上一个任务传递的数据参数', data);
    next();
};

// 参数 options
Handle.options = {
    cmd: ['-t', '--template'],
};

module.exports = Handle;

