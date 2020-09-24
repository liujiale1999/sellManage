<template>
  <Card>
    <span slot="title">商品统计</span>

    <div slot="content">
      <el-form>
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="date"
            type="daterange"
            value-format="yyyy-MM-dd HH:mm:ss"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <el-button style="margin-left:10px" type="primary" @click="search">查询</el-button>
        </el-form-item>
        <!-- echarts -->
        <myLine :options="options"></myLine>
      </el-form>
    </div>
  </Card>
</template>

<script>
import Card from "@/components/Card";
import { getOrderTotal } from "@/api/order.js";
import myLine from "@/components/myLine.vue"; //报表组件
import moment from "moment";

export default {
  components: {
    Card,
    myLine,
  },
  data() {
    return {
      options: {},
      date: [],
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      let { data } = await getOrderTotal({
        date: JSON.stringify(this.date),
      });
      console.log(data);
      this.options = {
        title: "订单统计",
        lengend: "订单金额",
        xData: data.map((item) =>
          moment(item.orderTime).format("YY-MM-DD HH:mm")
        ),
        series: [
          {
            name: "订单金额",
            type: "line",
            data: data.map((item) => item.orderAmount),
          },
        ],
      };
      // console.log("xData", this.options.xData);
      // console.log("series", this.options.series);
    },
    search() {
      this.fetchData();
    },
  },
};
</script>

<style lang="less" scoped>
</style>