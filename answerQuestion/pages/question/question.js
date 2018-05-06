//indexInfo.js
//获取应用实例
const app = getApp()

Page({
  data: {
    questionIndex: 1,
    questionList: null,
    array: ['美国', '中国', '巴西', '日本'],
    index: 0,
    windowHeight: app.globalData.windowHeight,
  },
  onLoad (options) {
    console.log(options);
  },
  bindPickerChange (e) {
    console.log('picker发送选择改变，携带值为', e)
    console.log('picker发送选择改变，携带值为', this.data.array[e.detail.value])
    this.setData({
      index: e.detail.value
    })
  },
})