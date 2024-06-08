import {defineStore} from 'pinia';
import {BASE_URL} from '../variables';
import axios from "./../plugins/axios";
import {ability} from '../plugins/ability';
let user = JSON.parse(localStorage.getItem('user'));

export const authStore = defineStore('auth', {
    state: () => {
        return {
            user: [],
            userInfo: [],
            isDark: false,
        };
    },
    getters: {
        getUser: state => state.user,
    },
    actions: {
        async SIGNIN(payload) {
            return await axios({
                method: "POST",
                url: BASE_URL + 'api/v1/auth/login',
                data: payload
            })
                .then(async (e) => {
                    this.user = e.data.data
                    await localStorage.setItem('user', JSON.stringify(e.data.data));
                    return e;            
                })
                .catch((error) => {
                    return error;
                })
        },
        async GET_USER_INFO(payload) {
            return await axios({
                method: "POST",
                url: BASE_URL + 'api/v1/auth/get-info',
            })
                .then(async (e) => {
                    this.userInfo = e.data.data
                    return e;            
                })
                .catch((error) => {
                    return error;
                })
        },
        async UPDATE_PROFILE_INFO (payload) {
            return await axios({
              headers: {
                Authorization: user.token_type + " " + user.access_token,
              }, 
              method: "POST", 
              url: BASE_URL + `api/v1/user/update`,
              data: payload     
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