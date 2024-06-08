import axios from "../../plugins/axios";
import { defineStore } from 'pinia'
import { BASE_URL } from '../../variables';
let user = JSON.parse(localStorage.getItem('user'));

export const factoryProductStore = defineStore('factoryProduct', {
  
  state: () => {
    return {
      
    }
  },

  getters: {},

  actions: {
    async GET_FACTORY_PRODUCT(params) {
        return await axios({
            headers: {
              Authorization: user.token_type + " " + user.access_token,
            },   
            method: "GET", 
            url: BASE_URL + `api/v1/factory-product`,
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