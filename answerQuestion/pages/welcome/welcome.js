//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
  },
  //事件处理函数
  toInfoPage() {
    wx.navigateTo({
      url: '../indexInfo/indexInfo',
      success: function (res) {
        console.log('success');
      },
      fail: function () {
        console.log('fail');
      },
    })
  },
  onLoad: function () {
  },
  // 显示赞赏码
  shareM() {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: ['http://a4.qpic.cn/psb?/V138D4rB0wJstc/vBY.psUp86n2GkPBc2nMg09v11FQRssWvWPT3W8YZtU!/c/dEMBAAAAAAAA&ek=1&kp=1&pt=0&bo=UAVQBVAFUAUDORw!&vuin=1307144731&tm=1525316400&sce=60-2-2&rf=0-0'] // 需要预览的图片http链接列表
    })
  },
  // 顶部下拉刷新
  onPullDownRefresh() {
    setTimeout(() => {
       wx.stopPullDownRefresh()
    }, 1000);
  },
})
