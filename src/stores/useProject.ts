import axios from 'axios'
import { defineStore } from 'pinia'
import {reactive} from 'vue'

export const projectStore = defineStore('project', {
  state:()=>({
    gid:0,
    itemID:0,
    flash:true,
    reload:true,
    del:true,
  }),
  getters:{},
  actions:{}
})