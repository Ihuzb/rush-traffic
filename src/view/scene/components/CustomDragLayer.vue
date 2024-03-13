<script setup>
import {useDragLayer} from 'vue3-dnd'
import {ItemTypes} from './ItemTypes'
import {snapToGrid} from './snapToGrid'
import {toRefs} from '@vueuse/core'

function getItemStyles(
    initialOffset,
    currentOffset,
    isSnapToGrid, item
) {
  if (item?.type == 'select' || (!initialOffset || !currentOffset)) {
    return {
      display: 'none',
    }
  }
  let {x, y} = currentOffset;
  if (isSnapToGrid) {
    x -= initialOffset.x;
    y -= initialOffset.y;
    [x, y] = snapToGrid(x, y);
    x += initialOffset.x;
    y += initialOffset.y;
  }
  const transform = `translate(${x - 20 - 400}px, ${y - 20}px)`
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
const {itemType, isDragging, item, initialOffset, currentOffset} =
    toRefs(collect)
</script>

<template>
  <div class="layer">
    <div :style="getItemStyles(initialOffset, currentOffset, props.snapToGrid,item)">
      <div
          class="box"
          role="Box"
      >
        {{ item?.title }}
      </div>
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

.box {
  padding: 0.5rem 1rem;
  border: 1px dashed gray;
  cursor: move;
}
</style>