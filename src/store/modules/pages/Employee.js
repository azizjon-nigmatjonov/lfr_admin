import axios from "../../../plugins/axios";
import { defineStore } from 'pinia'
import { BASE_URL } from '../../../variables';
let user = JSON.parse(localStorage.getItem('user'));
export const employeeStore = defineStore('employee', {
  state: () => {
    return {
      
    }
  },
  getters: {},
  actions: {
    async CREATE_EMPLOYEE (data) {
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
    async UPDATE_EMPLOYEE ({data, id}) {
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
    async DELETE_EMPLOYEE (id) {
      return await axios({
          headers: {
              Authorization: user.token_type + " " + user.access_token,
          }, 
          method: "DELETE", 
          url: BASE_URL + `api/v1/users/${id}`
          })
          .then((e) => {
              return e;
          })
          .catch((error) => {
              return error;
         })
    },
    async PAY_SALARY_EMPLOYEE (data) {
      return await axios({
          headers: {
              Authorization: user.token_type + " " + user.access_token,
          }, 
          method: "POST", 
          url: BASE_URL + `api/v1/user/payment`,
          data
          })
          .then((e) => {
              return e;
          })
          .catch((error) => {
              return error;
         })
    },
    async GET_EMPLOYEE_LIST(data) {
      return await axios({
          headers: {
            Authorization: user.token_type + " " + user.access_token,
          }, 
          method: "GET", 
          url: BASE_URL + `api/v1/users`,
          params: data     
        })
        .then((e) => {
          return e;
        })
        .catch((error) => {
          return error;
        })
    },
  }
})