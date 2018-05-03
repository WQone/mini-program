//  左侧栏总菜单
const myList = [{
  question: '一 加 一 等于 ?',
  answer:[{
    id: 1,
    name: '一',
  },{
    id: 2,
    name: '二',
    status: 'true',
  },{
    id: 3,
    name: '三',
  },
  ],
},{
  question: '我是谁',
  answer:[{
    id: 1,
    name: 'jhehe',
  },{
    id: 2,
    name: 'jxixi',
  },{
    id: 3,
    name: 'jhaha',
  },
  ],
}];


// 画工具
const toolList = [{
  type: 'penSelect',
  className: 'box1',
  children:[{
    param: 5,
    className: 'box1',
  },{
    param: 15,
    className: 'box2',
  },{
    param: 6,
    className: 'box2',
  }],
},{
  type: 'colorSelect',
  className: 'box3',
  children:[{
    param: '#cc0033',
    color: '#cc0033',
  },{
    param: "#ff9900",
    color: "#ff9900",
  },{
    param: "#000000",
    color: "#000000",
  },{
    param: "#ffc0cb",
    color: "#ffc0cb",
  },{
    param: "#4078c0",
    color: "#4078c0",
  },{
    param: "#008200",
    color: "#008200",
  }]
}];

module.exports = {
  myList,
  toolList,
}
