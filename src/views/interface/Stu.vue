<template>
  <a-select
    v-model:value="nameOptionValue"
    show-search
    placeholder="Select a person"
    style="width: 100px"
    :options="options"
    :filter-option="filterOption"
    @focus="handleFocus"
    @blur="handleBlur"
    @change="handleChange"
  ></a-select>
</template>
<script lang="ts" setup>
import type { SelectProps } from 'ant-design-vue';
import {headersOptions} from '@/data/headerOptions'
import { ref } from 'vue';
const options = ref<SelectProps['options']>(headersOptions);


const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
const handleBlur = () => {
  console.log('blur');
};
const handleFocus = () => {
  console.log('focus');
};
const filterOption = (input: string, option: any) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

const nameOptionValue = ref<string | undefined>(undefined);

</script>

