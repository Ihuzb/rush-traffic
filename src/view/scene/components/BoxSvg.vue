<script setup>
import {ItemTypes} from './ItemTypes'
import {useDrag} from 'vue3-dnd'
import {toRefs} from "@vueuse/core";

const props = defineProps({
  title: String,
  type: String,
})
const [collect, drag] = useDrag(() => ({
  type: ItemTypes.BOX,
  item: props,
  end: (item, monitor) => {
    const dropResult = monitor.getDropResult();
  },
  collect: monitor => ({
    isDragging: monitor.isDragging(),
    handlerId: monitor.getHandlerId(),
  }),
}));
const {isDragging} = toRefs(collect);

</script>

<template>
  <span
      :ref="drag"
      class="box"
      role="Box"
  >
    {{ title }}
  </span>
</template>

<style scoped>
.box {
  padding: 0.5rem 1rem;
  //border: 1px dashed gray;
  cursor: move;
}
</style>