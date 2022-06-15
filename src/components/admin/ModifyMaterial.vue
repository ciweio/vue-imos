<template>
  <el-button @click="modifyMedical">
    编辑
  </el-button>
  <el-dialog v-model="visible" :show-close="false" width="20%" append-to-body>
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">编辑</h4>
        <el-button type="danger" @click="close">
          Close
        </el-button>
      </div>
    </template>
    <div class="my-body">
      <div class="body-item">
        <span class="itme-ele">名称：</span>
        <el-input class="body-ele" v-model="material.mname"/>
      </div>
      <div class="body-item">
        <span class="itme-ele">图片：</span>
        <el-input class="body-ele" v-model="material.picture"/>
      </div>
      <div class="body-item">
        <span class="itme-ele">数量：</span>
        <el-input class="body-ele" v-model="material.count"/>
      </div>
      <div class="body-item">
        <span class="itme-ele">类型：</span>
        <el-input class="body-ele" v-model="material.type"/>
      </div>
      <div class="body-item">
        <span class="itme-ele">编号：</span>
        <el-input class="body-ele" v-model="material.code"/>
      </div>
    </div>
    <div class="my-footer">
      <el-button class="footer-ele mt-3" size="large" round @click="subedit">修改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {ref} from 'vue'
import {ElButton, ElDialog} from 'element-plus'

export default {
  props: ['row'],
  data() {
    return {
      material: {
        mid: 0,
        picture: '',
        mname: '',
        count: 0,
        type: '',
        code: '',
      },
      visible: ref(false),
      // input: ref(''),
      num: ref(1)
    }
  },
  methods: {
    modifyMedical() {
      this.material = this.row
      this.visible = true
    },
    async subedit() {
      let ret = await this.$http.post('/things/update', this.material)
      console.log(ret)
      this.visible = false
    }
  }
}

</script>

<style lang="less" scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.my-body {
  width: 100%;

  .body-item {
    width: 90%;
    margin: 10px auto;

    .body-ele {
      display: inline-block;
      width: 180px;
    }
  }
}

.my-footer {
  width: 160px;
  margin: auto;

  .footer-ele {
    width: 160px;
  }
}
</style>