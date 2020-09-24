import Vue from 'vue'
import VueRouter from 'vue-router'
//引入组件
import Login from '@/views/Login'
import Layout from '@/views/Layout'
//引入本地存储
import local from "@/utils/local"


// 解决警告
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(VueRouter)




//路由配置
const routes = [
  //登录
  {
    path: '/login',
    component: Login
  },

  //后端默认
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: { title: '后台首页' },
    children: [
      { path: '/home', component: () => import('@/views/Home/index.vue') }
    ]
  },

  // 订单管理
  {
    path: '/order',
    component: Layout,
    redirect: '/order/order-list',
    meta: { title: '订单管理' },
    children: [
      { path: '/order/order-edit', component: () => import('@/views/Order/OrderEdit.vue') },
      { path: '/order/order-list', component: () => import('@/views/Order/OrderList.vue') },
    ]
  },

  // 商品管理
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/goods-list',
    meta: { title: '商品管理' },
    children: [
      { meta: { title: '商品添加' }, path: '/goods/goods-add', component: () => import('@/views/Goods/GoodsAdd.vue') },
      { meta: { title: '商品分类' }, path: '/goods/goods-cate', component: () => import('@/views/Goods/GoodsCate.vue') },
      { meta: { title: '商品列表' }, path: '/goods/goods-list', component: () => import('@/views/Goods/GoodsList.vue') },
    ]
  },

  // // 店铺管理
  {
    path: '/shop',
    component: Layout,
    meta: { title: '店铺管理' },
    children: [
      { path: '', component: () => import('@/views/Shop/index.vue') }
    ]
  },

  // // 账号管理
  {
    path: '/account',
    component: Layout,
    redirect: '/account/account-list',
    meta: { title: '账号管理' },
    children: [
      { meta: { title: '账号添加' }, path: '/account/account-add', component: () => import('@/views/Account/AccountAdd.vue') },
      { meta: { title: '账号列表' }, path: '/account/account-list', component: () => import('@/views/Account/AccountList.vue') },
      { meta: { title: '修改密码' }, path: '/account/pass-modify', component: () => import('@/views/Account/PassModify.vue') },
      { meta: { title: '个人中心' }, path: '/account/personal', component: () => import('@/views/Account/Personal.vue') },
    ]
  },

  // //销售统计
  {
    path: '/total',
    component: Layout,
    redirect: '/total/goods-total',
    meta: { title: '销售统计' },
    children: [
      { meta: { title: '商品统计' }, path: '/total/goods-total', component: () => import('@/views/Total/GoodsTotal.vue') },
      { meta: { title: '订单统计' }, path: '/total/order-total', component: () => import('@/views/Total/OrderTotal.vue') }
    ]
  },
]



const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {

  // to: 你要到哪里去？   即将要进入的目标 路由对象
  // from: 你从哪里来？   当前导航正要离开的路由
  // next: 走你 【放行】  是一个函数 必须调用这个函数，才能继续访问路由

  //查看本地是否有token  判断是否登录过
  let isLogin = local.get('t_k') ? true : false
  if (isLogin) {
    next()//让他走
  } else {
    if (to.path === '/login') {//如果它想去登录
      next()
    } else {
      next('/login')
    }
  }
})

export default router
