window.addEventListener('load', function () {
    let preview_img = this.document.querySelector('.preview_img');
    let mask = this.document.querySelector('.mask');
    let big = this.document.querySelector('.big');

    preview_img.addEventListener('mousemove', () => {
        mask.style.display = 'block';
        big.style.display = 'block';
    });

    preview_img.addEventListener('mouseout', () => {
        mask.style.display = 'none';
        big.style.display = 'none';
    });

    preview_img.addEventListener('mousemove', function (e) {
        let x = e.pageX - this.offsetLeft;
        let y = e.pageY - this.offsetTop;
        // console.log(x,y);
        // 遮挡层移动距离
        let maskX = x - mask.offsetWidth / 2;
        let maskY = y - mask.offsetHeight / 2;
        // 遮挡层最大移动距离
        let maskMax = preview_img.offsetWidth - mask.offsetWidth;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }

        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';

        // 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层最大移动距离
        // 大图
        let bigImg = document.querySelector('.bigImg');
        // 大图片最大移动距离
        let bigMax = bigImg.offsetWidth - big.offsetWidth;
        // 大图片的移动距离X，Y
        let bigX = maskX * bigMax / maskMax;
        let bigY = maskY * bigMax / maskMax;

        bigImg.style.left = - bigX + 'px';
        bigImg.style.top = - bigY + 'px';
    });
});