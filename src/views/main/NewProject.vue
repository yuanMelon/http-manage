/** * ProjectView 项目页 * @ author: yourName * @ data: 2023-08-07 14:56 */
<template>
  <div class="l-project">
    <a-layout style="min-height: 100vh">
        <a-menu v-model:selectedKeys="current" mode="horizontal"  style="margin: 42px 26px 0 26px">
          <a-menu-item key="/itemlist">
            <router-link to="/itemlist">项目列表</router-link>
          </a-menu-item>
          <a-menu-item key="/home/setting">
            <router-link to="/home/setting">分组设置</router-link>
          </a-menu-item>
        </a-menu>
        
        <a-layout-content style="margin: 0px 26px">
            <router-view></router-view>
        </a-layout-content>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue'
const current = ref<string[]>(['/home/itemlist']);
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

</script>

<style scoped>
</style>

