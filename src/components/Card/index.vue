<template>
<!-- 卡片插槽 -->
   <el-card class="box-card">
       <!-- 标题 -->
       <div slot="header" class="clearfix">
        <slot name="title"></slot>
      </div>

      <!-- 内容 -->
      <slot name="content" />
      
   </el-card>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>

</style>