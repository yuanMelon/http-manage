import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useInterface2Store = defineStore('interface2', {
    state:()=>({
        path:''
    }),
    getters:{},
    actions:{}
})
//接口数据格式
interface interfaceInfo  {
    title:string,
    path:string,
    status:'done'|'undone'
    up_time:number,
    /**临时,创建者id(它有很多个id) */
    uid:number,
    desc:string
}
export const useInterfaceStore = defineStore('interface', ()=>{
    const interfaceInfos:Array<interfaceInfo> = [{
        title:'接口名称',
        path:'/home',
        status:"done",
        up_time:112233,
        uid:11,
        desc:'<p>查看接口备注</p>'
    },
    {
        title:'接口名称2',
        path:'/interface',
        status:"done",
        up_time:2112233,
        uid:12,
        desc:'<p>2:查看接口备注</p>'
    }]
    return {interfaceInfos}
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