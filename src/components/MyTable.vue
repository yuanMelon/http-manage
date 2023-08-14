<template>
    <a-table :columns="head_columns" :data-source="head_data">
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          <a>{{ text }}</a>
        </template>
      </template>
    </a-table>
    <a-table :columns="query_columns" :data-source="query_data">
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          <a>{{ text }}</a>
        </template>
      </template>
    </a-table>
  </template>
  <script lang="ts" setup>
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 80,
    },
    {
      title: '是否必须',
      dataIndex: 'must',
      key: 'must',
      ellipsis: true,
    },
    {
      title: '默认值',
      dataIndex: 'defalut',
      key: 'defalut',
      ellipsis: true,
    },
    {
      title: '备注',
      dataIndex: 'desc',
      key: 'desc',
      ellipsis: true,
    },
    {
      title: '其他信息',
      dataIndex: 'other',
      key: 'other',
      ellipsis: true,
    },
  ];
  //head
  const head_columns = [
    {
      title: '参数名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '参数值',
      dataIndex: 'value',
      key: 'value',
      width: 80,
    },
    {
      title: '是否必须',
      dataIndex: 'must',
      key: 'must',
      ellipsis: true,
    },
    {
      title: '示例',
      dataIndex: 'example',
      key: 'example',
      ellipsis: true,
    },
    {
      title: '备注',
      dataIndex: 'desc',
      key: 'desc',
      ellipsis: true,
    },
  ];
  const query_columns = [
    {
      title: '参数名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '是否必须',
      dataIndex: 'must',
      key: 'must',
      ellipsis: true,
    },
    {
      title: '示例',
      dataIndex: 'example',
      key: 'example',
      ellipsis: true,
    },
    {
      title: '备注',
      dataIndex: 'desc',
      key: 'desc',
      ellipsis: true,
    },
  ];
  const head_data = [
    {
      key: '1',
      name: 'John Brown',

      value:'zxvdxv',
      must: true,
      example: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
      desc: 'hehehehehe',
    },
    {
      key: '2',
      name: 'JaBrown',
      value:'zxvdxv',
      must: false,
      example: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
      desc: 'hehehehehe',
    },
    {
      key: '3',
      name: 'John Bxxxrown',
      value:"zzzzz",
      must: false,
      example: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
      desc: 'hehehehehe',
    },
  ];
  const query_data = [
    {
      key: '1',
      name: 'John Brown',
      must: true,
      example: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
      desc: 'hehehehehe',
    },
    {
      key: '2',
      name: 'JaBrown',
      must: false,
      example: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
      desc: 'hehehehehe',
    },
    {
      key: '3',
      name: 'John Bxxxrown',
      must: false,
      example: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
      desc: 'hehehehehe',
    },
  ];
  </script>
  
  