/* 
    引入店铺功能模块
*/

// 引入封装的ajax工具函数
import req from '@/utils/request.js'

//26.获取店铺详情
export const getShopInfo = () => {
    return req.get('/shop/info')
}




//28.店铺内容修改
export const shopEdit = (params) => {
    return req.post('/shop/edit', params)
}