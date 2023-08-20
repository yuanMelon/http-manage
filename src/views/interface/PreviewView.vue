/** * PreviewView * @ author: yourName * @ data: 2023-08-10 16:07 */
<script setup lang="ts">
import { ref, onBeforeUpdate } from 'vue'
import { RouterView, RouterLink, useRoute, useRouter } from 'vue-router'
const route = useRoute()
import TitleInfo from '@/components/TitleInfo.vue'
const PreviewTitle = ref(['接口名称', '创建人', '状态', '更新时间', '接口路径', 'Mock地址'])
import { VAceEditor } from 'vue3-ace-editor'
//使用仓库
import { useInterfaceStore } from '../../stores/useInterface'
const store = useInterfaceStore()

const head_columns = [
  {
    title: '参数名称',
    dataIndex: 'name',
    key: 'name',
    width: '20%'
  },
  {
    title: '参数值',
    dataIndex: 'value',
    key: 'value',
    width: '20%'
  },
  {
    title: '示例',
    dataIndex: 'example',
    key: 'example',
    // ellipsis: true,
    width: '30%'
  },
  {
    title: '备注',
    dataIndex: 'desc',
    key: 'desc',
    width: '30%'
    // ellipsis: true
  }
]
const query_columns = [
  {
    title: '参数名称',
    dataIndex: 'name',
    key: 'name',
    width: '20%'
  },
  {
    title: '是否必须',
    dataIndex: "required",
    key: 'required',
    ellipsis: true,
    width: '20%'
  },
  {
    title: '示例',
    dataIndex: 'example',
    key: 'example',
    ellipsis: true,
    width: '30%'
  },
  {
    title: '备注',
    dataIndex: 'desc',
    key: 'desc',
    width: '20%',
    ellipsis: true
  }
]

const content = ref('work')

const index = ref(0)
onBeforeUpdate(() => {
  console.log(`调用了update`)
  //修改加载数据
  index.value = 0
})
</script>
<template>
  <div class="l-preview">
    <TitleInfo>基本信息</TitleInfo>
    <div class="grid">
      <div class="cell">
        <span class="cell-info">
          {{ PreviewTitle[0] }}
        </span>
        <span> {{ $route.params.title }} </span>
      </div>
      <div class="cell">
        <span class="cell-info">
          {{ PreviewTitle[1] }}
        </span>
        <div class="avatar-container">
          <img class="avatar" src="../../assets/logo.svg" alt="" />
          <router-link to="/personalspace" class="username">admin</router-link>
        </div>
      </div>
      <div class="cell">
        <span class="cell-info">
          {{ PreviewTitle[2] }}
        </span>
        <span
          :class="{
            done: store.interfaceInfos[0].status === 'done',
            undone: store.interfaceInfos[0].status === 'undone'
          }"
        >
          {{ store.map.get(`${$route.params.title}`).status }}
        </span>
      </div>
      <div class="cell">
        <span class="cell-info">
          {{ PreviewTitle[3] }}
        </span>
        <span>{{ store.map.get(`${$route.params.title}`).c_time }}</span>
      </div>
      <div class="cell">
        <span class="cell-info">
          {{ PreviewTitle[4] }}
        </span>
        <span>{{ store.map.get(`${$route.params.title}`).path }}</span>
      </div>
      <div class="cell">
        <span class="cell-info">
          {{ PreviewTitle[5] }}
        </span>
      </div>
    </div>
    <TitleInfo>备注</TitleInfo>
    <div class="req_info">
      <div v-html="store.map.get($route.params.title).desc"></div>
    </div>
    <TitleInfo>请求参数</TitleInfo>
    <div class="req_info" v-if="store.map.get('接口3').req_headers">
      <span class="cell-info">Heads:</span>
      <div class="cell" >
        <a-table
          :pagination="false"
          :bordered="true"
          :columns="head_columns"
          :data-source="store.map.get('接口3').req_headers"
        >
        </a-table>
      </div>
    </div>

    <div class="req_info" v-if="store.map.get('接口3').req_query">
      <div class="cell">
        <span class="cell-info">Query:</span>
      </div>
      <a-table
        :pagination="false"
        :bordered="true"
        :hideOnSinglePage="true"
        :columns="query_columns"
        :data-source="store.map.get('接口3').req_query"
      >
      </a-table>
    </div>
    <TitleInfo>返回数据</TitleInfo>

    <!-- <a-table :pagination="false" :bordered="true" :hideOnSinglePage="true" :columns="query_columns" :data-source="query_data">
      </a-table> -->
    <div class="req_info">
      <VAceEditor 
        v-model:value="content"
        lang="json"
        theme="github"
        style="height: 300px"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 20px;
  row-gap: 10px;
  column-gap: 20px;
}
.cell {
  display: flex;
  gap: 20px;
  align-items: center;
  .cell-info {
    font-weight: var(--font-weight-bold);
  }
}
.avatar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  .avatar {
    width: 40px;
    border-radius: 50%;
    border: 1px solid black;
  }
}
.req_info {
  padding: 20px;
  padding-right: 40px;
}
.done::before {
  content: '';
  margin-right: 5px;
  display: inline-block;
  border: 3px solid green;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  height: 1px;
  width: 1px;
}

.undone::before {
  content: '';
  margin-right: 5px;
  display: inline-block;
  border: 3px solid rgb(128, 0, 0);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  height: 1px;
  width: 1px;
}
</style>
