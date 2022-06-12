<template>
  <router-view v-slot="{ Component }">
    <transition name="slide-fade" mode="out-in">
      <component :is="Component"/>
    </transition>
  </router-view>
</template>

<script>


export default {
  name: 'App',
  components: {}
}
</script>

<style lang="less" scoped>
.slide-fade-enter-from {
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(3%);
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all .5s ease;
}
</style>