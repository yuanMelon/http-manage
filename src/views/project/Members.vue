/**
* ItemList
* @ author: yourName
* @ data: 2023-08-16 17:39
*/
<template>
<div class="l-itemList">
    <div class="add" style="background-color: #f5f5f5 ">
        <a-button size="small" type="primary" style="margin-left: auto; font-size: 1px;" @click="visible = true">添加成员</a-button>
        <!-- 弹出内容 -->
        <a-modal
      v-model:open="visible"
      title="添加成员"
      ok-text="确认"
      cancel-text="取消"
      @ok="onOk"
    >
      <a-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal">
        <a-form-item
          name="nameOfMember"
          label="用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <a-input v-model:value="formState.nameOfMember" />
        </a-form-item>
        <a-form-item name="role" label="用户角色">
            <a-select
                ref="select"
                v-model:value="formState.role"
                style="width: 120px"
                :options="options"
            >
            </a-select>
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
        >
          <template #headerCell="{ column }">
            <template v-if="column.key === 'name'">
              <span>
                <!-- <smile-outlined /> -->
                成员列表
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
            <template v-else-if="column.key === 'role'">
                <a-select
                ref="select"
                v-model:value="record.role"
                style="width: 120px"
                @change="handleChange($event,record)"
                :options="options"
                >
            </a-select>
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
import { watch, reactive, ref, toRaw, onBeforeMount } from 'vue';
import type { Ref } from 'vue';
import type { FormInstance, SelectProps } from 'ant-design-vue';
import { projectStore } from '../../stores/useProject';
  const  store = projectStore()
import axios from 'axios';
import { message } from 'ant-design-vue';
  const info = () => {
    message.info('用户不存在！');
  };
  const info2 = () => {
    message.info('不能邀请自己！');
  };
const pages:Number=8

const current = ref(1);
const options = ref<SelectProps['options']>([
  {
    value: 'owner',
    label: '管理',
  },
  {
    value: 'member',
    label: '读写',
  },
  {
    value: 'guest',
    label: '只读',
  },
]);

interface Values {
    nameOfMember: string;
  role:string
}

const formRef = ref<FormInstance>();
const visible = ref(false);
const formState = reactive<Values>({
    nameOfMember: '',
    role:'guest'
});


const onOk = () => {
  formRef.value
    .validateFields()
    .then(values => {
      axios.post('http://localhost:3001/project/member',{
        uid:120,
        name:formState.nameOfMember,
        role:formState.role,
        gid:store.gid
      })
      .then(function (response) {
        if(response.data.msg=='用户不存在'){
          info()
          // 弹窗提醒
        }
        else if(response.data.msg=='自己不能邀请自己'){
          info2()
        }
        else{
          getMembers()
          console.log('已新增成员')
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
      // 清空formstage值
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
    width:'75%'
  },
  {
    key:'role',
    width:'15%',
    title:'角色'
  },
  {
    title: '操作',
    key: 'action',
    width:'10%'
  }
];
interface DataItem {
  key: string;
  name: string;
  role:string
}

const dataSource: Ref<DataItem[]> = ref([

]);

function getMembers(){
  axios.get('http://localhost:3001/project/user',{
    params:{
      gid:store.gid,
      uid:120
    }
  })
  .then(function (response){
    console.log('加载成员列表')
    console.log(response.data)
    if(response.data.msg=='你不在该成员列表中'){
      dataSource.value.length=0  //  初始化
    }
    else{
      dataSource.value.length=0  //  初始化
    var list =response.data.data
    list.forEach((item:any)=>{
      const tableData=({
        key: '',
        name: '',
        role: ''
      })
      tableData.key=String(item.id)
      tableData.name=item.name
      tableData.role=item.role
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

const handleChange=($event:any,record:any)=>{
  console.log(record.key)
  console.log($event)
  axios.post('http://localhost:3001/project/role',{
    uid:120,
    uid_c:record.key,
    gid:store.gid,
    role:$event
  })
  .then(function (response) {
      console.log(response)
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // 总是会执行
  });
}

const onDelete = (key: string) => {
  // dataSource.value = dataSource.value.filter(item => item.key !== key);
  const delItem=dataSource.value.find(item=>item.key===key)
  if(delItem){
    axios.delete('http://localhost:3001/project/member',{
    params:{
      gid:store.gid,
      name:delItem.name
    }
    })
    .then(function (response) {
      console.log('已删除')
      getMembers()
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // 总是会执行
    });  
  }
};

watch(
  () => store.flash,
  (newValue, oldValue)=>{
    getMembers()
  }
  );

onBeforeMount(()=>{
    getMembers()
})
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