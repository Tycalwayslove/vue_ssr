export default function(app) {
  const axios = app.$axios
  // 基本配置
  // axios.defaults.baseUrl = "http://3.1.85.182:8080"
  axios.defaults.timeout = 10000
  axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded'

  // 请求回调
  axios.onRequest(config => {
    console.log(config)
  })

  // 返回回调
  axios.onResponse(res => {
    console.log(res)
  })

  // 错误回调
  axios.onError(error => {
    console.log(error)
  })
}
