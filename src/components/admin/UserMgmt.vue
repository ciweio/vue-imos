<template>
  <el-tabs tab-position="left" style="height: 580px" class="demo-tabs">
    <el-tab-pane label="捐赠者">
      <el-table :data="donor" style="width: 700px" max-height="520">
        <el-table-column prop="uid" label="序号" width="100" sortable/>
        <el-table-column prop="username" label="用户名" width="120" sortable/>
        <el-table-column prop="realname" label="姓名" width="120" sortable/>
        <el-table-column prop="email" label="邮箱" width="180" sortable/>
        <el-table-column prop="mobile" label="手机号" width="180" sortable/>
      </el-table>
    </el-tab-pane>

    <el-tab-pane label="申领者">
      <el-table :data="applicant" style="width: 700px" max-height="520">
        <el-table-column prop="uid" label="序号" width="100" sortable/>
        <el-table-column prop="username" label="用户名" width="120" sortable/>
        <el-table-column prop="realname" label="姓名" width="120" sortable/>
        <el-table-column prop="email" label="邮箱" width="180" sortable/>
        <el-table-column prop="mobile" label="手机号" width="180" sortable/>
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
export default {
  name: "UserMgmt",
  data() {
    return {
      donor: [],
      applicant: [],
    }
  },
  async created() {
    let ret1 = await this.$http.get('things/list')
    let ret2 = await this.$http.get('things/list')
    this.donor = ret1.data.data
    this.applicant = ret2.data.data
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
</style>