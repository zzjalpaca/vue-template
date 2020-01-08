import axios from '@/utils/request'

const user = {
  // 登录
  login: (data) => {
    return axios({
      url: '/user/blogin',
      method: 'post',
      data
    })
  },
  // 用户信息
  getInfo: (params) => {
    return axios({
      url: '/admin/users/user_list',
      method: 'get',
      params
    })
  },
  // 列表搜索条件
  logout: (params) => {
    return axios({
      url: '/admin/users/search_condition',
      method: 'get',
      params
    })
  },
  // 用户权限列表-菜单使用
  getRightList: (params) => {
    return axios({
      url: 'https://zzjalpaca.github.io/mock/json/getRightList.json',
      method: 'get',
      params
    })
  }
}

export default user
