export function callWXPAY (orderId, callback) {
  let response = this.$post('/wx/pay', {order_id: orderId})
  if (response != null && !response.err) {
    wx.requestPayment({
      'timeStamp': '',
      'nonceStr': '',
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success': function (res) {
        wx.navigateTo({
          url: "/pages/paysuccess/main?isok=true"
        })
      },
      'fail': function (res) {
        wx.navigateTo({
          url: "/pages/paysuccess/main?isok=false"
        })
      }
    })
  }
}
