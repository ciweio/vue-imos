<template>
  <el-button @click="open" type="danger">删除</el-button>
</template>

<script lang="ts" setup>
import {ElMessage, ElMessageBox} from 'element-plus'

const open = () => {
  ElMessageBox.confirm(
      '确认删除？',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
  )
      .then(() => {
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
}
</script>

<style>

</style>