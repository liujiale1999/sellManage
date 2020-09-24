<template>
  <Card>
    <span slot="title">订单修改</span>
    <div slot="content">
      <el-form :model="Editform" label-width="80px">
        <!-- 订单号 -->
        <el-form-item label="商品名称" label-width="80px" style="width:300px">
          <el-input v-model="Editform.orderNo" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 下单时间 -->
        <el-form-item label="下单时间" label-width="80px">
          <div class="block">
            <el-date-picker v-model="Editform.orderTime" type="datetime" align="right"></el-date-picker>
          </div>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="手机号" label-width="80px" style="width:300px">
          <el-input v-model="Editform.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 收货人 -->
        <el-form-item label="收货人" label-width="80px" style="width:300px">
          <el-input v-model="Editform.consignee" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 配送地址： -->
        <el-form-item label="配送地址" label-width="80px" style="width:300px">
          <el-input v-model="Editform.deliverAddress" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 送达时间： -->

        <el-form-item size="mini" label="送达时间">
          <div class="block">
            <el-date-picker v-model="Editform.deliveryTime" type="datetime" align="right"></el-date-picker>
          </div>
        </el-form-item>

        <!-- 用户备注： -->
        <el-form-item label="用户备注" label-width="80px" style="width:300px">
          <el-input v-model="Editform.remarks" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 订单金额： -->
        <el-form-item label="订单金额" label-width="80px" style="width:300px">
          <el-input v-model="Editform.orderAmount" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 订单状态 -->
        <el-form-item label="订单状态" size="mini">
          <el-select v-model="Editform.orderState" placeholder="订单状态" style="width:100px">
            <el-option label="已受理" value="已受理"></el-option>
            <el-option label="未受理" value="未受理"></el-option>
            <el-option label="派送中" value="派送中"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="orderEdit">修改</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
    </div>
  </Card>
</template>

<script>
import Card from "@/components/Card";
import { OrderDetails, EditOrder } from "@/api/order";
import local from "@/utils/local";
export default {
  //注册
  components: {
    Card,
  },
  data() {
    return {
      Editform: {
        // id: "",
        // orderNo: "",
        // orderTime: "",
        // phone: "",
        // consignee: "",
        // deliverAddress: "",
        // deliveryTime: "",
        // remarks: "",
        // orderAmount: "",
        // orderState: "",
      },
    };
  },
  methods: {
    async orderEdit() {
      let { code } = await EditOrder(this.Editform);
      if (code === 0) {
        this.$router.push("/order/order-list");
      }
    },
    reset() {
      this.$confirm("是否重置?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.Editform = {};
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置",
          });
        });
    },
  },
  created() {
    this.Editform = local.get("editRow");
    // console.log(this.Editform);
  },
  destroyed() {
    local.remove("editRow");
  },
};
</script>

<style lang="less" scoped>
</style>