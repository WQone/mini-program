//indexInfo.js
//获取应用实例
const app = getApp()
const questionList = require('../../utils/questionList.js')

Page({
  data: {
    questionIndex: 0,
    questionList: null,
  },
  onLoad: function (options) {
    console.log(options);
  },
  // 点击答案触发 
  myAnswer(event) {
    console.log(event);
    this.setData({
      questionIndex: this.data.questionIndex + 1,
    })
  },
  showQueation() {
    this.setData({
      questionIndex: this.data.questionIndex + 1,
    })
    console.log('a', this.data.questionIndex);
    console.log('list', questionList.myList);
    this.setData({
      questionList: questionList.myList,
    })
  },
})