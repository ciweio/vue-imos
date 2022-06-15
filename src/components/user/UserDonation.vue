<template>
  <div>
    <button type="button" class="btn btn-light" @click="addDo">捐赠物资</button>
    <el-tabs style="height: 580px" class="demo-tabs">
      <el-table :data="donated" style="width: 100%" max-height="520">
        <el-table-column prop="did" label="序号" width="120" sortable/>
        <el-table-column prop="mname" label="捐赠物资" width="200" sortable/>
        <el-table-column prop="type" label="物资种类" width="200" sortable/>
        <el-table-column prop="count" label="捐赠数量" width="200" sortable/>
        <el-table-column prop="findate" label="审核时间" width="260" sortable/>
        <el-table-column prop="state" label="审核状态" width="200" sortable/>
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="scope">
            <el-button plain class="el-button" @click="edit(scope.row)" :disabled="scope.row.state === 1">编辑</el-button>
            <el-button type="danger" plain class="el-button" @click="del(scope.row.did)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tabs>

    <el-dialog v-model="editVisible" title="编辑捐赠单" width="20%">
      <el-form :model="edit_form">
        <el-form-item label="捐赠物资">
          <el-input v-model="edit_form.mname" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="物资种类">
          <el-select v-model="edit_form.type" placeholder="请选择物资种类">
            <el-option label="食物" value="食物"/>
            <el-option label="医用品" value="医用品"/>
          </el-select>
        </el-form-item>
        <el-form-item label="捐赠数量">
          <el-input v-model="edit_form.count" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="subedit">确认</el-button>
      </span>
      </template>
    </el-dialog>

    <el-dialog v-model="addVisible" title="捐赠物资" width="20%">
      <el-form :model="add_form">
        <el-form-item label="捐赠物资">
          <el-input v-model="add_form.mname" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="物资种类">
          <el-select v-model="add_form.type" placeholder="请选择物资种类">
            <el-option label="食物" value="食物"/>
            <el-option label="医用品" value="医用品"/>
          </el-select>
        </el-form-item>
        <el-form-item label="捐赠数量">
          <el-input v-model="add_form.count" autocomplete="off"/>
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
import {reactive, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "UserDonation",
  data() {
    return {
      token: 0,
      donated: [],

      editVisible: ref(false),
      addVisible: ref(false),
      formLabelWidth: '200px',
      edit_form: reactive({
        mname: '',
        type: '',
        count: 0
      }),
      add_form: reactive({
        uid: 0,
        mname: '',
        type: '',
        count: 0
      }),
    }
  },
  async created() {
    this.token = localStorage.getItem('token')
    console.log(this.token)
    let ret = await this.$http.get('donation/checkByUid/' + this.token)
    this.donated = ret.data.data
  },
  methods: {
    addDo() {
      this.addVisible = true
    },
    async subadd() {
      if (this.add_form.count > 0) {
        this.addVisible = false
        // console.log(this.add_form)
        this.add_form.uid = localStorage.getItem('token')
        // console.log(this.add_form)
        let ret = await this.$http.post('/donation/add', this.add_form)
        console.log(ret)
      } else {
        ElMessageBox({
          title: 'Error',
          message: '最少捐赠一个！',
          type: 'error',
          offset: 50,
        })
      }
    },
    edit(row) {
      this.edit_form = row
      this.editVisible = true
      console.log(this.edit_form)
    },
    async subedit() {
      console.log(this.edit_form)
      let ret = await this.$http.post('/donation/update', this.edit_form)
      console.log(ret)

      this.editVisible = false
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
        let ret = await this.$http.delete('/donation/' + id)
        console.log(ret)
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