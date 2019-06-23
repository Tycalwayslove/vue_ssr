import { nextDate, prevDate } from '@/utils/utils'

export default {
  // 获取tab列表，并提交 pushTabList 事件，填充至 tabList
  getTabList({ commit, state }) {
    // context.commit('pushTabList')
    this.$axios
      .get(
        `/api/GetTabs/GetReMen?fNum=${state.fNum}&sNum=${state.sNum}&tNum=${state.tNum}`
      )
      .then(res => {
        commit('pushTabList', res)
      })
      .catch(error => {
        console.log(error)
      })
  },
  // 改变参数
  changeParams({ commit, state }, actions) {
    // actions 格式:{dataCount: 4}
    commit('changeParams', actions)
  },
  // 上拉下拉 行为逻辑
  // 下拉： 日期改变 | playDate 减少一天 AheadOrRear 为2
  // 上拉
  // 逻辑判断
  // dataCount === pageSize ? pageNum ++
  // dataCount < pageSize? playDate ++ && pageNum = 1
  handleTouchBehavior({ commit, state }, behavior) {
    if (behavior.type === 'buttom') {
      // 下拉行为
      if (state.dataCount === state.pageSize) {
        commit('changeParams', { name: 'AheadOrRear', value: 1 })
        commit('changeParams', { name: 'pageNum', value: ++state.pageNum })
        commit('changeParams', { name: 'todaysIsOver', value: 2 })
        console.log('今日可能还有比赛')
      } else {
        console.log('今日已经没有比赛了')
        commit('changeParams', { name: 'AheadOrRear', value: 1 })
        commit('changeParams', { name: 'pageNum', value: 1 })
        commit('changeParams', {
          name: 'playDate',
          value: nextDate(state.playDate)
        })
        // commit('changeParams', { name: 'todaysIsOver', value: 1 })
      }
    } else if (behavior.type === 'top') {
      commit('changeParams', {
        name: 'playDate',
        value: prevDate(state.playDate)
      })
      commit('changeParams', { name: 'AheadOrRear', value: 2 })
      commit('changeParams', { name: 'pageNum', value: 1 })
    }
  }
}
