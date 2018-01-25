export default {
  state: {
    score: 0
  },

  getters: {
    scoreF(state) {
      return state.score + "分";
    }
  },

  mutations: {
    // Vuex test
    add(state, data) {

      if(state.score >= 100) {
        return;
      }
      var score = state.score + data;
      state.score = score > 100 ? 100 : score;
    },
    reduce(state, data) {
      if(state.score <= 0) {
        return;
      }

      var score = state.score - data;
      state.score = score < 0 ? 0 : score;
    }
  },

  actions: {
    // Vuex test
    addAct(context, object) {
      setTimeout(function() {
        console.log(context);
        context.commit("add", object);
      }, 3000);
    }
  }
}