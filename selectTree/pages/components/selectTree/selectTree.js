// pages/components/mytree/mytree.js
Component({
  //model是数据源。
  properties: {
    model: Array,

    open: {
      //open是控制是否默认全部展开
      type: Boolean,
      value: true
    },

    value: { //初始值
      type: Number,
      value: null
    },

    props: {
      type: Object,
      value: {
        value: 'id', //id的字段名
        label: 'title', //名称的字段名
        children: 'children', //子级字段名
      }
    }

  },
  data: {
    isBranch: false,
  },

  methods: {
    toggle: function(e) {
      let item = this.data.model[e.currentTarget.dataset.father];
      if (!item.hasOwnProperty(this.data.props.children)){
        return;
      }
      item.open = !item.open;
      this.setData({
        model:this.data.model
      })
    },
    tapItem: function(e) {
      var itemid = e.currentTarget.dataset.itemid;
      this.triggerEvent('tapitem', {
        itemid: itemid
      }, {
        bubbles: true,
        composed: true
      });
    },
    closClass: function() {
      this.triggerEvent('closClass');
    }
  },

  ready: function(e) {
    if (this.data.model.length>0) {
      this.data.model.forEach(item=>{
        item.open = this.data.open
      })
      this.setData({
        model:this.data.model
      })
    }
  },
})