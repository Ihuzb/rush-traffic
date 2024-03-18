<template>
  <div class="canvas-class">
    <div class="svg-class" >
      <DndProvider :backend="HTML5Backend">
        <Example/>
      </DndProvider>
    </div>
    <canvas id="canvasScene" style="width: 100%"></canvas>
  </div>
</template>

<script setup>
/**
 * 创建canvas画布用来渲染生成的矩阵点位图
 * 将生成矩阵点任务交给worker不会堵塞主线程
 * 再worker子线程中进行矩阵点的绘制并且返回位图
 *
 */
import {onMounted} from "vue";
import {canvasWidth, canvasHeight, arcSize, arcInterval} from '/public/static/config/config.json'
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "vue3-dnd";
import Example from "@/view/scene/components/Example.vue";

// 随机生成建筑物
// const setCity = () => {
//   let length = 4;
//   let cityList = Array.apply(null, {length}).map(v => {
//     let x = Math.floor(Math.random() * 124 + 1) * 10, y = Math.floor(Math.random() * 58 + 1) * 10;
//     return skyscraper.replace(/<svg.*>/, `<g transform="translate(${x},${y}) scale(0.3125)">`).replace(/<\/svg>/g, '</g>');
//   }).join('');
//   addVga(cityList);
// }
// 生成各种图标方法
// const addVga = (vgaText) => {
//   let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
//   svg.setAttribute('width', '1280');
//   svg.setAttribute('height', '640');
//   svg.innerHTML = vgaText;
//   document.getElementById('svgInfo').appendChild(svg);
// }
const setCanvas = () => {
  const offscreen = document.querySelector('#canvasScene').transferControlToOffscreen();
  const worker = new Worker('/static/unit/worker.js');
  // 往子线程传递参数
  worker.postMessage({
    msg: 'init',
    canvas: offscreen,
    data: {canvasWidth, canvasHeight, arcInterval, arcSize}
  }, [offscreen]);
  worker.onmessage = (e) => {
    console.log(e, '我做完啦！');
    // let bitmapContext = canvasScene.getContext("bitmaprenderer");
    // bitmapContext.transferFromImageBitmap(e.data.imageBitmap);
  }
}

onMounted(() => {
  setCanvas();
  // setCity();
})
</script>

<style scoped>
.canvas-class {
  position: relative;
  width: 1280px;
  height: 640px;

  .svg-class {
    position: absolute;
    left: 0;
    z-index: 2;
    color: red;
    width: 100%;
    height: 100%;

    .city-class {
      width: 50px;
      position: absolute;
      left: 100px;
      top: 200px;
    }

    #lv-1 {
      scale: 0.5;
    }
  }

  #canvasScene {
    position: absolute;
    left: 0;
    z-index: 1;
  }
}
</style>