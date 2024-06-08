import axios from "../../../plugins/axios";
import { defineStore, storeToRefs } from 'pinia'
import { BASE_URL } from '../../../variables';
let user = JSON.parse(localStorage.getItem('user'));

export const codebaseStore = defineStore('codebase', {
  
  state: () => {
    return {
      updateCodebase: false
    }
  },
  getters: {},
  actions: {
    async GET_PRODUCTS (data) {
      return await axios({
          headers: {
            Authorization: user.token_type + " " + user.access_token,
          },   
          method: "GET", 
          url: BASE_URL + `api/v1/products`,
          params: data
        })
        .then((e) => {
          return e;
        })
        .catch((error) => {
          return error;
        })
    },
    async ADD_PRODUCT (data) {
      return await axios({
          headers: {
            Authorization: user.token_type + " " + user.access_token,
          },   
          method: "POST", 
          url: BASE_URL + `api/v1/products`  ,
          data 
        })
        .then((e) => {
          return e;
        })
        .catch((error) => {
          return error;
        })
    },
    async EDIT_PRODUCT ({data, id}) {
      return await axios({
        headers: {
          Authorization: user.token_type + " " + user.access_token,
        },   
        method: "PUT", 
        url: BASE_URL + `api/v1/products/${id}`,
        data
      })
      .then((e) => {
        return e;
      })
      .catch((error) => {
        return error;
      })
    },
    async DELETE_PRODUCT (id) {
      return await axios({
        headers: {
          Authorization: user.token_type + " " + user.access_token,
        },   
        method: "DELETE", 
        url: BASE_URL + `api/v1/products/${id}`
      })
      .then((e) => {
        return e;
      })
      .catch((error) => {
        return error;
      })
    },
    async GET_PRODUCT_CATEGORIES() {
      let user = JSON.parse(localStorage.getItem('user'));
        return await axios({
            headers: {
              Authorization: user.token_type + " " + user.access_token,
            },
            method: "GET", 
            url: BASE_URL + `api/v1/product-categories`   
          })
          .then((e) => {
            this.product_categories_list = e.data
            return e;
          })
          .catch((error) => {
            return error;
          })
    }
  },
})