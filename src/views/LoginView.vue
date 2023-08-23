/** * Lgoin 登录注册页 * @ author: yourName * @ data: 2023-08-07 14:17 */
<script setup lang="ts">
import { reactive, ref, toRaw, computed } from 'vue'
import { RouterView, RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '../stores/useUser'
import type { Rule } from 'ant-design-vue/es/form'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
const store = useUserStore()
const router = useRouter()
const formRef = ref()
const formRef2 = ref()
interface loginForm {
  username: string
  password: string
  remember: boolean
}
const loginForm = reactive<loginForm>({
  username: '1',
  password: '2',
  remember: true
})
const onFinish = (values: any) => {
  console.log('Success:', values)
}
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
// const disabled = computed(() => {
//   return !(loginForm.username && loginForm.password)
// })
// 规则
const rules: Record<string, Rule[]> = {
  username: [{ required: true, message: '清输入账号', trigger: 'change' }],
  password: [{ required: true, message: '请输入密码', trigger: 'change' }]
}
//点击注册
const onRegist = async () => {
  router.push('/regist')
}

// 点击登录
const onLogin = async () => {
  formRef.value
    .validate()
    .then(() => {
      // if (
      //   loginForm.username === localStorage.username &&
      //   loginForm.password === localStorage.password
      // ) {
      //   router.push('/Home')
      // } else if (loginForm.username === '') {
      //   alert('用户名不为空')
      // } else if (loginForm.password === '') {
      //   alert('密码不为空')
      // } else {
      //   alert('账号不存在，请注册后登录')
      // }
      // 调用后台登录接口

      // 成功后跳转页面
      store.token = !store.token
      console.log(store.token)
      router.push('/')
    })
    .catch((error) => {
      console.log('error', error)
    })
}
</script>

<template>
  <div id="loginView">
    <a-form
      :model="loginForm"
      name="login"
      class="login-form"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 12 }"
      autocomplete="off"
      ref="formRef"
      :rules="rules"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="用户名"
        name="username"
        :rules="[{ required: true, message: '请输入你的用户名！' }]"
      >
        <a-input v-model:value="loginForm.username">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: '请输入你的密码！' }]"
      >
        <a-input-password v-model:value="loginForm.password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="loginForm.remember">记住密码</a-checkbox>
        <a class="login-form-forgot" href="">忘记密码</a>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button" @click="onLogin">
          Log in
        </a-button>
        Or
        <a-button type="text" @click="onRegist" style="margin-left: 10px">现在注册!</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
#loginView {
  display: flex center;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
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

.login-form-title {
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
  transform: translate(-50%, -50%);
  margin-top: 10px;
}
</style>
