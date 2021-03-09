<template>
  <div id="UserList" class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>筛选搜索</span>
        <el-button style="float: right" type="primary" size="small" @click="handleSearchList()">
          查询结果
        </el-button>
        <el-button style="float: right;margin-right: 15px" size="small" @click="handleResetSearch()">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input style="width: 203px" placeholder="用户名" />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card shadow="never" class="operate-container">
      <i class="el-icon-tickets" />
      <span>数据列表</span>
      <el-button class="btn-add" size="mini">
        添加
      </el-button>
    </el-card>
    <el-table
      ref="multipleTable"
      fit
      border
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      class="table-container"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        label="日期"
        width="120"
      >
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120"
      />
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip
      />
    </el-table>
    <div class="pagination-container">
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[5, 10,15,20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listQuery.size"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      listQuery: {
        title: '',
        page: 10,
        limit: 20,
        size: 1000
      },
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: []
    }
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleResetSearch() {

    },
    handleSearchList() {

    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    }
  }
}
</script>

<style scoped>
.app-container {
  margin-top: 40px;
  margin-left: 40px;
  margin-right: 40px;
}
  .operate-container {
    margin-top: 20px;
  }
.table-container {
  margin-top: 20px;
}
.operate-container .btn-add {
  float: right;
}
.filter-container {
  margin-top: 20px;
}
.pagination-container {
  display: inline-block;
  float: right;
  margin-top: 20px;
}
</style>
