/** * TitleInfo 接口的标题格式 * @ author: yourName * @ data: 2023-08-10 16:14 */
<script setup lang="ts">
import { ref } from 'vue'
</script>
<template>
  <div class="title-container">
    <p class="title">
      <slot>我是标题slot</slot>
    </p>
  </div>
</template>
<style scoped>
.title-container{
    /* border: 2px solid black; */
    border-left: 4px solid var(--theme-color);
    padding-left: 20px;
}
.title{
  font-weight:1000;
  font-size: 20px;
}

</style>
