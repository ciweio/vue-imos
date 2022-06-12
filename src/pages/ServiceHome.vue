<template>
  <div class="home">
    <page-header/>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader.vue"

export default {
  name: "ServiceHome",
  components: {
    PageHeader
  }
}
</script>

<style lang="less" scoped>

</style>