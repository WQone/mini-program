import Taro, { Component } from '@tarojs/taro';
import { View, Image, Picker, Text, Block } from '@tarojs/components';
import './index.scss';
import dataAll from '../../utils/dataAll';
import changePng from '../../images/change.png';
import starTruePng from '../../images/starTrue.png';
import starFalsePng from '../../images/starFalse.png';
import summaryPng from '../../images/all.png';
import lovePng from '../../images/love.png';
import moneyPng from '../../images/money.png';
import workPng from '../../images/work.png';
import healthPng from '../../images/health.png';

export default class Index extends Component {
  config = {
    navigationBarTitleText: '星座',
  };
  constructor(props) {
    super(props);
    this.state = {
      starNow: dataAll.starList[0],
      starDataIndex: 0,
      starDataArr: dataAll.starList,
      dateType: [
        { key: 'today', name: '今日' },
        { key: 'tomorrow', name: '明日' },
        { key: 'week', name: '本周' },
        { key: 'month', name: '本月' },
        { key: 'year', name: '本年' },
      ],
      dateActiveIndex: 'today',
      dateNowInfo: dataAll.infoList.info1,
    };
  }

  pickerChange = (e) => {
    console.log(777, e.detail.value);
    this.setState((prevState) => ({
      starDataIndex: e.detail.value,
      starNow: prevState.starDataArr[e.detail.value],
      dateNowInfo: dataAll.infoList[`info${e.detail.value + 1}`],
    }));
  };

  // 类型修改
  dateChange = (item) => {
    this.setState({ dateActiveIndex: item });
  };
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const {
      starDataIndex,
      starDataArr,
      starNow,
      dateType,
      dateActiveIndex,
      dateNowInfo,
    } = this.state;
    return (
      <View className="starPage">
        <View className="star-top">
          <View className="star-top-div">
            <Image src={starNow.pic} className="star-top-div-image" />
            <View className="star-top-div-text">
              <View>{starNow.astroname} </View>
              <View> {starNow.date}</View>
            </View>
            <Picker
              onChange={this.pickerChange}
              value={starDataIndex}
              range={starDataArr}
              rangeKey="astroname"
              className="star-top-div-picker"
            >
              <Image src={changePng} className="picker-image" />
            </Picker>
          </View>
        </View>
        <View className="star-content">
          <View className="star-content-nav">
            {dateType.map((item) => {
              return (
                <Text
                  className={`star-content-nav-li ${
                    dateActiveIndex === item.key ? 'active-li' : ''
                  }`}
                  key={item.key}
                  onClick={this.dateChange.bind(this, item.key)}
                >
                  {item.name}
                </Text>
              );
            })}
          </View>
          <View className="star-content-body">
            {(dateActiveIndex === 'today' || dateActiveIndex === 'tomorrow') && (
              <View className="star-content-body-one">
                {[
                  { namel: '综合运势', keyl: 'summary', namer: '健康指数', keyR: 'health' },
                  { namel: '爱情运势', keyl: 'love', namer: '幸运颜色', keyR: 'color' },
                  { namel: '财运运势', keyl: 'money', namer: '速配星座', keyR: 'star' },
                  { namel: '事业运势', keyl: 'career', namer: '幸运数字', keyR: 'number' },
                ].map((item, index) => {
                  return (
                    <View className="one-div" key={index}>
                      <View className="one-div-left">
                        <Text className="one-div-left-text">{item.namel}</Text>
                        {[...Array(dateNowInfo[dateActiveIndex][item.keyl] - 0).keys()].map((i) => {
                          return <Image key={i} className="one-div-left-image" src={starTruePng} />;
                        })}
                        {[...Array(5 - dateNowInfo[dateActiveIndex][item.keyl]).keys()].map((i) => {
                          return (
                            <Image key={i} className="one-div-left-image" src={starFalsePng} />
                          );
                        })}
                      </View>
                      <View className="one-div-right">
                        {item.namer}:
                        <Text className="one-div-right-text">
                          {dateNowInfo[dateActiveIndex][item.keyR]}
                        </Text>
                      </View>
                    </View>
                  );
                })}
                <View className="one-summary">{dateNowInfo[dateActiveIndex].presummary}</View>
              </View>
            )}
            {dateActiveIndex !== 'today' && dateActiveIndex !== 'tomorrow' && (
              <View className="star-content-body-else">
                {[
                  { text: '总结', name: 'summary', img: summaryPng, color: '#ff9900' },
                  { text: '爱情', name: 'love', img: lovePng, color: '#ff4e9f' },
                  { text: '财运', name: 'money', img: moneyPng, color: '#ff9900' },
                  { text: '事业', name: 'career', img: workPng, color: '#13b9c7' },
                  { text: '健康', name: 'health', img: healthPng, color: '#05be00' },
                ].map((item, index) => {
                  return (
                    dateNowInfo[dateActiveIndex][item.name] && (
                      <View className="else-li" key={index}>
                        <Image
                          className="else-li-image"
                          src={item.img}
                          style={`background:${item.color}`}
                        />
                        <View className="else-li-text">
                          {item.text}：{dateNowInfo[dateActiveIndex][item.name]}
                        </View>
                      </View>
                    )
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}
