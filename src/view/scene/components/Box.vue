<script setup>

const props = defineProps({
  src: String,
})
</script>

<template>
  <img :src="src" role="Box" class="box">
  <!--  <div-->
  <!--      class="box"-->
  <!--      role="Box"-->
  <!--  >-->
  <!--    {{ title }}-->
  <!--  </div>-->
</template>

<style scoped>
.box {
  width: 20px;
  cursor: move;
}
</style>