import axios from "../../plugins/axios";
import { defineStore } from 'pinia'
import { BASE_URL } from '../../variables';
let user = JSON.parse(localStorage.getItem('user'));

export const factoryIncomeStore = defineStore('factoryIncome', {
  
  state: () => {
    return {
      
    }
  },

  getters: {},

  actions: {
    async CREATE_FACTORY_INCOME(data) {
        return await axios({
            headers: {
              Authorization: user.token_type + " " + user.access_token,
            },   
            method: "POST", 
            url: BASE_URL + `api/v1/factory-income`,
            data   
          })
          .then((e) => {
            return e;
          })
          .catch((error) => {
            return error;
          })
    },

    async GET_FACTORY_INCOME(params) {
        return await axios({
            headers: {
              Authorization: user.token_type + " " + user.access_token,
            },   
            method: "GET", 
            url: BASE_URL + `api/v1/factory-income`,
            params
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