//indexInfo.js

import apiPage from '../../api/page';
import baseList from '../../utils/dataAll.js';

//获取应用实例
const app = getApp();

Page({
  data: {
    starDataArr: [], // 十二星座列表
    starNow: {}, //  // 选中的当前星座--日期-头像-名字
    starDataIndex: 0, // 选中的当前星座下标
    starInfo: {}, // 某一个的星座详情
    dateActiveIndex: '今日',
    dateArr: ['今日', '明日', '本周', '本月', '本年'],
    windowHeight: app.globalData.windowHeight,
    todayArr: {},
    loding: false,
  },
  oneAll: [
    { text: '综合运势', name: 'summary' },
    { text: '爱情运势', name: 'love' },
    { text: '财运运势', name: 'money' },
    { text: '事业运势', name: 'career' },
    { text: '健康指数', name: 'health' },
    { text: '幸运颜色', name: 'color' },
    { text: '速配星座', name: 'star' },
    { text: '幸运数字', name: 'number' },
    { text: '总结', name: 'summary1', img: '../../img/all.png' },
    { text: '爱情', name: 'love1', img: '../../img/love.png' },
    { text: '财运', name: 'money1', img: '../../img/money.png' },
    { text: '事业', name: 'career1', img: '../../img/work.png' },
    { text: '健康', name: 'health1', img: '../../img/health.png' },
    { text: '工作', name: 'job1', img: '../../img/job.png' },
  ],
  onLoad() {
    apiPage.getDate().then((res) => {
      let data = [];
      if (res.data.code === '10000') {
        data = res.data.result.result;
      } else {
        data = baseList.starList;
      }
      this.setData({ starDataArr: data });
      this.getStarInfo(data[0]);
    });
  },
  // 改变星座
  bindPickerChange(e) {
    // console.log('picker发送选择改变，携带值为', this.data.starDataArr[e.detail.value]);
    this.setData({
      starDataIndex: e.detail.value,
    });
    this.getStarInfo(this.data.starDataArr[e.detail.value]);
  },
  // 改变日期类
  changeDate(e) {
    let b = e ? e.currentTarget.dataset.parmas : this.data.dateActiveIndex;
    this.setData({ dateActiveIndex: b });
    switch (b) {
      case '今日':
        this.changeSet(this.data.starInfo.today);
        break;
      case '明日':
        this.changeSet(this.data.starInfo.tomorrow);
        break;
      case '本周':
        this.changeSet(this.data.starInfo.week, 1);
        break;
      case '本月':
        this.changeSet(this.data.starInfo.month, 1);
        break;
      case '本年':
        this.changeSet(this.data.starInfo.year, 1);
        break;
      default:
        break;
    }
  },
  // 获取星座详情
  getStarInfo(val) {
    this.setData({ loding: true, starNow: val });
    apiPage.getMsg(val.astroid).then((res1) => {
      let dataInfo = {};
      if (res1.data.code === '10000') {
       dataInfo = res1.data.result.result;
        // console.log(JSON.stringify(dataInfo));
      } else {
        dataInfo = baseList.infoList[`info${val.astroid}`];
      }
      this.setData({ starInfo: dataInfo });
      this.changeDate();
      setTimeout(() => {
        this.setData({ loding: false });
      }, 300);
    });
  },
  // 今日/明日  --赋值
  changeSet(val, type) {
    if (!val) {
      return;
    }
    let keys = Object.keys(val);
    let something = {
      list: [],
      presummary: null,
    };
    // 逐一匹配--今日
    // --左边
    for (let i = 0; i < this.oneAll.length; i += 1) {
      let a = {};
      let item = this.oneAll[i];
      if (keys.indexOf(item.name) > -1 && !type) {
        this.oneAll[i].num = val[item.name];
        a = {
          name: item.name,
          num: val[item.name],
          text: this.oneAll[i].text,
        };
        if (a.num) {
          something.list.push(a);
        }
      } else if (keys.indexOf(item.name.substring(0, item.name.length - 1)) > -1 && type) {
        this.oneAll[i].num = val[item.name.replace('1', '')];
        a = {
          name: item.name,
          num: val[item.name.replace('1', '')],
          text: this.oneAll[i].text,
          img: this.oneAll[i].img,
        };
        if (a.num) {
          something.list.push(a);
        }
      }
    }
    // 下面总结
    something.presummary = val.presummary;
    this.setData({ todayArr: something });
    // console.log(8568, this.oneAll, something);
  },
});
