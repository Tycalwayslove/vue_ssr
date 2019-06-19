<!-- 游戏列表 -->
<template>
  <div class="app-container">
    <fix-header v-model="show"></fix-header>
    <div class="wrapper">
      <div class="content">
        <sport-list-item
          v-for="(item, index) in 20"
          :key="index"
          @click.native="handleClick(index)"
        ></sport-list-item>
      </div>
    </div>
  </div>
</template>

<script>
import sportListItem from 'components/page-list-components/sport-list-item'
import fixHeader from 'components/site-components/fix-header'
import 'swiper/dist/css/swiper.css'
// import { getGameList, test } from '@/api/index'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'GameList',
  components: { fixHeader, sportListItem },

  data() {
    return {
      data: {},
      show: true
    }
  },
  computed: mapGetters({
    tabs: 'sport/gettTbList',
    sportList: 'sport/getSportList',
    baseKey: 'sport/getBaseKey'
  }),
  // asyncData(context, app) {
  //   console.log(context)
  //   context.$axios
  //     .get('/api/GetTabs/GetReMen?FNum=3&SNum=4&TNum=5')
  //     .then(res => {
  //       console.log(res)
  //       // context.pushItem(res)
  //     })
  // },
  fetch({ $axios, app }) {
    const { fNum, sNum, tNum } = app.store.state.sport
    return $axios
      .get(`/api/GetTabs/GetReMen?FNum=${fNum}&SNum=${sNum}&TNum=${tNum}`)
      .then(res => {
        console.log(res)
        app.store.commit('sport/pushTabList', res)
      })
  },

  mounted() {
    // eslint-disable-next-line
    const BScroll = require('better-scroll').default
    console.log()
    this.scroll = new BScroll('.wrapper')
  },
  methods: {
    ...mapActions({
      getTabList: 'sport/getTabList'
    }),
    ...mapMutations({
      pushItem: 'sport/pushTabList'
    }),
    handleClick(num) {
      console.log(num)
      const tabItem = {
        typeID: num,
        typeName: `名称${num}`,
        LV: 'Thrid'
      }
      this.pushItem(tabItem)
    }
  }
}
</script>

<style lang="scss" scoped>
.game {
  overflow: scroll;
}
.wrapper {
  height: 100vh;
}
</style>
