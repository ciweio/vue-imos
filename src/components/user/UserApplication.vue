<template>
  <div>
    <button type="button" class="btn btn-light" @click="addApp">申领物资</button>
    <el-tabs style="height: 580px" class="demo-tabs">
      <el-table :data="applied" style="width: 100%" max-height="520">
        <el-table-column prop="rid" label="序号" width="120" sortable/>
        <el-table-column prop="rname" label="申领物资" width="200" sortable/>
        <el-table-column prop="rtype" label="物资种类" width="200" sortable/>
        <el-table-column prop="num" label="申领数量" width="150" sortable/>
        <el-table-column prop="sdate" label="申领日期" width="260" sortable/>
        <el-table-column prop="udate" label="审核时间" width="260" sortable/>
        <el-table-column prop="isstate" label="审核状态" width="140" sortable/>
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="scope">
            <el-button plain class="el-button" @click="edit(scope.row)" :disabled="scope.row.isstate === 2">编辑
            </el-button>
            <el-button type="danger" plain class="el-button" @click="del(scope.row.rid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tabs>

    <el-dialog v-model="editVisible" title="编辑申领单" width="20%">
      <el-form :model="edit_form">
        <el-form-item label="申领物资">
          <el-input v-model="edit_form.rname" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="物资种类">
          <el-select v-model="edit_form.rtype" placeholder="请选择物资种类">
            <el-option label="食物" value="食物"/>
            <el-option label="医用品" value="医用品"/>
          </el-select>
        </el-form-item>
        <el-form-item label="申领数量">
          <el-input v-model="edit_form.num" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="subedit">确认</el-button>
      </span>
      </template>
    </el-dialog>

    <el-dialog v-model="addVisible" title="申领物资" width="20%">
      <el-form :model="add_form">
        <el-form-item label="申领物资">
          <el-input v-model="add_form.rname" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="物资种类">
          <el-select v-model="add_form.rtype" placeholder="请选择物资种类">
            <el-option label="食物" value="食物"/>
            <el-option label="医用品" value="医用品"/>
          </el-select>
        </el-form-item>
        <el-form-item label="申领数量">
          <el-input v-model="add_form.num" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="addVisible = false">取消</el-button>
        <el-button type="primary" @click="subadd">确认</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {ElMessage, ElMessageBox} from "element-plus";
import {reactive, ref} from 'vue'

export default {
  name: "UserApplication",
  data() {
    return {
      token: 0,
      applied: [],

      editVisible: ref(false),
      addVisible: ref(false),
      formLabelWidth: '200px',
      edit_form: reactive({
        rname: '',
        rtype: '',
        num: 0
      }),
      add_form: reactive({
        uid: '',
        rname: '',
        rtype: '',
        num: 0
      }),
    }
  },
  async created() {
    this.token = localStorage.getItem('token')
    console.log(this.token)
    let ret = await this.$http.get('/requisition/listAllReqs/' + this.token)
    console.log(ret)
    this.applied = ret.data
  },
  methods: {
    addApp() {
      this.addVisible = true
    },
    async subadd() {
      if (this.add_form.num > 0) {
        this.add_form.uid = this.token
        let ret = await this.$http.post('/requisition/submit', this.add_form)
        console.log(ret)

        this.addVisible = false
        console.log(this.add_form)

        if (ret.data.code === 20000) {
          ElMessage({
            type: 'success',
            message: '申领成功！',
          })
          let flush = await this.$http.get('/requisition/listAllReqs/' + this.token)
          this.applied = flush.data
        }
      } else {
        ElMessageBox({
          title: 'Error',
          message: '最少申领一个！',
          type: 'error',
          offset: 50,
        })
      }
    },
    edit(row) {
      this.edit_form = row
      this.editVisible = true
    },
    async subedit() {
      console.log(this.edit_form)
      let ret = await this.$http.put('/requisition/update/' + this.token, this.edit_form)
      console.log(ret)
      this.editVisible = false
      console.log(this.edit_form)
      if (ret.data.code === 20000) {
        ElMessage({
          type: 'success',
          message: '修改成功！',
        })
      }
    },
    del(id) {
      console.log(id)
      ElMessageBox.confirm(
          '确认删除？',
          '提示',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'error',
          }
      ).then(async () => {
        let ret = await this.$http.put('/requisition/delete/' + id)
        console.log(ret)
        let flush = await this.$http.get('/requisition/listAllReqs/' + this.token)
        this.applied = flush.data
        ElMessage({
          type: 'success',
          message: '删除成功！',
        })
      }).catch(() => {
        // ElMessage({
        //   type: 'info',
        //   message: '审批取消',
        // })
      })
    },
  }
}
</script>

<style scoped>
.btn {
  position: absolute;
  top: 70px;
  left: 850px;
  color: #CC95C0;
}

.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>