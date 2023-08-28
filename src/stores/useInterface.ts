import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import type {
  interfaceInfo,
  Interface,
  InterfaceReqQuery,
  InterfaceReqHeader
} from '../data/interface'
import { areObjectsEqual } from '@/utils/objutil'
// import { edit } from 'brace';
export const useInterface2Store = defineStore('interface2', {
  state: () => ({
    path: ''
  }),
  getters: {},
  actions: {}
})
// //接口数据格式
// interface interfaceInfo  {
//     title:string,
//     path:string,
//     status:'done'|'undone'
//     up_time:number,
//     /**临时,创建者id(它有很多个id) */
//     uid:number,
//     desc:string
// }
const obj = JSON.parse(
  '{\
  "path": "/home/project",\
  "title": "接口3",\
  "uid": "52",\
  "pid": "11",\
  "c_time": "1991-11-19 13:06:02",\
  "u_time": "1982-02-18 09:24:33",\
  "status": "done",\
  "desc": "aliqua ullamco do cupidatat sed",\
  "req_query": [\
      {\
          "name": "派理劳四然了",\
          "example": "voluptate consequat pariatur",\
          "desc": "ullamco proident sunt",\
          "required": "quis eiusmod mollit Excepteur",\
          "id": "31"\
      }\
  ],\
  "req_headers": [\
      {\
          "required": "cillum voluptate nisi",\
          "id": "1",\
          "name": "别寄了",\
          "value": "deserunt laboris eu",\
          "example": "sint commodo sunt tempor",\
          "desc": "consequat non ut eu cillum"\
      }\
  ],\
  "req_body_from": "irure minim eu non magna",\
  "res_body": "字符串会报错吗?如果不会就改一下body的格式吧",\
  "res_body_type": "dolor reprehenderit laboris",\
  "method": "GET",\
  "parmas": [\
      {\
          "id": "79",\
          "name": "眼红历加口术",\
          "value": "dolor reprehenderit in tempor"\
      }\
  ]\
}'
)

export const useInterfaceStore = defineStore('interface', () => {
  let map = reactive(new Map())
  map.set('接口3', obj)
  console.log(`怎么会有这种请`,map.get('接口3'))
  const interfaceInfos: Array<interfaceInfo> = [
    {
      title: '接口名称',
      path: '/home',
      status: 'undone',
      up_time: 112233,
      uid: 11,
      desc: '<p>查看接口备注</p>'
    },
    {
      title: '接口名称2',
      path: '/interface',
      status: 'done',
      up_time: 2112233,
      uid: 12,
      desc: '<p>2:查看接口备注</p>'
    }
  ]

  let editInterface = reactive<Interface>({
    cTime: '',
    desc: '',
    method: 'GET',
    path: '',
    params: [],
    pid: '',
    req_body_from: '5555544444',
    req_headers: [],
    req_params: [],
    req_query: [],
    res_body: {},
    res_body_type: '',
    status: 'done',
    title: '',
    uTime: '',
    uid: '',
    id: ''
  })
  //reactive没能相应对象内部的数组和对象,先试试能不能用
  let editReqQuery = reactive<InterfaceReqQuery[]>([])
  let editReqHeaders = reactive<InterfaceReqHeader[]>([
    {
      required: 'true',
      id: '4',
      name: '接口那',
      value: 'doris eu',
      example: 'sint cr',
      desc: 'conseqlum'
    }
  ])
  let editReqBody = reactive<{ [key: string]: any }>({})

  let sendInterface = reactive<Interface>({
    cTime: '',
    desc: '',
    method: 'GET',
    path: '',
    params: [],
    pid: '',
    req_body_from: '5555544444',
    req_headers: [],
    req_params: [],
    req_query: [],
    res_body: {},
    res_body_type: '',
    status: 'done',
    title: '',
    uTime: '',
    uid: '',
    id: ''
  })
  //更新send数据
  const changeSendInterface: (name: string | string[]) => void = (name) => {
    if (map.has(name)) {
      sendInterface = Object.assign(sendInterface, map.get(name))
    } else {
    }
  }
  const saveSendInterface: (name: string | string[]) => void = (name) => {
    map.set(name, Object.assign(map.get(name), sendInterface))
  }
  //更新edit数据
  const changeEditInterface: (name: string | string[]) => void = (name) => {
    if (map.has(name)) {
      console.log('更新的接口名称' + name)
      console.log('更新前', editInterface.req_headers)
      editInterface = Object.assign(editInterface, map.get(name))
      if(!map.get(name).req_headers){
        editInterface.req_headers.splice(0)
      }
      if(!map.get(name).req_query){
        editInterface.req_query.splice(0)
      }

      console.log('更新后', editInterface.req_headers)

    } else {
    }
  }
  const saveEditInterface: (name: string | string[]) => void = (name) => {
    hasEdit.value = !hasEdit.value
    // map.set(name,JSON.parse(JSON.stringify(editInterface.value)))
    map.set(name, Object.assign(map.get(name), editInterface))
    changeSendInterface(name)
    hasEdit.value = !hasEdit.value
  }
  const saveHasEdit: () => void = () => {
    hasEdit.value = !hasEdit.value
  }
  const hasEdit = ref(false)
  return {
    saveHasEdit,
    interfaceInfos,
    map,
    editInterface,
    sendInterface,
    hasEdit,
    changeEditInterface,
    saveEditInterface,
    changeSendInterface,
    saveSendInterface,
    editReqHeaders
  }

})

//axios示例
export const useUserStore = defineStore('user', {
  // 定义状态：一个函数，返回一个对象
  state: () => ({
    username: '',
    token: ''
  }),
  // 定义 getters，等同于组件的计算属性
  getters: {
    // getter 函数接收 state 作为参数，推荐使用箭头函数
    hello: (state) => 'Hello!' + state.username
  },
  actions: {
    //   async login(userData:any) {
    //     const result = await axios.post('api/user/login', userData)
    //     const { data, code } = result.data
    //     if (code === 0) {
    //       //aciton修改状态
    //       this.username = data.username
    //       this.token = data.token
    //     }
    //   },
    //同步
    logout() {
      this.token = ''
      this.username = ''
    }
  }
})
