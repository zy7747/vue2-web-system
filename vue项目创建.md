# 创建项目

## 创建项目目录

```bash
vue create "新建的文件夹名字" 
```

## 依赖下载

```
"vue-i18n": "^8.28.2",
"axios": "^1.1.3",
"js-cookie": "^3.0.1",
"screenfull": "^6.0.2",
"svg-sprite-loader": "^6.0.11",
"element-ui": "^2.15.10",
"hover.css": "^2.3.2",
"xe-utils": "^3.5.7",
"path-browserify": "^1.0.1",
```

## 文件夹创建

### apis

```js
export default {
  login: {
    url: '/user/login',
    method: 'get',
    app: 'user',
    text: '用户登录'
  },
}
```

### components

```js
// 全局组件
import Vue from 'vue'

import CInput from './CInput/index.vue'

Vue.component('CForm', CForm)

```

### directive

```js
import Vue from 'vue'

import drag from './drag'

Vue.directive('drag', drag)
```

### i18n

```js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
// 从语言包文件中导入语言包对象
import zh from './locales/zh'
import en from './locales/en'
import jp from './locales/jp'
import kr from './locales/kr'

// 从LocalStorage中引入保存的语言

Vue.use(VueI18n)

const messages = {
  zh,
  en,
  jp,
  kr
}

let lang = JSON.parse(localStorage.getItem('language'))

// 处理language
if (!lang) {
  lang = 'zh'
} else {
  lang = lang.language
}
const i18n = new VueI18n({
  messages,
  locale: lang
})

export default i18n
```

### icon

```js
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg组件

Vue.component('SvgIcon', SvgIcon)

const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)

requireAll(req)
```

### plugin

#### apis

```js
import Vue from 'vue'
import service from '@/utils/request'
import lodash from 'lodash'

// 创建axios实例
const apis = require.context('@/apis', true, /[A-Za-z0-9-_,\s]+\.js$/i)

var nodes = {}

// 1.循环获取Api
apis.keys().forEach((path) => {
  let api = apis(path)

  if (api) {
    api = api.default
  }

  getFileName(path, api)
})

// 2. 路径处理
function getFileName(path, api) {
  // 1.分割
  const pathArr = path.split('/')
  // 2.删除 .
  pathArr.shift()
  // 3.深层递归合并组成树型
  lodash.merge(nodes, nodeTree(pathArr, 0, api))
}

// 3.节点递归
function nodeTree(list, i, api) {
  if (list.length > i) {
    const item = list[i]
    if (item.indexOf('.js') !== -1) {
      // Api封装
      const fileName = item.replace('.js', '')
      const obj = {}
      for (const key in api) {
        obj[key] = (data) => serve(config(api[key]), data)
      }
      return {
        [fileName]: obj
      }
    } else {
      // 结果封装
      const obj = {}
      obj[item] = nodeTree(list, ++i, api)
      return obj
    }
  }
}

// 4.api配置
function config(api = {}) {
  const config = {}

  config.method = api.method || 'post'

  config.url = api.url || ''

  if (api.blob) {
    config.responseType = 'blob'
  }

  if (api.responseType) {
    config.responseType = api.responseType
  }

  if (api.baseURL) {
    config.baseURL = api.baseURL
  }

  if (api.headers) {
    config.headers = api.headers
  }

  return config
}

// 5.请求封装
const serve = (config, data) => {
  if (config.method === 'GET' || config.method === 'get') {
    return service({ ...config, params: data })
  } else {
    return service({ ...config, data: data })
  }
}

Vue.prototype.$service = nodes

export default nodes
```

#### download

```js
import Vue from 'vue'

const download = {
  // 下载 Excel 方法
  excel(data, fileName) {
    this.download(data, fileName, 'application/vnd.ms-excel')
  },

  // 下载 Zip 方法
  zip(data, fileName) {
    this.download(data, fileName, 'application/zip')
  },

  // 下载 Html 方法
  html(data, fileName) {
    this.download(data, fileName, 'text/html')
  },

  // 下载 Markdown 方法
  markdown(data, fileName) {
    this.download(data, fileName, 'text/markdown')
  },

  // 下载 pdf 方法
  pdf(data, fileName) {
    this.download(data, fileName, 'application/pdf')
  },

  download(data, fileName, mineType) {
    // 创建 blob
    let blob = new Blob([data], { type: mineType })
    // 创建 href 超链接，点击进行下载
    window.URL = window.URL || window.webkitURL
    let href = URL.createObjectURL(blob)
    let downA = document.createElement('a')
    downA.href = href
    downA.download = fileName
    downA.click()
    // 销毁超连接
    window.URL.revokeObjectURL(href)
  }
}

Vue.prototype.$download = download

export default download
```

