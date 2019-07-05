<template>
  <div class="app-container">
    <fix-header id="header" ref="header" v-model="show"></fix-header>

    <scroll
      ref="scroll"
      class="scroll-wrapper"
      :data="SportList"
      :listen-scroll-end="true"
      :pull-up-load="pullUpLoad"
      :pull-down-refresh="pullDownRefresh"
      @pullingUp="onPullingUp"
      @pullingDown="onPullingDown"
    >
      <sport-list
        v-if="Count > 0"
        :list="SportList"
        :style="{ paddingTop: paddingTopValue }"
      ></sport-list>
      <div v-else>这里是没有数据该显示的组件</div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/site-components/Scroll.vue'
import sportList from 'components/page-list-components/sport-list'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import moment from '~/plugins/moment'
import fixHeader from 'components/site-components/fix-header'
// import { nextDate } from '@/utils/utils'

export default {
  components: {
    Scroll,
    sportList,
    fixHeader
  },
  data() {
    return {
      show: true,
      header: 'Better-scroll',
      pullUpLoad: {
        threshold: 10,
        txt: { more: '正在加载以后的赛事中', noMore: '暂无更多数据' }
      },
      pullDownRefresh: {
        threshold: 60,
        stop: 60,
        txt: { more: '', noMore: '暂无更多数据' }
      },
      page: 0,
      list: {},
      top: null,
      noDataMsg: '' // 没有数据时候显示
    }
  },
  computed: {
    ...mapGetters({
      sportListParams: 'sport/getSportListParams', // 获取渲染赛事传参 | type: Object
      SportList: 'sport/getSportList', // 获取sport list
      Count: 'sport/getCount' // 获取接口返回的数据数量
    }),
    paddingTopValue() {
      if (this.show) {
        return this.top
      } else {
        return '0px'
      }
    }
  },
  asyncData({ $axios, context, params }) {
    return $axios
      .get('/api/GetTabs/GetReMen?fNum=3&sNum=4&tNum=5')
      .then(res => {
        console.log(res.Data.List)
        // return {
        //   list: res.Data.List
        // }
      })
  },
  // 全局store 入口
  fetch({ app, $axios }) {
    const nowDate = moment().format('YYYY-MM-DD')
    const params = {
      pageNum: 1,
      pageSize: 10,
      firstClassId: 0,
      secondClassId: 0,
      thirdClassId: 0,
      playDate: nowDate,
      AheadOrRear: 0
    }
    console.log(params)
    return $axios
      .get('/api/GetPlayData/GetPalyForType', { params })
      .then(res => {
        console.log(res)
        if (res.Status === 1) {
          const list = res.Data.List
          const obj = res.Data
          const key = moment(obj.Date).format('YYYY-MM-DD')
          const value = obj.List
          const newObj = {}
          const portDate = moment(obj.Date).format('YYYY-MM-DD')
          const Count = obj.Count
          // console.log(portDate)
          if (list.length > 0) {
            if (typeof obj === 'object' && obj instanceof Object) {
              if (!obj.hasOwnProperty('Date')) {
                console.log(
                  '数据合适有问题，请检查返回的对象中是否含有Date 字段'
                )
                return
              }
              if (!obj.hasOwnProperty('List')) {
                console.log(
                  '数据合适有问题，请检查返回的对象中是否含有List 字段'
                )
                return
              }
              newObj[key] = value
            } else {
              console.log('请输入一个对象')
            }
          }
          console.log(newObj)
          app.store.commit('sport/pushSportList', newObj)
          app.store.commit('sport/pushParams', params)
          app.store.commit('sport/pushDate', portDate)
          app.store.commit('sport/pushCount', Count)
        }
      })
  },
  mounted() {
    // 设置滚动区域的高度
    this.$nextTick(() => {
      const height = this.$refs.header.$el.offsetHeight
      this.top = height + 'px'
    })
  },
  methods: {
    ...mapActions({
      changeParams: 'sport/changeParams',
      handleTouchBehavior: 'sport/handleTouchBehavior'
    }),
    ...mapMutations({
      pushSportList: 'sport/pushSportList',
      pushParams: 'sport/pushParams',
      changeAheadValue: 'sport/changeAheadValue',
      changePageNum: 'sport/changePageNum',
      changePlayDate: 'sport/changePlayDate',
      changeCount: 'sport/changeCount'
    }),
    onPullingUp() {
      console.log('上拉动作')
      this.changeAheadValue({ type: 'UP' })
      this.requestData(1)
    },
    onPullingDown() {
      console.log('下拉动作')
      this.changeAheadValue({ type: 'DOWN' })
      this.requestData(2)
    },
    parseData(data) {
      const obj = data
      // 判断是否为对象
      if (typeof obj === 'object' && obj instanceof Object) {
        if (!obj.hasOwnProperty('Date')) {
          console.log('数据合适有问题，请检查返回的对象中是否含有Date 字段')
          return
        }
        if (!obj.hasOwnProperty('List')) {
          console.log('数据合适有问题，请检查返回的对象中是否含有List 字段')
          return
        }
        const key = moment(obj.Date).format('YYYY-MM-DD')
        const value = obj.List
        const newObj = {}
        newObj[key] = value
        return newObj
      } else {
        console.log('请输入一个对象')
      }
    },
    requestData(num) {
      this.$axios
        .get('/api/GetPlayData/GetPalyForType', {
          params: this.sportListParams
        })
        .then(res => {
          console.log(res)
          const data = this.parseData(res.Data)
          console.log(data)
          this.changeCount(res.Data.Count)
          if (res.Data.Count === 10) {
            this.changePageNum('1')
          } else {
            this.changePageNum('2')
          }
          if (num === 1) {
            if (this.SportList.length === 0) {
              this.pushSportList(data)
            } else {
              let list = { ...this.SportList }
              console.log(list)
              for (const item in data) {
                if (list.hasOwnProperty(item)) {
                  list[item].push(data[item])
                } else {
                  this.$set(this.list, item, data[item])
                  list = Object.assign(list, data)
                }
              }
              console.log(list)
              this.pushSportList(list)
            }
          } else if (num === 2) {
            console.log(data)
            this.pushSportList(data)
          }
          this.changePlayDate(moment(res.Data.Date).format('YYYY-MM-DD'))
          // if (this.Count !== 0) {
          //   const data = this.parseData(res) // 更改数据格式
          //   console.log(data)
          //   const arr = Object.getOwnPropertyNames(this.list) // 判断this.list 是否为空
          //   console.log(this.sportListParams.AheadOrRear)
          //   if (this.sportListParams.AheadOrRear === 1) {
          //     console.log(this.list)
          //     if (arr.length === 0) {
          //       // 数据为空时直接赋值给this.list
          //       this.$set(this.list, data)
          //     } else {
          //       console.log(data)
          //       // 遍历返回的data, 如果data对象中的key 相同，则合并该属性的值
          //       for (const item in data) {
          //         if (this.list.hasOwnProperty(item)) {
          //           this.list[item].push(data[item])
          //         } else {
          //           this.$set(this.list, item, data[item])
          //         }
          //       }
          //       console.log(this.list)
          //     }
          //   } else if (this.sportListParams.AheadOrRear === 2) {
          //     if (arr.length === 0) {
          //       // 数据为空时直接赋值给this.list
          //       this.$set(this.list, data)
          //     } else {
          //       console.log(data)
          //       // 遍历返回的data, 如果data对象中的key 相同，则合并该属性的值
          //       // for (const item in data) {
          //       //   if (this.list.hasOwnProperty(item)) {
          //       //     this.list[item].unshift(data[item])
          //       //   } else {
          //       //     // this.$set(this.list, item, data[item])
          //       //     // this.list.unshift(data)
          //       //     this.$set(this.list, item, data[item])
          //       //   }
          //       // }
          //       // console.log(this.list)
          //       this.list = data
          //     }
          //     // this.list = this.list.concat(res.List)
          //     // this.list.push(res)
          //     // console.log(this.list)
          //   } else {
          //     this.list = data
          //   }
          //   const paramsCount = { name: 'dataCount', value: res.Count }
          //   this.changeParams(paramsCount)
          // }
        })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scope>
.app-container {
  height: 100vh;
  position: relative;
}
.scroll-wrapper {
  width: rem(375);
}
</style>
