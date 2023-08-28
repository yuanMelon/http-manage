/** * Body * @ author: yourName * @ data: 2023-08-23 17:31 */
<template>
  <div>
    <a-textarea v-model:value="store.editInterface.describes" placeholder="textarea with clear icon" allow-clear />
  </div>
</template>
<script lang="ts" setup>
import { ref ,onUpdated} from 'vue'
const value2 = ref<string>('456')
import { useInterfaceStore } from '@/stores/useInterface'
const store = useInterfaceStore()
// onUpdated(() => {
//   console.log('更新了吗?')
//   console.log(store.editInterface.reqBodyFrom)
// }),
// store.$subscribe((mutations)=>{
//   console.log(mutations)
// })
</script>
