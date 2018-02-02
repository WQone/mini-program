//indexInfo.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  onLoad: function (options) {
    console.log(options);
  },
  showQueation() {
    wx.navigateTo({
      url: '../question/question',
      success: function (res) {
        console.log('success');
      },
      fail: function () {
        console.log('fail');
      },
    })
  },
})