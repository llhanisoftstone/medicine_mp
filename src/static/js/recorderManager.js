import store from '@/store/index'

const options = {
  sampleRate: 16000,  // 采样率，有效值 8000/16000/44100
  numberOfChannels: 1, // 录音通道数，有效值 1/2
  encodeBitRate: 96000, // 编码码率
  format: 'mp3',         // 音频格式，有效值 aac/mp3
  frameSize: 50,          // 指定帧大小
  duration: 60000,          // 录音的时长
}
const Recorder = wx.getRecorderManager()
const AudioContext = wx.createInnerAudioContext();
let acitveVoice=-1;//当前播放音频
let isStop=false;//当前播放是否暂停
export function startManager () {
  Recorder.start(options)
}
export function stopManager (callback) {
  Recorder.stop()
  Recorder.onStop( file => {
    console.log(file)
    if(file.duration<1000){
      callback({file:file});
    }else{
      wx.uploadFile({
        url: `${store.state.url}/op/upload`,
        filePath: file.tempFilePath,
        formData: {'upType': 'titlePic'},
        name: 'file',
        success: (res) => {
          res.file=file;
          console.log(res)
          callback(res)
        },
        fail: err => {
          console.log(err)
        }
      })
    }
  })
}
export function playAudio (path,id) {
  console.log(path)
  console.log(id);
  if(acitveVoice!=-1){//播放中再次点击播放
    console.log('播放中再次点击播放');
    if(id==acitveVoice&&!isStop){//播放中并且当前不是暂停状态再次点击该语音时暂停
      AudioContext.pause();
      return;
    }else if(id!=acitveVoice&&!isStop){//播放中点击其他语音，停止播放当前语音，播放该语音
      AudioContext.stop();
    }

  }
  AudioContext.src = path
  AudioContext.obeyMuteSwitch = false
  AudioContext.volume = 99
  console.log(AudioContext.duration)
  AudioContext.play();
  acitveVoice=id;
}


export class voice {
  //监听音频播放事件
   onPlay (callback) {
     AudioContext.onPlay(() => {
       isStop=false;
       callback(acitveVoice,isStop)
     })
  }
  //监听音频暂停事件
  onPause(callback){
    AudioContext.onPause(() => {
      isStop=true;
      callback(acitveVoice,isStop);
    })
  }
  //监听音频自然播放至结束的事件
  onEnded(callback){
    AudioContext.onEnded(() => {
      callback(acitveVoice,isStop);
      acitveVoice=-1;
    })
  }

}
export function stopAudio () {
  AudioContext.stop()
}
export function stopRecorder () {
  Recorder.stop();
}
