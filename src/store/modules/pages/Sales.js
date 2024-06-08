import axios from "../../../plugins/axios";
import { defineStore, storeToRefs } from 'pinia'
import { BASE_URL } from '../../../variables';
let user = JSON.parse(localStorage.getItem('user'));

export const salesStore = defineStore('sales', {

  state: () => {
    return {
      sales: [],
      sale_products: [
        {
          "factory_product_id": 0,
          "amount": 0
        },
      ],
      saleProductIndex: 0,
      refreshSales: false,
    }
  },

  getters: {},


  actions: {
    async GET_SALES (params) {
      return await axios({
          headers: {
            Authorization: user.token_type + " " + user.access_token,
          }, 
          method: "GET", 
          url: BASE_URL + `api/v1/sales`,
          params     
        })
        .then((e) => {
          this.sales = e.data.data.data
          return e;
        })
        .catch((error) => {
          return error;
        })
    },
    async CREATE_SALE (data) {
      return await axios({
          headers: {
            Authorization: user.token_type + " " + user.access_token,
          }, 
          method: "POST", 
          url: BASE_URL + `api/v1/sales`,
          data     
        })
        .then((e) => {
          return e;
        })
        .catch((error) => {
          return error;
        })
    },
  //   async UPDATE_USER ({data, id}) {
  //     return await axios({
  //       headers: {
  //         Authorization: user.token_type + " " + user.access_token,
  //       }, 
  //       method: "PUT", 
  //       url: BASE_URL + `api/v1/users/${id}`,
  //       data     
  //     })
  //     .then((e) => {
  //       return e;
  //     })
  //     .catch((error) => {
  //       return error;
  //     })
  //   },
  //   async DELETE_USER (id) {
  //     return await axios({
  //         headers: {
  //           Authorization: user.token_type + " " + user.access_token,
  //         }, 
  //         method: "DELETE", 
  //         url: BASE_URL + `api/v1/users/${id}`,  
  //       })
  //       .then((e) => {
  //         return e;
  //       })
  //       .catch((error) => {
  //         return error;
  //       })
  //   },
  },
})