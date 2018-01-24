import Vue from 'vue'; // get vue
import Vuex from 'vuex'; // get vuex
import axios from 'axios';// get $http

Vue.use(Vuex);

var state = {
  cardData: [],
  isloadingComplete: false,
  busy: false,
  isShow: false,
};

var getters = {};

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
  },
};

var actions = {
  getData(context, object) {
    var {progress, isRefresh} = object;
    progress.$Progress.start();
    context.commit('updateLoadingState', false);
    context.commit('updateBusyState', true);

    /**
     * use axios
     */

    axios.get('/mock/api.json').then((response) => {
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
  actions
});

export default store;
