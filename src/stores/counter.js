import { defineStore } from 'pinia'

/* TabBar */
export const tabBarStore = defineStore({
  id: 'tabBar',
  state: () => ({
    // 是否显示TabBar
    isShowTabBar: false,
  }),
  getters: {
  },
  actions: {
    /* 设置是否显示TabBar */
    setShowTabBar(e){
      this.isShowTabBar = e;
    }
  }
})

/* 用户信息 */
export const userMessgeStore = defineStore({
  id:'userMessge',
  state: () => ({
    isShowLogin: false,  // 是否弹出登录弹框
    usersProtocol: 'https://anv3cjapi.qulang123.com/static/ab_xieyi/agreement.html',      // 用户协议
    privacyPolicy: 'https://anv3cjapi.qulang123.com/static/ab_xieyi/privacy.html',        // 隐私政策
    userInfo:{
      uid:'',
      token:'',
      mobile: '',
      nickname: '',
      svipLevel:'',
      avatarSrc: '',
    },
  }),
  getters:{
  },
  actions: {
    /* 设置-是否显示登录弹窗 */
    setShowLogin(e){
      this.isShowLogin = e;
    }
  }
  
})
