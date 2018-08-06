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
  var data = Date.parse(v1)
  data = new Date(data)
  return data.getFullYear() + '-' + parseInt(data.getMonth() + 1) + '-' + data.getDate()
}
let commons = {zcount, formatPrice, distance, getDate}
export default commons
