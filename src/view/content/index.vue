<template>
  <div class="flex-class">
    <div class="menu-class">
      <Menu/>
    </div>
    <div class="content-class" id="content" @contextmenu="e=>e.preventDefault()">
      <div id="scene">
        <Scene/>
      </div>
    </div>
  </div>
</template>
<script setup>
import Scene from '@/view/scene/index.vue'
import {onMounted, provide, ref} from "vue";
import Menu from "@/view/menu/index.vue";

const scale = ref(1);
provide('scale', scale);
const setWheel = () => {
  let element = document.getElementById("scene");
  element.style.transform = 'scale(' + scale.value + ')';
  element.addEventListener('wheel', function (event) {
    event.preventDefault();
    let delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    if (delta > 0) {
      scale.value += 0.25;
    } else {
      scale.value -= 0.25;
    }
    if (scale > 4) {
      scale.value = 4
    } else if (scale < 0.45) {
      scale.value = 0.45
    }
    element.style.transform = 'scale(' + scale.value + ')';
  });
}
const setMouse = () => {
  let box = document.getElementById("scene");
  let content = document.getElementById("content");
  // 鼠标在元素上按下开始拖拽
  box.onmousedown = function (event) {
    if (event.button == 2) {
      // 获取按下鼠标时 盒子与页面的距离
      const originBoxX = box.offsetLeft;
      const originBoxY = box.offsetTop;
      // 获取按下鼠标时 鼠标与页面的距离
      const mouseX = event.pageX;
      const mouseY = event.pageY;
      // 在页面上移动
      content.onmousemove = function (event) {
        // 鼠标滑动的距离 = 鼠标移动后的位置 - 按下鼠标时的位置
        const distanceX = event.pageX - mouseX;
        const distanceY = event.pageY - mouseY;
        // 给元素重新赋值 上左定位的位置
        box.style.left = originBoxX + distanceX + "px";
        box.style.top = originBoxY + distanceY + "px";
      };
      // 鼠标松开取消事件
      box.onmouseup = function () {
        // 解绑在页面上滚动的事件
        content.onmousemove = null;
      };
    }
  };
}
onMounted(() => {
  setWheel();
  setMouse();
})
</script>

<style scoped>
.flex-class {
  background: white;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;

  .menu-class {
    flex: 400px;
    background: white;
    padding: 20px;
  }

  .content-class {
    height: 100vh;
    width: calc(100vw - 400px);
    overflow: hidden;
    position: relative;
    color: black;

    #scene {
      position: absolute;
      left: 20px;
      top: 20px;
    }
  }
}

</style>