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


]



const router = new VueRouter({
  routes
})




// 路由守卫
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


// 异步路由配置
const asyncRoutes = [
  //登录
  {
    path: '/login',
    meta: { isNav: false },
    component: Login
  },

  //后端默认
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: { title: '后台首页', icon: 'icon-houtai1' },
    children: [
      { path: '/home', component: () => import('@/views/Home/index.vue') }
    ]
  },
  // 订单管理
  {
    path: '/order',
    component: Layout,
    redirect: '/order/order-list',
    meta: { title: '订单管理', icon: 'icon-dingdanguanli' },
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
    meta: { title: '商品管理', icon: 'icon-shangpin' },
    children: [
      { meta: { title: '商品添加' }, path: '/goods/goods-add', component: () => import('@/views/Goods/GoodsAdd.vue') },
      { meta: { title: '商品分类' }, path: '/goods/goods-cate', component: () => import('@/views/Goods/GoodsCate.vue') },
      { meta: { title: '商品列表' }, path: '/goods/goods-list', component: () => import('@/views/Goods/GoodsList.vue') },
    ]
  },

  // 店铺管理
  {
    path: '/shop',
    component: Layout,
    meta: { title: '店铺管理', roles: ['super'], icon: 'icon-dianpu' },
    children: [
      { path: '', component: () => import('@/views/Shop/index.vue') }
    ]
  },

  // // 账号管理
  {
    path: '/account',
    component: Layout,
    redirect: '/account/account-list',
    meta: { title: '账号管理', roles: ['super', 'normal'], icon: 'icon-zhanghao' },
    children: [
      { meta: { title: '账号添加', roles: ['super'] }, path: '/account/account-add', component: () => import('@/views/Account/AccountAdd.vue') },
      { meta: { title: '账号列表', roles: ['super'] }, path: '/account/account-list', component: () => import('@/views/Account/AccountList.vue') },
      { meta: { title: '修改密码' }, path: '/account/pass-modify', component: () => import('@/views/Account/PassModify.vue') },
      { meta: { title: '个人中心' }, path: '/account/personal', component: () => import('@/views/Account/Personal.vue') },
    ]
  },

  // //销售统计
  {
    path: '/total',
    component: Layout,
    redirect: '/total/goods-total',
    meta: { title: '销售统计', roles: ['super'], icon: 'icon-xiaoshoutongji' },
    children: [
      { meta: { title: '商品统计' }, path: '/total/goods-total', component: () => import('@/views/Total/GoodsTotal.vue') },
      { meta: { title: '订单统计' }, path: '/total/order-total', component: () => import('@/views/Total/OrderTotal.vue') }
    ]
  },

  //404页面
  {
    path: '/404',
    meta: { isNav: false },
    component: () => import('@/views/Error404/Error404.vue')
  },
  {
    path: '*',
    meta: { isNav: false },
    redirect: '/404'
  }
]


// 创建动态路由
export function createRoutes() {
  let role = local.get('role')
  if (!role) {
    return
  }

  // 计算出有权限访问的路由
  let accessRoutes = calcRoutes(asyncRoutes, role)

  // 添加动态路由【把算出来的路由 动态添加合并到原来的路由中】
  router.addRoutes(accessRoutes)//有一个bug  会无限的往router里边加路由

  // 计算菜单
  let menus = calcMenus(accessRoutes)
  // 存入本地
  local.set('menus', menus)
}

// 调用一次
createRoutes()

// 计算出有权限访问的路由
function calcRoutes(asyncRoutes, role) {
  let accessRoutes = asyncRoutes.filter(item => {
    if (hasPermission(item, role)) {

      //  递归过滤儿子
      if (item.children && item.children.length) {
        item.children = calcRoutes(item.children, role);
      }

      return true
    } else {
      return false
    }
  })
  return accessRoutes
}

// 判断是否有权限
function hasPermission(router, role) {
  if (router.meta && router.meta.roles) {
    return router.meta.roles.includes(role)
  } else {
    return true //没有配置默认都可以访问
  }

}

// 计算菜单
function calcMenus(accessRoutes) {
  //筛选出在左侧展示的导航
  let navArr = accessRoutes.filter(item => {
    if (item.meta && item.meta.hasOwnProperty('isNav')) {
      return item.meta.isNav
    } else {
      return true
    }
  })
  return navArr
}


export default router
