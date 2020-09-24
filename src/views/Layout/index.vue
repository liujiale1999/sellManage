<template>
    <div class="layout">
        <!-- 后台页面 -->
        <!-- 导航 -->
            <Nav />
        <!-- 内容部分 -->
            <Right />

        
    </div>
</template>

<script>
//引入导航和right组件
import Nav from "./Nav.vue"
import Right from "./Right"
    export default {
        components:{
            Nav,
            Right
        }
    }
</script>

<style lang="less" scoped>
.layout{
    height: 100%;
    display: flex;
}
</style>