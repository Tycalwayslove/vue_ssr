export default {
  // 获取tabs 列表
  getTbList(state) {
    return state.tabList
  },
  // 获取 sportList 列表
  getSportList(state) {
    return state.tabList
  },
  // 获取typeId
  getTypeKey(state) {
    return state.typeId
  },
  // 获取基础常量
  getBaseKey(state) {
    const { pageNum, pageSize } = state
    return { pageNum, pageSize }
  }
}
