/* 
    商城功能模块
*/


// 引入封装的ajax工具函数
import req from '@/utils/request.js'

// 12.添加分类
export const goods_addcate = (params) => {
    return req.post('/goods/addcate', params)
}

// 13.获取分类
export const goods_catelist = (params) => {
    return req.get('/goods/catelist', params)
}

// 14.删除分类
export const goods_delcate = (params) => {
    return req.get('/goods/delcate', params)
}

// 15.修改分类
export const goods_editcate = (params) => {
    return req.post('/goods/editcate', params)
}

// 16.查询所有分类名称
export const getCategories = (params) => {
    return req.get('/goods/categories', params)
}

// 18.添加商品
export const Addgoods = (params) => {
    return req.post('/goods/add', params)
}

// 19.获取商品列表
export const getGoodsList = (params) => {
    return req.get('/goods/list', params)
}

// 20.删除商品
export const delGoods = (params) => {
    return req.get('/goods/del', params)
}

//21.修改商品列表
export const EditGoodsList = (params) => {
    return req.post('/goods/edit', params)
}