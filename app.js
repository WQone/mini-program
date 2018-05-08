//app.js
App({

  onLaunch: function (ops) {
    // console.log('刚进入', ops);
    this.toLogin();

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
          // console.log('res.code', res.code)
        } else {
          // console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
})