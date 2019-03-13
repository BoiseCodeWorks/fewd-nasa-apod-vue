import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

const _nasaApi = Axios.create({
  baseURL: 'https://api.nasa.gov/planetary'
})

let _apiKey = '?api_key=Trq8EGLRbZZWwRVqYUNWkinr4ulR2Ajlgh5qRPoV'

export default new Vuex.Store({
  state: {
    apod: {}
  },
  mutations: {
    apod(state, apodData) {
      state.apod = apodData
    }
  },
  actions: {
    getApod({commit}, date) {
      let _queryParameters = _apiKey
      if(date) {
        _queryParameters += '&date=' + date
      }
      _nasaApi.get('apod' + _queryParameters)
        .then(res => {
          console.log(res)
          commit('apod', res.data)
        })
        .catch(e => console.error(e))
    }
  }
})
