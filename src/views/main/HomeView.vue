/**
* Home 主页
* @ author: yourName
* @ data: 2023-08-07 14:19
*/
<script setup lang="ts">
import {ref} from 'vue'
import Navigation from '../../components/Navigation.vue';
</script>
<template>
<div class="l-home">
    
    <Navigation></Navigation>
    默认首页,已经登陆状态显示home
    <br>
    <router-link to="/interface">接口详情</router-link>
    <br>
    <router-link to="/">项目详情(默认)</router-link>
    <router-view></router-view>
</div>
</template>
<style scoped>

</style>