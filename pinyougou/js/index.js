window.addEventListener('load', function () {
    // 获取元素
    let arrow_l = document.querySelector('.arrow_l');
    let arrow_r = document.querySelector('.arrow_r');
    let focus = this.document.querySelector('.focus');
    let focusWidth = focus.offsetWidth;
    // 鼠标经过显示隐藏按钮
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; // 清除定时器变量 
    });
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            // 手动调用点击事件
            arrow_r.click();
        }, 2000);

    });
    // 动态生成小圈圈，有几张图片就生成几个小圈圈
    let ul = focus.querySelector('ul');
    let ol = focus.querySelector('.circle');
    // console.log(ul.children.length);

    for (let i = 0; i < ul.children.length; i++) {
        let li = this.document.createElement('li');
        ol.appendChild(li);
        // 用排他思想给每个li添加点击事件，点击那个那个变色
        li.addEventListener('click', function () {
            // 干掉所有人
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下我自己
            this.className = 'current';
            // 点击小圆圈，移动图片，移动的是ul
            // ul移动的距离是：小圆圈的索引号乘以图片的宽度，注意是负值
            // 当我们点击了某个小li 就拿当前的li的索引号
            // 把索引给num和circle
            num = i;
            circle = i;
            /* console.log(focusWidth);
            console.log(i); */
            animate(ul, -i * focusWidth);
        });
    }

    ol.children[0].className = 'current';
    // 克隆第一张图片放在ul最后面
    let first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 点击右侧按钮，图片滚动一张
    let num = 0;
    // circle 控制小圆圈的播放
    let circle = 0;
    let flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;  // 关闭节流阀
            if (num == ul.children.length - 1) {
                ul.style.left = '0';
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;  // 打开节流阀
            });
            // 点击右侧按钮小圆圈跟着一起变化
            circle++;
            // 如果circle==4,说明走到最后一张图片了,我们要复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;  // 关闭节流阀
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;  // 打开节流阀
            });
            // 点击右侧按钮小圆圈跟着一起变化
            circle--;
            // 如果circle < 0  说明第一张图片，则小圆圈要改为第4个小圆圈（3）
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    });
    function circleChange() {
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    // 自动调用轮播图
    let timer = this.setInterval(function () {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000);
});