<template>
  <div class="adcard" v-for="(o, index) in 3" :key="o">
    <el-col>
      <el-card :body-style="{ padding: '0px' }">
        <img src="src/assets/img/demo.jpeg"
             class="image" alt=""/>
        <div style="padding: 14px">
          <span>TestText</span>
          <div class="bottom">
            <time class="time">{{ currentDate }}</time>
            <el-tooltip content="175XXXXXXXX" effect="customized" placement="right">
              <el-button text class="button">联系我们</el-button>
            </el-tooltip>
          </div>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'

const currentDate = ref(new Date())
</script>

<style>
.adcard {
  display: inline-block;
  width: 45%;
  margin: 10px 10px 0 0;
}

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
}

.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
</style>