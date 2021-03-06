var WxSearch = require('../templates/wxSearch/wxSearch.js')
const { requsetForGet } = require('../../utils/request')
const url = 'https://api.douban.com/v2/movie/search?q='
const { setStorage, getStorage } = require('../../utils/weixin')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    pageNum: 0,
    loading: false,
    subjects:[],
    title: '',
    down: false,
    init: true,
    wxSearchData:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that, 43, ['weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification']);
    WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
  },
  wxSearchFn: function (e) {
    if (!this.data.wxSearchData.value){
      wx.showToast({
        title: '请输入关键字',
        image: '/images/icon.png',
        duration: 500
      })
    }else {
      var that = this
      WxSearch.wxSearchAddHisKey(that);
      if (this.data.init) {
        this.setData({
          init: false,
        })
      }
      this.setData({
        subjects: [],
        total: 0,
        pageNum: 0,
        down:false,
        title: ''
      })
      this.search()
      // getStorage('res').then(res => {
      //   console.info(res)
      //   that.setData({
      //     title: res.data.title,
      //     subjects: res.data.res
      //   })
      // })
 
    }
  },
  search () {
    this.setData({
      loading:true
    })
    console.info('==============当前页:' + this.data.pageNum + '总页数:' + this.data.total)
    let vm = this
    let urlAll = url + this.data.wxSearchData.value
    let params = { start: this.data.pageNum * 20, count: 20 }
    requsetForGet(urlAll, params).then(res=>{
      if (vm.data.total == 0) {
        vm.data.total = Math.ceil(res.data.total / 20)
      }
      vm.data.pageNum += 1
      let temp = vm.data.subjects
      Array.prototype.push.apply(temp, res.data.subjects)
      vm.setData({
        subjects: temp,
        title: res.data.title
      })
      // setStorage('res', { res: res.data.subjects, title: res.data.title})
      console.info(vm.data.subjects)
      vm.setData({
        loading: false
      })
    })
  },
  wxSearchInput: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
  },
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function (e) {
    var that = this
    console.info('搜素')
    console.info(e)
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    if (this.data.wxSearchData.value) {
      console.info('yincang')
      return
    }
    console.info('yincang1111111111')
    WxSearch.wxSearchHiddenPancel(that);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.init || this.data.total==0) {
      return
    }
    console.info('一共' + this.data.total + '页,第' + (this.data.pageNum) + '页')
    if (this.data.pageNum < this.data.total) {
      console.info('mmmmmmmmmmmm')
      this.search()
      this.setData({
        loading: true
      })
    } else {
      this.setData({
        down: true
      })
    }
  }

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  //   return {
  //     title: '搜索',
  //     path: '/pages/search/search'
  //   }
  // }
})