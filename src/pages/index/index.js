import Taro, { Component } from '@tarojs/taro';
import { View, OpenData, Text, Image } from '@tarojs/components';
import './index.scss';
import starPng from '../../images/star.png';
import drawrPng from '../../images/draw.png';
import moneysPng from '../../images/moneys.png';

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
  };

  goPage = (type) => {
    switch (type) {
      case 'star':
        Taro.navigateTo({ url: '/pages/starTest' });
        break;
      case 'drawImage':
        Taro.navigateTo({ url: '/pages/drawImage' });
        break;
      case 'moneys':
        console.log('44');
      default:
        break;
    }
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="container">
        <View className="navUl" onClick={this.goPage.bind(this,'star')}>
          <View className="navUl-li">
            <Image src={starPng} className="navUl-li-img" mode="aspectFit" />
            <View className="navUl-li-text">
              <Text className="navUl-li-text-title">星座运势</Text>
              <Text className="navUl-li-text-content">快来看看属于你的星座的运势</Text>
            </View>
          </View>
        </View>
        <View className="navUl" onClick={this.goPage.bind(this,'drawImage')}>
          <View className="navUl-li">
            <Image src={drawrPng} className="navUl-li-img" mode="aspectFit" />
            <View className="navUl-li-text">
              <Text className="navUl-li-text-title">涂鸦</Text>
              <Text className="navUl-li-text-content">开始创作属于自己的绘画作品</Text>
            </View>
          </View>
        </View>
        <View className="navUl" onClick={this.goPage.bind(this,'moneys')}>
          <View className="navUl-li">
            <Image src={moneysPng} className="navUl-li-img" mode="aspectFit" />
            <View className="navUl-li-text">
              <Text className="navUl-li-text-title">打赏作者</Text>
              <Text className="navUl-li-text-content">给作者一点支持</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
