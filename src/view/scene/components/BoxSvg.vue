<script setup>
import {ItemTypes} from './ItemTypes'
import {useDrag} from 'vue3-dnd'
import {toRefs} from "@vueuse/core";
import {toRaw} from "vue";

const props = defineProps({
  src: String,
  id: String,
  type: String,
})
const [collect, drag] = useDrag(() => ({
  type: ItemTypes.BOX,
  item: Object.assign({}, props, {id: props.id}),
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
  <img :src="src" role="Box" :ref="drag" class="box">
  <!--  <span-->
  <!--      :ref="drag"-->
  <!--      class="box"-->
  <!--      role="Box"-->
  <!--  >-->
  <!--    {{ title }}-->
  <!--  </span>-->
</template>

<style scoped>
.box {
  width: 20px;
//border: 1px dashed gray; cursor: move;
}
</style>