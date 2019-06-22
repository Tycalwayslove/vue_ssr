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
        <sport-list></sport-list>

        <!-- 下拉事件的显示 -->
        <div class="pullup-wrapper">
          <div v-if="!isPullUpLoad" class="before-trigger">
            <span class="pullup-txt">Pull up and load more</span>
          </div>
          <div v-else class="after-trigger">
            <span class="pullup-txt">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sportList from 'components/page-list-components/sport-list'
import fixHeader from 'components/site-components/fix-header'
import { mapActions, mapGetters, mapMutations } from 'vuex'
const TIME_BOUNCE = 800
const TIME_STOP = 600
const THRESHOLD = 70
const STOP = 56
export default {
  name: 'GameList',
  components: { fixHeader, sportList },

  data() {
    return {
      data: {},
      show: false,
      beforePullDown: true,
      isPullingDown: false,
      isPullUpLoad: false
    }
  },
  computed: mapGetters({
    baseKey: 'sport/getBaseKey', // 对象
    sportListParams: 'sport/getSportListParams' // 获取渲染赛事传参 | type: Object
  }),
  fetch({ $axios, app }) {
    return $axios
      .get(`/api/GetTabs/GetTypeClass?typeLevelName=firsttype&typeId=0`)
      .then(res => {
        console.log(res)
        app.store.commit('sport/pushTabList', res)
      })
  },

  mounted() {
    // better-scroll 初始化
    this._initBscroll()
    this.requestData()
  },
  methods: {
    ...mapActions({
      getTabList: 'sport/getTabList'
    }),
    ...mapMutations({
      pushItem: 'sport/pushTabList',
      pushSportList: 'sport/pushSportList', // 填充sportList
      changeAheadValue: 'sport/changeAheadValue' // 改变Ahead 值
    }),
    handleClick(num) {
      // const tabItem = {
      //   typeID: num,
      //   typeName: `名称${num}`,
      //   LV: 'Thrid'
      // }
      // this.pushItem(tabItem)
    },
    // 请求数据
    requestData() {
      // const params = this.sportListParams // 此处为store 中的数据
      console.log(this.sportListParams)
      this.$axios
        .get('/api/GetPlayData/GetPalyForType', {
          params: this.sportListParams
        })
        .then(res => {
          console.log(res)
          this.pushSportList(res)
        })
    },
    // 下拉刷新之后
    async finishPullDown() {
      console.log('刷新完成')
      const stopTime = TIME_STOP
      await new Promise(resolve => {
        setTimeout(() => {
          this.bscroll.finishPullDown()
          resolve()
        }, stopTime)
      })
      setTimeout(() => {
        this.beforePullDown = true
        this.bscroll.refresh()
      }, TIME_BOUNCE)
    },
    // 下拉动作
    async pullingUpHandler() {
      this.isPullUpLoad = true
      this.changeAheadValue('BUTTOM') // 改变ahader的值
      console.log('开始下拉')
      await this.requestData()
      this.bscroll.finishPullUp()
      this.isPullUpLoad = false
    },
    // 监听的下拉事件
    async pullingDownHandler() {
      console.log('改变aheadera')
      this.changeAheadValue('TOP') // 改变ahader的值
      this.beforePullDown = false
      this.isPullingDown = true
      await this.requestData()
      this.isPullingDown = false
      this.finishPullDown()
    },
    scrollHandler(pos) {
      // console.log(pos.y)
    },
    _initBscroll() {
      const BScroll = require('better-scroll').default
      this.bscroll = new BScroll('.wrapper', {
        scrollY: true,
        click: true,
        taps: true,
        probeType: 3,
        bonceTime: TIME_BOUNCE,
        pullUpLoad: {
          threshold: -70
        },
        pullDownRefresh: {
          threshold: THRESHOLD,
          stop: STOP
        }
      })
      // console.log(this.bscroll.on.prototype)
      // 上拉事件
      this.bscroll.on('pullingDown', this.pullingDownHandler)
      // 滚动事件
      this.bscroll.on('scroll', this.scrollHandler)
      // 下拉事件
      this.bscroll.on('pullingUp', this.pullingUpHandler)
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
