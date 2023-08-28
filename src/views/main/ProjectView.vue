/** * ProjectView 项目页 * @ author: yourName * @ data: 2023-08-07 14:56 */
<script setup lang="ts">
import { VueElement, h, reactive, ref, onMounted } from 'vue'
import { LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { useInterfaceStore } from '@/stores/useInterface'
const store = useInterfaceStore()
const router = useRouter()

const items: ItemType[] = reactive([])
import { ProfileOutlined } from '@ant-design/icons-vue'
import type { MenuProps, ItemType } from 'ant-design-vue'


const childrenItems: ItemType[] = reactive([])

const addChildren = function (title: string) {
  // `${childrenItems.length+1}`
  childrenItems.push(getItem(title, title))
}
function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group'
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type
  } as ItemType
}

const initItems = function (title: string) {
  state.rootSubmenuKeys.push('projectinfo')
  state.rootSubmenuKeys.push(title)
  items.push(getItem('项目概述', 'projectinfo', () => h(ProfileOutlined)))
  items.push(getItem(title, `sub1`, () => h(ProfileOutlined), childrenItems))
  for (let [key, value] of store.map) {
    addChildren(key)
  }
}
store.$subscribe((mutations, state) => {
  // @ts-ignore
  if (mutations.events.target.size && childrenItems.length !== mutations.events.target.size) {
    // @ts-ignore
    addChildren(mutations.events.newValue.title)
  }
  console.log(childrenItems.length)
})
/*<|===   路由跳转   ===|> */
const toPreTab: MenuProps['onClick'] = (e) => {
  if (e.key === 'projectinfo') {
    console.log('在这里配置跳转路由')
  } else {
    // @ts-ignore
    store.changeEditInterface(e.key)
    // @ts-ignore
    store.changeSendInterface(e.key)

    router.push(`/interface/${e.key}`)
  }
}

const state = reactive({
  rootSubmenuKeys: ['sub1'],
  openKeys: ['sub1'],
  selectedKeys: []
})
const onOpenChange = (openKeys: string[]) => {
  const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1)
  if (state.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
    state.openKeys = openKeys
  } else {
    state.openKeys = latestOpenKey ? [latestOpenKey] : []
  }
  router.push('/interfacelist')
}

onMounted(() => {
  //获取接口列表信息
  //初始化侧边栏
  initItems('项目名字')
})
</script>
<template>
  <div class="l-project">
    <a-layout>
      <!-- <a-layout-header class="header">
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys1" theme="dark" mode="horizontal">
          <a-menu-item key="1">nav 1 </a-menu-item>
          <a-menu-item key="2">nav 2 <router-link to="/setting"></router-link></a-menu-item>
          <a-menu-item key="3">nav 3</a-menu-item>
        </a-menu>
      </a-layout-header> -->

      <a-layout>
        <a-layout-sider width="200" style="background: #fff">
          <div>
            <a-menu
              v-model:selectedKeys="state.selectedKeys"
              style="width: 200px"
              mode="inline"
              :open-keys="state.openKeys"
              :items="items"
              @click="toPreTab"
              @openChange="onOpenChange"
            ></a-menu>
          </div>
        </a-layout-sider>
        <a-layout style="padding: 0 24px 24px">
          <a-layout-content :style="{ background: '#fff', margin: 0, minHeight: '280px' }">
            <router-view></router-view>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>
<style scoped></style>
