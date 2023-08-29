<template>
  <div class="l-project">
    <a-layout style="min-height: 100vh">
        <a-menu v-model:selectedKeys="current" mode="horizontal"  style="margin: 42px 26px 0 26px">
          <a-menu-item key="/home/itemlist">
            <router-link to="/home/itemlist">项目列表</router-link>
          </a-menu-item>
          <a-menu-item key="/home/setting">
            <router-link to="/home/setting">分组设置</router-link>
          </a-menu-item>
          <a-menu-item key="/home/members">
            <router-link to="/home/members">成员管理</router-link>
          </a-menu-item>
          <a-menu-item key="/home/itemmsg">
            <router-link to="/home/itemmsg">项目概览</router-link>
          </a-menu-item>
          <!-- <a-menu-item key="/home/itemmsg">
            <router-link to="/home/itemmsg">数据导入</router-link>
          </a-menu-item> -->
        </a-menu>
        
        <a-layout-content style="margin: 0px 26px">
            <router-view></router-view>
        </a-layout-content>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { projectStore } from '../../stores/useProject';
const  store = projectStore()
const current = ref<string[]>(['/home/itemlist']);
// import { useRouter } from 'vue-router'

// const router = useRouter()

</script>

<style scoped>
</style>