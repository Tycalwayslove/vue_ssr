export default {
  push(state, { tabItem }) {
    console.log(tabItem)
    state.tabList.push(tabItem)
  }
}
