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
import sportList from 'components/page-list-components/sport-list-item'
import { mapGetters, mapActions } from 'vuex'

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
        threshold: 100,
        stop: 60,
        txt: { more: '', noMore: '暂无更多数据' }
      },
      page: 0,
      list: []
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
      changeParams: 'sport/changeParams'
    }),
    onPullingUp() {
      console.log('下拉')
      this.changeParams('BUTTOM')
      this.requestData()
    },
    onPullingDown() {
      console.log('上拉')
      this.changeParams('TOP')
      this.requestData()
    },
    requestData() {
      this.$axios
        .get('/api/GetPlayData/GetPalyForType', {
          params: this.sportListParams
        })
        .then(res => {
          console.log(res)
          // this.list = res.List
          if (this.sportListParams.AheadOrRear === 2) {
            console.log(this.list)
            res.List.map(item => this.list.unshift(item))
            console.log(this.list)
          } else if (this.sportListParams.AheadOrRear === 1) {
            this.list = this.list.concat(res.List)
            console.log(this.list)
          } else {
            this.list = res.List
          }
        })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scope></style>
