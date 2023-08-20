<style scoped>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
<template>
  <a-form
    ref="formRef"
    name="dynamic_form_item"
    :model="dynamicValidateForm"
    v-bind="formItemLayoutWithOutLabel"
  >
    <!-- 内容 -->

    <a-form-item
      v-for="(domain, index) in dynamicValidateForm.domains"
      :key="domain.key"
      v-bind="index === 0 ? formItemLayout : {}"
      :label="index === 0 ? 'Domains' : ''"
      :name="['domains', index, 'value']"
      :rules="{
        required: true,
        message: 'domain can not be null',
        trigger: 'change'
      }"
    >
      <component :is="domain.value"></component>
      <!-- <a-input
        v-model:value="domain.value"
        placeholder="please input domain"
        style="width: 60%; margin-right: 8px"
      /> -->
      <!-- 删除按钮 -->
      <MinusCircleOutlined
        v-if="dynamicValidateForm.domains.length > 1"
        class="dynamic-delete-button"
        :disabled="dynamicValidateForm.domains.length === 1"
        @click="removeDomain(domain)"
      />
    </a-form-item>
    {{ dynamicValidateForm.domains.length }}
    <!-- 添加按钮 -->
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="dashed" style="width: 60%" @click="addDomain">
        <PlusOutlined />
        添加参数
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue'
import type { FormInstance } from 'ant-design-vue'
import Query from '../../components/interface/Query.vue'

interface Domain {
  value: string
  key: number
}

export default {
  components: {
    Query
  },
  setup() {
    const formRef = ref<FormInstance>()
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    }
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 }
      }
    }
    const dynamicValidateForm = reactive<{ domains: Domain[] }>({
      domains: []
    })
    const submitForm = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log('values', dynamicValidateForm.domains)
        })
        .catch((error) => {
          console.log('error', error)
        })
    }
    const resetForm = () => {
      formRef.value.resetFields()
    }
    const removeDomain = (item: Domain) => {
      let index = dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        dynamicValidateForm.domains.splice(index, 1)
      }
    }
    const addDomain = () => {
      dynamicValidateForm.domains.push({
        value: 'Query',
        key: Date.now()
      })
    }

    return {
      formRef,
      formItemLayout,
      formItemLayoutWithOutLabel,
      dynamicValidateForm,
      submitForm,
      resetForm,
      removeDomain,
      addDomain
    }
  }
}
</script>
