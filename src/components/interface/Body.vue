/** * Query * @ author: yourName * @ data: 2023-08-19 13:43 */
<script setup lang="ts">
import { ref } from 'vue'
import {toRefs,computed, reactive} from 'vue'

import type { UnwrapRef } from 'vue'
// import { useInterfaceStore } from '@/stores/useInterface'
// const store = useInterfaceStore()
interface FormState {
  layout: 'horizontal' | 'vertical' | 'inline'
  fieldA: string
  fieldB: string
}
const formState: UnwrapRef<FormState> = reactive({
  layout: 'inline',
  fieldA: '',
  fieldB: ''
})
const formItemLayout = computed(() => {
  const { layout } = formState
  return layout === 'horizontal'
    ? {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    : {}
})
const buttonItemLayout = computed(() => {
  const { layout } = formState
  return layout === 'horizontal'
    ? {
        wrapperCol: { span: 14, offset: 4 }
      }
    : {}
})
//参数
interface Query {
  value: string
  required: number
}
import type { InterfaceReqQuery } from '../../data/interface'
let query = ref({
  desc: 'string',
  example: 'string',
  name: 'string',
  required: 'string'
})
const emit = defineEmits(['query','child-click'])
//提交组件数据
const saveQueryRow = () => {
    // const numRef = toRefs(query.value)
    console.log('dsfg')
    const newObj = JSON.parse(JSON.stringify(query.value))
    emit('child-click',newObj)
}
</script>
<template>
  <div class="">
    <!-- 表单由两个部分组成, -->
    <a-form :layout="formState.layout" :model="formState">
      <a-form-item label="">
        <a-input v-model:value="query.name" placeholder="参数名称" />
      </a-form-item>
      <a-form-item label="">
        <a-select v-model:value="query.required" style="width: 10%; min-width: 80px">
          <a-select-option value="1">必须</a-select-option>
          <a-select-option value="0">非必须</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="">
        <a-input v-model:value="query.example" placeholder="参数示例" />
      </a-form-item>
      <a-form-item label="">
        <a-input v-model:value="query.desc" placeholder="备注" />
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary" @click="saveQueryRow">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<style scoped></style>
