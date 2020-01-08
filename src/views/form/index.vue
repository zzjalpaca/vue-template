<template>
  <div class="app-container">
    <div class="app-filter">
      <el-form :model="form" ref="ruleForm">
        <div class="app-title">数据筛选</div>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item prop="choose_date" label="统计时间">
              <el-date-picker
                v-model="form.choose_date"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :picker-options="datePickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-button type="primary" @click="handleFilter">查询</el-button>
          <el-button type="primary" plain @click="resetForm('ruleForm')">重置</el-button>
        </el-row>
      </el-form>
    </div>
    <div class="app-content">
      <div class="app-title">数据列表</div>

      <el-table
        max-height="600"
        :data="tableData"
        style="width: 100%"
        fit
        stripe
        highlight-current-row
        border
        v-loading="listLoading"
      >
        <el-table-column show-overflow-tooltip prop="city" align="center" label="城市"></el-table-column>
        <el-table-column show-overflow-tooltip prop="order_num" align="center" label="广告订单量"></el-table-column>
        <el-table-column show-overflow-tooltip prop="leads_num" align="center" label="获客量"></el-table-column>
        <el-table-column show-overflow-tooltip prop="city_leads_num" align="center" label="可用线索量"></el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="page"
        :limit.sync="limit"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { datePickerOptions } from '@/utils/index'

export default {
  components: { Pagination },
  data() {
    return {
      form: {
        city_en: '',
        choose_date: []
      },
      datePickerOptions: datePickerOptions,
      listLoading: false,
      tableData: [],
      total: 0,
      page: 1,
      limit: 10
    }
  },
  computed: {
    statusFilter() {
      return function(status) {
        return status === '上线' ? 'success' : 'info'
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleFilter() {
      this.page = 1
      this.getList()
    },
    // 筛选
    getList() {
      let chooseDate = this.form.choose_date
      this.listLoading = true
      this.$http.account
        .cityLeadList({
          city_en: this.form.city_en,
          start: chooseDate ? chooseDate[0] : '',
          end: chooseDate ? chooseDate[1] : '',
          page: this.page,
          page_size: this.limit
        })
        .then(res => {
          this.listLoading = false
          this.tableData = res.entry.data
          this.total = res.entry.page_info.count - 0
        })
    },

    getCity(val) {
      this.form.city_en = val.city_en
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
.app-filter .el-select {
  width: 100%;
}
</style>
