<template>
  <div>
    <scroll
      ref="scroll"
      :data="list"
      :listen-scroll-end="true"
      :pull-up-load="pullUpLoad"
      :pull-down-refresh="pullDownRefresh"
      @pullingUp="onPullingUp"
      @pullingDown="onPullingDown"
    >
      <sport-list :list="list"></sport-list>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/site-components/Scroll.vue'
import sportList from 'components/page-list-components/sport-list'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
// import { nextDate } from '@/utils/utils'

export default {
  components: {
    Scroll,
    sportList
  },
  data() {
    return {
      header: 'Better-scroll',
      pullUpLoad: {
        threshold: 10,
        txt: { more: '正在加载以后的赛事中', noMore: '暂无更多数据' }
      },
      pullDownRefresh: {
        threshold: 10,
        stop: 60,
        txt: { more: '', noMore: '暂无更多数据' }
      },
      page: 0,
      list: {}
    }
  },
  computed: mapGetters({
    sportListParams: 'sport/getSportListParams' // 获取渲染赛事传参 | type: Object
  }),
  mounted() {
    this.requestData()
  },
  methods: {
    ...mapActions({
      changeParams: 'sport/changeParams',
      handleTouchBehavior: 'sport/handleTouchBehavior'
    }),
    onPullingUp() {
      console.log('下拉')
      this.handleTouchBehavior({ type: 'buttom' })
      this.requestData()
    },
    onPullingDown() {
      console.log('上拉')
      this.handleTouchBehavior({ type: 'top' })
      this.requestData()
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
        console.log(newObj)
        return newObj
      } else {
        console.log('请输入一个对象')
      }
    },
    requestData() {
      this.$axios
        .get('/api/GetPlayData/GetPalyForType', {
          params: this.sportListParams
        })
        .then(res => {
          const data = this.parseData(res) // 更改数据格式
          const arr = Object.getOwnPropertyNames(this.list) // 判断this.list 是否为空
          console.log(this.sportListParams.AheadOrRear)
          if (this.sportListParams.AheadOrRear === 1) {
            console.log(this.list)
            if (arr.length === 0) {
              // 数据为空时直接赋值给this.list
              this.$set(this.list, data)
            } else {
              console.log(data)
              // 遍历返回的data, 如果data对象中的key 相同，则合并该属性的值
              for (const item in data) {
                if (this.list.hasOwnProperty(item)) {
                  this.list[item].push(data[item])
                } else {
                  this.$set(this.list, item, data[item])
                }
              }
              console.log(this.list)
            }
          } else if (this.sportListParams.AheadOrRear === 2) {
            if (arr.length === 0) {
              // 数据为空时直接赋值给this.list
              this.$set(this.list, data)
            } else {
              console.log(data)
              // 遍历返回的data, 如果data对象中的key 相同，则合并该属性的值
              for (const item in data) {
                if (this.list.hasOwnProperty(item)) {
                  this.list[item].unshift(data[item])
                } else {
                  // this.$set(this.list, item, data[item])
                  // this.list.unshift(data)
                  this.$set(this.list, item, data[item])
                }
              }
              console.log(this.list)
            }
            // this.list = this.list.concat(res.List)
            // this.list.push(res)
            // console.log(this.list)
          } else {
            this.list = data
          }
          const paramsCount = { name: 'dataCount', value: res.Count }
          this.changeParams(paramsCount)
        })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scope></style>
