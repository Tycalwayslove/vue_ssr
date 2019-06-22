import { prevDate, nextDate } from '@/utils/utils'
export default {
  // 填充tabList
  pushTabList(state, tabItem) {
    state.tabList = tabItem
    // state.tabList.push(tabItem)
  },
  // 填充 sportList
  pushSportList(state, sportList) {
    console.log(state)
    state.sportList = sportList
  },
  // 上拉动作，改变AheadOrRear  的值
  changeAheadValue(state, type) {
    if (type === 'TOP') {
      state.AheadOrRear = 2
      const aDate = prevDate(state.playDate)
      state.playDate = aDate
      console.log('上拉动作')
      console.log(state.playDate)
    } else if (type === 'BUTTOM') {
      state.AheadOrRear = 1
      const bDate = nextDate(state.playDate)
      state.playDate = bDate
      console.log('上拉动作')
      console.log(state.playDate)
    }
  }
}
