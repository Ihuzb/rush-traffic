<script setup>
import Container from './Container.vue'
import CustomDragLayer from './CustomDragLayer.vue'
import {ref} from 'vue'

const snapToGridAfterDrop = ref(true)
const snapToGridWhileDragging = ref(true)

</script>

<template>
  <div style="width: 100%;height: 100%" id="drop">
    <Container :snap-to-grid="snapToGridAfterDrop"/>
    <CustomDragLayer :snap-to-grid="snapToGridWhileDragging"/>
  </div>
</template>