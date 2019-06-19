export default () => ({

  // 基础常量
  pageNum: 1, // 第几页
  pageSize: 10, // 一页显示
  // 数据源
  tabList: [], // tab列表
  sportList: [], // 比赛列表
  //tab相关 
  fNum: 3, // 一级获取个数
  sNum: 2, // 二级获取个数
  tNum: 5, // 三级获取个数
  // 获取sportList必须变量
  typeId: null // 该tab 的typeId
})
