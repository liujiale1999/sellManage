<template>
  <div class="OrderTotal">
    <el-row :gutter="20" class="list">
      <el-col v-for="item in cardList" :key="item.title" :md="6" :sm="12">
        <myCard :icon="item.icon" :title="item.title" :num="item.num"></myCard>
      </el-col>
    </el-row>

    <myLine :options="options"></myLine>
  </div>
</template>

<script>
// 引入订单统计组件
import myCard from "@/components/myCard.vue";
import { getOrderData } from "@/api/order.js";
import myLine from "@/components/myLine.vue"; //报表组件

export default {
  data() {
    return {
      cardList: [
        {
          icon: "icon iconfont icon-dingdan",
          title: "总订单",
          num: 0,
        },

        {
          icon: "icon iconfont icon-jinbi",
          title: "总销售额",
          num: 0,
        },
        {
          icon: "icon iconfont icon-ic_salesadvice",
          title: "今日订单数",
          num: 0,
        },
        {
          icon: "icon iconfont icon-jinbi1",
          title: "今日销售额",
          num: 0,
        },
      ],
      options: {},
    };
  },
  //注册组件
  components: {
    myCard,
    myLine,
  },
  methods: {},
  async created() {
    let res = await getOrderData(); // 获取首页数据
    let {
      // 卡片数据
      totalOrder,
      totalAmount,
      todayOrder,
      totayAmount,

      // 报表数据
      xData,
      orderData,
      amountData,
    } = res;

    // 渲染卡片
    let arr = [totalOrder, totalAmount, todayOrder, totayAmount];
    this.cardList.forEach((item, i) => (item.num = arr[i]));

    // console.log(xData, orderData, amountData);
    //渲染报表
    this.options = {
      title: "数据统计",
      lengend: ["订单", "销售额"],
      xData,
      series: [orderData, amountData].map((item, index) => ({
        name: ["订单", "销售额"][index],
        type: "line",
        data: item,
      })),
    };
  },
};
</script>

<style lang="less" scoped>
.OrderTotal {
  height: 100%;
  .list {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }
  #echarts {
    margin-top: 30px;
    height: 350px;
    padding: 20px;
    background: #fff;
    height: 350px;
  }
}
</style>