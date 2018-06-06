export function callWXPAY (orderId, openid) {
  this.$post('/wx/pay', {openid: openid, order_id: orderId, iswx: 1}).then(function (response) {
    if (response != null && !response.err) {
      wx.requestPayment({
        'timeStamp': response.timeStamp,
        'nonceStr': response.nonceStr,
        'package': response.package,
        'signType': response.signType,
        'paySign': response.paySign,
        'appId': response.appId,
        'success': function (res) {
          wx.redirectTo({
            url: '/pages/paysuccess/main?isok=true'   // 充值成功后的处理，可以跳转，也可以根据自己的需要做其他处理
          })
        },
        'fail': function (res) {
          wx.redirectTo({
            url: '/pages/paysuccess/main?isok=false'
          })
        }
      })
    }
  })
}
