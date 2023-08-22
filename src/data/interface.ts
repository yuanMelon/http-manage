//接口
export interface Interface {
  /**
   * 创建时间
   */
  cTime: string
  /**
   * 接口备注
   */
  desc: string
  /**
   * 方法
   */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD'
  /**
   * 接口路径
   */
  path: string
  /**
   * 参数
   */
  params: InterfaceParam[]
  /**
   * 接口所在项目id
   */
  pid: string
  /**
   * 接口body类型
   */
  reqBodyFrom: string
  /**
   * 接口标头
   */
  reqHeaders: InterfaceReqHeader[]
  /**
   * 接口请求路径
   */
  reqParams: InterfaceReqParma[]
  /**
   * 接口请求参数
   */
  reqQuery: InterfaceReqQuery[]
  /**
   * 接口响应体
   */
  resBody: { [key: string]: any }
  /**
   * 接口响应体格式
   */
  resBodyType: string
  /**
   * 接口状态
   */
  status: string
  /**
   * 接口名称
   */
  title: string
  /**
   * 更新时间
   */
  uTime: string
  /**
   * 接口创建者id
   */
  uid: string
  /**
   * 接口id
   */
  id: string
}

export interface InterfaceReqHeader {
  /**
   * 标头的说明
   */
  desc: string
  /**
   * 标头的例子
   */
  example: string
  /**
   * 标头id
   */
  id?: string
  /**
   * 标头名称
   */
  name: string
  /**
   * 标头是否必须
   */
  required: string
  /**
   * 标头的值
   */
  value: string,
  [key: string]: string|undefined
}
//暂时不用
export interface InterfaceReqParma {
  还是空Yapi好像没有: string
}
//接口-请求-格式
export interface InterfaceReqQuery {
  /**
   * 参数介绍
   */
  desc: string
  /**
   * 参数例子
   */
  example: string
  /**
   * 参数id
   */
  id?: string
  /**
   * 参数名称
   */
  name: string
  /**
   * 参数是否必须
   */
  required: string
  [key: string]: string|undefined; // 这里的 any 可以根据你的实际需求进行调整
}
//接口-
export interface InterfaceParam {
  id: string
  name: string
  value: string
}
//接口数据格式
export interface interfaceInfo  {
  title:string,
  path:string,
  status:'done'|'undone'
  up_time:number,
  /**临时,创建者id(它有很多个id) */
  uid:number,
  desc:string
}
//初始化的接口(摆烂)
export const initialInterface: Interface = {
  cTime: '',
  desc: '',
  method: 'GET',
  path: '',
  params: [],
  pid: '',
  reqBodyFrom: '',
  reqHeaders: [],
  reqParams: [],
  reqQuery: [],
  resBody: {},
  resBodyType: '',
  status: 'undone',
  title: '',
  uTime: '',
  uid: '',
  id: ''
};
