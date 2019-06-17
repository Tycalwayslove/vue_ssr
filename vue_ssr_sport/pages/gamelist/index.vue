<!-- You can custom the "mySwiper" name used to find the swiper instance in current component -->
<template>
  <div v-swiper:mySwiper="swiperOption" @someSwiperEvent="callback">
    <div class="swiper-wrapper">
      <div v-for="(banner, index) in banners" :key="index" class="swiper-slide">
        <img :src="banner" />
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: ['/1.jpg', '/2.jpg', '/3.jpg'],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
        // some swiper options...
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.banners.push('/4.jpg')
      console.log('banners update')
    }, 3000)
    console.log(
      'This is current swiper instance object',
      this.mySwiper,
      'It will slideTo banners 3'
    )
    this.mySwiper.slideTo(3, 1000, false)
  }
}
</script>
