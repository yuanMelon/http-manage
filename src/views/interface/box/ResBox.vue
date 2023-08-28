<template>
  <div>
    <div>
      <a-radio-group v-model:value="value1" button-style="solid">
        <a-radio-button value="/json">JSON</a-radio-button>
        <a-radio-button value="/raw">Raw</a-radio-button>
      </a-radio-group>
    </div>
    <div class="">
      <div class="req-tab" v-show="value1 === '/json'">
        <JsonEditor :editValue="store.editInterface.res_body"></JsonEditor>
      </div>
      <div class="req-tab" v-show="value1 === '/raw'">
        <a-textarea
        style="width:60vw;height:30vh;"
          v-model:value="store.editInterface.res_body"
          placeholder="textarea with clear icon"
          allow-clear
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import JsonEditor from '@/components/interface/JsonEditor.vue'
import { useInterfaceStore } from '@/stores/useInterface'
const store = useInterfaceStore()

const value1 = ref<string>('/json')
interface DataItem {
  key: number
  name: string
  type: string
  required: boolean
  description: string
  example: string
  children?: DataItem[]
}



const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys: (string | number)[], selectedRows: DataItem[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected: boolean, selectedRows: DataItem[], changeRows: DataItem[]) => {
    console.log(selected, selectedRows, changeRows)
  }
})
</script>
