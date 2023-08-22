<template>
  <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">Add</a-button>
  <a-table bordered :data-source="data" :columns="columns" :pagination="false">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'name'">
        <div class="editable-cell">
          <div v-if="editableData[record.name]" class="editable-cell-input-wrapper">
            <a-input
              v-model:value="editableData[record.name].name"
              @pressEnter="save(record.name, column.dataIndex)"
            />
            <check-outlined
              class="editable-cell-icon-check"
              @click="save(record.name, column.dataIndex)"
            />
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || ' ' }}
            <edit-outlined
              class="editable-cell-icon"
              @click="edit(record.name, column.dataIndex)"
            />
          </div>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'desc'">
        <div class="editable-cell">
          <div v-if="editableData[record.desc]" class="editable-cell-input-wrapper">
            <a-input
              v-model:value="editableData[record.desc].desc"
              @pressEnter="save(record.desc, column.dataIndex)"
            />
            <check-outlined
              class="editable-cell-icon-check"
              @click="save(record.desc, column.dataIndex)"
            />
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || ' ' }}
            <edit-outlined
              class="editable-cell-icon"
              @click="edit(record.desc, column.dataIndex)"
            />
          </div>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'example'">
        <div class="editable-cell">
          <div v-if="editableData[record.example]" class="editable-cell-input-wrapper">
            <a-input
              v-model:value="editableData[record.example].example"
              @pressEnter="save(record.example, column.dataIndex)"
            />
            <check-outlined
              class="editable-cell-icon-check"
              @click="save(record.example, column.dataIndex)"
            />
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || ' ' }}
            <edit-outlined
              class="editable-cell-icon"
              @click="edit(record.example, column.dataIndex)"
            />
          </div>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'required'">
        <div class="editable-cell">
          <div v-if="editableData[record.required]" class="editable-cell-input-wrapper">
            <!-- <a-input
              v-model:value="editableData[record.required].required"
              @pressEnter="save(record.required, column.dataIndex)"
            /> -->
            <a-select v-model:value="record.required" style="width: 10%; min-width: 80px">
              <a-select-option value="1">必须</a-select-option>
              <a-select-option value="0">非必须</a-select-option>
            </a-select>
            <check-outlined
              class="editable-cell-icon-check"
              @click="save(record.required, column.dataIndex)"
            />
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || ' ' }}
            <edit-outlined
              class="editable-cell-icon"
              @click="edit(record.required, column.dataIndex)"
            />
          </div>
        </div>
      </template>

      <template v-else-if="column.dataIndex === 'options'">
        <a-popconfirm v-if="data.length" title="Sure to delete?" @confirm="onDelete(record.name)">
          <a>Delete</a>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import type { Ref, UnwrapRef } from 'vue'
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue'
import { cloneDeep } from 'lodash-es'
import type { InterfaceReqQuery } from '../../data/interface'

const columns = [
  {
    title: '参数名称',
    dataIndex: 'name',
    width: '30%'
  },
  {
    title: '参数示例',
    dataIndex: 'example'
  },
  {
    title: '必要性',
    dataIndex: 'required'
  },
  {
    title: '备注',
    dataIndex: 'desc'
  },
  {
    title: '选项',
    dataIndex: 'options'
  }
]
const data: Ref<InterfaceReqQuery[]> = ref([
  {
    name: '参数1',
    example: '参数示例',
    desc: '223',
    required: 'true'
  },
  {
    name: '参数2',
    example: '参数示例',
    desc: '446',
    required: 'true'
  }
])

const count = computed(() => data.value.length + 1)
const editableData: UnwrapRef<Record<string, InterfaceReqQuery>> = reactive({})

const edit = (value: string, key: string) => {
  editableData[value] = cloneDeep(
    data.value.filter((item) => {
      console.log(`是你?${value === item.desc},${value}`)
      return value === item[key]
    })[0]
  )
  console.log(editableData)
}
// const edit = (key: string) => {
//   editableData[key] = cloneDeep(data.value.filter(item => key === item.name)[0]);
// };
const save = (value: string, key: string) => {
  Object.assign(data.value.filter((item) => value === item[key])[0], editableData[value])
  delete editableData[value]
}

const onDelete = (key: string) => {
  console.log(key)
  data.value = data.value.filter((item) => {
    return item.name !== key
  })
}
const handleAdd = () => {
  const newData: InterfaceReqQuery = {
    name: '更多参数',
    example: '参数示例',
    desc: '223',
    required: 'true'
  }
  data.value.push(newData)
}
//导出edit数据,或者pinia
</script>
<style lang="less" scoped>
.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>
