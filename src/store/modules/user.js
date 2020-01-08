import { getToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'
import { resetRouter } from '@/router'
import Vue from 'vue'

const state = {
  token: getToken().userId,
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { mobile, username, password, code, verifycode } = userInfo
    return new Promise((resolve, reject) => {
      Vue.jsonp(process.env.VUE_APP_LOGIN_API + '/api/user/blogin',
        {
          user_name: username.trim() || mobile,
          passwd: password,
          code,
          verifycode,
          appid: 30004
        }
      ).then(res => {
        resolve(res)
      }).catch(err => {
        console.log(err)
      })
    })
  },

  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      let { userId, token, sessionId } = getToken()
      console.log(userId, token, sessionId)
      Vue.jsonp(process.env.VUE_APP_LOGIN_API + '/api/sso/sso_logout',
        {
          user_id: userId,
          token,
          session_id: sessionId
        }
      ).then(res => {
        if (res.code === 1000) {
          console.log('ok')
          Cookies.remove('B_UID', { path: '/', domain: '.leju.com' })
          dispatch('permission/resetRouter', [], { root: true })
          removeToken()
          resetRouter()
          resolve()
        }
      }).catch(err => {
        console.log(err)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
