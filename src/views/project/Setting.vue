/**
* Setting
* @ author: yourName
* @ data: 2023-08-14 17:39
*/
<template>
<div class="l-setting">
    <a-form
        class="form"
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
            }
            ]">
            <a-input v-model:value="formState.groupName"  v-if="disabled"  />
            <a-input v-model:value="formState.groupName" :bordered="false" v-else  readonly="readonly" />
        </a-form-item>
        <a-form-item :name="['baseUrl']" label="默认基础路径">
          <a-input v-model:value="formState.baseUrl"  v-if="disabled" />
          <a-input v-model:value="formState.baseUrl" :bordered="false" v-else  readonly="readonly" />
        </a-form-item>
        <a-form-item :name="['introduction']" label="简介">
            <a-textarea v-model:value="formState.introduction"  v-if="disabled" />
            <a-textarea v-model:value="formState.introduction" :bordered="false" v-else  readonly="readonly" />
        </a-form-item>
        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 5 }">
            <a-button v-if="flag" @click="edit">编辑</a-button>
            <a-button type="primary" html-type="submit" v-else>保存</a-button>
            <a-button type="primary" @click="showModal" style="margin-left: 20px;">退出</a-button>
            <a-modal v-model:open="open" title="提示" @ok="handleOk" ok-text="确认" cancel-text="取消">
              确认退出分组？
            </a-modal>
            <a-button type="primary" @click="showModal2" v-if="limit" style="margin-left: 20px;">删除</a-button>
            <a-modal v-model:open="open2" title="提示" @ok="handleOk2" ok-text="确认" cancel-text="取消">
              确认删除分组？
            </a-modal>
        </a-form-item>
    </a-form>
</div>
</template>

<script setup lang="ts">
import axios from 'axios';
import {ref, reactive, onBeforeMount, watch} from 'vue'
import { message } from 'ant-design-vue';
import { projectStore } from '../../stores/useProject';
import router from '@/router';
  const  store = projectStore()
const info = () => {
  message.info('无权限修改！');
};
const info2 = () => {
  message.info('分组名重复！');
};
  const disabled=ref<boolean>(false)
const flag=ref<boolean>(true)
//    1:编辑  0：提交表单
const limit=ref<boolean>(false)
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label}不能为空！'
};

interface FormState {
  groupName: string;
  baseUrl: string;
  introduction: string;
}
const formState = reactive<FormState>({
  // 分组表单数据
  groupName: '',
  baseUrl:'',
  introduction: '',
});

function edit(){
    // 判断用户身份是否为owner，是才可以编辑，并将input设置为可操作，否则弹窗提醒
    axios.get('http://localhost:3001/project/role',{
        params:{
            uid:120,
            name:formState.groupName
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
const open = ref<boolean>(false);
const open2 = ref<boolean>(false);
const showModal = () => {
  open.value = true;
};
const showModal2 = () => {
  open2.value = true;
};
const handleOk = (e: MouseEvent) => {
  open.value = false;
  quit()
};
const handleOk2 = (e: MouseEvent) => {
  open2.value = false;
  del()
};

function quit(){
  // 退出小组
  axios.delete('http://localhost:3001/project/quit',{
    params:{
      gid:store.gid,
      uid:120
    }
  })
  .then(function (response) {
      console.log('已退出')
      
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // 总是会执行 
      }); 
        
}

function del(){
  // 删除分组
  axios.delete('http://localhost:3001/project/item',{
    params:{
      gid:store.gid,
      uid:120
    }
  })
  .then(function (response) {
      console.log('已删除分组')
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // 总是会执行
    }); 
}

const onFinish = (values: any) => {
  console.log('Success:', values);
  console.log(store.gid)
  axios.post('http://localhost:3001/project/edit',{
    gid:store.gid,
    name:formState.groupName,
    dis:formState.introduction,
    baseUrl:formState.baseUrl
  })
  .then(function (response) {
    if(response.data.msg=='用户名重复'){
      info2()
    }
    else{
      // 页面刷新问题
      console.log(response.data)
        flag.value=true
        disabled.value=false
        store.reload=false
        setTimeout(()=>{
          store.reload=true
        },10)
      }
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
    axios.get('http://localhost:3001/project/info',{
    params:{
      uid:120
    }
  })
  .then(function (response){
    console.log(response.data.data)
    var list=response.data.data
    const result = list.find((obj: { gid: number }) => obj.gid === store.gid);
    // 项目id等点击项目跳转到接口界面再传值
    formState.groupName= result.name,
    formState.baseUrl= result.baseUrls,
    formState.introduction= result.dis
    //   获取当前用户的role
    axios.get('http://localhost:3001/project/role',{
        params:{
            uid:120,
            name:formState.groupName
        }
    })
    .then(function (response){
        console.log(response.data.data)  //owner
        limit.value=true
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // 总是会执行
      });
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // 总是会执行
  });
}

watch(
  () => store.flash,
  (newValue, oldValue)=>{
    getMeg()
  }
);


onBeforeMount(()=>{
    getMeg()
})

</script>

<style scoped>
.l-setting{
    margin-top: 30px;
}
</style>