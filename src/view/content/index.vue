<template>
  <DndProvider :backend="HTML5Backend">
    <div class="flex-class">
      <div class="menu-class">
        <div>
          <Box title="Glass" type="select" />
          <Box title="Banana" type="select"/>
          <Box title="Paper" type="select"/>
        </div>
      </div>
      <div class="content-class">
        <div id="scene">
          <Scene/>
        </div>
      </div>
    </div>
  </DndProvider>
</template>
<script setup>
import Scene from '@/src/view/scene/index.vue'
import {onMounted, ref} from "vue";
import Example from "@/src/view/scene/components/Example.vue";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "vue3-dnd";
import {TouchBackend} from 'react-dnd-touch-backend'
import Box from "@/src/view/scene/components/BoxSvg.vue";

const options = {
  enableMouseEvents: true
}
const open = ref(true);
const setWheel = () => {
  let element = document.getElementById("scene");
  let scale = 1;
  element.style.transform = 'scale(' + scale + ')';
  element.addEventListener('wheel', function (event) {
    event.preventDefault();
    let delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    if (delta > 0) {
      scale += 0.25;
    } else {
      scale -= 0.25;
    }
    if (scale > 4) {
      scale = 4
    } else if (scale < 0.45) {
      scale = 0.45
    }
    element.style.transform = 'scale(' + scale + ')';
  });
}
const setMouse = () => {
  let box = document.getElementById("scene");
  // 鼠标在元素上按下开始拖拽
  box.onmousedown = function () {
    // 获取按下鼠标时 盒子与页面的距离
    const originBoxX = box.offsetLeft;
    const originBoxY = box.offsetTop;
    // 获取按下鼠标时 鼠标与页面的距离
    const mouseX = event.pageX;
    const mouseY = event.pageY;
    // 在页面上移动
    window.onmousemove = function () {
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
      window.onmousemove = null;
    };
  };
}
onMounted(() => {
  setWheel();
  // setMouse();
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