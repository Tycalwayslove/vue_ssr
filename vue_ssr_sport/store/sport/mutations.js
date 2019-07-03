// import { prevDate, nextDate } from '@/utils/utils'
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
  // 填充其他数据
  pushParams(state, params) {
    Object.assign(state, params)
    // state.params = { ...params }
  },
  // 填充时间
  pushDate(state, time) {
    state.playDate = time
  },
  // 填充数量
  pushCount(state, count) {
    state.Count = count
  },
  // 上拉动作，改变AheadOrRear  的值
  changeAheadValue(state, { type }) {
    if (type === 'DOWN') {
      state.AheadOrRear = 2
      // state.playDate = prevDate(state.playDate)
    } else if (type === 'UP') {
      state.AheadOrRear = 1
      // state.playDate = nextDate(state.playDate)
    }
  },
  changePageNum(state, num) {
    if (num === '1') {
      state.PageNum = ++state.PageNum
    } else {
      state.PageNum = 1
    }
  },
  changePlayDate(state, date) {
    state.playDate = date
  },
  changeCount(state, num) {
    state.Count = num
  },

  // 改变params 的值
  changeParams(state, actions) {
    // console.log(actions)
    if (state.hasOwnProperty(actions.name)) {
      state[actions.name] = actions.value
    }
  }
}
