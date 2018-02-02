//app.js
App({

  onLaunch: function (ops) {
    console.log('刚进入', ops);

    // 日志---展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

  },
  //  数据data
  globalData: {
    userInfo: null
  },
  // 登录
  getUserInfo: function (cb) {
    console.log('cb', cb);
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  // -----  公共行为 ------
  cancel() {
    wx.showModal({
      title: '警告',
      content: '必须授权登录之后才能操作呢，是否重新授权登录？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.openSetting({
            success: function (res) {
              console.log('congsixn', res);
              if (res.authSetting["scope.userInfo"]) {
                //这里是授权成功之后 填写你重新获取数据的js
                //参考:
                this.getUserInfo();
              }
            }
          })
        }
      }
    })
  }
})