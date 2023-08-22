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
          <!-- modal弹窗新建团队 -->
          <!-- <a-modal 
          :open="open" 
          title="添加分组" 
          okText="确定" 
          cancelText="取消" 
          @ok="handleOk"  
          @cancel="handleCancel"
          :ok-button-props="{ htmlType:'submit' }">
             <a-form
                :model="formState"
                v-bind="layout"
                name="nest-messages"
                :validate-messages="validateMessages"
                @finish="onFinish"
              >
                <a-form-item :name="['groupName']" label="分组名" :rules="[
                  { 
                    required: true,
                    message: '请输入分组名' 
                  },
                  {
                    pattern: /^[^\s]*$/,
                    message: '禁止输入空格'
                  }]">
                  <a-input v-model:value="formState.groupName" />
                </a-form-item>
                <a-form-item :name="['userName']" label="组长" :rules="[
                  { 
                    required: true,
                    message: '请输入组长名' 
                  },
                  {
                    pattern: /^[^\s]*$/,
                    message: '禁止输入空格'
                  }]">
                  <a-input v-model:value="formState.userName" />
                </a-form-item>
                <a-form-item :name="['introduction']" label="简介">
                  <a-textarea v-model:value="formState.introduction" />
                </a-form-item>
              </a-form>
          </a-modal> -->

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
          name="userName"
          label="组长名"
          :rules="[{ required: true, message: '请输入组长名' }]"
        >
          <a-input v-model:value="formState.userName" />
        </a-form-item>
        <a-form-item name="introduction" label="简介">
          <a-textarea v-model:value="formState.introduction" />
        </a-form-item>
      </a-form>
    </a-modal>


        </div>
      </a-card>
      <hr>
        <a-menu v-model:selectedKeys="selectedKeys" :items="teams" theme="dark" mode="inline">
          <!-- 分组列表 -->
        </a-menu>
      </a-layout-sider>
    </a-layout>
  </template>


  <script lang="ts" setup>
  import {
    FolderAddOutlined
  } from '@ant-design/icons-vue';
  import { ref, reactive, toRaw, onMounted } from 'vue';
  import type { FormInstance } from 'ant-design-vue';
  const collapsed = ref<boolean>(false);
  const selectedKeys = ref<string[]>(['1']);
  const teams: Array<Object> = reactive([])
  const open = ref(false);
  
  
  interface Values {
    groupName: string;
    userName: string;
    introduction: string;
  }
const formRef = ref<FormInstance>();
const visible = ref(false);
const formState = reactive<Values>({
   // 分组表单数据
  groupName: '',
  userName:'',
  introduction: '',
});

const onOk = () => {
  formRef.value
    .validateFields()
    .then(values => {
      console.log('Received values of form: ', values);
      // 添加分组
      const tableData=({
      key: '',
      label: '',
      title: ''
    })
    tableData.key=String(teams.length+1)
    tableData.label=formState.groupName
    tableData.title=formState.groupName
    teams.push(toRaw(tableData))
      console.log('formState: ', toRaw(formState));
      visible.value = false;
      formRef.value.resetFields();
      console.log('reset formState: ', toRaw(formState));
    })
    .catch(info => {
      console.log('Validate Failed:', info);
    });
};
  
//   const layout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 16 },
// };

// const validateMessages = {
//   required: '${label}不能为空！'
// };

// interface FormState {
//   groupName: string;
//   userName: string;
//   introduction: string;
// }
// const formState = reactive<FormState>({
//   // 分组表单数据
//   groupName: '',
//   userName:'',
//   introduction: '',
// });

// const onFinish = (values: any) => {
//   console.log('Success:', values);
// };

  // 新建团队按钮
  // function addItem(){
  //   open.value=true
  // }
  // // 提交新建团队信息按钮
  // function handleOk(){
  //   open.value = false
  //   const tableData=({
  //     key: '',
  //     label: '',
  //     title: ''
  //   })
  //   tableData.key=String(teams.length+1)
  //   tableData.label=formState.groupName
  //   tableData.title=formState.groupName
  //   teams.push(toRaw(tableData))
  // }
  // function handleCancel(){
  //   open.value = false
  // }

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
  