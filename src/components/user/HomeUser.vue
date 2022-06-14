<template>
  <div class="home-user">
    <div class="btn-group">
      <el-page-header @back="logOff" class="log_off"/>
      <button type="button" class="btn btn-danger" @click="comName='UserDonation'">我的捐赠</button>
      <button type="button" class="btn btn-danger" @click="comName='UserApplication'">我的申请</button>
    </div>
    <transition name="slide-fade" mode="out-in">
      <keep-alive>
        <component :is="comName"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import {ref} from 'vue'
import UserDonation from "./UserDonation.vue";
import UserApplication from "./UserApplication.vue";

export default {
  name: "HomeUser",
  components: {
    UserDonation,
    UserApplication
  },
  data() {
    return {
      comName: 'UserDonation',
      tabPosition: ref('left')
    }
  },
  methods: {
    logOff() {
      this.$router.push('/navigation/login')
      localStorage.removeItem('token')
    }
  }
}
</script>

<style lang="less" scoped>
.home-user {
  height: 780px;
  background: linear-gradient(to right bottom, #CC95C0, #DBD4B4, #7AA1D2);
  padding: 15px;

  .btn-group {
    color: white;

    .log_off {
      color: whitesmoke;
      display: inline-block;
      margin-right: 550px;
    }

    .btn {
      background-color: #CC95C0;
      border-color: #CC95C0;
    }
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
}
</style>