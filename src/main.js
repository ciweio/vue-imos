import {createApp} from 'vue'
import App from './App.vue'
import './index.css'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from "./router/router";

import axios from 'axios'


axios.defaults.baseURL = 'http://localhost/imos'

const app = createApp(App)
app.use(ElementPlus)
    .use(router)
    .config.globalProperties.$http = axios
app.mount('#app')