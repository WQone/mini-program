//index.js

//获取应用实例
var app = getApp();
Page({
  data: {
    windowHeight: app.globalData.windowHeight,
    loding: false,
    animationTest: {},
  },
  onLoad: function() {},
  // 右上角分享功能
  onShareAppMessage: function() {
    return {
      title: '快来看看只属于你的freeStyle',
      path: '/pages/welcome/welcome',
      success: function(res) {
        // console.log('分享成功', res);
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function(res) {},
        });
      },
      fail: function(res) {
        // 转发失败
      },
    };
  },
  // 显示赞赏码
  giveMoney() {
    this.setData({ loding: true });
    setTimeout(() => {
      this.setData({ loding: false });
      wx.previewImage({
        current: '', // 当前显示图片的http链接
        urls: [
          'http://a4.qpic.cn/psb?/V138D4rB0wJstc/vBY.psUp86n2GkPBc2nMg09v11FQRssWvWPT3W8YZtU!/c/dEMBAAAAAAAA&ek=1&kp=1&pt=0&bo=UAVQBVAFUAUDORw!&vuin=1307144731&tm=1525316400&sce=60-2-2&rf=0-0',
        ], // 需要预览的图片http链接列表
      });
    }, 1000);
  },
  // 顶部下拉刷 新
  onPullDownRefresh() {
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 1000);
  },
});
