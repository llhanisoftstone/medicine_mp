import store from '../store/index'

export function get (url, body) {
  body = body || {}
  body.app = '02'
  return new Promise((resolve, reject) => {
    wx.request({
      url: store.state.url + url,    // 拼接完整的url
      data: body,
      method: 'GET',
      success (res) {
        resolve(res.data)  // 把返回的数据传出去
      },
      fail (ret) {
        reject(ret)   // 把错误信息传出去
      }
    })
  })
}
