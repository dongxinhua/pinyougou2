function animate(obj, target, callback) {
    // 先清除原来的定时器，只保留当前一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(() => {
        // 步长写到定时器里面
        // 把我们步长值改为整数 不要出现小数的问题
        let step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            // 停止动画 本质是停止定时器
            clearInterval(obj.timer);
            // 回调函数写定时器里面
            // if (callback) {
            //     // 调用函数
            //     callback();
            // }
            callback && callback();
        }
        // 把每次加一这个步长改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}