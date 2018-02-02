//indexInfo.js
//获取应用实例
const app = getApp()
const questionList = require('../../utils/questionList.js')

Page({
  data: {
    questionIndex: 1,
    questionList: null,
  },
  onLoad: function (options) {
    console.log(options);
    this.setData({
      questionList: questionList.myList,
    })
  },
  // 点击答案触发 
  NextQueation(e) {
    console.log(99999999997, e);
    if (e.currentTarget.dataset.status) {
      console.log('答对了');
    }
  },
})