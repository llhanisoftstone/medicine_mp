import store from '../../store/index'

function checkLogin (callback, isskip, beforeUrl) {
  console.log(store.state.user.sid)
  wx.request({
    url: store.state.url + '/op/authorization',    // 拼接完整的url
    data: {},
    method: 'POST',
    header: {
      'content-type': 'application/json',
      Authorization: `jwt ${store.state.user.sid}`
    },
    success (res) {
      if (isskip) {
        callback(res)
        return
      }
      if (res.data.code === 200 && res.data.username) {
        callback()
      } else {
        let pagesArr = getCurrentPages ()
        let currentPage = pagesArr[pagesArr.length - 1]
        let url = beforeUrl||currentPage.route
        store.commit('getUrl',url)
        if( res.data.code != 200) {
          store.commit('getm_user', {})
        }
      }
      // resolve(res.data)  // 把返回的数据传出去
    },
    fail (ret) {
      reject(ret)   // 把错误信息传出去
    }
  })
}

function formatPrice (price) {
  if (price >= 1000000) {
    return (price / 1000000).toFixed(0) + '万'
  } else if (price >= 10000) {
    if (price % 100 === 0) {
      return parseInt(price / 100)
    } else {
      return parseFloat(price / 100).toFixed(2)
    }
  } else {
    if (price % 100 === 0) {
      return parseInt(price / 100).toFixed(2)
    } else {
      return parseFloat(price / 100).toFixed(2)
    }
  }
}
function zcount (val) {
  if (val >= 100000000) {
    return Math.floor(parseFloat(val) / 100000000) + '亿'
  } else if (val >= 10000) {
    return Math.floor(parseFloat(val) / 10000) + '万'
  } else {
    return val
  }
}
function distance (val) {
  if (isNaN(parseInt(val))) {
    return '0m'
  }
  if (val >= 10000000) {
    return Math.floor(parseFloat(val) / 1000000) / 10 + '万km'
  } else if (val >= 1000) {
    return Math.floor(parseFloat(val) / 100) / 10 + 'km'
  } else {
    return Math.floor(val) + 'm'
  }
}
function getDate (v1) {
  if (v1 == null) {
    return
  }
  v1 = v1.replace(/-/g, '/')
  var data = Date.parse(v1)
  data = new Date(data)
  var month = parseInt(data.getMonth() + 1) < 10 ? '0' + parseInt(data.getMonth() + 1) : parseInt(data.getMonth() + 1)
  var date = parseInt(data.getDate()) < 10 ? '0' + parseInt(data.getDate()) : parseInt(data.getDate())
  return data.getFullYear() + '-' + month + '-' + date
}
function num_limit (el, obj) {
  var minus = obj.minus || false
  var dec = obj.dec || false
  var max = obj.max
  var maxval = obj.maxval
  if (minus && dec) { //负数和小数
    el = el.replace(/[^\d.\-]/g,"") //清除"数字"和".""和"-"以外的字符
  } else if (minus) { //负数
    el = el.replace(/[^\d\-]/g,""); //清除"数字"和"-"以外的字符
  }else if(dec){//小数
    el = el.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
  }else{//正整数
    el = el.replace(/[^\d]/g,""); //清除"数字"和"."以外的字符
  }
  el = el.replace(/^\./g,""); //验证第一个字符是数字
  el = el.replace(/\.{2,}/g,"."); //只保留第一个., 清除多余的
  el = el.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
  el = el.replace(/\-{2,}/g,"-"); //只保留第一个字符-, 清除多余的
  el = el.replace(/^\-/g,"$#$").replace(/\-/g,"").replace("$#$","-");
  if(dec){
    var reg=new RegExp("^(\\-)*(\\d+)\\.(\\d{0,"+dec+"}).*$","i");
    el = el.replace(reg,'$1$2.$3'); //只能输入两个小数
  }
  if(el.length>max){  //最大位数
    el = el.substring(0,max);
  }
  if(maxval){
    maxval=Number(maxval);
    if(el>maxval){  //最大值
      el = maxval;
    }
  }
  return el
}
let commons = {zcount, formatPrice, distance, getDate, checkLogin, num_limit}
export default commons

