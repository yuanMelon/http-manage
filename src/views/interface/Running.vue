/** * Running * @ author: yourName * @ data: 2023-08-10 15:42 */
<script setup lang="ts">
import { ref } from 'vue'
import { useInterfaceStore } from '@/stores/useInterface'
const store = useInterfaceStore()
const info = ref(store.map.get('接口3'))
let environment = ref('localhost:000')
const send = function():void{

}
</script>
<template>
  <div class="l-running">
    <a-input-group compact style="width: 100%">
          <a-select v-model:value="info.method" style="width: 10%; min-width: 80px" disabled>
            <a-select-option value="get">GET</a-select-option>
            <a-select-option value="post">POST</a-select-option>
            <a-select-option value="put">PUT</a-select-option>
            <a-select-option value="delete">DELETE</a-select-option>
            <a-select-option value="options">OPTIONS</a-select-option>
            <a-select-option value="head">HEAD</a-select-option>
          </a-select>
          <a-input
              v-model:value="environment"
              class="site-input-right"
              style="width: 30%; text-align: left;min-width:120px;"
            />

            <a-input
              v-model:value="info.path"
              class="site-input-right"
              style="width: 50%; text-align: left"
              disabled
            />
          <a-button type="primary" style="width: 10%;min-width:70px;" @click="send">发送</a-button>
        </a-input-group>

  </div>
</template>
<style scoped></style>
