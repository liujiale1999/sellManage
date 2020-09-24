/*
    ajax函数
*/

// 引入axios和qs
import axios from 'axios'
import Qs from 'qs'
// 引入message弹窗组件
import { Message } from 'element-ui'
// 引入本地存储
import local from '@/utils/local.js'

// 设置默认请求api
axios.defaults.baseURL = 'http://127.16.17.184:5000'



// 设置请求拦截器
axios.interceptors.request.use((config) => {
    let token = local.get('t_k') || ''
    if (token) {
        config.headers.Authorization = token
    }
    return config
})

// 设置响应拦截器
axios.interceptors.response.use((response) => {
    if (response.data.hasOwnProperty('code') && response.data.hasOwnProperty('msg')) {
        let { code, msg } = response.data
        if (code === 0) {
            Message({
                type: 'success',
                message: msg
            })
        } else if (code === 1) {
            Message.error(msg);
        }
    }
    return response.data
})


const req = {
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params
            }).then(response => {
                resolve(response)
            }).catch(err => {
                reject(err)
            })
        })
    },
    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, Qs.stringify(params))
                .then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    }
}

export default req;