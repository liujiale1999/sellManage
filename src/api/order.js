/* 
    订单功能模块
*/

// 引入封装的ajax工具函数
import req from '@/utils/request.js'

// 22.获取订单列表/order/list
export const getOrderList = (params) => {
    return req.get('/order/list', params)
}


//24.获取订单详情/order/detail
export const OrderDetails = (params) => {
    return req.get('/order/detail', params)
}

//25.修改订单/order/edit
export const EditOrder = (params) => {
    return req.post('/order/edit', params)
}



// 30.获取首页报表数据
export const getOrderData = () => {
    return req.get('/order/totaldata',)
}

// 31.获取订单报表数据
export const getOrderTotal = (params) => {
    return req.get('/order/ordertotal', params)
}

