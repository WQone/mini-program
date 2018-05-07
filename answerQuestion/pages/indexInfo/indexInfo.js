//indexInfo.js

import apiPage from '../../api/page';

//获取应用实例
const app = getApp()

Page({
  data: {
    starData: [],
  },
  onLoad: function (options) {
    console.log(options);
    this.testApi();
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
  // 测试api
  testApi() {
    apiPage.getDate().then((res) => {
        if (res.data.code === '10000') {
          console.log(res.data.result.result);
          const data = res.data.result.result;
          this.setData({starData: res.data.result.result });
        }
      });
  },
  // 获取详情
  getInfo(e) {
    console.log(e.currentTarget.dataset.param);
    let astroid = e.currentTarget.dataset.param;
    apiPage.getMsg(astroid).then((res) => {
      if (res.data.code === '10000') {
        console.log(res.data.result.result);
        // const data = res.data.result.result;
        // this.setData({ starData: res.data.result.result });
      }
    });
  }
})