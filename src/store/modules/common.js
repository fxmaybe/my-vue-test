export default {
  state: {
    msg: "我是消息"
  },

  getters: {
  },

  mutations: {
    // Vuex test
    changeMsg(state, data) {
      state.msg = "我是改变后的消息";
    },
    addExtMsg(state, data){
      state.msg = data + "我是改变后的消息";
    }
  },

  actions: {
    // Vuex test
    changeMsgAct(context, object) {
      var sec = 3;
      context.state.msg = "准备改变消息,请等待"+ sec +"秒...";
      setTimeout(function() {
        context.commit("addExtMsg", sec +"秒到了,");
      }, sec * 1000);
    }
  }
}