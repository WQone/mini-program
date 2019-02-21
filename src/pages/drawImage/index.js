import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

export default class Index extends Component {
  config = {
    navigationBarTitleText: '涂鸦',
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="drawPage">
        <View className="canvas_area" />
      </View>
    );
  }
}
