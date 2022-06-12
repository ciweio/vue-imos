<template>
  <div class="navigation">
    <div class="header">
      <img src="../assets/icons/blossom.png" alt="" width="26"/>
      <span>防疫物资管理</span>
    </div>

    <div class="view">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </div>

    <div class="footer">
      <span>open-source:&nbsp;</span>
      <a href="https://github.com/ciweio/vue-imos.git">
        <img src="../assets/icons/github.svg" alt="" width="30"/>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNavigation",
  data() {
    return {}
  },
  // watch: {
  //   $route(to, from) {
  //     if (to.path === '/navigation/register') {
  //
  //     } else {
  //
  //     }
  //   },
  // },
  // mounted() {
  //   window.addEventListener("load", () => {
  //     this.$router.push('/')
  //   })
  // },
}
</script>

<style lang="less" scoped>
.header {
  height: 30px;
  background-color: #FFFFFF;

  span {
    font-size: 14px;
    font-family: "等线", serif;
    color: #959099;
  }

  img {
    margin: 2px 6px 2px 6px;
  }
}

.view {
  //height: 740px;

  .fade-enter-from {
    //transform: translateX(-50%);
    opacity: 0;
  }

  .fade-leave-to {
    //transform: translateX(50%);
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .5s ease;
  }
}

.footer {
  width: 125px;
  margin: 20px auto;
  font-family: "等线 Light", serif;
}
</style>