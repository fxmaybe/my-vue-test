import Vue from 'vue'; // get vue
import Vuex from 'vuex'; // get vuex
import Axios from 'axios';
import common from "@/store/modules/common";
import vuexTestModule from "@/store/modules/VuexTestModule";
import vuexTestModuleNs from "@/store/modules/VuexTestModuleNs";

Vue.use(Vuex);

var state = {
  cardData: [],
  isloadingComplete: false,
  busy: false,
  isShow: false
};

var getters = {
};

var mutations = {
  updateLoadingState(state, data) {
    state.isloadingComplete = data;
  },
  updateBusyState(state, data) {
    state.busy = data;
  },
  addData(state, data) {
    state.cardData = state.cardData.concat(data);
  },
  refreshData(state, data) {
    state.cardData = data;
  },
  isShowAlert(state, data) {
    state.isShow = data;
  }
};

var actions = {
  getData(context, object) {
    console.log(context);
    var {progress, isRefresh} = object;
    progress.$Progress.start();
    context.commit('updateLoadingState', false);
    context.commit('updateBusyState', true);

    /**
     * use axios
     */

    console.log(this);
    Axios.get('/mock/api.json').then((response) => {
      var json = response.data;
      context.commit('updateLoadingState', true);
      context.commit('updateBusyState', false);
      if (isRefresh === true) {
        context.commit('refreshData', json);
      } else {
        context.commit('addData', json);
      }
      progress.$Progress.finish();
    }).catch(() => {
      context.commit('updateBusyState', true);
      progress.$Progress.fail();
    });
  }
};

var store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    common,
    vuexTestModule,
    vuexTestModuleNs
  }
});

export default store;
