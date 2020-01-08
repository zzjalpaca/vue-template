import axios from '@/utils/request'

const account = {
  // 账号列表
  cityLeadList: (params) => {
    return axios({
      url: 'https://zzjalpaca.github.io/mock/json/cityLeadList.json',
      method: 'get',
      params
    })
  },
  // 列表搜索条件
  searchCondition: (params) => {
    return axios({
      url: '/admin/users/search_condition',
      method: 'get',
      params
    })
  },

  // 角色列表
  roleList: (params) => {
    return axios({
      url: '/admin/users/role_list',
      method: 'get',
      params
    })
  },
  // 权限列表-角色编辑中使用的功能权限列表
  getRightList: (params) => {
    return axios({
      url: '/admin/users/get_right_list',
      method: 'get',
      params
    })
  },
  // 角色修改/设置
  roleUpdate: (data) => {
    return axios({
      url: '/admin/users/role_update',
      method: 'post',
      data
    })
  },
  // 角色新增
  roleAdd: (data) => {
    return axios({
      url: '/admin/users/role_add',
      method: 'post',
      data
    })
  },
  // 获取用户数据权限信息
  getUseRights: (params) => {
    return axios({
      url: '/admin/users/get_user_rights',
      method: 'get',
      params
    })
  },
  // 数据权限设置
  userRights: (data) => {
    return axios({
      url: '/admin/users/user_rights',
      method: 'post',
      data
    })
  },
  // 账号开通
  userAdd: (data) => {
    return axios({
      url: '/admin/users/user_add',
      method: 'post',
      data
    })
  },
  // 数据权限设置
  userStatus: (data) => {
    return axios({
      url: '/admin/users/user_status',
      method: 'post',
      data
    })
  },
  // 角色设置
  userRole: (data) => {
    return axios({
      url: '/admin/users/user_role',
      method: 'post',
      data
    })
  },
  // 根据邮箱搜索用户信息
  getUserByEmail: (params) => {
    return axios({
      url: '/admin/users/get_user_by_email',
      method: 'get',
      params
    })
  }
}

export default account
