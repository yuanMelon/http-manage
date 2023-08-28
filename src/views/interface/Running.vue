/** * Running * @ author: yourName * @ data: 2023-08-10 15:42 */
<script setup lang="ts">
import TitleInfo from '@/components/TitleInfo.vue'
import { ref, onMounted, onUnmounted, reactive } from 'vue';
import { useInterfaceStore } from '@/stores/useInterface'
const store = useInterfaceStore()
let environment = ref('localhost:000')
import Header from '@/components/interface/Headers.vue'
import Query from '@/components/interface/Query.vue'
import { throttle } from 'lodash-es'
import * as monaco from 'monaco-editor'
import axios from 'axios'
import JsonEditor from '@/components/interface/JsonEditor.vue';



let result = reactive({})
let res2 = ref('')
const send = async function () {
 await axios.get('/api/interface/exportjson?pid=1')
 .then(res=>{
  result=res;
  res2.value =JSON.stringify(res.data) 
})
 console.log(JSON.stringify(res2.value))
}

const jsonEditorRef = ref<HTMLDivElement>()

let jsonEditor: monaco.editor.IStandaloneCodeEditor | null = null

// 实现 monaco 自适应
const resizeObserver = new globalThis.ResizeObserver(
  throttle((): void => {
      jsonEditor?.layout()
  }, 300)
)

const setEditorValue = (v: string | any) => {
  const jsonValue = JSON.parse(JSON.stringify(v))

  // json格式化
  return JSON.stringify(jsonValue, null, 2)
}

const defaultValue = {
  name: 'lucy',
  age: 18,
}

const init = async () => {
  if (!jsonEditorRef.value) return

  let options = {
      value: setEditorValue(defaultValue),
      language: 'json',
      theme: 'vs-dark',
      tabSize: 2, // tab 缩进长度
      minimap: {
          enabled: false, // 不要小地图
      },
  }

  jsonEditor = monaco.editor.create(jsonEditorRef.value, options)

  resizeObserver.observe(jsonEditorRef.value)
}

onMounted(async () => {
  init()
})

onUnmounted(() => {
  resizeObserver.disconnect()
})
</script>
<template>
  <div class="l-running">
    <a-input-group compact style="width: 100%">
      <a-select v-model:value="store.sendInterface.method" style="width: 10%; min-width: 80px" disabled>
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
        style="width: 30%; text-align: left; min-width: 120px"
      />

      <a-input
        v-model:value="store.sendInterface.path"
        class="site-input-right"
        style="width: 50%; text-align: left"
        disabled
      />
      <a-button type="primary" style="width: 10%; min-width: 70px" @click="send">发送</a-button>
    </a-input-group>
    <br />
    <!-- <TitleInfo>headers</TitleInfo> -->
    <!-- <Header></Header> -->
    <!-- <TitleInfo>query</TitleInfo> -->
    <!-- <Query></Query> -->
    <TitleInfo>Response</TitleInfo>
    <div ref="jsonEditorRef" class="monaco-editor-content"></div>
    <JsonEditor :editValue="res2"></JsonEditor>
    {{ res2 }}
    <!-- <div class="req_info">
      <VAceEditor v-model:value="content" lang="json" theme="github" style="height: 300px" />
    </div> -->
  </div>
</template>
<style scoped></style>
