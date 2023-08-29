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
<<<<<<< HEAD
        :customRow="rowClick">
          <template #headerCell="{ column }">
            <template v-if="column.key === 'name'">
              <span>
                <smile-outlined />
=======
        :customRow="rowClick"
        >
          <template #headerCell="{ column }">
            <template v-if="column.key === 'name'">
              <span>
>>>>>>> zhulishan
                项目名称
              </span>
            </template>
          </template>

          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
<<<<<<< HEAD
              <a @click="toPreview(record.name)">
=======
              <a>
>>>>>>> zhulishan
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
<<<<<<< HEAD
=======
                ok-text="确定"
                cancel-text="取消"
>>>>>>> zhulishan
                @confirm="onDelete(record.key)"
              >
                <a>删除</a>
              </a-popconfirm>
            </template>
          </template>
  </a-table>
  <a-pagination class="pagination" v-model:current="current" :total="dataSource.length" show-less-items :defaultPageSize="pages" hideOnSinglePage/>
    </div>
<<<<<<< HEAD
    <!-- <a-spin v-if="isLoading" class="loading"/> -->
    <a-spin v-if="isLoading" size="large" class="loading"/>
    <!-- <a-spin /> -->
=======
>>>>>>> zhulishan
</div>
</template>

<script setup lang="ts">
<<<<<<< HEAD
import { computed, reactive, ref, toRaw, onMounted } from 'vue';
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
=======
import { reactive, ref, toRaw, onBeforeMount, watch} from 'vue';
import type { Ref } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import axios from 'axios';
import { projectStore } from '../../stores/useProject';
const  store = projectStore()
// 实例化 store
import { message } from 'ant-design-vue';
  const info = () => {
    message.info('项目已存在！');
  };
const pages:Number=8
>>>>>>> zhulishan

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
<<<<<<< HEAD
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
=======
      axios.post('http://localhost:3001/project/list',{
        gid:store.gid,
        name:formState.nameOfItem
      })
      .then(function (response) {
        if(response.data.msg=='用户名重复'){
          info()
          // 弹窗提醒
        }
        else{
          getItems()
          console.log('已新增项目')
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // 总是会执行
      });
    console.log('formState: ', toRaw(formState));
    visible.value = false;
    formRef.value.resetFields();
    console.log('reset formState: ', toRaw(formState));
>>>>>>> zhulishan
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
<<<<<<< HEAD
    width:'80%'
  },
  {
    title: 'Action',
=======
    width:'90%'
  },
  {
    title: '操作',
>>>>>>> zhulishan
    key: 'action',
  },
];
interface DataItem {
  key: string;
  name: string
}

<<<<<<< HEAD
const dataSource: Ref<DataItem[]> = ref([
{key:'接口3',name:"接口3"}
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
/**
 * 韦洁,添加表格数据;loading
 */
import router from '../../router/index';
import { useInterfaceStore } from '@/stores/useInterface'
const store = useInterfaceStore()
const isLoading = ref(false)
onMounted(()=>{
  store.map.keys()
})
//前往预览页面
const  toPreview = (v:string)=>{
  console.log(v)
  isLoading.value=true
  store.changeEditInterface('接口3')
  router.push('/interface/'+v)
}

</script>

<style scoped>
.loading{
  position: fixed;
  z-index: 9999;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
=======
const dataSource: Ref<DataItem[]> = ref([]);

const onDelete = (key: string) => {
  // dataSource.value = dataSource.value.filter(item => item.key !== key);
  const delItem=dataSource.value.find(item=>item.key===key)
  if(delItem){
    axios.delete('http://localhost:3001/project/list',{
    params:{
      gid:store.gid,
      name:delItem.name
    }
    })
    .then(function (response) {
      console.log('已删除')
      getItems()
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // 总是会执行
    });  
  }
};

function rowClick(record:any) {
  return {
    onClick: () => {
      console.log(record.name);
      axios.get('http://localhost:3001/project/list',{
        params:{
          gid:store.gid,
          uid:120
        }
      })
      .then(function (response){
        var list =response.data.data
        const result = list.find((obj: { name: string }) => obj.name === record.name);
        store.itemID=result.id
        console.log(store.itemID)
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // 总是会执行
      });
    },
  };
}

function getItems(){
  axios.get('http://localhost:3001/project/list',{
    params:{
      gid:store.gid
    }
  })
  .then(function (response){
    if(response.data.msg=='无任何项目'){
      console.log('无项目数据')
      dataSource.value.length=0  //  初始化
    }
    else{
      dataSource.value.length=0  //  初始化
      var list =response.data.data
      list.forEach((item:any)=>{
        const tableData=({
          key: '',
          name: '',
          description: ''
        })
        tableData.key=String(item.id)
        tableData.name=item.name
        // tableData.description=formState.description
        dataSource.value.push(tableData)
      })
    }
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // 总是会执行
  });
}

watch(
  () => store.flash,
  (newValue, oldValue)=>{
    getItems()
  }
);

onBeforeMount(()=>{
  console.log(store.gid+'gid') // 输出 "My Project"
  getItems()
})
</script>

<style scoped>
>>>>>>> zhulishan
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