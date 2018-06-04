export function callWXPAY (orderId, openid) {
  let response = this.$post('/wx/pay', {openid: openid, order_id: orderId, iswx: 1})
  console.log(response)
  if (response != null && !response.err) {
    wx.requestPayment({
      'timeStamp': '',
      'nonceStr': '',
      'package': 'prepay_id=',
      'signType': 'MD5',
      'paySign': '',
      'success': function (res) {
        wx.redirectTo({
          url: '/pages/paysuccess/main?isok=true'   // 充值成功后的处理，可以跳转，也可以根据自己的需要做其他处理
        })
      },
      'fail': function (res) {
        wx.navigateTo({
          url: '/pages/paysuccess/main?isok=false'
        })
      }
    })
  }
}
