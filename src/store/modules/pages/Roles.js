import axios from "../../../plugins/axios";
import { defineStore, storeToRefs } from 'pinia'
import { BASE_URL } from '../../../variables';
let user = JSON.parse(localStorage.getItem('user'));

export const roleStore = defineStore('role', {
  
  state: () => {
    return {
      roles: []
    }
  },

  getters: {},

  actions: {
    async POST_NEW_ROLE(data) {
        return await axios({
            headers: {
              Authorization: user.token_type + " " + user.access_token,
            },   
            method: "POST", 
            url: BASE_URL + `api/v1/role`,
            data   
          })
          .then((e) => {
            return e;
          })
          .catch((error) => {
            return error;
          })
    },
    async EDIT_ROLE (data) {
      return await axios({
          headers: {
            Authorization: user.token_type + " " + user.access_token,
          },    
          method: "PUT", 
          url: BASE_URL + `api/v1/role/${data.id}`,
          data  
        })
        .then((e) => {
          return e;
        })
        .catch((error) => {
          return error;
        })
    },
    async DELETE_ROLE (data) {
        return await axios({
            headers: {
              Authorization: user.token_type + " " + user.access_token,
            },    
            method: "DELETE", 
            url: BASE_URL + `api/v1/role/${data.id}`, 
          })
          .then((e) => {
            return e;
          })
          .catch((error) => {
            return error;
          })
    },
    async GET_ROLES_LIST(params) {
      return await axios({
          headers: {
            Authorization: user.token_type + " " + user.access_token,
          }, 
          method: "GET", 
          url: BASE_URL + `api/v1/role`,
          params     
        })
        .then((e) => {
          this.roles = e.data.data
          return e;
        })
        .catch((error) => {
          return error;
        })
  },
  },
})