import Taro, { Component } from '@tarojs/taro';
import { View, Image, Picker } from '@tarojs/components';
import changePng from '../../images/change.png';
import './index.scss';

export default class Index extends Component {
  config = {
    navigationBarTitleText: '星座',
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="starPage">
        <View className="star-top" />
      </View>
    );
  }
}
