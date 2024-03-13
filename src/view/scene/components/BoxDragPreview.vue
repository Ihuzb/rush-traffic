<script setup>
import Box from './Box.vue'

const props = defineProps({
  title: String
})


</script>

<template>
  <div class="box-drag-preview">
    <Box :title="title" />
  </div>
</template>

<style scoped>

</style>