### utils

#### auth

```js
import Cookies from 'js-cookie'

const TokenKey = 'Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
```

#### debounce

```js
//防抖的函数
function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    //这里利用了闭包
    clearTimeout(timeout);

    if (immediate) {
      //立即执行
      let callNow = !timeout;
      //如果是第一次点的话，timeout是没有值的

      timeout = setTimeout(function () {
        timeout = null;
      }, wait);

      if (callNow) {
        func();
      }
    } else {
      //不会立即执行
      timeout = setTimeout(func(), wait);
    }
  };
}

let count = 0;

let container = document.querySelector("#container");

//为了展示事件是如何频繁发生
function doSomeThing() {
  container.innerHTML = count++;
}

container.onmousemove = debounce(doSomeThing, 300, true);
//注意这时候debounce的agruments装的是事件对象mousemove
//这个true是为了一开始立即执行
```

#### request

```js
import axios from 'axios'
import { Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
  // baseURL: '/devApis',
  baseURL: 'http://localhost:8081',
  timeout: 15000, // 请求超时时间
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  async(response) => {
    switch (response.status) {
      case 200:
        return response.data
      case 400:
        console.log('发出信息有误')
        break
      case 401:
        //清除token 跳转至登录页
        Message.error('用户没有权限（令牌、用户名、密码错误）')
        break
      case 403:
        console.log('用户得到授权，但是访问是被禁止的')
        break
      case 404:
        console.log('访问资源不存在')
        break
      case 406:
        console.log('请求格式不可得')
        break
      case 410:
        console.log('请求资源被永久删除，且不会被看到')
        break
      case 500:
        console.log('服务器发生错误')
        break
      case 502:
        console.log('网关错误')
        break
      case 504:
        Message.error('网关超时')
        break
      default:
        console.log('无此状态码,请检查状态码是否正确')
        break
    }
  },
  (error) => {
    Message.error('服务器无响应')
    return Promise.reject(error)
  }
)

export default service
```

#### validate

```js
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
// form 表单验证数字
export const numValidate = (rule, value, callback) => {
  if (!value) return callback()
  let reg = /^\d+(?=\.{0,1}\d+$|$)/
  let message = ''
  if (!reg.test(value)) {
    message = '请输入数字'
    callback(new Error(message))
  } else {
    callback()
  }
}

  
/**
   * @param {string} url
   * @returns {Boolean}
   */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}
  
/**
   * @param {string} email
   * @returns {Boolean}
   */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}
  
/**
   * @param {string} str
   * @returns {Boolean}
   */
export function isString(str) {
  return typeof str === 'string' || str instanceof String
  
}
  
/**
   * @param {Array} arg
   * @returns {Boolean}
   */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}
```

### permission

```js
import router from '@/router'

import { getToken } from './utils/auth'
router.beforeEach((to, from, next) => {
  const token = getToken()
  const url = to.path

  const whiteList = ['/login', '/register', '/404', '/500']
  // 1. 已登录 去登录页 -> 跳转首页
  if (token && url === '/login') {
    next('/home')
  }
  // 2. 已登录 不是登录页 -> 放行
  if (token && url !== '/login') {
    next()
  }
  // 3. 未登录 在白名单 -> 放行
  if (!token && whiteList.indexOf(url) !== -1) {
    next()
  }
  // 4. 未登录 不在白名单 -> 登录页
  if (!token && whiteList.indexOf(url) === -1) {
    next('/login')
  }
})

export default router

```

## APP.VUE

```js
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss"></style>
```

## main.js

```js
import Vue from 'vue'
import App from './App.vue'
import router from '@/permission'
import store from './store'
import i18n from './i18n'
import '@/directive'


//插件
import '@/plugin/apis'
import '@/plugin/element'
import '@/plugin/modal'
import '@/plugin/download'

//样式
import '@/icons'
import '@/styles/index.scss'
import 'hover.css'

//全局组件
import '@/components'

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
```

## vue.config.js

```js
const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const name = '标题' // 网页标题

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: true,

  devServer: {
    port: 3002
    // host: 'localhost',
    // proxy: {
    //   '/devApis': {
    //     target: 'http://localhost:8080',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/devApis': ''
    //     }
    //   }
    // }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      },
      fallback: {
        path: require.resolve('path-browserify')
      }
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
})
```

