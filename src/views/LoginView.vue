/**
* Lgoin 登录注册页
* @ author: yourName
* @ data: 2023-08-07 14:17
*/

<script setup lang="ts">
import {ref} from 'vue'

import { RouterView ,RouterLink, useRouter} from 'vue-router'
import { useUserStore } from '@/stores/useUser';
const  store = useUserStore()
const router = useRouter()
const login = function():void{
    store.token = !store.token
    console.log(store.token)
    router.push('/')
}
</script>
<template>
<div class="">
    登陆注册页,未登陆状态显示login
    <!-- <RouterLink to="/home">Home</RouterLink>
    <router-view></router-view> -->
    <button @click="login()">点击登录</button>
</div>
</template>
<style scoped>


</style>