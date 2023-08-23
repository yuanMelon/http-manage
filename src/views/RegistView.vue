<script setup lang="ts">
import { reactive, ref, toRaw, computed } from 'vue'
import { RouterView, RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '../stores/useUser'
import type { Rule } from 'ant-design-vue/es/form'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
const store = useUserStore()
const router = useRouter()
const formRef2 = ref()
interface registerForm {
  username: string
  password: string
  confirmPassword: string
}
const registerForm = reactive<registerForm>({
  username: '',
  password: '',
  confirmPassword: ''
})
const onFinish = (values: any) => {
  console.log('Success:', values)
}
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
// 规则
const rules2: Record<string, Rule[]> = {
  username: [{ required: true, message: '清输入账号', trigger: 'change' }],
  password: [{ required: true, message: '请输入密码', trigger: 'change' }],
  confirmPassword: [{ required: true, message: '请确认密码', trigger: 'change' }]
}
//点击注册
const Regist = async () => {
  formRef2.value
    .validate()
    .then(() => {
      // 表单验证通过
      if (registerForm.password !== registerForm.confirmPassword) {
        console.log('密码不一致')
        return
      }
      // 调用注册接口
      // 注册逻辑...
      console.log('用户名:', registerForm.username)
      console.log('密码:', registerForm.password)
      console.log('确认密码:', registerForm.confirmPassword)
      console.log('注册成功')
      // 注册成功后跳转到其他页面
      store.token = !store.token
      console.log(store.token)
      router.push('/login')
    })
    .catch((error) => {
      console.log('error', error)
    })
}
</script>

<template>
  <div id="registView">
    <a-form
      :model="registerForm"
      name="regist"
      class="regist-form"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 12 }"
      autocomplete="off"
      ref="formRef2"
      :rules="rules2"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="用户名"
        name="username"
        :rules="[{ required: true, message: '请输入你的用户名！' }]"
      >
        <a-input v-model:value="registerForm.username" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: '请输入密码！' }]"
      >
        <a-input-password v-model:value="registerForm.password" />
      </a-form-item>

      <a-form-item
        label="确认密码"
        name="confirmPassword"
        :rules="[{ required: true, message: '请再次输入密码！' }]"
      >
        <a-input-password v-model:value="registerForm.confirmPassword" />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          @click.prevent="Regist"
          class="regist-form-button"
          >注册</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>
//css
<style scoped>
#registView {
  display: flex center;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
#registView h1 {
  color: white;
}
.regist-form {
  max-width: 400px;
  width: 200%;
  padding: 50px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.regist-form-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 24px;
}
.regist-form-button {
  width: 100%;
  display: flex;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  margin-top: 10px;
}
</style>
