<template>
  <Card>
    <span slot="title">账号列表</span>

    <div slot="content">
      <!-- 表格 -->
      <el-table
        @selection-change="handleSelectionChange"
        ref="accTable"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- 账号 -->
        <el-table-column prop="account" label="账号" width="auto"></el-table-column>
        <!-- 用户组 -->
        <el-table-column prop="userGroup" label="用户组" width="120"></el-table-column>
        <!-- 创建时间-->
        <el-table-column label="创建时间" width="auto">
          <template slot-scope="scope">{{ scope.row.ctime }}</template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="sconp">
            <el-button size="mini" @click="handleEdit(sconp.row)">编辑</el-button>
            <el-button
              v-if="!(userId === sconp.row.id)"
              size="mini"
              type="danger"
              @click="handleDel(sconp.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 3, 5, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 按钮 -->
      <el-button type="danger" size="small" @click="handleBatchDel" :disabled="bool">批量删除</el-button>
      <el-button type="primary" size="small" @click="cancelSelect">取消选择</el-button>

      <!-- 模态框 -->
      <el-dialog title="修改账号" :visible.sync="dialogVisible" width="330px">
        <!-- 表单 -->
        <el-form :model="editForm" label-width="80px">
          <el-form-item label="账号" v-model="editForm.account">
            <el-input v-model="editForm.account"></el-input>
          </el-form-item>

          <!-- 用户组 -->
          <el-form-item label="用户组">
            <el-select v-model="editForm.userGroup">
              <el-option value="普通管理员"></el-option>
              <el-option value="超级管理员"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddEdit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </Card>
</template>

<script>
// 引入 卡片 组件
import Card from "@/components/Card";
// 引入ajax函数
import { getAccList, delAcc, batchDel, editAcc } from "@/api/account";
// 引入修改时间格式
import moment from "moment";
// 引入本地存储
import local from "@/utils/local";

export default {
  // 注册组件
  components: {
    Card,
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0, //总页数
      editForm: {}, //修改账号的表单
      dialogVisible: false, //模态框显示还是隐藏
      bool: true,
      userId: "",
    };
  },
  methods: {
    //获取列表数据 渲染
    async fetchData() {
      let res = await getAccList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });

      //修改时间格式
      res.data.forEach((item) => {
        item.ctime = moment(item.ctime).format("YYYY-MM-DD HH:mm:ss");
      });

      // 判断边界值
      if (this.currentPage !== 1 && res.data.length <= 0) {
        this.currentPage -= 1;
        this.fetchData();
      }

      this.tableData = res.data;
      this.total = res.total;
    },
    //每页条数改变触发
    handleSizeChange(size) {
      this.pageSize = size;
      this.fetchData();
    },
    //当前页改变触发
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchData();
    },
    //单行删除
    handleDel(id) {
      console.log(this.userId);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let { code } = await delAcc({ id });

          if (code === 0) {
            this.fetchData();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 取消全选
    cancelSelect() {
      this.$refs.accTable.clearSelection();
    },
    //表格改变获取数据
    handleSelectionChange(rows) {
      this.ids = rows.map((item) => item.id);
      if (this.ids) {
        this.bool = false;
      }
    },
    //批量删除
    handleBatchDel() {
      // 判读用户  是否选择
      if (!this.ids) {
        this.$message.error("请您先选择");

        return;
      }

      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await batchDel({ ids: JSON.stringify(this.ids) });
          if (res.code === 0) {
            this.fetchData();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 修改信息
    handleEdit(row) {
      this.dialogVisible = true;
      let { id, account, userGroup } = row;
      this.editForm = { id, account, userGroup };
    },
    // 点击修改
    async handleAddEdit() {
      let { code } = await editAcc(this.editForm);
      if (code === 0) {
        this.fetchData();
        this.dialogVisible = false;
      }
    },
  },

  created() {
    //获取本地info的id
    this.userId = local.get("info").id;
    this.fetchData();
  },
};
</script>

<style lang="less" scoped>
.el-pagination {
  margin: 20px 0;
}
</style>