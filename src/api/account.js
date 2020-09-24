/*
    账号功能模块相关请求
*/


// 引入封装的ajax工具函数
import req from '@/utils/request.js'

// 1.登录
export const checkLogin = (params) => {
    return req.post('/users/checkLogin', params)
}

// 2.添加
export const addAcc = (params) => {
    return req.post('/users/add', params)
}

// 3.账号列表
export const getAccList = (params) => {
    return req.get('/users/list', params)
}

// 4.删除账号
export const delAcc = (params) => {
    return req.get('/users/del', params)
}

// 5.批量删除
export const batchDel = (params) => {
    return req.get('/users/batchdel', params)
}

// 6.修改账号
export const editAcc = (params) => {
    return req.post('/users/edit', params)
}

//7.检测旧密码
export const checkoldpwd = (params) => {
    return req.get('/users/checkoldpwd', params)
}

// 8.修改密码
export const editpwd = (params) => {
    return req.post('/users/editpwd', params)
}

// 9.个人中心
export const getInfo = (params) => {
    return req.get('/users/info', params)
}

// 10.头像上传接口
export const avatar_upload = (params) => {
    return req.get('/users/avatar_upload ', params)
}

// 11.修改用户头像
export const users_avataredit = (params) => {
    return req.get('/users/avataredit', params)
}

