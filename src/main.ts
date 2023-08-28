import './assets/main.css'

import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
// import {Button} from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import pinia from "./stores/store.ts"
import './router/permissions.ts'
const app = createApp(App)

//导入编辑器
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
// highlightjs
import hljs from 'highlight.js';
VMdEditor.use(githubTheme, {
  Hljs: hljs,
});
app.use(VMdEditor);

//json编辑器
import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
// @ts-ignore
// vite/webpack搭建参考 https://github.com/microsoft/monaco-editor/blob/main/docs/integrate-esm.md
globalThis.MonacoEnvironment = {
  getWorker(_: any, label: string) {
      if (label === 'json') {
          return new JsonWorker();
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
          return new CssWorker();
      }
      if (label === 'html' || label === 'handlebars' || label === 'razor') {
          return new HtmlWorker();
      }
      if (label === 'typescript' || label === 'javascript') {
          return new TsWorker();
      }

      return new EditorWorker();
  },
};

monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);




app.use(pinia)
app.use(Antd)
app.use(router)
app.mount('#app')
