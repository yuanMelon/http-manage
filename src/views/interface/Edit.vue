/** * Edit * @ author: yourName * @ data: 2023-08-10 15:43 */
<script setup lang="ts">
import { ref } from 'vue'
const mytext=ref('hehe')
</script>
<template>
  <div class="l-edit">
    <v-md-editor v-model="mytext" height="400px"></v-md-editor>
    </div>
</template>
<style scoped></style>
