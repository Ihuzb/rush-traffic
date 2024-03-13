<script setup>
import {reactive} from 'vue'
import {useDrop} from 'vue3-dnd'
import DraggableBox from './DraggableBox.vue'
import {ItemTypes} from './ItemTypes'
import {snapToGrid as doSnapToGrid} from './snapToGrid'

const props = defineProps({
  snapToGrid: Boolean
})


const boxes = reactive({
  a: {top: 20, left: 80, title: 'a'},
  b: {top: 180, left: 20, title: 'b'},
})
const moveBox = ({title}, left, top) => {
  if (boxes[title]) {
    Object.assign(boxes[title], {left, top})
  } else {
    boxes[title] = {left: left, top, title}
  }
}

const [, drop] = useDrop(() => ({
  accept: ItemTypes.BOX,
  drop(item, monitor) {
    let delta = monitor.getDifferenceFromInitialOffset();
    let left = Math.round((item?.left || 0) + delta.x);
    let top = Math.round((item?.top || 0) + delta.y);
    if (item.type == 'select') {
      let currentOffset = monitor.getSourceClientOffset()
      left = Math.round(currentOffset.x - 400 - 20);
      top = Math.round(currentOffset.y - 20);
    }
    if (props.snapToGrid) {
      [left, top] = doSnapToGrid(left, top)
    }
    moveBox(item, left, top)
    return undefined
  }
}))
</script>

<template>
  <div :ref="drop" class="container">
    <DraggableBox
        v-for="(value, key) in boxes"
        :id="key"
        :key="key"
        v-bind="value"
    />
  </div>
</template>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>