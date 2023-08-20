import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { interfaceInfo } from '../data/interface'
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
const obj = JSON.parse('{\
  "path": "amet esse do",\
  "title": "接口3",\
  "uid": "52",\
  "pid": "11",\
  "c_time": "1991-11-19 13:06:02",\
  "u_time": "1982-02-18 09:24:33",\
  "status": "undone",\
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
          "name": "济口由",\
          "value": "deserunt laboris eu",\
          "example": "sint commodo sunt tempor",\
          "desc": "consequat non ut eu cillum"\
      }\
  ],\
  "req_body_from": "irure minim eu non magna",\
  "res_body": {},\
  "res_body_type": "dolor reprehenderit laboris",\
  "method": "velit",\
  "parmas": [\
      {\
          "id": "79",\
          "name": "眼红历加口术",\
          "value": "dolor reprehenderit in tempor"\
      }\
  ]\
}')
//不好,它的表格真是智能,我在写出正确数据前还是摆烂吧
// const obj = JSON.parse('{"name":"lolo"}')
console.log(obj)
export const useInterfaceStore = defineStore('interface', () => {
  const map = new Map()
  map.set('接口名称', {
    title: '接口名称',
    path: '/home',
    status: 'done',
    up_time: 112233,
    uid: 11,
    desc: '<p>查看接口备注</p>'
  })
  map.set('接口名称2', {
    title: '接口名称2',
    path: '/interface',
    status: 'done',
    up_time: 2112233,
    uid: 12,
    desc: '<p><strong>查看接口备注</strong><br><s>会变大嘛?</s></p><h1>希望不会啦</h1><p>会的,但…'
  })
  map.set('接口3',obj)
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
  return { interfaceInfos, map }
  // const fun =async function():Promise<T>{
  //     await const result = ('')
  //     return ;
  // }
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
