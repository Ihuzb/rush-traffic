<template>
  <div id="scene">
    <Scene/>
  </div>
</template>
<script setup>
import Scene from '@/src/view/scene/index.vue'
import {onMounted} from "vue";
onMounted(()=>{
  var element = document.getElementById("scene"); // "myElement"是你想要应用该效果的元素ID

// 定义变量来存储当前的缩放比例
  var scale = 1;

// 添加鼠标滚动事件监听器
  element.addEventListener('wheel', function(event) {
    event.preventDefault(); // 防止默认的滚动行为发生

    var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail))); // 计算滚动的方向

    if (delta > 0) {
      // 如果滚动向上则放大
      scale += 0.25; // 每次放大0.25倍

      // 设置新的缩放比例
      element.style.transform = 'scale(' + scale + ')';
    } else {
      // 如果滚动向下则缩小
      scale -= 0.25; // 每次缩小0.25倍

      // 设置新的缩放比例
      element.style.transform = 'scale(' + scale + ')';
    }
  });
})
</script>

<style scoped>

</style>