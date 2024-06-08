import axios from "../../../plugins/axios";
import { defineStore } from 'pinia'
import { BASE_URL } from '../../../variables';
let user = JSON.parse(localStorage.getItem('user'));

export const suppliersStore = defineStore('supplier', {
  state: () => {
    return {
      updateSupplier: false,
      updateCustomer: false,
    }
  },

  getters: {},

  actions: {
    async GET_SUPPLIERS_OR_CUSTOMERS_LIST(params) {
        return await axios({
            method: "GET", 
            url: BASE_URL + `api/v1/customers`,
            params
          })
          .then((e) => {
            this.suppliers_list = e.data;
            return e;
          })
          .catch((error) => {
            return error;
          })
    },
    async POST_NEW_SUPPLIER_OR_CUSTOMER (params) {
        return await axios({
            method: "POST", 
            url: BASE_URL + `api/v1/customers`,
            params
          })
          .then((e) => {
            return e;
          })
          .catch((error) => {
            return error;
          })
    },
    async UPDATE_SUPPLIER_OR_CUSTOMER({params, id}) {
        return await axios({
            method: "PUT", 
            url: BASE_URL + `api/v1/customers/${id}`,
            params
        })
        .then((e) => {
            return e;
        })
        .catch((error) => {
            return error;
        })
    },
    async DELETE_SUPPLIER(payload) {
        return await axios({
            method: "DELETE", 
            url: BASE_URL + `api/v1/customers/${payload}`,
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