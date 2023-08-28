<template>
  <div class="">
    <!-- <a-select></a-select> -->
    <div ref="jsonEditorRef" class="monaco-editor-content"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, reactive } from 'vue'
import { throttle } from 'lodash-es'
import * as monaco from 'monaco-editor'
import { useInterfaceStore } from '@/stores/useInterface'
const store = useInterfaceStore()
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

let defaultValue = {
  name: 'lucy',
  age: 18
}
const props = defineProps(['editValue'])
let editValue = ref('')
const init = async () => {
  if (!jsonEditorRef.value) return
  editValue.value = setEditorValue(props.editValue)
  let options = {
    value: editValue.value,
    language: 'json',
    theme: 'vs-dark',
    tabSize: 2, // tab 缩进长度
    minimap: {
      enabled: false // 不要小地图
    }
  }

  jsonEditor = monaco.editor.create(jsonEditorRef.value, options)

  resizeObserver.observe(jsonEditorRef.value)
}
store.$subscribe((mutations) => {
  // @ts-ignore
  if (mutations.events.target) {
    // @ts-ignore
    jsonEditor?.setValue(setEditorValue(mutations.events.target.resBody))
    // editValue.value = setEditorValue(mutations.events.target.resBody)
    // console.log(editValue.value)
  }
  // console.log(mutations.events.target.resBody)
})
onMounted(async () => {
  init()
  //   defaultValue = Object.assign(defaultValue,setEditorValue(store.editInterface.resBody))
})

onUnmounted(() => {
  resizeObserver.disconnect()
})
</script>
<style lang="less">
.monaco-editor-content {
  width: 80vw;
  height: 30vh;
}
</style>
