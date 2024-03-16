<template>
  <DndProvider :backend="HTML5Backend">
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel key="1" header="建筑">
        <a-row>
          <a-col :span="8">
            <Box src="public/svg/city/skyscraper-01.svg" id="city" type="select"/>
          </a-col>
          <a-col :span="8">
            <Box src="public/svg/city/skyscraper-04.svg" id="city" type="select"/>
          </a-col>
          <a-col :span="8">
            <Box src="public/svg/city/cafe.svg" id="city" type="select"/>
          </a-col>
        </a-row>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="公路">
        <a-row>
          <a-col :span="8">
            <Box src="public/svg/road/road-20.svg" id="city" type="select"/>
          </a-col>
          <a-col :span="8">
            <Box src="public/svg/road/road-42.svg" id="city" type="select" size="big"/>
          </a-col>
        </a-row>
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