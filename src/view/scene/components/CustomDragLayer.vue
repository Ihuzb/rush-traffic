<script setup>
import {inject} from 'vue'
import {useDragLayer} from 'vue3-dnd'
import {ItemTypes} from './ItemTypes'
import {snapToGrid} from './snapToGrid'
import {toRefs} from '@vueuse/core'
import Box from './Box.vue'

const scale = inject('scale')

function getItemStyles(initialOffset, currentOffset, isSnapToGrid, item) {
  if (item?.type == 'select' || (!initialOffset || !currentOffset)) {
    return {
      display: 'none',
    }
  }
  let drop = document.getElementById('drop');
  let left = drop.getBoundingClientRect().left / scale.value;
  let top = drop.getBoundingClientRect().top / scale.value;
  let {x, y} = currentOffset;
  x = x / scale.value;
  y = y / scale.value;
  let ix = initialOffset.x / scale.value, iy = initialOffset.y / scale.value
  if (isSnapToGrid) {
    x -= ix;
    y -= iy;
    [x, y] = snapToGrid(x, y);
    x += ix;
    y += iy;
  }
  const transform = `translate(${Math.round(x - left)}px, ${Math.round(y - top)}px)`
  return {
    transform,
  }
}

const props = defineProps({
  snapToGrid: Boolean
})

const collect = useDragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))
const {itemType, isDragging, item, initialOffset, currentOffset} = toRefs(collect);
</script>

<template>
  <div class="layer">
    <div :style="getItemStyles(initialOffset, currentOffset, props.snapToGrid,item)">
      <Box :src=" item?.src"/>
    </div>
  </div>
</template>

<style scoped>
.layer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  pointer-events: none;
}

</style>