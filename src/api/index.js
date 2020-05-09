import {get,post} from '@/utils/request'

export const apiAddress = (params) => get('https://vue-js.com/api/v1/topics', params);
//组织展示
export const AJuDeps=(params)=>get('/AJuDeps',params);
//组织架构部门人员
export const staffList=(params)=>post('/AJuDeps',params);
//创建部门获取角色
export const AJuDepC=(params)=>get('/AJuDepC',params);
//创建部门
export const create=(params)=>post('/AJuDepC',params);
export const AUsRegs=(params)=>get('/AUsRegs',params)  //邀请成员获取邀请链接
export const getARegi=(params)=>get('/ARegi',params)  //注册页面请求数据接口
export const ARegi=(params)=>post('/ARegi',params)  //用户注册接口
export const ARoLi=(params)=>get('/ARoLi',params)   //权限组角色列表
//删除部门
export const AJuDepCDe=(params)=>post('/AJuDepCDe',params);
//编辑部门
export const AJuDepCUp=(params)=>post('/AJuDepCUp',params);
//修改身份账号
export const AJuRolsUp=(params)=>post('/AJuRolsUp',params);