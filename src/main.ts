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



app.use(pinia)
app.use(Antd)
app.use(router)
app.mount('#app')
