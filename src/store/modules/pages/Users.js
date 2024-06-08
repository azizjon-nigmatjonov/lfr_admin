import axios from "../../../plugins/axios";
import { defineStore, storeToRefs } from 'pinia'
import { BASE_URL } from '../../../variables';
let user = JSON.parse(localStorage.getItem('user'));

export const usersStore = defineStore('users', {

  state: () => {
    return {}
  },

  getters: {},


  actions: {
    async GET_USERS_LIST (params) {
      return await axios({
          headers: {
            Authorization: user.token_type + " " + user.access_token,
          }, 
          method: "GET", 
          url: BASE_URL + `api/v1/users?type=user`,
          params     
        })
        .then((e) => {
          return e;
        })
        .catch((error) => {
          return error;
        })
    },
    async CREATE_USER (data) {
      return await axios({
          headers: {
            Authorization: user.token_type + " " + user.access_token,
          }, 
          method: "POST", 
          url: BASE_URL + `api/v1/users`,
          data     
        })
        .then((e) => {
          return e;
        })
        .catch((error) => {
          return error;
        })
    },
    async UPDATE_USER ({data, id}) {
      return await axios({
        headers: {
          Authorization: user.token_type + " " + user.access_token,
        }, 
        method: "PUT", 
        url: BASE_URL + `api/v1/users/${id}`,
        data     
      })
      .then((e) => {
        return e;
      })
      .catch((error) => {
        return error;
      })
    },
    async FREEZ_OR_UNFREEZ_USER ({data, id}) {
      return await axios({
        headers: {
          Authorization: user.token_type + " " + user.access_token,
        }, 
        method: "PUT", 
        url: BASE_URL + `api/v1/users/${id}`,
        data     
      })
      .then((e) => {
        return e;
      })
      .catch((error) => {
        return error;
      })
    },
    async DELETE_USER (id) {
      return await axios({
          headers: {
            Authorization: user.token_type + " " + user.access_token,
          }, 
          method: "DELETE", 
          url: BASE_URL + `api/v1/users/${id}`,  
        })
        .then((e) => {
          return e;
        })
        .catch((error) => {
          return error;
        })
    },
  },
})