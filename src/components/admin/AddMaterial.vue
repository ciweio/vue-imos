<template>
  <el-button style="margin-left: 16px" @click="drawer = true" class="m-0">
    +
  </el-button>

  <el-drawer v-model="drawer" title="添加" :direction="direction" :size="size">
    <template #default>
      <div class="drawer-body">
        <div class="body-item">
          <el-input v-model="material.mname" placeholder="名称"/>
        </div>
        <div class="body-item">
          <el-input v-model="material.picture" placeholder="图片"/>
        </div>
        <div class="body-item">
          <el-input v-model="material.count" placeholder="数量"/>
        </div>
        <div class="body-item">
          <el-input v-model="material.code" placeholder="编码"/>
        </div>
        <div class="body-item">
          <el-input v-model="material.type" placeholder="类型"/>
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
import {ref} from 'vue'
import {ElButton, ElDrawer} from 'element-plus'

export default {
  data() {
    return {
      drawer: ref(false),
      direction: 'btt',
      size: 250,
      material: ref({
        mname: '',
        picture: '',
        count: '',
        code: '',
        type: ''
      })
    }
  },
  methods: {
    async AddMaterial() {
      let ret = await this.$http.post('/things/add', this.material)
      console.log(ret)
      this.drawer = false
    }
  }
}
</script>

<style lang="less" scoped>
.drawer-body {
  height: 40px;

  .body-item {
    display: inline-block;
    margin: 10px;
    width: 15%;
  }
}
</style>