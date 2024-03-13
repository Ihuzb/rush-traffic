<script setup>

const props = defineProps({
  title: String,
  preview: Boolean
})
</script>

<template>
  <div
      class="box"
      role="Box"
  >
    {{ title }}
  </div>
</template>

<style scoped>
.box {
  padding: 0.5rem 1rem;
  border: 1px dashed gray;
  cursor: move;
}
</style>