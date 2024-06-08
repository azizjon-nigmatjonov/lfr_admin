import axios from "../../plugins/axios";
import { defineStore } from 'pinia'
import { BASE_URL } from '../../variables';
let user = JSON.parse(localStorage.getItem('user'));

export const orderStore = defineStore('orderStorage', {
  
  state: () => {
    return {
      order_raw_foam: [
        {
          "factory_product_id": 1,
          "amount": 1
        },
      ],
      rawAddModalIndex: 0,
      order_raw_mattress: [],
      order_raw_pillow: [],
      order_raw_sponge: [],
      order_raw_curlyCutting: [],
    }
  },

  getters: {},

  actions: {
    async CREATE_ORDER(data) {
        return await axios({
            headers: {
              Authorization: user.token_type + " " + user.access_token,
            },   
            method: "POST", 
            url: BASE_URL + `api/v1/order`,
            data   
          })
          .then((e) => {
            return e;
          })
          .catch((error) => {
            return error;
          })
    },

    async GET_ORDER(params) {
        return await axios({
            headers: {
              Authorization: user.token_type + " " + user.access_token,
            },   
            method: "GET", 
            url: BASE_URL + `api/v1/order`,
            params
          })
          .then((e) => {
            return e;
          })
          .catch((error) => {
            return error;
          })
    },
    
    async GET_ORDER_EXTRA_PRODUCT(params) {
        return await axios({
            headers: {
              Authorization: user.token_type + " " + user.access_token,
            },   
            method: "GET", 
            url: BASE_URL + `api/v1/order-extra-product`,
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