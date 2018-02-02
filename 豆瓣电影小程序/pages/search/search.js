var app=getApp();

var user = null;
Page({
onPullDownRefresh(){
    console.log("aaa")
},
 login(){
   var that = this;
    wx.showLoading({
      title:"加载中...",
      mask:true,
      success:function (){
        wx.request({
          // url:"https://api.douban.com/v2/movie/search",
          url:"https://tangcaiye001.applinzi.com/search.php",
          data:{
            q:user,
          },
          header: {
          'content-type': 'json'
          },
          success: function(res) {
            console.log(res.data)
              wx.hideLoading();
            var sdata=res.data.subjects
            that.setData({
                sdata:sdata
              })
          }
        })
      }
    })
  },

userFn(e){
    console.log(e)
     console.log(e.detail.value)
     user = e.detail.value;
  },

 
onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      path: '/page/user?id=123',
      success: function(res) {
        // 分享成功
        console.log("分享成功")
      },
      fail: function(res) {
        // 分享失败
           console.log("分享失败")
      }
    }
  }






})