<template>
  <DndProvider :backend="HTML5Backend">
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel :key="index+1" :header="item.name" v-for="(item,index) in selectList">
        <a-row>
          <a-col :span="8" v-for="value in item.list">
            <Box :src="urlBae+'/static/svg/'+item.id+'/'+value.url" :size="value.size" :id="item.id" type="select"/>
          </a-col>
        </a-row>
      </a-collapse-panel>
    </a-collapse>
  </DndProvider>

</template>
<script setup>
import {ref} from "vue";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "vue3-dnd";
import Box from "@/view/scene/components/BoxSvg.vue";

const isPro = process.env.NODE_ENV === 'production';
const urlBae = isPro ? '/rush-traffic' : ''
const activeKey = ref('1');
const selectList = [
  {
    id: 'city', name: '建筑', list: [
      {url: 'skyscraper-01.svg'}, {url: 'skyscraper-04.svg'}, {url: 'cafe.svg'}
    ]
  },
  {
    id: 'road', name: '道路', list: [
      {url: 'road-20.svg'}, {url: 'road-42.svg', size: 'big'}
    ]
  }
]
</script>
<style scoped>

</style>