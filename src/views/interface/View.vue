/** * InterfaceView 接口页面 * @ author: yourName * @ data: 2023-08-07 14:53 */
<template>
  <div class="l-interface">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="预览"><Preview></Preview></a-tab-pane>
      <a-tab-pane key="2" tab="编辑" force-render><Edit></Edit></a-tab-pane>
      <a-tab-pane key="3" tab="运行"><Running></Running></a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const activeKey = ref('1')
//载入预览页面
import Edit from '../interface/Edit.vue'
import Running from '../interface/Running.vue'
import Preview from '../interface/PreviewView.vue'
</script>
<style lang="less">
.l-interface{
    padding: 0 10px;
}

</style>
