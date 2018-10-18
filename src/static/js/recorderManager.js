import store from '../../store/index'

const options = {
  sampleRate: 16000,  // 采样率，有效值 8000/16000/44100
  numberOfChannels: 1, // 录音通道数，有效值 1/2
  encodeBitRate: 96000, // 编码码率
  format: 'mp3',         // 音频格式，有效值 aac/mp3
  frameSize: 50          // 指定帧大小
}
const Recorder = wx.getRecorderManager()
const AudioContext = wx.createInnerAudioContext()
export function startManager () {
  Recorder.start(options)
}
export function stopManager (callback) {
  Recorder.onStop( file => {
    console.log(file)
    wx.uploadFile({
      url: `${store.state.url}/op/upload`,
      filePath: file.tempFilePath,
      formData: {'upType': 'titlePic'},
      name: 'file',
      success: (res) => {
        callback(res.data)
      },
      fail: err => {
        console.log(err)
      }
    })
  })
  Recorder.stop()
}
export function playAudio (path) {
  AudioContext.onPlay(() => {
    console.log('录音播放中')
  })
  AudioContext.src = path
  AudioContext.obeyMuteSwitch = false
  AudioContext.volume = 99
  console.log(AudioContext.duration)
  AudioContext.play()
}
