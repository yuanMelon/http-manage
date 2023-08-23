<template>
  <div class="">
    <NewTeam style="width: 100px; float: left;"/>

    <NewProject style="width: calc(100% - 200px); float: right;"/>
  </div>
</template>
<script lang="ts" setup>

import { ref } from 'vue'
import NewTeam from './NewTeam.vue'
import NewProject from './NewProject.vue'

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
