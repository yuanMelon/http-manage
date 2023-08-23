/** * Body * @ author: yourName * @ data: 2023-08-23 17:31 */
<template>
  <div>
    <br />
    <a-textarea v-model:value="store.editInterface.reqBodyFrom" placeholder="textarea with clear icon" allow-clear />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const value2 = ref<string>('456')
import { useInterfaceStore } from '@/stores/useInterface'
const store = useInterfaceStore()
</script>
