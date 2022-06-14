<template>
  <el-tabs tab-position="left" style="height: 580px" class="demo-tabs">
    <el-tab-pane label="捐赠单">
      <el-table :data="donation" style="width: 850px" max-height="520">
        <el-table-column prop="did" label="序号" width="80" sortable/>
        <el-table-column prop="uname" label="用户名" width="100" sortable/>
        <el-table-column prop="mobile" label="手机号" width="100" sortable/>
        <el-table-column prop="mname" label="捐赠物资" width="120" sortable/>
        <el-table-column prop="type" label="物资种类" width="120" sortable/>
        <el-table-column prop="count" label="捐赠数量" width="120" sortable/>
        <el-table-column prop="findate" label="提交日期" width="180" sortable/>
        <el-table-column prop="state" label="处理状态" width="120" sortable/>
        <el-table-column width="150" fixed="right">
          <template #header>
            <input class="form-control header-ele" v-model="queryField" placeholder="Search"
                   @keyup.enter="selectField_d"/>
          </template>
          <template #default="scope">
            <el-button class="el-button" @click="approval(scope.row.did)">审批</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>

    <el-tab-pane label="申领单">
      <el-table :data="application" style="width: 850px" max-height="520">
        <el-table-column prop="rid" label="序号" width="100" sortable/>
        <el-table-column prop="username" label="用户名" width="120" sortable/>
        <el-table-column prop="rname" label="申领物资" width="180" sortable/>
        <el-table-column prop="rtype" label="物资种类" width="180" sortable/>
        <el-table-column prop="isState" label="处理状态" width="120" sortable/>
        <el-table-column width="150" fixed="right">
          <template #header>
            <input class="form-control header-ele" v-model="queryField" placeholder="Search"
                   @keyup.enter="selectField_a"/>
          </template>
          <template #default="scope">
            <el-button class="el-button" @click="approval(scope.row.did)">审批</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>

    <el-tab-pane label="Tab1">
      TestText1
    </el-tab-pane>
    <el-tab-pane label="Tab2">
      TestText2
    </el-tab-pane>
    <el-tab-pane label="Tab3">
      TestText3
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "OrderMgmt",
  data() {
    return {
      donation: [],
      application: [],
      queryField: '',
    }
  },
  async created() {
    let ret1 = await this.$http.get('things/list')
    let ret2 = await this.$http.get('things/list')
    this.donation = ret1.data.data
    this.application = ret2.data.data
  },
  methods: {
    approval(id) {
      console.log(id)
      ElMessageBox.confirm(
          '确认审批？',
          '提示',
          {
            confirmButtonText: '同意',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        ElMessage({
          type: 'success',
          message: '审批成功！',
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '审批取消',
        })
      })
    },
    selectField_d() {
      console.log(this.queryField)
      this.queryField = ''
    },
    selectField_a() {
      console.log(this.queryField)
      this.queryField = ''
    },
  },
}
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 10px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 100;
}

.header-ele {
  width: 130px;
  height: 30px;
}

.el-button {
  display: block;
  margin: auto;
}
</style>