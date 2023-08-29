/** * Setting * @ author: yourName * @ data: 2023-08-14 17:39 */
<template>
<div class="l-setting" style="margin-top: 30px;">
    <!-- 项目名称、描述、创建时间、接口数量 -->
    <!-- <EditOutlined @click="edit()"></EditOutlined> -->
    <a-form
        class="form"
        :model="formState"
        v-bind="layout"
        name="nest-messages"
        :validate-messages="validateMessages"
        @finish="onFinish"
        >
        <a-form-item :name="['itemName']" label="项目名称" :rules="[
            { 
              required: true,
              message: '请输入项目名称' 
            }
            ]">
            <a-input v-model:value="formState.itemName" v-if="disabled" />
            <a-input v-model:value="formState.itemName" :bordered="false" v-else  readonly="readonly"/>
        </a-form-item>
        <a-form-item :name="['numOfinterface']" label="接口数量">
          <a-input v-model:value="formState.numOfinterface" :bordered="false" readonly="readonly" />
        </a-form-item>
        <a-form-item :name="['timeOfCreate']" label="创建时间">
          <a-input v-model:value="formState.timeOfCreate" :bordered="false" readonly="readonly" />
        </a-form-item>
        <a-form-item :name="['introduction']" label="默认基础路径">
            <a-input v-model:value="formState.baseUrl" v-if="disabled" />
            <a-input v-model:value="formState.baseUrl" :bordered="false" v-else readonly="readonly" />
        </a-form-item>
        <a-form-item :name="['introduction']" label="简介">
            <a-textarea v-model:value="formState.introduction" v-if="disabled" />
            <a-textarea v-model:value="formState.introduction" :bordered="false" v-else readonly="readonly" />
        </a-form-item>
        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 12 }">
            <a-button v-if="flag" @click="edit">编辑</a-button>
            <a-button type="primary" html-type="submit" v-else>保存</a-button>
        </a-form-item>
    </a-form>
</div>
</template>

<script setup lang="ts">
import {ref, reactive, onBeforeMount } from 'vue'
import axios from 'axios';
import { projectStore } from '../../stores/useProject';
const  store = projectStore()
import { message } from 'ant-design-vue';
  const info = () => {
    message.info('无权限修改！');
  };
   const disabled=ref<boolean>(false)
   const flag=ref<boolean>(true)
//    1:编辑  0：提交表单
 const oldName=ref<string>('')

   const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label}不能为空！'
};

interface FormState {
  itemName: string;
  numOfinterface: string;
  timeOfCreate:string;
  introduction: string;
  baseUrl:string
}
const formState = reactive<FormState>({
  // 分组表单数据
  itemName: '',
  numOfinterface:'',
  timeOfCreate:'',
  introduction: '',
  baseUrl:''
});

function edit(){
    // 判断用户身份是否为owner，是才可以编辑，并将input设置为可操作，否则弹窗提醒
    axios.get('http://localhost:3001/project/role',{
        params:{
            uid:store.gid,
            name:'Group A'
            // // groupname等点击分组后再传值
        }
    })
    .then(function (response) {
        console.log(response.data)
        console.log(response.data.data==='owner')
        if(response.data.data!='owner'){
            info()
        }
        else{
            flag.value=false // 改成保存按钮
            disabled.value=true
            oldName.value=formState.itemName
        }
        // 页面刷新问题
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // 总是会执行
      });
}

const onFinish = (values: any) => {
    // 修改项目信息
  console.log('Success:', values);
  console.log(oldName.value)
  axios.post('http://localhost:3001/project/listedit',{
    // id:1,
    name:oldName.value,
    gid:store.gid,
    new_name:formState.itemName,
    dis:formState.introduction,
    baseUrl:formState.baseUrl
  })
  .then(function (response) {
        console.log(response.data)
        flag.value=true
        disabled.value=false
        // 页面刷新问题
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // 总是会执行
      });
};

function getMeg(){
    // 获取项目概览
    axios.get('http://localhost:3001/project/list',{
    params:{
      gid:store.gid
    }
  })
  .then(function (response){
    console.log(response.data.data)
    var list=response.data.data
    const result = list.find((obj: { id: number }) => obj.id === store.itemID);
    // 项目id等点击项目跳转到接口界面再传值
    formState.itemName= result.name,
    formState.numOfinterface= result.numInter,
    formState.timeOfCreate= result.updatedAt,
    formState.introduction= result.dis
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // 总是会执行
  });
}

onBeforeMount(()=>{
    getMeg()
})

</script>

<style scoped>

</style>