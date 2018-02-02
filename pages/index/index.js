//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imageWidth: wx.getSystemInfoSync().windowWidth,//图片宽度   
    imgUrls: [
      'http://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29221.png',
      'http://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29213.png',
      'http://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/29/29189.png'
    ],
    interval: 5000,
    duration: 1000,
    imgSrc: null,
  },
  // 右上角分享功能
  onShareAppMessage: function () {
    return {
      title: 'GIFT的邀请',
      path: '/pages/index/index',
      success: function (res) {
        console.log('分享成功', res);
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  // 点击轮播图片进入详情页indexInfo
  wuqian(e) {
    var index = e.currentTarget.dataset['index'];
    console.log(index);
    wx.navigateTo({
      url: '../indexInfo/indexInfo?id=' + index,
      success: function (res) {
        // success
        console.log('success');
      },
      fail: function () {
        // fail  
        console.log('fail');
      },
      complete: function () {
        // complete  
        console.log('complete');
      }
    })
  },
  // 选择图片
  choosePhoto() {
    var _this = this
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // success
        console.log(res)
        _this.setData({
          imgSrc: res.tempFilePaths
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      },
    })
  }
})