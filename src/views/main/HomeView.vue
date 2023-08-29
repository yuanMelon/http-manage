/** * Home 主页 * @ author: yourName * @ data: 2023-08-07 14:19 */

<template>
  <div class="l-container">
    <Navigation/>
    <TeamView style="width: 100px; float: left;"/>
    <ProjectView style="width: calc(100% - 200px); float: right;"/>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import Navigation from '../../components/Navigation.vue'
import TeamView from './TeamView.vue';
import ProjectView from './ProjectView.vue';
import { useRouter } from 'vue-router'


</script>
<style scoped>
.l-container {
  width: 100%;
  height: 100%;
}
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
