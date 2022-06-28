import axios from 'axios'
import Cookie from 'js-cookie'
import decode from 'jwt-decode'

const JWT_TOKEN = 'scar_token'

function getToken() {
    return Cookie.get(JWT_TOKEN)
}

function isTokenExpired (token) {
    const tokenDecoded = decode(token)
    if (!tokenDecoded.exp) {
      return null
    }
  
    const date = new Date(0)
    date.setUTCSeconds(tokenDecoded.exp)
  
    return date < new Date()
  }

export default {
    namespaced: true,
    state: {
        isLoggedIn: false,
        username: '',
        email_address: '',
        isAdmin: false,
        token: ''
    },
    mutations: {
        login: (state, userInfo) => {
            state.isLoggedIn = true
            state.username = userInfo.username
            state.token = userInfo.token
        },
        logout: state => {
            state.isLoggedIn = false
            state.username = ''
            state.isAdmin = false
            state.token = ''
        }
    },
    actions: {
        async authenticate({dispatch}, loginInfo) {
            let response = await axios.post(`/user/api/authenticate`, loginInfo)

            Cookie.set(JWT_TOKEN, response.data.token, {
                expires: new Date(response.data.expires),
                secure: location.protocol === 'https:'
              })

            dispatch('checkLoggedIn')
        },
        checkLoggedIn({commit}) {
            const token = getToken()

            if(token) {
                if(isTokenExpired(token)) {
                    commit('logout')
                    Cookie.remove(JWT_TOKEN)
                    return
                }

                const tokenDecoded = decode(token)

                commit('login', {
                    username: tokenDecoded.user.username,
                    token: token
                })

            } else {
                commit('logout')
            }
        },
        logout({dispatch}){
            Cookie.remove(JWT_TOKEN)
            dispatch('checkLoggedIn')
        }
    }
}