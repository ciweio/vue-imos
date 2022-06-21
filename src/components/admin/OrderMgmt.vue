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
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="scope">
            <el-button class="el-button" @click="approval_d(scope.row.did)" :disabled="scope.row.state === 1">审批
            </el-button>
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
        <el-table-column prop="isstate" label="处理状态" width="120" sortable/>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="scope">
            <el-button class="el-button" @click="approval_a(scope.row.rid)" :disabled="scope.row.isstate ===2">审批
            </el-button>
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
    }
  },
  async created() {
    let ret1 = await this.$http.get('donation/list')
    console.log(ret1)
    this.donation = ret1.data.data

    let ret2 = await this.$http.get('/requisition')
    console.log(ret2)
    this.application = ret2.data.data
  },
  methods: {
    approval_d(did) {
      console.log(did)
      ElMessageBox.confirm(
          '确认审批？',
          '提示',
          {
            confirmButtonText: '同意',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(async () => {
        let ret = await this.$http.get('donation/deal' + '?' + 'did=' + did)
        console.log(ret.data)
        let flush = await this.$http.get('donation/list')
        this.donation = flush.data.data
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
    approval_a(rid) {
      console.log(rid)
      ElMessageBox.confirm(
          '确认审批？',
          '提示',
          {
            confirmButtonText: '同意',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(async () => {
        let ret = await this.$http.put('/requisition/approval/' + rid)
        console.log(ret)
        let flush = await this.$http.get('/requisition')
        this.application = flush.data.data
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
  },
}
</script>

<style scoped>
.header-ele {
  width: 130px;
  height: 30px;
}

.el-button {
  display: block;
  margin: auto;
}
</style>