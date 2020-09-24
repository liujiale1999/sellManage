import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入element-ui
import ElementUI from 'element-ui'; // JS
import 'element-ui/lib/theme-chalk/index.css'; // CSS
Vue.use(ElementUI); // 注册一下

//引入字体和重置样式
import '@/assets/css/reset.css'
import '@/assets/fonts/iconfont.css'

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts


// 中央事件总线bus
Vue.prototype.$bus = new Vue()


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
