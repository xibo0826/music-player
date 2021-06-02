import Vue from 'vue'
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

axios.defaults.baseURL = 'https://autumnfish.cn/'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true

axios.interceptors.request.use((config) => {
  NProgress.start()
  return config
})

axios.interceptors.response.use(
  (response) => {
    NProgress.done()
    return response
  },
  (error) => {
    NProgress.done()
    if (error.status !== 200) {
      window.vm.$message({ type: 'danger', message: error.message })
    }
  }
)

Vue.prototype.$http = axios

