<template>
    <div>
      <div>
        <!-- <button @click="click">clickme</button> -->
        <a-radio-group v-model:value="value1" button-style="solid">
          <a-radio-button value="/body" >Body</a-radio-button>
          <a-radio-button value="/query">Query</a-radio-button>
          <a-radio-button value="/headers">Headers</a-radio-button>
        </a-radio-group>
      </div>
      <div class="">
        <div class="req-tab" v-show="value1 === '/body'"><Body ></Body></div>
        <div class="req-tab" v-show="value1 === '/query'">
          <Query></Query>
        </div>
        <div class="req-tab" v-show="value1 === '/headers'"><Headers></Headers></div>
      </div>
    </div>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue'
  import Query from '../../../components/interface/Query.vue'
  import Headers from '../../../components/interface/Headers.vue'
  import Body from '@/components/interface/Body.vue';
  const value1 = ref<string>('/query')
  let queryList = ref<any>(['ai'])

  
  </script>
  