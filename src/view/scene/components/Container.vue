<script setup>
import {inject, reactive, ref} from 'vue'
import {useDrop} from 'vue3-dnd'
import DraggableBox from './DraggableBox.vue'
import {ItemTypes} from './ItemTypes'
import {snapToGrid as doSnapToGrid} from './snapToGrid'

const props = defineProps({
  snapToGrid: Boolean
})


const boxes = reactive({})
const clickId = ref('')
const moveBox = ({id, src, type, size}, left, top) => {
  if (boxes[id] && type != 'select') {
    Object.assign(boxes[id], {left, top})
  } else {
    let length = Object.keys(boxes).length + 1;
    id = id + length;
    boxes[id] = {left: left, top, src, size}
  }
}
const scale = inject('scale')

const [, drop] = useDrop(() => ({
  accept: ItemTypes.BOX,
  drop(item, monitor) {
    let drop = document.getElementById('drop');
    let offLeft = drop.getBoundingClientRect().left / scale.value;
    let offTop = drop.getBoundingClientRect().top / scale.value;
    let delta = monitor.getDifferenceFromInitialOffset();
    let dx = delta.x / scale.value, dy = delta.y / scale.value

    let left = Math.round((item?.left || 0) + dx);
    let top = Math.round((item?.top || 0) + dy);
    if (item.type == 'select') {
      let currentOffset = monitor.getSourceClientOffset()
      left = Math.round(currentOffset.x / scale.value - offLeft);
      top = Math.round(currentOffset.y / scale.value - offTop);
    }
    if (props.snapToGrid) {
      [left, top] = doSnapToGrid(left, top)
    }
    moveBox(item, left, top)
    return undefined
  }
}));
const setClick = (key) => {
  clickId.value = key
}
</script>

<template>
  <div :ref="drop" class="container" @click.prevent="setClick('')">
    <DraggableBox
        v-for="(value, key) in boxes"
        :id="key"
        :key="key"
        :clickId="clickId"
        v-bind="value"
        @mousedown="setClick(key)"
        @click.stop="setClick(key)"
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