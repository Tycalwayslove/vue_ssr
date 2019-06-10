<!-- 游戏列表 -->
<template>
  <div class="app-container">
    <fix-header v-model="show"></fix-header>
    <sport-list-item v-for="item in 20" :key="item"></sport-list-item>
    <!-- <button @click="show= !show">点击出现header</button> -->
    hello world
    <nuxt-link to="/gamelist">跳转到gamelist</nuxt-link>
  </div>
</template>

<script>
import sportListItem from 'components/page-list-components/sport-list-item'
import fixHeader from 'components/site-components/fix-header'
// import { getGameList, test } from '@/api/index'
export default {
  name: 'GameList',
  components: { fixHeader, sportListItem },

  data() {
    return {
      data: {},
      show: true
    }
  },
  asyncData({ app }) {
    app.$axios.get('/api/GetTabs/3').then(res => {
      console.log(res)
    })
  },
  // fetch({ app }) {
  //   app.$axios.get('/api/GetTabs/3').then(res => {
  //     console.log(res)
  //   })
  // },
  mounted() {
    this.fetchSomethings()
  },
  methods: {
    async fetchSomethings(op) {
      const data = await this.$axios.$get(
        'http://3.1.85.182:8080/api/GetTabs/1'
      )
      this.data = data
      console.log(this.$axios.defaults)
      await this.$axios.get('/GetTabs/2').then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.game {
  overflow: scroll;
}
</style>
