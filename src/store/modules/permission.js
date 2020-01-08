import { constantRoutes } from '@/router'
import user from '@/api/modules/user'
import { filterAsyncRoutes } from '@/utils/index'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      user.getRightList().then(res => {
        let accessedRoutes = filterAsyncRoutes(res.entry)
        // 默认跳转路径
        let firstAccessUrl = res.entry[0].child_list[0].child_list[0].url_complete
        console.log(accessedRoutes, 111)
        accessedRoutes.push({
          path: '/',
          redirect: firstAccessUrl
        })
        accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    })
    // commit('SET_ROUTES', [])
  },
  resetRouter({ commit }, routes) {
    commit('SET_ROUTES', routes)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
