<template>
  <div class="home-user">
    <div class="btn-group">
      <button type="button" class="btn btn-danger">我的捐赠</button>
      <button type="button" class="btn btn-danger">我的申请</button>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'

export default {
  name: "HomeUser",
  data() {
    return {
      tabPosition: ref('left')
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.home-user {
  height: 800px;
  background: linear-gradient(to right bottom, #CC95C0, #DBD4B4, #7AA1D2);
  padding: 15px;

  .btn-group{
    width: 200px;
    display: block;
    margin: auto;
    .btn{
      background-color: #CC95C0;
      border-color: #CC95C0;
    }
  }
}
</style>