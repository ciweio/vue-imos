<template>
  <el-tabs tab-position="left" style="height: 580px" class="demo-tabs">
    <el-tab-pane label="食物">
      <el-table :data="foodstuff" style="width: 100%" max-height="520">
        <el-table-column prop="mid" label="序号" width="80" sortable/>
        <el-table-column label="图像" width="100">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-image :src="scope.row.picture" alt="" style="width: 60px;height: 60px;border-radius: 5px"
                        preview-teleported/>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="mname" label="名称" width="120" sortable/>
        <el-table-column prop="count" label="数量" width="80" sortable/>
        <el-table-column prop="code" label="编码" width="120" sortable/>
        <el-table-column prop="type" label="类型" width="100" sortable/>
        <el-table-column>
          <template #header>
            <input class="form-control header-ele" v-model="queryField" placeholder="Search"
                   @keyup.enter="selectField_f"/>
          </template>
          <template #default="scope">
            <modify-button :row="scope.row">编辑</modify-button>
            <delete-button @click="del(scope.row.mid)">删除</delete-button>
          </template>
        </el-table-column>
      </el-table>
      <add-material/>
    </el-tab-pane>

    <el-tab-pane label="医用品">
      <el-table :data="material" style="width: 100%" max-height="520">
        <el-table-column prop="mid" label="序号" width="80" sortable/>
        <el-table-column label="图像" width="100">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-image :src="scope.row.picture" alt="" style="width: 60px;height: 60px;border-radius: 5px"
                        preview-teleported/>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="mname" label="名称" width="120" sortable/>
        <el-table-column prop="count" label="数量" width="80" sortable/>
        <el-table-column prop="code" label="编码" width="120" sortable/>
        <el-table-column prop="type" label="类型" width="100" sortable/>
        <el-table-column>
          <template #header>
            <input class="form-control header-ele" v-model="queryField" placeholder="Search"
                   @keyup.enter="selectField_m"/>
          </template>
          <template #default="scope">
            <modify-button :row="scope.row">编辑</modify-button>
            <delete-button @click="del(scope.row.mid)">删除</delete-button>
          </template>
        </el-table-column>
      </el-table>
      <add-material/>
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
import ModifyButton from './ModifyMaterial.vue'
import DeleteButton from '../DeleteButton.vue'
import AddMaterial from './AddMaterial.vue'

export default {
  name: "MaterialMgmt",
  components: {
    ModifyButton,
    DeleteButton,
    AddMaterial
  },
  data() {
    return {
      foodstuff: [],
      material: [],
      queryField: '',
    }
  },
  async created() {
    let ret1 = await this.$http.get('things/listType' + '?type=' + '食品类')
    let ret2 = await this.$http.get('things/listType' + '?type=' + '医用类')
    this.foodstuff = ret1.data.data
    this.material = ret2.data.data
  },
  methods: {
    del(id) {
      console.log(id)
    },
    selectField_f() {
      console.log(this.queryField)
      this.queryField = ''
    },
    selectField_m() {
      console.log(this.queryField)
      this.queryField = ''
    },
  },
}
</script>

<style>
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
</style>