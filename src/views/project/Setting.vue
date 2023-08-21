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
            },
            {
            pattern: /^[^\s]*$/,
            message: '禁止输入空格'
            }]">
            <a-input v-model:value="formState.groupName" />
        </a-form-item>
        <a-form-item :name="['introduction']" label="简介">
            <a-textarea v-model:value="formState.introduction" />
        </a-form-item>
        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 12 }">
            <a-button type="primary" html-type="submit">保存</a-button>
        </a-form-item>
        </a-form>
</div>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue'
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label}不能为空！'
};

interface FormState {
  groupName: string;
  userName: string;
  introduction: string;
}
const formState = reactive<FormState>({
  // 分组表单数据
  groupName: '',
  userName:'',
  introduction: '',
});

const onFinish = (values: any) => {
  console.log('Success:', values);
};

</script>

<style scoped>
.l-setting{
    margin-top: 30px;
}
</style>