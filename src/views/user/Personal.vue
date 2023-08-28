/** * Personal 个人空间 * @ author: yourName * @ data: 2023-08-13 20:57 */
<script lang="ts">
import { useAccountStore } from '@/stores/account'
export default {
  data() {
    let validatePass = (rule, value) => {
      if (value === '') {
        return Promise.reject('请输入密码')
      } else if (value.length < 6) {
        return Promise.reject('密码长度不能少于6位')
      } else {
        return Promise.resolve()
      }
    }
    let validatePass1 = (rule, value) => {
      if (value === '') {
        return Promise.reject('请输入密码')
      } else if (value.length < 6) {
        return Promise.reject('密码长度不能少于6位')
      } else {
        return Promise.resolve()
      }
    }
    let validatePass2 = (rule, value) => {
      if (value === '') {
        return Promise.reject('请输入密码')
      } else if (value.length < 6) {
        return Promise.reject('密码长度不能少于6位')
      } else {
        return Promise.resolve()
      }
    }
    return {
      showFile: [],
      loading: false,
      activeKey: '1',
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {
        userName: null,
        jobNo: null,
        name: null,
        surname: null,
        sex: null,
        headPhoto: null,
        email: null,
        phoneNumber: null
      },
      form2: {
        currentPassword: null,
        newPassword: null,
        newPasswordConfirm: null
      },
      rules2: {
        currentPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'change' }
        ],
        newPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass1, trigger: 'change' }
        ],
        newPasswordConfirm: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'change' }
        ]
      },
      rules: {
        userName: [{ required: true, message: '用户名必须填写', trigger: 'blur' }],
        email: [
          {
            type: 'email',
            required: true,
            message: '请填写正确的邮箱地址',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleOk() {
      this.loading = true
      let values = {
        ...this.form,
        extraProperties: {
          JobNo: this.form.jobNo,
          HeadPhoto: this.form.headPhoto
        }
      }
    }
  }
}
</script>
<template>
  <a-card>
    <a-tabs v-model="activeKey">
      <a-tab-pane key="1" tab="修改信息">
        <a-form
          :model="form"
          :rules="rules"
          style="height: calc(100vh - 200px); width: 60%; overflow: auto"
          ref="ruleForm"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          @finish="handleOk"
        >
          <a-form-item label="用户名" ref="userName" name="userName">
            <a-input v-model:value="form.userName" placeholder="请输入角色名称" />
          </a-form-item>
          <a-form-item label="名">
            <a-input v-model:value="form.name" />
          </a-form-item>
          <a-form-item label="姓">
            <a-input v-model:value="form.surname" />
          </a-form-item>
          <a-form-item label="性别">
            <a-radio-group v-model:value="form.sex">
              <a-radio :value="1">男</a-radio>
              <a-radio :value="2">女</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="邮箱地址" ref="email" name="email">
            <a-input v-model:value="form.email" />
          </a-form-item>
          <a-form-item label="手机号码">
            <a-input v-model:value="form.phoneNumber" />
          </a-form-item>
          <a-button type="primary" style="margin-left: 20%" html-type="submit">保存</a-button>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="修改密码">
        <a-form
          :model="form2"
          :rules="rules2"
          style="height: calc(100vh - 200px); width: 60%; overflow: auto"
          ref="ruleForm2"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-item label="当前密码" name="currentPassword">
            <a-input v-model:value="form2.currentPassword" type="password" />
          </a-form-item>
          <a-form-item label="新密码" name="newPassword">
            <a-input v-model:value="form2.newPassword" type="password" />
          </a-form-item>
          <a-form-item label="确认新密码" name="newPasswordConfirm">
            <a-input v-model:value="form2.newPasswordConfirm" type="password" />
          </a-form-item>
          <a-button type="primary" style="margin-left: 20%" html-type="submit">保存</a-button>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>
<style scoped></style>
