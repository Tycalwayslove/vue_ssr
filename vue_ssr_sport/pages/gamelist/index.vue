<!-- 游戏列表 -->
<template>
  <div class="app-container">
    <fix-header v-model="show"></fix-header>
    <div ref="bsWrapper" class="wrapper">
      <div class="content pulldown-scroller">
        <div class="pulldown-wrapper">
          <div v-show="beforePullDown">
            <span>Pull Down and refresh</span>
          </div>
          <div v-show="!beforePullDown">
            <div v-show="isPullingDown">
              <span>Loading...</span>
            </div>
            <div v-show="!isPullingDown">
              <span>Refresh success</span>
            </div>
          </div>
        </div>
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
import { mapActions, mapGetters, mapMutations } from 'vuex'
import BScroll from '~/plugins/better-scroll'
// import PullDown from 'better-scroll/default/pull-down'
// BScroll.use(PullDown)
const TIME_BOUNCE = 800
// const TIME_STOP = 600
const THRESHOLD = 70
const STOP = 56
export default {
  name: 'GameList',
  components: { fixHeader, sportListItem },

  data() {
    return {
      data: {},
      show: false,
      beforePullDown: true,
      isPullingDown: false
    }
  },
  computed: mapGetters({
    tabs: 'sport/gettTbList',
    sportList: 'sport/getSportList',
    baseKey: 'sport/getBaseKey'
  }),
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
    // const BScroll = require('better-scroll').default
    // BScroll.use(Pulldown)
    // const PullDown = require('better-scroll').default.pull - down
    // let options = {
    // }
    // this.scroll = new BScroll('.wrapper', {
    //   pullDownRefresh: true
    // })
    // console.log(this.scroll)
    this._initBscroll()
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
      // const tabItem = {
      //   typeID: num,
      //   typeName: `名称${num}`,
      //   LV: 'Thrid'
      // }
      // this.pushItem(tabItem)
    },
    // 下拉刷新之后
    finishPullDown() {
      console.log('刷新完成')
    },
    // 请求数据
    async requestData() {
      await setTimeout(() => {
        console.log('请求数据')
      }, 3000)
    },
    // 监听的下拉事件
    async pullingDownHandler() {
      console.log('pullingDown')
      this.beforePullDown = false
      this.isPullingDown = true
      await this.requestData()
      this.isPullingDown = false
      this.finishPullDown()
    },
    scrollHandler(pos) {
      console.log(pos.y)
    },
    _initBscroll() {
      this.bscroll = new BScroll(this.$refs.bsWrapper, {
        scrollY: true,
        click: true,
        taps: true,
        bonceTime: TIME_BOUNCE,
        pullUpLoad: {
          threshold: -70
        },
        pullDownRefresh: {
          threshold: THRESHOLD,
          stop: STOP
        }
      })
      console.log(this.bscroll.on.prototype)
      this.bscroll.on('pullingDown', this.pullingDownHandler)
      // this.bscroll.on('scroll', this.scrollHandler)
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
