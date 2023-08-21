/**
* ProjectView 项目页
* @ author: yourName
* @ data: 2023-08-07 14:56
*/
<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <!-- card -->
      <a-card 
      :bordered="false" 
      style="background-color: #001529;" 
      :body-style="{ padding: '20px'}">
        <div class="teamCard">
          <span>我的团队</span>
          <a-button :ghost="true" style="border: none; font-size: large;">
            <template #icon><FolderAddOutlined/></template>  
            <!-- 图标作为button -->
          </a-button>
        </div>
        <!-- <hr> -->
      </a-card>
      <hr>
      <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline" class="a-menu">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <desktop-outlined />
          <span>Option 2</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>User</span>
            </span>
          </template>
          <a-menu-item key="3">Tom</a-menu-item>
          <a-menu-item key="4">Bill</a-menu-item>
          <a-menu-item key="5">Alex</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <team-outlined />
              <span>Team</span>
            </span>
          </template>
          <a-menu-item key="6">Team 1</a-menu-item>
          <a-menu-item key="8">Team 2</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <file-outlined />
          <span>File</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: pink; padding: 0">
        <!-- <a-button @click="showItemList">项目列表</a-button>
        <a-button @click="showItemList">成员列表</a-button> -->
        <a-menu
        theme="light"
        mode="horizontal"
        v-model:selectedKeys="selectedKeys"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">项目列表</a-menu-item>
        <a-menu-item key="2">成员列表</a-menu-item>
      </a-menu>
      </a-layout-header>
      <!-- 上方菜单栏 -->
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          Bill is a cat.
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons-vue';
// 引入文件夹图标
import {
  FolderAddOutlined
} from '@ant-design/icons-vue';

import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    FolderAddOutlined
  },
  data() {
    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(['1']),
    };
  },
  methods:{
    showItemList():void{
      // 跳转路由显示项目列表
      console.log('我要展示项目列表')
    }
  }
});
// 
</script>
<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
/* 自定义css */
.teamCard{
  font-size: 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.a-menu{
  margin-top: 30px;
}
</style>

  