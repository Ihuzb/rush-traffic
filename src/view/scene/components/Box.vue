<script setup>

const props = defineProps({
  src: String,
  size: String,
  clickId: String,
  id: String,
})
</script>

<template>
  <img :class="{'drag-box':clickId==id}"
       :style="{width:props.size=='big'?'80px':'40px'}" :src="src" role="Box" class="box">
</template>

<style scoped>
.box {
  cursor: move;
}

.drag-box {
  border: 1px dashed gray;
  box-sizing: border-box;
}
</style>