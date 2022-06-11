<template>
  <el-carousel height="540px" :interval="5000" pause-on-hover>
    <el-carousel-item v-for="item in imgs" :key="item.id">
      <img :src="item.url" alt="" v-if="item" class="carousel">
      <h3 text="2xl" justify="center" v-else>{{ item.url }}</h3>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'CarouselCard',
  props: ['adgroup'],
  data() {
    return {
      imgs: []
    }
  },
  created() {
    this.imgs = this.adgroup
  }
}
</script>

<style lang="less" scoped>
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.carousel {
  width: 100%;
  height: 1080px;
  bottom: 360px;
}
</style>