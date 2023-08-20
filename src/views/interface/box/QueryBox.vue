<template>
    <div>
      <div>
        <a-radio-group v-model:value="value1" button-style="solid">
          <a-radio-button value="/body">Body</a-radio-button>
          <a-radio-button value="/query">Query</a-radio-button>
          <a-radio-button value="/headers">Headers</a-radio-button>
        </a-radio-group>
      </div>
      <div class="">
        <div class="req-tab" v-show="value1 === '/body'">12</div>
        <div class="req-tab" v-show="value1 === '/query'">
          <Query  @child-click="getQueryRow "></Query>
        </div>
        <div class="req-tab" v-show="value1 === '/headers'">234</div>
      </div>
    </div>
    {{ value1 }}
    {{ queryList }}
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue'
  import Query from '../../../components/interface/Query.vue'
  const value1 = ref<string>('/query')
  let queryList = ref<any>(['ai'])
  
  const getQueryRow  = (value: any) => {
    console.log(value)
    queryList.value.push(value)
  }
  
  function changevalue(e) {
    console.log(e)
  }
  </script>
  