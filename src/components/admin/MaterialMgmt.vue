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
                   @keyup.enter="selectField_f" @blur="restore"/>
          </template>
          <template #default="scope">
            <modify-button :row="scope.row">编辑</modify-button>
            <el-button @click="del(scope.row.mid)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="margin-left: 16px" @click="drawer = true" class="m-0">+</el-button>
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
                   @keyup.enter="selectField_m" @blur="restore"/>
          </template>
          <template #default="scope">
            <modify-button :row="scope.row">编辑</modify-button>
            <el-button @click="del(scope.row.mid)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="margin-left: 16px" @click="drawer = true" class="m-0">+</el-button>
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

  <el-drawer v-model="drawer" title="添加" :direction="direction" :size="size">
    <template #default>
      <div class="drawer-body">
        <div class="body-item">
          <el-input v-model="material_e.mname" placeholder="名称"/>
        </div>
        <div class="body-item">
          <el-input v-model="material_e.picture" placeholder="图片"/>
        </div>
        <div class="body-item">
          <el-input v-model="material_e.count" placeholder="数量"/>
        </div>
        <div class="body-item">
          <el-input v-model="material_e.code" placeholder="编码"/>
        </div>
        <div class="body-item">
          <el-select v-model="material_e.type" placeholder="请选择物资种类">
            <el-option label="食物" value="食品类"/>
            <el-option label="医用品" value="医用类"/>
          </el-select>
        </div>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button type="primary" @click="AddMaterial">confirm</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script>
import ModifyButton from './ModifyMaterial.vue'
import {ElMessage, ElMessageBox} from "element-plus";
import {ref} from 'vue'
import {ElButton, ElDrawer} from 'element-plus'

export default {
  name: "MaterialMgmt",
  components: {
    ModifyButton,
  },
  data() {
    return {
      foodstuff: [],
      material: [],
      queryField: '',

      drawer: ref(false),
      direction: 'btt',
      size: 250,
      material_e: ref({
        mname: '',
        picture: '',
        count: '',
        code: '',
        type: ''
      })
    }
  },
  async created() {
    await this.dataFlush()
  },
  methods: {
    async dataFlush() {
      let ret1 = await this.$http.get('things/listType' + '?type=' + '食品类')
      let ret2 = await this.$http.get('things/listType' + '?type=' + '医用类')
      this.foodstuff = ret1.data.data
      this.material = ret2.data.data
    },
    async AddMaterial() {
      let ret = await this.$http.post('/things/add', this.material_e)
      console.log(ret)
      this.drawer = false
      await this.dataFlush()
      ElMessage({
        type: 'success',
        message: '添加成功！',
      })
      this.material_e = ref({
        mname: '',
        picture: '',
        count: '',
        code: '',
        type: ''
      })
    },
    async del(id) {
      console.log(id)
      ElMessageBox.confirm(
          '确认删除？',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
      )
          .then(async () => {
            let ret = await this.$http.delete('/things' + '/' + id)
            console.log(ret)
            await this.dataFlush()
            ElMessage({
              type: 'success',
              message: '删除成功！',
            })
          })
          .catch(() => {
            // ElMessage({
            //   type: 'info',
            //   message: 'Delete canceled',
            // })
          })
    },
    async selectField_f() {
      let ret = await this.$http.post('things/check' + '?mname=' + this.queryField)
      // console.log(ret.data.data)
      // console.log(this.queryField)
      this.foodstuff = ret.data.data
      this.queryField = ''
    },
    async selectField_m() {
      let ret = await this.$http.post('things/check' + '?mname=' + this.queryField)
      // console.log(ret.data.data)
      // console.log(this.queryField)
      this.material = ret.data.data
      this.queryField = ''
    },
    async restore() {
      await this.dataFlush()
    },
  },
}
</script>

<style lang="less">
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

.drawer-body {
  height: 40px;

  .body-item {
    display: inline-block;
    margin: 10px;
    width: 15%;
  }
}
</style>