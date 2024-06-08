import axios from "../../../plugins/axios";
import { defineStore } from 'pinia'
import { BASE_URL } from '../../../variables';
let user = JSON.parse(localStorage.getItem('user'));

export const productIncomeToStore = defineStore('productStore', {
  state: () => {
    return {
      storageList: [],
      expense_list: [
        {
          "category_title": 0,
          "amount": 0
        },
      ],
      expenseIndex: 0,
      refreshExpenseCategories: false,
      refreshExpenses: false,
    }
  },

  getters: {},

  actions: {
    async GET_RAW_MATERIALS_STORAGE (params) {
      return await axios({
          headers: {
            Authorization: user.token_type + " " + user.access_token,
          },   
          method: "GET", 
          url: BASE_URL + `api/v1/storage`,
          params
        })
        .then((e) => {
          this.storageList = e.data
          return e;
        })
        .catch((error) => {
          return error;
        })
    },
    async DELETE_STORAGE_PRODUCT (id) {
      return await axios({
          headers: {
            Authorization: user.token_type + " " + user.access_token,
          },   
          method: "DELETE", 
          url: BASE_URL + `api/v1/storage/${id}`
        })
        .then((e) => {
          return e;
        })
        .catch((error) => {
          return error;
        })
    },

    async GET_PRODUCT_INCOME (params) {
        return await axios({
            headers: {
              Authorization: user.token_type + " " + user.access_token,
            },   
            method: "GET", 
            url: BASE_URL + `api/v1/product-income`,
            params
          })
          .then((e) => {
            return e;
          })
          .catch((error) => {
            return error;
          })
    },
    async CREATE_PRODUCT_INCOME(data) {
      return await axios({
          headers: {
            Authorization: user.token_type + " " + user.access_token,
          },   
          method: "POST", 
          url: BASE_URL + `api/v1/product-income`,
          data   
        })
        .then((e) => {
          return e;
        })
        .catch((error) => {
          return error;
        })
    },
    async CREATE_EXPENSE_CATEGORY(data) {
      return await axios({
          headers: {
            Authorization: user.token_type + " " + user.access_token,
          },   
          method: "POST", 
          url: BASE_URL + `api/v1/expense-categories`,
          data   
        })
        .then((e) => {
          return e;
        })
        .catch((error) => {
          return error;
        })
    },
    async DELETE_EXPENSE_CATEGORY(data) {
      return await axios({
          headers: {
            Authorization: user.token_type + " " + user.access_token,
          },   
          method: "DELETE", 
          url: BASE_URL + `api/v1/expense-categories/${data}`,
        })
        .then((e) => {
          return e;
        })
        .catch((error) => {
          return error;
        })
    },
    async GET_EXPENSE_CATEGORIES(data) {
      return await axios({
          headers: {
            Authorization: user.token_type + " " + user.access_token,
          },   
          method: "GET", 
          url: BASE_URL + `api/v1/expense-categories`,
          params: data   
        })
        .then((e) => {
          return e;
        })
        .catch((error) => {
          return error;
        })
    },
    async GET_EXPENSES(data) {
      return await axios({
          headers: {
            Authorization: user.token_type + " " + user.access_token,
          },   
          method: "GET", 
          url: BASE_URL + `api/v1/expenses`,
          params: data   
        })
        .then((e) => {
          return e;
        })
        .catch((error) => {
          return error;
        })
    },
    async CREATE_EXPENSE(data) {
      return await axios({
          headers: {
            Authorization: user.token_type + " " + user.access_token,
          },   
          method: "POST", 
          url: BASE_URL + `api/v1/expenses`,
          data: data   
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