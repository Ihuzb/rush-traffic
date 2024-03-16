<script setup>

const props = defineProps({
  src: String,
  size: String,
})
</script>

<template>
  <img  :style="{width:props.size=='big'?'80px':'40px'}" :src="src" role="Box" class="box">
</template>

<style scoped>
.box {
  cursor: move;
}
</style>