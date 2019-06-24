import moment from 'moment'
export function getNowDate() {
  const formatDate = moment().format('YYYY-MM-DD')
  console.log(formatDate)
  return formatDate
}
export function prevDate(Date) {
  return moment(Date)
    .subtract(1, 'days')
    .format('YYYY-MM-DD')
}
export function nextDate(Date) {
  return moment(Date)
    .add(1, 'days')
    .format('YYYY-MM-DD')
}
