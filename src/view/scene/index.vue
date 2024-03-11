<template>
  <canvas id="canvasScene" style="width: 100%"></canvas>
</template>

<script setup>
/**
 * 创建canvas画布用来渲染生成的矩阵点位图
 * 将生成矩阵点任务交给worker不会堵塞主线程
 * 再worker子线程中进行矩阵点的绘制并且返回位图
 *
 */
import {onMounted} from "vue";
import {canvasWidth, canvasHeight, arcSize, arcInterval} from '@/public/config/config.json'

const setCanvas = () => {
  const canvasScene = document.getElementById('canvasScene');
  canvasScene.width = canvasWidth;
  canvasScene.height = canvasHeight;
  const offscreen = document.querySelector('#canvasScene').transferControlToOffscreen();
  const worker = new Worker('/public/unit/worker.js');
  // 往子线程传递参数
  worker.postMessage({msg: 'init', canvas: offscreen, data: {canvasWidth, canvasHeight, arcInterval, arcSize}}, [offscreen]);
  worker.onmessage = (e) => {
    console.log(e, '我做完啦！');
    // let bitmapContext = canvasScene.getContext("bitmaprenderer");
    // bitmapContext.transferFromImageBitmap(e.data.imageBitmap);
  }
}

onMounted(() => {
  setCanvas();
})
</script>

<style scoped>

</style>