/** * Edit * @ author: yourName * @ data: 2023-08-10 15:43 */
<script setup lang="ts">
import TitleInfo from '@/components/TitleInfo.vue'
import type { FormInstance } from 'ant-design-vue'
import {  ref, onBeforeUpdate, onMounted } from 'vue'
import QueryBox from './box/QueryBox.vue'
import { useRoute } from 'vue-router' //1.先在需要跳转的页面引入useRouter
const { query, params } = useRoute() //2.在跳转页面定义router变量，解构得到指定的query和params传参的参数
import { useInterfaceStore } from '@/stores/useInterface'
const store = useInterfaceStore()
//数据
//接口状态
const interfaceStatus = [
  { label: '已完成', value: 'done' },
  { label: '未完成', value: 'undone' }
]
const saveEdit = function (): void {
  store.saveEditInterface(params.title)
}

const formRef = ref<FormInstance>()

onMounted(() => {
  //导入pinia数据
  if (params) {
    store.changeEditInterface(params.title)
  } else {

  }
})

</script>
<template>
  <div class="l-edit">
    <!-- <button @click="click">测试数据</button> -->
    <TitleInfo>基本设置</TitleInfo>
    <span> {{ $route.params.title }} </span>
    <span>{{
      store.editInterface.title + store.editInterface.status + store.editInterface.method
    }}</span>
    <a-form
      ref="formRef"
      name="dynamic_form_nest_item"
      :model="store.editInterface"
      class="interface-from interface-info"
    >
      <a-form-item
        name="title"
        label="接口名称"
        :rules="[{ required: true, message: '请设置接口名称' }]"
      >
        <a-input v-model:value="store.editInterface.title" />
      </a-form-item>
      <!-- <a-form-item
        name="files"
        label="选择分类"
        :rules="[{ required: true, message: '未设置分类!' }]"
      >
        <a-select v-model:value="dynamicValidateForm.area" :options="areas" />
      </a-form-item> -->
      <a-form-item
        style="width: 100%; display: flex"
        name="method"
        label="接口路径"
        :rules="[{ required: true, message: '未设置!' }]"
      >
        <!-- <div class="site-input-group-wrapper"> -->
        <a-input-group compact style="width: 100%">
          <a-select v-model:value="store.editInterface.method" style="width: 10%; min-width: 80px">
            <a-select-option value="get">GET</a-select-option>
            <a-select-option value="post">POST</a-select-option>
            <a-select-option value="put">PUT</a-select-option>
            <a-select-option value="delete">DELETE</a-select-option>
            <a-select-option value="options">OPTIONS</a-select-option>
            <a-select-option value="head">HEAD</a-select-option>
          </a-select>
          <a-input
            class="site-input-split"
            style="width: 10%; border-left: 0; pointer-events: none"
            placeholder=""
            disabled
          />
          <a-form-item
            name="path"
            :rules="[{ required: true, message: '未设置!' }]"
            style="width: 80%; text-align: left"
          >
            <a-input v-model:value="store.editInterface.path" class="site-input-right" />
          </a-form-item>
        </a-input-group>
        <!-- </div> -->
      </a-form-item>
      <a-form-item name="status" label="接口状态" :rules="[{ required: true, message: '未设置!' }]">
        <a-select v-model:value="store.editInterface.status" :options="interfaceStatus" />
      </a-form-item>
    </a-form>
    <TitleInfo>请求参数设置</TitleInfo>
    <div class="interface-from">
      <QueryBox></QueryBox>
    </div>
    <TitleInfo>返回数据设置</TitleInfo>

    <!-- 编辑备注 -->
    <TitleInfo>备注</TitleInfo>
    <div class="interface-from">
      <v-md-editor v-model="store.editInterface.desc" height="400px"></v-md-editor>
      <div class="space"></div>
    </div>

    <div class="bottom-button">
      <a-button type="primary" @click="saveEdit">保存</a-button>
    </div>
  </div>
</template>
<style scoped>
.space {
  width: 100%;
  height: 100px;
}
.bottom-button {
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  bottom: 0;
  background-color: var(--background-color);
  padding: 20px 0;
}
.interface-from {
  margin: 20px;
}
.interface-info {
  background-color: var(--background-color);
  padding: 20px;
}

.site-input-group-wrapper .site-input-split {
  background-color: #e9e8e8;
}

.site-input-group-wrapper .site-input-right {
  border-left-width: 0;
}

.site-input-group-wrapper .site-input-right:hover,
.site-input-group-wrapper .site-input-right:focus {
  border-left-width: 1px;
}

.site-input-group-wrapper .ant-input-rtl.site-input-right {
  border-right-width: 0;
}

.site-input-group-wrapper .ant-input-rtl.site-input-right:hover,
.site-input-group-wrapper .ant-input-rtl.site-input-right:focus {
  border-right-width: 1px;
}
[data-theme='dark'] .site-input-group-wrapper .site-input-split {
  background-color: transparent;
}
</style>

<!-- 很奇怪,为什么写不进去? -->
<!-- 不就是拼写5条数据么,数据已经写好了,接下来明明填进去就完成了 -->
<!-- 差的是填写表格? -->
