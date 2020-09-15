import * as http from 'tns-core-modules/http';
import * as platformModule from "tns-core-modules/platform";

import * as types from '@/store/mutation-types';

import Activity from "@/models/Activity";

const _baseUrl = "http://10.0.2.2:3000/reservations/";
// const _baseUrl = "https://ikwilbeachen.azurewebsites.net/reservations/";

export const getActivities = ({ commit }) => {
  console.log('action getActivities');
  commit(types.TOGGLE_LOADING, true);

  return http.request({
    url: _baseUrl,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(validateCode)
    .then(getJson)
    .then(data => {
      let activities = data.map(activity => { return new Activity(activity); });
      commit(types.SET_ACTIVITIES, activities);
      commit(types.TOGGLE_LOADING, false);
      resolve();
    })
};

export const createActivity = ({ commit }, activity) => {
  console.log('action createActivity');
  commit(types.TOGGLE_LOADING, true);

  return http.request({
    url: _baseUrl,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    content: JSON.stringify(activity)
  })
    .then(validateCode)
    .then(getJson)
    .then(data => {
      let activity = new Activity(data);
      commit(types.ADD_ACTIVITY, activity);
      commit(types.TOGGLE_LOADING, false);
      //TODO: resolve(reservation) not needed?!
    })
};

export const updateActivity = ({ commit }, activity) => {
  console.log('action updateActivity');
  commit(types.TOGGLE_LOADING, true);

  return http.request({
    url: _baseUrl + activity.id,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    content: JSON.stringify(activity)
  })
    .then(validateCode)
    .then(() => {
      commit(types.UPDATE_ACTIVITY, activity);
      commit(types.TOGGLE_LOADING, false);
      //TODO: resolve(activity) not needed?!
    })
};

export const addAttendee = ({ commit }, activity) => {
  console.log('action addAttendee');

  let playerId = platformModule.device.uuid;
  let index = activity.attendees.indexOf(playerId);
  console.log("addPlayer() UUID:" + playerId + "| index:" + index);
  if (index === -1) {

    console.log("Player JOINS");
    let attendees = [...activity.attendees];
    attendees.push(playerId);
    return updateActivity({ commit }, {...activity, attendees: attendees});

  } else {
    console.log("Player already JOINED");
    return;
  }
}

export const deleteActivity = ({ commit }, id) => {
  console.log('action deleteActivity');
  commit(types.TOGGLE_LOADING, true);

  return http.request({
    url: _baseUrl + id,
    method: 'DELETE',
  })
    .then(validateCode)
    .then(new Promise((resolve, reject) => {

      commit(types.DELETE_ACTIVITY, id);
      commit(types.TOGGLE_LOADING, false);
      resolve(response);

    }))
    .catch(e => {
      let message = 'Could not delete the activity with id: ' + id + '. Error: ' + e;
      console.error(message);
      commit(types.TOGGLE_LOADING, false);
      throw message;
    })
};

function validateCode(response) {
  return new Promise((resolve, reject) => {
    if ((response.statusCode >= 200 && response.statusCode < 300) || response.statusCode == 404) {
      resolve(response);
    }
    reject('Response with code: ' + response.statusCode +
      '\nContent: ' + response.content.toString());
  })
};

function getJson(response) {
  return new Promise((resolve, reject) => {
    resolve(response.content.toJSON());
  })
    .catch(e => {
      let message = 'Error parsing JSON response: ' + e;
      console.error(message);
      throw message;
    })
};