//index.js
//获取应用实例
const util = require('../../utils/util1.js');
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
    vcodeGetTime: 0,
    checkMobilePass: false,
    inputMobileNumber: '',
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
  },
  tapGetVcode: function (e) {
    //获取vcode
    var that = this;
    if (that.data.checkMobilePass) {
      that._initVcodeTimer();
      //执行请求，获取vcode
      that.getVcode(function (data) {
        if (data.vcode) {
          that.setData({
            inputVcode: data.vcode
          })
        }
      });
    } else {
      return false;
    }

  },
  //校验手机号
  checkMobileRegExp: function (e) {
    var that = this;
    var number = e.detail.value;
    if (number.isPhoneNumber()) {
      that.setData({
        checkMobilePass: true,
        inputMobileNumber: number
      });
    } else {
      that.setData({
        checkMobilePass: false,
      });
    }
  },
  _initVcodeTimer: function () {
    var that = this;
    var initTime = 60;
    that.setData({
      has_get_vcode: true,
      vcodeGetTime: initTime
    });
    var vcodeTimer = setInterval(function () {
      initTime--;
      that.setData({
        vcodeGetTime: initTime
      });
      if (initTime <= 0) {
        clearInterval(vcodeTimer);
        that.setData({
          has_get_vcode: false
        });
      }
    }, 1000);
  },
  //获取验证码
  getVcode: function (cal) {
    var that = this;
    util.JFrequest({
      url: 'https://t.superabc.cn/c/s/getvcode',
      param: {
        mobile_no: that.data.inputMobileNumber
      },
      success: function (res) {
        if (res && res.statusCode == 200 && res.data && res.data.code == 0) {
          if (typeof cal == 'function') {
            cal(res.data.data);
          }
        } else {
          wx.showToast({
            title: res.err_msg,
            icon: 'success',
            duration: 1000
          });
          //
        }
      }
    });
  }
})