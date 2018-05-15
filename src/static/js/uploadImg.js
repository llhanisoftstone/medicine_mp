import store from '../../store/index'

export function uploadImg (type, callback) {   // type:camera 相机 album 相册
  wx.chooseImage({
    count: 9,
    sizeType: ['compressed'],
    sourceType: [type],
    success: function (res) {
      for (let i = 0; i < res.tempFilePaths.length; i++) {
        updatafile(res.tempFilePaths[i])
      }
    },
    fail: function (res) {
      console.log(JSON.stringify(res))
    }
  })
  const updatafile = (pic) => {
    wx.uploadFile({
      url: `${store.state.url}/op/upload`,
      filePath: pic,
      formData: {'upType': 'titlePic'},
      name: 'file',
      success: (res) => {
        callback(res.data)
      },
      fail: err => {
        console.log(err)
      }
    })
  }
}
