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
  }
}
