import {createApp} from 'vue'
import App from './App.vue'
import './index.css'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@element-plus/icons-vue'

import router from "./router/router";

import axios from 'axios'


axios.defaults.baseURL = 'http://localhost:6060'

const app = createApp(App)
app.use(ElementPlus)
    .use(router)
    .config.globalProperties.$http = axios
app.mount('#app')