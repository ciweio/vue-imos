<template>
  <el-tabs
      v-model="activeName"
      type="border-card"
      class="demo-tabs"
      @tab-click="handleClick"
  >
    <el-tab-pane label="防疫物资" name="materials">
      <slot name="materials"></slot>
    </el-tab-pane>
    <el-tab-pane label="用户信息">
      <slot name="users"></slot>
    </el-tab-pane>
    <el-tab-pane label="工单审计">
      <slot name="wo"></slot>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import type {TabsPaneContext} from 'element-plus'

const activeName = ref('materials')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>