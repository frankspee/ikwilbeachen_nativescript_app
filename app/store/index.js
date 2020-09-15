import Vue from 'nativescript-vue';
import Vuex from 'vuex';

import * as actions from '@/store/actions'
import * as types from '@/store/mutation-types';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  state: {
    loading: false,
    activities: []
  },
  mutations: {
    [types.TOGGLE_LOADING](state, loading) {
      console.log(types.TOGGLE_LOADING, loading);
      state.loading = loading;
    },
    [types.SET_ACTIVITIES](state, activities) {
      console.log(types.SET_ACTIVITIES, activities);
      state.activities = activities;
    },
    [types.ADD_ACTIVITY](state, activity) {
      console.log(types.ADD_ACTIVITY, activity);
      state.activities.push(activity);
    },
    [types.UPDATE_ACTIVITY](state, activity) {
      console.log(types.UPDATE_ACTIVITY, activity);
      let activityToUpdate = state.activities.find(i => i.id == activity.id);
      Object.assign(activityToUpdate, activity);
    },
    [types.DELETE_ACTIVITY](state, id) {
      console.log(types.DELETE_ACTIVITY, id);
      state.activities.splice(state.activities.findIndex(i => i.id == id), 1);
    },
  },
  actions,
  getters: {
    // FIXME: make sure this works, and get the sorted activities in Home.vue
    activitiesSorted: state => {
      return state.activities.sort(
        (a, b) => a.startDateTime.getTime() - b.startDateTime.getTime()
      );
    }
  },
  strict: debug
})

Vue.prototype.$store = store;

export default store;