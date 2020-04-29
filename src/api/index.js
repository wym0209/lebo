import {get,post} from '@/utils/request'

export const apiAddress = (params) => get('https://vue-js.com/api/v1/topics', params);

//组织架构列表
export const divisionList = (params) => get('http://39.97.165.143/api/AJuDeps',params);