Page({
  data: {
    treeList: [{//服务器返回的数据
      "PatrolClassID": 13,
      "PatrolClassName": "安保类",
      "StoreID": 40,
      "Creator": 40,
      "ParentID": 0,
      "UserID": 0
    }, {
      "PatrolClassID": 14,
      "PatrolClassName": "清洁类",
      "StoreID": 40,
      "Creator": 40,
      "ParentID": 0,
      "UserID": 0
    }, {
      "PatrolClassID": 20,
      "PatrolClassName": "一级分类",
      "StoreID": 40,
      "Creator": 40,
      "ParentID": 0,
      "UserID": 0
    }, {
      "PatrolClassID": 21,
      "PatrolClassName": "二级分类",
      "StoreID": 40,
      "Creator": 40,
      "ParentID": 20,
      "UserID": 0
    }, {
      "PatrolClassID": 22,
      "PatrolClassName": "二级分类1",
      "StoreID": 40,
      "Creator": 40,
      "ParentID": 20,
      "UserID": 0
    }, {
      "PatrolClassID": 23,
      "PatrolClassName": "三级分类",
      "StoreID": 40,
      "Creator": 40,
      "ParentID": 21,
      "UserID": 0
    }],
    tree:[],//经过处理后的数据，用于渲染页面
    props: {//传入组件中的配置
      value: 'PatrolClassID',
      label: 'PatrolClassName',
      children: 'children'
    },
    showModal: false
  },
  //事件处理函数
  tapItem: function(e) {
    console.log('index接收到的itemid: ' + e.detail.itemid);
    this.setData({
      showModal:false
    })
  },
  selected: function() {
    this.setData({
      showModal: !this.data.showModal,
    })
  },

  onLoad: function() {//处理服务返回的数据
    let that = this;
    let data  =this.data.treeList;
    // 删除 所有 children,以防止多次调用
    data.forEach(function (item) {
      delete item.children;
    });
    let map = {};
    data.forEach(function (item) {
      map[item.PatrolClassID] = item;
    });
    let val = [];
    data.forEach(function (item) {
      let parent = map[item.ParentID];
      if (parent) {
        (parent.children || (parent.children = [])).push(item);
      } else {
        val.push(item);
      }
    });
    val.forEach(res=>{//必须个第一级添加属性  first：true
      res.first = true
    })
    this.setData({
      tree:val
    })
  },
})