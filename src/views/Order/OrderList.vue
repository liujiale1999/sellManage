<template>
  <Card class="card">
    <span slot="title">订单列表</span>
    <div class="orderSearch" slot="content">
      <!-- 查询表单 -->
      <el-form :inline="true" :model="orderSearch" class="demo-form-inline">
        <!-- 订单号 -->
        <el-form-item label="订单号" size="mini">
          <el-input v-model="orderSearch.orderNo" placeholder="订单号"></el-input>
        </el-form-item>
        <!-- 收货人 -->
        <el-form-item label="收货人" size="mini">
          <el-input v-model="orderSearch.consignee" placeholder="收货人"></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="手机号" size="mini">
          <el-input v-model="orderSearch.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <!-- 订单状态 -->
        <el-form-item label="订单状态" size="mini">
          <el-select v-model="orderSearch.orderState" placeholder="订单状态" style="width:100px">
            <el-option label="已受理" value="已受理"></el-option>
            <el-option label="未受理" value="未受理"></el-option>
            <el-option label="派送中" value="派送中"></el-option>
          </el-select>
        </el-form-item>
        <!-- 时间范围 -->
        <el-form-item size="mini" label="选择时间">
          <div class="block">
            <el-date-picker
              v-model="orderSearch.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <!-- 查询 -->
        <el-form-item size="mini">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <el-table :data="tableData" border :style="styleObj">
        <!-- 订单号 -->
        <el-table-column prop="orderNo" label="订单号" width="150"></el-table-column>
        <!-- 下单时间 -->
        <el-table-column prop="orderTime" label="下饭时间" width="150"></el-table-column>
        <!-- 手机号 -->
        <el-table-column prop="phone" label="手机号" width="150"></el-table-column>
        <!-- 收货人 -->
        <el-table-column prop="consignee" label="收货人" width="150"></el-table-column>
        <!-- 配送地址 -->
        <el-table-column prop="deliverAddress" label="配送地址" width="200"></el-table-column>
        <!-- 送达时间 -->
        <el-table-column prop="deliveryTime" label="送达时间" width="150"></el-table-column>
        <!-- 用户备注 -->
        <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
        <!-- 订单金额 -->
        <el-table-column prop="orderAmount" label="订单金额" width="150"></el-table-column>
        <!-- 订单状态 -->
        <el-table-column prop="orderState" label="订单状态" width="150"></el-table-column>
        <!-- 操作 -->
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="see(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 查看的模态框 -->
      <el-dialog title="修改商品" :visible.sync="dialogFormVisible">
        <p>订单号：{{seeForm.orderNo}}</p>
        <p>下单时间:{{seeForm.orderTime}}</p>
        <p>手机号:{{seeForm.phone}}</p>
        <p>收货人：{{seeForm.consignee}}</p>
        <p>配送地址：{{seeForm.deliverAddress}}</p>
        <p>送达时间：{{seeForm.deliveryTime}}</p>
        <p>用户备注：{{seeForm.remarks}}</p>
        <p>订单金额：{{seeForm.orderAmount}}</p>
        <p>订单状态：{{seeForm.orderState}}</p>
        <!-- 按钮 -->
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="close">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </Card>
</template>

<script>
import Card from "@/components/Card";
import { getOrderList } from "@/api/order.js";
import local from "@/utils/local";
// 引入修改时间格式
import moment from "moment";

export default {
  components: {
    Card,
  },
  data() {
    return {
      orderSearch: {
        orderNo: "",
        phone: "",
        consignee: "",
        orderState: "",
        date: [],
      },
      currentPage: 1,
      pageSize: 5,
      tableData: [], //表格数据回填
      seeForm: {
        orderNo: "",
        orderTime: "",
        phone: "",
        consignee: "",
        deliverAddress: "",
        deliveryTime: "",
        remarks: "",
        orderAmount: "",
        orderState: "",
      }, //查看回填
      total: 0,
      styleObj: { width: document.body.offsetWidth - 360 + "px" },
      dialogFormVisible: false,
      num: 111,
    };
  },
  methods: {
    async fetchData() {
      let { total, data } = await getOrderList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.orderSearch.orderNo,
        phone: this.orderSearch.phone,
        consignee: this.orderSearch.consignee,
        orderState: this.orderSearch.orderState,
        date:
          this.orderSearch.date == null
            ? JSON.stringify([])
            : JSON.stringify(this.orderSearch.date),
      });

      // 修改时间格式
      data.forEach((item) => {
        item.orderTime = moment(item.orderTime).format("YYYY-MM-DD HH:mm:ss");
        item.deliveryTime = moment(item.deliveryTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      });

      // 赋值
      this.tableData = data;
      this.total = total;
    },
    // 每页条数改变触发
    handleSizeChange(size) {
      this.orderSearch.pageSize = size;
      this.fetchData();
    },
    // 当前页改变触发
    handleCurrentChange(page) {
      this.orderSearch.currentPage = page;
      this.fetchData();
    },
    // 查询
    search() {
      this.currentPage = 1; //回到第一页
      this.fetchData();
    },
    // 重置
    reset() {
      this.orderSearch = {
        orderNo: "",
        phone: "",
        consignee: "",
        orderState: "",
        date: [],
      };
      //再次调用search
      this.search();
    },
    //查看
    see(row) {
      this.dialogFormVisible = true;
      this.seeForm = row;
    },
    // 编辑
    handleEdit(row) {
      local.set("editRow", row);
      this.$router.push("/order/order-edit");
    },
    // 关闭
    close() {
      this.dialogFormVisible = false;
    },
    callback() {
      this.styleObj.width = document.body.offsetWidth - 360 + "px";
    },
  },
  created() {
    this.fetchData();
    // 监听出口改变
    window.addEventListener("resize", this.callback);
  },
  destroyed() {
    window.removeEventListener("resize", this.callback);
  },
};
</script>

<style lang="less" scoped>
.card {
  .orderSearch {
    background: #fff;
    padding: 20px;

    .el-table {
      margin: 20px 0;
    }
  }
}
</style>