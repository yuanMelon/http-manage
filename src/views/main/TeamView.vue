<template>
    <a-layout style="min-height: 100vh">
      <a-layout-sider v-model:collapsed="collapsed">
        <a-card 
      :bordered="false" 
      style="background-color: #001529;" 
      :body-style="{ padding: '16px'}">
        <div class="teamCard">
          <span style="font-size: 20px;">我的团队</span>
          <a-button :ghost="true" style="border: none;" size="large" @click="visible = true">
            <template #icon><FolderAddOutlined style="font-size: large; margin-top: 5px;"/></template>  
            <!-- 图标作为button -->
          </a-button>

          <a-modal
            v-model:open="visible"
            title="新建分组"
            ok-text="确定"
            cancel-text="取消"
            @ok="onOk"
          >
          <a-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal">
            <a-form-item
              name="groupName"
              label="分组名"
              :rules="[{ required: true, message: '请输入分组名' }]"
            >
              <a-input v-model:value="formState.groupName" />
            </a-form-item>
            <a-form-item
              name="baseUrl"
              label="默认基础路径"
            >
              <a-input v-model:value="formState.baseUrl" />
            </a-form-item>
            <a-form-item name="introduction" label="简介">
              <a-textarea v-model:value="formState.introduction" />
            </a-form-item>
          </a-form>
          </a-modal>
        </div>
      </a-card>
      <hr>
        <a-menu 
        v-model:selectedKeys="selectedKeys" 
        :items="teams" 
        theme="dark" 
        mode="inline" 
        @click="handleClick">
          <!-- 分组列表 -->
        </a-menu>
      </a-layout-sider>
    </a-layout>
  </template>


  <script lang="ts" setup>
  import {
    FolderAddOutlined
  } from '@ant-design/icons-vue';
  import { ref, reactive, toRaw, provide, onBeforeMount, watch } from 'vue';
  import type { FormInstance, MenuProps } from 'ant-design-vue';
  import axios from 'axios';
  import { projectStore } from '../../stores/useProject';
  const  store = projectStore()
  // 实例化 store
  import { message } from 'ant-design-vue';
  const info = () => {
    message.info('分组已存在！');
  };
  

  const collapsed = ref<boolean>(false)
  const selectedKeys = ref<string[]>([]);
  const teams: Array<Object> = reactive([])
  
  
  interface Values {
    groupName: string;
    baseUrl: string;
    introduction: string;
  }
const formRef = ref<FormInstance>();
const visible = ref(false);
const formState = reactive<Values>({
   // 分组表单数据
  groupName: '',
  baseUrl:'',
  introduction: '',
});

const handleClick: MenuProps['onClick'] = menuInfo => {
  console.log('click ', menuInfo.key);
  // 获取当前选中的gruopid
  store.gid=Number(menuInfo.key)
  store.flash=false
  setTimeout(()=>{
    store.flash=true
  },10)
};

const onOk = () => {
  formRef.value
    .validateFields()
    .then(values => {
      // 添加分组
      axios.post('http://localhost:3001/project/create',{
        name:formState.groupName,
        uid:120,
        dis:formState.introduction
      })
      .then(function (response) {
        // console.log(response.data.msg==='用户名重复')
        if(response.data.msg=='用户名重复'){
          info()
          // 弹窗提醒
				}
        else{
          getListData2()
          console.log('已新增分组')
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // 总是会执行
      });  
      console.log('formState: ', toRaw(formState));
      visible.value = false;
      formRef.value.resetFields();
      console.log('reset formState: ', toRaw(formState));
    })
    .catch(info => {
      console.log('Validate Failed:', info);
    });
};

  function getListData(){
    console.log('getListData被调用')
    axios.get('http://localhost:3001/project/info', {
    params: {
      uid:120
    }
  })
  .then(function (response) {
    // 重新获取分组列表数据
    // console.log(response.data)
    // teams.values=toRaw(response.data.data)
    teams.length=0
    if(response.data.data.length==0){
      console.log('无分组数据')
    }
    else{
      var list=response.data.data
      console.log(list[0].gid+'list0')
      store.gid=list[0].gid
      selectedKeys.value[0]=String(list[0].gid)
      list.forEach((item:any)=>{
        // console.log(item)
        // 逐个分组push到form里
        const tableData=({
          key: '',
          label: '',
          title: ''
        })
        tableData.key=String(item.gid)
        tableData.label=item.name
        tableData.title=item.name
        teams.push(toRaw(tableData))
      })
    }
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // 总是会执行
  });  
  }

  function getListData2(){
    console.log('getListData被调用')
    axios.get('http://localhost:3001/project/info', {
    params: {
      uid:120
    }
  })
  .then(function (response) {
    // 重新获取分组列表数据
    // console.log(response.data)
    // teams.values=toRaw(response.data.data)
    teams.length=0
    if(response.data.data.length==0){
      console.log('无分组数据')
    }
    else{
      var list=response.data.data
      selectedKeys.value[0]=String(store.gid)
      list.forEach((item:any)=>{
        // console.log(item)
        // 逐个分组push到form里
        const tableData=({
          key: '',
          label: '',
          title: ''
        })
        tableData.key=String(item.gid)
        tableData.label=item.name
        tableData.title=item.name
        teams.push(toRaw(tableData))
      })
    }
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // 总是会执行
  });  
  }

  watch(
    () => store.reload,
    (newValue, oldValue)=>{
      getListData2()
    }
  );

  onBeforeMount(()=>{
    getListData()
  })

  </script>

  <style scoped>
  #components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
  
  .site-layout .site-layout-background {
    background: #fff;
  }
  [data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
  }
  /*  */
  .teamCard{
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
}
.ant-menu{
  margin-top: 30px;
}
  </style>
  