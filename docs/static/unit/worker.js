let offscreen, ctx;
onmessage = (e) => {
    if (e.data.msg == 'init') {
        let canvasInfo = e.data.data;
        let canvas = e.data.canvas;
        setArcList(canvas, canvasInfo);
    }
}

const init = ({canvasWidth, canvasHeight}) => {
    offscreen = new OffscreenCanvas(canvasWidth, canvasHeight);
    ctx = offscreen.getContext("2d");
}
const setArcList = (canvas, {canvasWidth, canvasHeight, arcSize, arcInterval}) => {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    for (let h = 0; h <= canvasHeight / arcInterval; h++) {
        for (let w = 0; w <= canvasWidth / arcInterval; w++) {
            draw((w * arcInterval), (h * arcInterval), arcSize, arcInterval);
        }
    }
    // const imageBitmap = offscreen.transferToImageBitmap();
    // postMessage({imageBitmap: imageBitmap}, [imageBitmap]);
    postMessage({}, []);
}
const draw = (x, y, r, i) => {
    i = i * 4;
    ctx.beginPath();
    // 绘制正多边形，否则用 arc 指令来画圆
    if (x % i == 0 && y % i == 0) {
        r = r * 2
    }
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.strokeStyle = "#d3d3d3";
    ctx.stroke();
    ctx.fillStyle = "#d3d3d3";
    ctx.fill();
    ctx.closePath();
}

