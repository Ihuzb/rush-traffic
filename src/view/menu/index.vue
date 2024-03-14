<template>
  <DndProvider :backend="HTML5Backend">
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel key="1" header="This is panel header 1">
        <Box src="public/svg/city/skyscraper-01.svg" id="city" type="select"/>
<!--        <Box title="Banana" type="select"/>-->
<!--        <Box title="Paper" type="select"/>-->
      </a-collapse-panel>
      <a-collapse-panel key="2" header="This is panel header 2">
        <p>{{ 232 }}</p>
      </a-collapse-panel>
      <a-collapse-panel key="3" header="This is panel header 3" collapsible="disabled">
        <p>{{ 232323 }}</p>
      </a-collapse-panel>
    </a-collapse>
  </DndProvider>

</template>
<script setup>
import {ref} from "vue";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "vue3-dnd";
import Box from "@/src/view/scene/components/BoxSvg.vue";

const activeKey = ref('1')
</script>
<style scoped>

</style>