export default {
  // 获取tabs 列表
  getTabList(state) {
    return state.tabList
  },
  // 获取 sportList 列表
  getSportList(state) {
    return state.sportList
  },
  // 获取typeId
  getTypeKey(state) {
    return state.typeId
  },
  // 获取基础常量
  getBaseKey(state) {
    const { pageNum, pageSize } = state
    return { pageNum, pageSize }
  },
  // 获取请求列表的参数
  getSportListParams(state) {
    const {
      pageNum,
      pageSize,
      firstClassId,
      secondClassId,
      thirdClassId,
      playDate,
      AheadOrRear,
      todaysIsOver
    } = state

    return {
      pageNum,
      pageSize,
      firstClassId,
      secondClassId,
      thirdClassId,
      playDate,
      AheadOrRear,
      todaysIsOver
    }
  }
}
