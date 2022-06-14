<template>
  <div class="home-admin">
    <div class="home-ad">
      <span>Slot</span>
      <el-divider class="divider"/>
      <data-card/>
    </div>
    <div class="home-table">
      <el-page-header content="Home" @back="logOff"/>
      <div class="tablecard">
        <top-table>
          <template v-slot:materials>
            <MaterialMgmt/>
          </template>
          <template v-slot:users>
            <UserMgmt/>
          </template>
          <template v-slot:wo>
            <order-mgmt/>
          </template>
        </top-table>
      </div>
    </div>
  </div>
</template>

<script>
import DataCard from '../DataCard.vue'
import TopTable from '../TopTab.vue'
import UserMgmt from "./UserMgmt.vue";
import MaterialMgmt from "./MaterialMgmt.vue";
import OrderMgmt from "./OrderMgmt.vue";

export default {
  name: "HomeAdmin",
  components: {
    DataCard,
    TopTable,
    UserMgmt,
    MaterialMgmt,
    OrderMgmt
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
.home-admin {
  height: 800px;
  background: linear-gradient(to bottom, #ECE9E6, #DAE2FB);

  .home-ad {
    width: 30%;
    height: 100%;
    float: left;
    margin: 20px 0 0 30px;

    span {
      font-size: 18px;
      font-family: "等线", serif;
      color: #928DAB;
    }

    .divider {
      width: 92%;
      margin: 0 10px 0 0;
    }
  }

  .home-table {
    width: 65%;
    height: 100%;
    float: right;
    margin: 20px 30px 0 0;
    padding-top: 5px;

    .tablecard {
      margin-top: 8px;
    }
  }
}
</style>