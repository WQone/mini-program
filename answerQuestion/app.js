//app.js
App({

  onLaunch: function (ops) {
    console.log('刚进入', ops);
    this.toLogin();

    // 日志---展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

  },
  //  数据data
  globalData: {
    windowHeight: wx.getSystemInfoSync().windowHeight,
  },
  // 登录
  toLogin() {
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log('res.code', res.code)
          //发起网络请求
          // wx.request({
          //   url: 'https://test.com/onLogin',
          //   data: {
          //     code: res.code
          //   }
          // })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
})