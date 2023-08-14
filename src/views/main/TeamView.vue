<template>
    <a-layout style="min-height: 100vh">
      <a-layout-sider v-model:collapsed="collapsed" collapsible>
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
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
        <a-layout-content style="margin: 0 16px">
          <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            Bill is a cat.
            <router-link to="/interfacelist">去项目</router-link>
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </template>
  <script lang="ts" setup>
  import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
  } from '@ant-design/icons-vue';
  import { ref } from 'vue';
  const collapsed = ref<boolean>(false);
  const selectedKeys = ref<string[]>(['1']);
  </script>
  <style scoped>
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
  </style>
  