//index.js
//获取应用实例
var API_URL = 'https://api.douban.com/v2/movie/top250';
// var API_URL = 'https://tangcaiye001.applinzi.com/top250.php';
var app = getApp()
var num = 30
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    title: "加载中。。",
    movies: [],
    num: 10,

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },


  onLoad: function () {
    console.log('onLoad')
    var that = this;
    wx.showLoading({
      title: "加载中...",
      mask: true,
      success: function () {
        wx.request({
          url: API_URL,
          data: {
            // start:'0',
            count: num,
          },
          header: {
            'content-type': 'json'
          },
          success: function (res) {
            wx.hideLoading();
            console.log(res.data.subjects)
            var data = res.data
            that.setData({
              title: data.title,
              movies: data.subjects
            })
          }
        })
      }
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

  },
  scrolltoupper() {
    console.log("快到头了")
  },
  scrolltolower() {
    console.log("快到底了")
  },
  scrollFn(e) {
    // console.log(e)
  },
})
