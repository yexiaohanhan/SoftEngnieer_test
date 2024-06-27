import { createStore } from 'vuex'
 
// 创建一个新的 store 实例
const store = createStore({
    //数据，相当于data
    state () {
      return {
        globalAuthority:''//权限
      }
    },
    //里面定义方法，操作state方发
    mutations: {
    }
  })

export default store;