<script setup>
import {useDrag} from 'vue3-dnd'
import {ItemTypes} from './ItemTypes'
import {getEmptyImage} from 'react-dnd-html5-backend'
import Box from './Box.vue'
import {toRefs} from '@vueuse/core'
import {onMounted, watch} from 'vue'

const props = defineProps({
  id: String,
  src: String,
  left: Number,
  top: Number,
  clickId: String,
  size: String,

})

const [collect, drag, preview] = useDrag(() => ({
  type: ItemTypes.BOX,
  item: props,
  collect: (monitor) => ({
    isDragging: monitor.isDragging(),
  }),
}))

onMounted(() => {
  preview(getEmptyImage(), {captureDraggingState: true})
})

const {isDragging} = toRefs(collect);

</script>

<template>
  <div
      :ref="drag"
      :id="id"
      :style="{
      position: 'absolute',
      transform: `translate3d(${left}px, ${top}px, 0)`,
      opacity: isDragging ? 0 : 1,
      height: isDragging ? 0 : '',
    }"
      role="DraggableBox"
  >
    <Box :src="src" :clickId="clickId" :id="id" :size="size"/>
  </div>
</template>
<style scoped>

</style>