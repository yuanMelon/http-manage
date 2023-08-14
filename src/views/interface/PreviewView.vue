/** * PreviewView * @ author: yourName * @ data: 2023-08-10 16:07 */
<script setup lang="ts">
import { ref } from 'vue'
import { RouterView ,RouterLink, useRouter} from 'vue-router'
import TitleInfo from '@/components/TitleInfo.vue'
import UserAvater from '../../components/UserAvater.vue'
const basicinfoTitle = ref(['接口名称', '创建人', '状态', '更新时间', '接口路径', 'Mock地址'])
import { VAceEditor } from 'vue3-ace-editor'
//使用仓库
import { useInterfaceStore } from '../../stores/useInterface';
const  store = useInterfaceStore()

const head_columns = [
  {
    title: '参数名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '参数值',
    dataIndex: 'value',
    key: 'value',
    width: 80
  },
  {
    title: '是否必须',
    dataIndex: 'must',
    key: 'must',
    ellipsis: true
  },
  {
    title: '示例',
    dataIndex: 'example',
    key: 'example',
    ellipsis: true
  },
  {
    title: '备注',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true
  }
]
const query_columns = [
  {
    title: '参数名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '是否必须',
    dataIndex: 'must',
    key: 'must',
    ellipsis: true
  },
  {
    title: '示例',
    dataIndex: 'example',
    key: 'example',
    ellipsis: true
  },
  {
    title: '备注',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true
  }
]
const head_data = [
  {
    key: '1',
    name: 'John Brown',

    value: 'zxvdxv',
    must: true,
    example: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    desc: 'hehehehehe'
  },
  {
    key: '2',
    name: 'JaBrown',
    value: 'zxvdxv',
    must: false,
    example: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    desc: 'hehehehehe'
  },
  {
    key: '3',
    name: 'John Bxxxrown',
    value: 'zzzzz',
    must: false,
    example: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    desc: 'hehehehehe'
  }
]
const query_data = [
  {
    key: '1',
    name: 'John Brown',
    must: 'rue',
    example: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    desc: 'hehehehehe'
  },
  {
    key: '2',
    name: 'JaBrown',
    must: 'false',
    example: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    desc: 'hehehehehe'
  },
  {
    key: '3',
    name: 'John Bxxxrown',
    must: 'false',
    example: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    desc: 'hehehehehe'
  }
]
const content = ref('xcvdsf')
const beizhu = ref('sdfa')
</script>
<template>
  <div class="l-preview">
    <TitleInfo>基本信息</TitleInfo>
    <div class="grid">
      <div class="cell">
        <span class="cell-info">
          {{ basicinfoTitle[0] }}
        </span>
        <span> {{store.interfaceInfos[0].title}} </span>
      </div>
      <div class="cell">
        <span class="cell-info">
          {{ basicinfoTitle[1] }}
        </span>
        <div class="avater-container">
          <img class="avater" src="../../assets/logo.svg" alt="" />
            <router-link to="/personalspace" class="username">admin</router-link>
        </div>
      </div>
      <div class="cell">
        <span class="cell-info">
          {{ basicinfoTitle[2] }}
        </span>
      </div>
      <div class="cell">
        <span class="cell-info">
          {{ basicinfoTitle[3] }}
        </span>
      </div>
      <div class="cell">
        <span class="cell-info">
          {{ basicinfoTitle[4] }}
        </span>
      </div>
      <div class="cell">
        <span class="cell-info">
          {{ basicinfoTitle[5] }}
        </span>
      </div>
    </div>
    <TitleInfo>备注</TitleInfo>
    <p>{{ beizhu }}</p>
    <TitleInfo>请求参数</TitleInfo>
    <div class="cell">
      <span class="cell-info">Headres:</span>
    </div>
    <a-table :columns="head_columns" :data-source="head_data">
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          <a>{{ text }}</a>
        </template>
      </template>
    </a-table>
    <div class="cell">
      <span class="cell-info">Query:</span>
    </div>
    <a-table :columns="query_columns" :data-source="query_data">
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          <a>{{ text }}</a>
        </template>
      </template>
    </a-table>
    <TitleInfo>返回数据</TitleInfo>
    <VAceEditor v-model:value="content" lang="json" theme="github" style="height: 300px" />
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
    font-weight: 600;
  }
}
.avater-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    .avater{
      width: 40px;
      border-radius: 50%;
      border: 1px solid black;
    }
}

.done{}

.undone{}
</style>
