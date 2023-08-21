/**
* ItemList
* @ author: yourName
* @ data: 2023-08-16 17:39
*/
<template>
<div class="l-itemList">
    <div class="add" style="background-color: #f5f5f5 ">
        <a-button size="small" type="primary" style="margin-left: auto; font-size: 1px;" @click="visible = true">新建项目</a-button>
        <!-- 弹出内容 -->
        <a-modal
      v-model:open="visible"
      title="新建项目"
      ok-text="确认"
      cancel-text="取消"
      @ok="onOk"
    >
      <a-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal">
        <a-form-item
          name="nameOfItem"
          label="项目名称"
          :rules="[{ required: true, message: '请输入项目名称' }]"
        >
          <a-input v-model:value="formState.nameOfItem" />
        </a-form-item>
        <a-form-item name="description" label="项目描述">
          <a-textarea v-model:value="formState.description" />
        </a-form-item>
      </a-form>
    </a-modal>
    </div>
    <div style="min-height: 75vh; background-color: white;">
        <!-- 我是内容页 -->
        <a-table 
        :columns="columns" 
        :data-source="dataSource.slice((current - 1) * 8, current*8)" 
        :pagination="false"
        :customRow="rowClick">
          <template #headerCell="{ column }">
            <template v-if="column.key === 'name'">
              <span>
                <smile-outlined />
                项目名称
              </span>
            </template>
          </template>

          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
              <a>
                {{ record.name }}
              </a>
            </template>
            <template v-else-if="column.key === 'tags'">
              <span>
                <a-tag
                  v-for="tag in record.tags"
                  :key="tag"
                  :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
                >
                  {{ tag.toUpperCase() }}
                </a-tag>
              </span>
            </template>
            <template v-else-if="column.key === 'action'">
              <a-popconfirm
                v-if="dataSource.length"
                title="确定删除?"
                @confirm="onDelete(record.key)"
              >
                <a>删除</a>
              </a-popconfirm>
            </template>
          </template>
  </a-table>
  <a-pagination class="pagination" v-model:current="current" :total="dataSource.length" show-less-items :defaultPageSize="pages" hideOnSinglePage/>
    </div>
</div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, toRaw } from 'vue';
import type { Ref, UnwrapRef } from 'vue';
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import type { FormInstance } from 'ant-design-vue';
const pages:Number=8
 const rowClick = (record) => {
  return {
    on: {
      click: () => {
        console.log('点击了我')
      },
      dblclick: () => {
       	console.log('双击了我')
      },
      // ...
    }
  }
}

const current = ref(1);
interface Values {
  nameOfItem: string;
  description:string
}

const formRef = ref<FormInstance>();
const visible = ref(false);
const formState = reactive<Values>({
  nameOfItem: '',
  description:''
});

const onOk = () => {
  formRef.value
    .validateFields()
    .then(values => {
      console.log('Received values of form: ', values);
      // 添加分组
      const tableData=({
      key: '',
      name: '',
      description: ''
    })
    tableData.key=String(dataSource.value.length+1)
    tableData.name=formState.nameOfItem
    tableData.description=formState.description
    dataSource.value.push(tableData)
      console.log('formState: ', toRaw(formState));
      visible.value = false;
      formRef.value.resetFields();
      console.log('reset formState: ', toRaw(formState));
    })
    .catch(info => {
      console.log('Validate Failed:', info);
    });
};

const columns = [
  {
    name: 'Name',
    dataIndex: 'name',
    key: 'name',
    width:'80%'
  },
  {
    title: 'Action',
    key: 'action',
  },
];
interface DataItem {
  key: string;
  name: string
}

const dataSource: Ref<DataItem[]> = ref([

]);
const count = computed(() => dataSource.value.length + 1);
const handleAdd = () => {
  const newData = {
    key: `${count.value}`,
    name: `Edward King ${count.value}`
  };
  dataSource.value.push(newData);
};

const onDelete = (key: string) => {
  dataSource.value = dataSource.value.filter(item => item.key !== key);
};
</script>

<style scoped>
.add{
    width: 100%;
    height: 50px;
    padding-right: 10px;
    background-color: white;
    display:flex;
    align-items: center;
    border-radius: 6px;
}

.pagination{
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding-bottom: 10px;
}
</style>