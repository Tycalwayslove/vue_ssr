import { getNowDate } from '@/utils/utils'
export default () => ({
  // 基础常量
  // pageNum: 1, // 第几页
  // pageSize: 10, // 一页显示
  // 数据源
  tabList: [], // tab列表
  sportList: [], // 比赛列表
  Count: 0, // 接口返回的数据数量
  // tab 相关
  fNum: 3, // tab 一级获取个数
  sNum: 4, // tab 二级获取个数
  tNum: 5, // tab 三级获取个数
  // sportList相关
  firstClassId: 0, // 一级获取个数 0 则为全部
  secondClassId: 0, // 二级获取个数
  thirdClassId: 0, // 三级获取个数
  AheadOrRear: 0, // 2 为上拉动作 1 为下拉动作 默认为0
  playDate: getNowDate(), // 当前日期
  dataCount: null // 获取数据返回的数据数量
  // todaysIsOver: 2, // 今日比赛是否已经完结 1 已经完结 2 ： 未完结
  // 获取sportList必须变量
  // typeId: null, // 该tab 的typeId
})
