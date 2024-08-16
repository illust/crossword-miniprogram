// index.ts
// 获取应用实例


Component({
  data: {
    webUrl:'',
    userId:'',

    motto: 'Hello World',
    userInfo: {
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  methods: {
    // onShow: function(options: any) {
    //   this.onLoad(options)
    // }, 
     getBeijingTimestamp: function() {
      // 获取当前 UTC 时间
      const now = new Date();
      // 获取中国标准时间（UTC+8）
      const beijingOffset = 8 * 60 * 60 * 1000; // 8小时的毫秒数
      const beijingTime = new Date(now.getTime() + beijingOffset);
      // 返回时间戳
      return Math.floor(beijingTime.getTime() / 1000);
  },
    onLoad: function (options: any) {
      console.log({ 'h5传入参数': options })
      // const newUrl = 'http://192.168.8.118:8088/home'
      const newUrl = 'https://wanghao.ah.cn/home'
      this.setData({
       webUrl:newUrl+'?timestamp='+this.getBeijingTimestamp(),
        userId:options.userId
      })
    },

    // 事件处理函数
    bindViewTap() {
      wx.navigateTo({
        url: '../logs/logs',
      })
    },
    onChooseAvatar(e: any) {
      const { avatarUrl } = e.detail
      const { nickName } = this.data.userInfo
      this.setData({
        "userInfo.avatarUrl": avatarUrl,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    onInputChange(e: any) {
      const nickName = e.detail.value
      const { avatarUrl } = this.data.userInfo
      this.setData({
        "userInfo.nickName": nickName,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    getUserProfile() {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    },
  },
})

