/** * InterfaceList * @ author: wei * @ data: 2023-08-10 15:54 */
<template>
  <div class="l-list">
    <a-button type="primary" @click="visible = true">添加接口</a-button>
    <!-- 弹窗 -->
    <a-modal
      v-model:open="visible"
      title="创建新接口"
      ok-text="创建接口"
      cancel-text="取消"
      @ok="onOk"
    >
      <a-form ref="formRef" :model="createForm" layout="vertical" name="form_in_modal">
        <a-form-item
          name="project"
          label="接口分类"
          :rules="[{ required: true, message: '请输入接口的分类!' }]"
        >
          <a-input v-model:value="createForm.project" />
        </a-form-item>
        <!-- 名称 -->
        <a-form-item
          name="name"
          label="接口名称"
          :rules="[{ required: true, message: '请输入接口的名称!' }]"
        >
          <a-input v-model:value="createForm.name" />
        </a-form-item>
        <!-- 路径 -->
        <a-form-item
          name="path"
          label="接口路径"
          :rules="[{ required: true, message: '请输入接口的路径!' }]"
        >
          <div class="site-input-group-wrapper">
            <a-input-group compact style="width: 100%; display: flex">
              <a-select v-model:value="createForm.method" style="width: 20%; min-width: 80px">
                <a-select-option value="get">GET</a-select-option>
                <a-select-option value="post">POST</a-select-option>
                <a-select-option value="put">PUT</a-select-option>
                <a-select-option value="delete">DELETE</a-select-option>
                <a-select-option value="options">OPTIONS</a-select-option>
                <a-select-option value="head">HEAD</a-select-option>
              </a-select>

              <a-from-item
                style="width: 80%; text-align: left"
                name="path"
                :rules="[{ required: true, message: '未设置!' }]"
              >
                <a-input
                  v-model:value="createForm.path"
                  class="site-input-right"
                  placeholder="路径"
                />
              </a-from-item>
            </a-input-group>
          </div>
        </a-form-item>
        <div class="tip">注:详细的接口数据可以在编辑页面中添加</div>
      </a-form>
    </a-modal>
    <a-table :columns="columns" :data-source="arr">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'title'">
        <a @click="toPreview(text)">{{ text }}</a>
      </template>
    </template>
  </a-table>
  </div>
</template>
<script lang="ts" setup>
import type { Interface } from '../../data/interface'

import { initialInterface } from '../../data/interface'
import {  onMounted } from 'vue';
import type { FormInstance } from 'ant-design-vue'
const columns = [
  {
    name: '接口名称',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '接口路径',
    dataIndex: 'path',
    key: 'path'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  }
]
//使用仓库
import { useInterfaceStore } from '../../stores/useInterface'
const store = useInterfaceStore()
import { ref } from 'vue'
// import { map } from 'leaflet';
import router from '../../router/index';
//显示弹窗
const visible = ref(false)
//创建接口的数据接口
interface CreateForm {
  name: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD'
  project: string
  path: string
}
let createForm = ref<CreateForm>({
  name: '',
  method: 'GET',
  project: '',
  path: ''
})
function createInterface() {
      //创建新的接口
      // let newInterface: Interface = Object.create(initialInterface)

      //暂时不知道project怎么处理
      // newInterface.desc = values.method
      let newInterface: Interface = JSON.parse(JSON.stringify(initialInterface))
      //@ts-ignore
      newInterface.method = String(createForm.value.method).toUpperCase()
      newInterface.path = createForm.value.path
      newInterface.title = createForm.value.name
      
      const now = new Date()
      const timestamp = now.getTime()
      //创建时间
      newInterface.cTime = String(timestamp)
      //更新时间
      newInterface.uTime = String(timestamp)
      //用户id
      //输入的参数:对字符串进行解析
      //上传到pinia
      store.map.set(newInterface.title,newInterface)
      arr = []
      getProjectList()
}
const formRef = ref<FormInstance>()
const onOk = () => {
  formRef.value
    .validateFields()
    .then((values) => {
      console.log('Received values of form: ', values)
      //创建接口
      createInterface()
      //重新设置字段
      visible.value = false
      formRef.value.resetFields()
      //增加method的
      createForm.value.method = 'GET'
    })
    .catch((info) => {
      console.log('Validate Failed:', info)
    })
}
//获取列表数据
let arr = [];
const getProjectList = ()=>{
  for(let item of store.map.values()){
    const obj:any = new Object()
    obj.title = item.title
    obj.path = item.path
    obj.status = item.status

    arr.push(obj)
}
}


//前往预览页面
const  toPreview = (v:string)=>{
  router.push('/interface/'+v)
}

onMounted(()=>{
  getProjectList()
})
// const arr = store.map.keys()

</script>

<style scoped>
.tip {
  display: block;
  margin: 20px 0 0 0;
  text-align: center;
  font-weight: lighter;
  font-size: 14px;
}
.l-list {
  margin: 20px;
  /* padding: 20px; */
}
</style>
