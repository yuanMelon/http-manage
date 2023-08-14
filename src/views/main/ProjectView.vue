/** * ProjectView 项目页 * @ author: yourName * @ data: 2023-08-07 14:56 */
<script setup lang="ts">
import { ref } from 'vue'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue'
const selectedKeys1 = ref<string[]>(['2'])
const selectedKeys2 = ref<string[]>(['1'])
const openKeys = ref<string[]>(['sub1'])
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const myclick = function myclick(): void {
  router.push('/interfacelist')
}
</script>
<template>
  <div class="l-project">
    <a-layout>
      <a-layout-header class="header">
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys1" theme="dark" mode="horizontal">
          <a-menu-item key="1">nav 1 </a-menu-item>
          <a-menu-item key="2">nav 2 <router-link to="/setting"></router-link></a-menu-item>
          <a-menu-item key="3">nav 3</a-menu-item>
        </a-menu>
      </a-layout-header>
      <!-- <router-view ></router-view> -->
      <a-layout >
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
            v-model:selectedKeys="selectedKeys2"
            v-model:openKeys="openKeys"
            mode="inline"
            :style="{ height: '100%', borderRight: 0 }"
          >
            <a-sub-menu key="sub1" @titleClick="myclick">
              <template #title>
                <span>
                  <!-- <user-outlined /> -->
                  接口列表
                  <!-- <router-link to="/interfacelist">接口列表</router-link> -->
                </span>
              </template>

              <a-menu-item key="1" @click="router.push('/interface')">项目详情 </a-menu-item>
              <a-menu-item key="2" @click="router.push('/')">option2 </a-menu-item>
              <a-menu-item key="3">option3</a-menu-item>
              <a-menu-item key="4">option4</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <template #title>
                <span>
                  <laptop-outlined />
                  subnav 2
                </span>
              </template>
              <a-menu-item key="5">option5</a-menu-item>
              <a-menu-item key="6">option6</a-menu-item>
              <a-menu-item key="7">option7</a-menu-item>
              <a-menu-item key="8">option8</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
              <template #title>
                <span>
                  <notification-outlined />
                  subnav 3
                </span>
              </template>
              <a-menu-item key="9">option9</a-menu-item>
              <a-menu-item key="10">option10</a-menu-item>
              <a-menu-item key="11">option11</a-menu-item>
              <a-menu-item key="12">option12</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout style="padding: 0 24px 24px">
          <a-layout-content :style="{ background: '#fff', margin: 0, minHeight: '280px' }">   
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>
<style scoped></style>

