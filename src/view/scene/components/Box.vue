<script setup>
import {BlockOutlined} from '@ant-design/icons-vue'

const props = defineProps({
  src: String,
  size: String,
  clickId: String,
  id: String,
});
const addIndex = () => {
  let dom = document.getElementById(props.id);
  dom.style.zIndex = parseInt(dom.style.zIndex || 0) + 10;
}
</script>

<template>
  <div>
    <div class="icon-class" v-show="clickId==id">
      <BlockOutlined @click="addIndex(id)"/>
    </div>
    <img :class="{'drag-box':clickId==id}"
         :style="{width:props.size=='big'?'80px':'40px'}" :src="src" role="Box" class="box">
  </div>

</template>

<style scoped>
.box {
  cursor: move;
}

.drag-box {
  border: 1.5px dashed gray;
  box-sizing: border-box;
}

.icon-class {
  font-size: 12px;
  color: gray;
  cursor: pointer;
  position: absolute;
  top: -15px;
}
</style>