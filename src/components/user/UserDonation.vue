<template>
  <div>
    <button type="button" class="btn btn-light" @click="addDo">捐赠物资</button>
    <el-tabs style="height: 580px" class="demo-tabs">
      <el-table :data="donated" style="width: 100%" max-height="520">
        <el-table-column prop="did" label="序号" width="120" sortable/>
        <el-table-column prop="mname" label="捐赠物资" width="200" sortable/>
        <el-table-column prop="type" label="物资种类" width="200" sortable/>
        <el-table-column prop="count" label="捐赠数量" width="200" sortable/>
        <el-table-column prop="sdate" label="捐赠日期" width="260" sortable/>
        <el-table-column prop="findate" label="审核状态" width="200" sortable/>
        <el-table-column width="160" fixed="right">
          <template #header>
            <input class="form-control header-ele" v-model="queryField" placeholder="Search"
                   @keyup.enter="selectField"/>
          </template>
          <template #default="scope">
            <el-button plain class="el-button" @click="edit(scope.row)">编辑</el-button>
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
      queryField: '',

      editVisible: ref(false),
      addVisible: ref(false),
      formLabelWidth: '200px',
      edit_form: reactive({
        mname: '',
        type: '',
        count: 0
      }),
      add_form: reactive({
        mname: '',
        type: '',
        count: 0
      }),
    }
  },
  async created() {
    this.token = localStorage.getItem('token')
    console.log(this.token)
    let ret = await this.$http.get('things/list')
    this.donated = ret.data.data
  },
  methods: {
    addDo() {
      this.addVisible = true
    },
    subadd() {
      if (this.add_form.count > 0) {
        this.addVisible = false
        console.log(this.add_form)
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
    },
    subedit() {
      this.editVisible = false
      console.log(this.edit_form)
    },
    del(id) {
      ElMessageBox.confirm(
          '确认删除？',
          '提示',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'error',
          }
      ).then(() => {
        console.log(id)
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
    selectField() {
      console.log(this.queryField)
      this.queryField = ''
    }
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