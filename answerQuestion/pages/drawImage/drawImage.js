Page({
  data: {
    pen: 3, //画笔粗细默认值
    color: '#cc0033', //画笔颜色默认值
    animationDown: null,
    animationUp: null,
  },
  startX: 0, //保存X坐标轴变量
  startY: 0, //保存X坐标轴变量
  isClear: false, //是否启用橡皮擦标记
  canvasWidth: 0,
  canvasHeight: 0,
  ctx: null,
  animation: null,
  //刚加载页面时触发一次
  onLoad() {
    // 创建动画
    this.animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear',
    })
    var that = this;
    this.ctx = wx.createCanvasContext('myCanvas');
    // 获取canvas标签节点信息--高和宽
    wx.createSelectorQuery().select('#myCanvas').boundingClientRect(function(rect){
      console.log(rect.width);
      that.canvasWidth = rect.width;
      that.canvasHeight = rect.height;
      console.log('hh2', that.canvasWidth, this.canvasWidth)
    }).exec()
    console.log('hh1', this.canvasWidth)
    // 创建canvas
  },
  // 每次打开页面时触发
  onShow() {
    console.log('hh', this.canvasWidth)
    // 清空canvas
    // this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);
    // this.ctx.draw();
    console.log("jjjj");
  },
  // 向下切换
  changeDown() {
    this.setData({
      animationDown:this.animation.translateY(40).step().export(),
      animationUp:this.animation.translateY(-40).step().export()
    })
  },
  // 向上切换
  changeUp() {
    this.setData({
      animationDown:this.animation.translateY(0).step().export(),
      animationUp:this.animation.translateY(0).step().export()
    })
  },
  //手指触摸动作开始
  touchStart(e) {
    //得到触摸点的坐标
    this.startX = e.changedTouches[0].x;
    this.startY = e.changedTouches[0].y;

    this.context = wx.createContext();
    //判断是否启用的橡皮擦功能  ture表示清除  false表示画画
    if (this.isClear) {
      this.context.setStrokeStyle('#FFFFFF'); //设置线条样式 此处设置为画布的背景颜色  橡皮擦原理就是：利用擦过的地方被填充为画布的背景颜色一致 从而达到橡皮擦的效果
      this.context.setLineCap('round'); //设置线条端点的样式
      this.context.setLineJoin('round'); //设置两线相交处的样式
      this.context.setLineWidth(20); //设置线条宽度
      this.context.save(); //保存当前坐标轴的缩放、旋转、平移信息
      this.context.beginPath(); //开始一个路径
      this.context.arc(this.startX, this.startY, 5, 0, 2 * Math.PI, true); //添加一个弧形路径到当前路径，顺时针绘制  这里总共画了360度  也就是一个圆形
      this.context.fill(); //对当前路径进行填充
      this.context.restore(); //恢复之前保存过的坐标轴的缩放、旋转、平移信息
    } else {
      this.context.setStrokeStyle(this.data.color);
      this.context.setLineWidth(this.data.pen);
      this.context.setLineCap('round'); // 让线条圆润
      this.context.beginPath();
    }
  },
  //手指触摸后移动
  touchMove(e) {
    var startX1 = e.changedTouches[0].x;
    var startY1 = e.changedTouches[0].y;

    //判断是否启用的橡皮擦功能  ture表示清除  false表示画画
    if (this.isClear) {
      this.context.save(); //保存当前坐标轴的缩放、旋转、平移信息
      this.context.moveTo(this.startX, this.startY); //把路径移动到画布中的指定点，但不创建线条
      this.context.lineTo(startX1, startY1); //添加一个新点，然后在画布中创建从该点到最后指定点的线条
      this.context.stroke(); //对当前路径进行描边
      this.context.restore(); //恢复之前保存过的坐标轴的缩放、旋转、平移信息

      this.startX = startX1;
      this.startY = startY1;
    } else {
      this.context.moveTo(this.startX, this.startY);
      this.context.lineTo(startX1, startY1);
      this.context.stroke();

      this.startX = startX1;
      this.startY = startY1;
    }
    //只是一个记录方法调用的容器，用于生成记录绘制行为的actions数组。context跟<canvas/>不存在对应关系，一个context生成画布的绘制动作数组可以应用于多个<canvas/>
    wx.drawCanvas({
      canvasId: 'myCanvas',
      reserve: true,
      actions: this.context.getActions(), // 获取绘图动作数组
    });
  },
  //手指触摸动作结束
  touchEnd() {},
  //启动橡皮擦方法
  clearCanvas() {
    if (this.isClear) {
      this.isClear = false;
    } else {
      this.isClear = true;
    }
  },
  //更改画笔大小的方法
  penSelect(e) {
    console.log(e.currentTarget);
    this.setData({ pen: parseInt(e.currentTarget.dataset.param) });
    this.isClear = false;
  },
  //更改画笔颜色的方法
  colorSelect(e) {
    console.log(e.currentTarget);
    this.setData({ color: e.currentTarget.dataset.param });
    this.isClear = false;
  },
  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 1, // 默认9
      success: function(res) {
        // 获取图片的高宽
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function(res1) {
            console.log(res1);
            // 获取canvas标签节点的高宽
            
            const w = res1.width;
            const h = res1.height;
            const dw = canvasWidth / w; //canvas与图片的宽高比
            const dh = canvasHeight / h;
            // 裁剪图片中间部分
            if ((w > canvasWidth && h > canvasHeight) || (w < canvasWidth && h < canvasHeight)) {
              if (dw > dh) {
                this.ctx.drawImage(res.tempFilePaths[0], 0, (h - canvasHeight / dw) / 2, w, canvasHeight / dw, 0, 0, canvasWidth, canvasHeight);
              } else {
                this.ctx.drawImage(res.tempFilePaths[0], (w - canvasWidth / dh) / 2, 0, canvasWidth / dh, h, 0, 0, canvasWidth, canvasHeight);
              }
            } else {
              // 拉伸图片
              if (w < canvasWidth) {
                this.ctx.drawImage(res.tempFilePaths[0], 0, (h - canvasHeight / dw) / 2, w, canvasHeight / dw, 0, 0, canvasWidth, canvasHeight);
              } else {
                this.ctx.drawImage(res.tempFilePaths[0], (w - canvasWidth / dh) / 2, 0, canvasWidth / dh, h, 0, 0, canvasWidth, canvasHeight);
              }
            }
            this.ctx.draw();
          },
        });
      },
    });
  },
  // 保存图片
  saveImage() {
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
        });
        console.log(res.tempFilePath);
      },
    });
  },
});
