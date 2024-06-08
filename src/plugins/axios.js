/* eslint-disable */
import axios from "axios";
import {BASE_URL} from '../variables'
import router from '../router/index.js';
import {useToast} from "vue-toastification";
import {authStore} from '../store/auth';

// const authStorage = authStore();
const toast = useToast();
// axios.defaults.withCredentials = true;


const instance = axios.create({
    baseURL: BASE_URL + "api",
    // baseURL: "http://127.0.0.1:8000/api",
    timeout: 60000,
    headers: {"X-Custom-Header": "foobar", "Accept": "application/json"}
});


//send token
instance.interceptors.request.use(
    function (config) {
        let user = JSON.parse(localStorage.getItem('user'));

        if (user && user.access_token) {
            config.headers.Authorization = "Bearer " + user.access_token
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);


//404 or 401 pages use this response
instance.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        console.log(error)
        if (error.response && error.response.status === 401) {
            // let response = await authStorage.LOGOUT()
            //
            // if (response.status == 201) {
            //     toast.success('Muvaffaqiyatli tizimdan chiqdingiz!')
            // } else {
            //     if (response.status == 401) {
            //         if (response.data.message) {
            //             toast.error(response.data.message)
            //         }
            //     } else if (response.status == 500) {
            //         toast.error('Serverda nosozlik yuz berdi!')
            //     }
            // }

            await localStorage.removeItem('user');
            await router.push('/')
        }else if (error.response.status === 422) {
            toast.error('Произошла ошибка!')
            if(error.response && error.response.data && error.response.data.message){
                toast.error(error.response.data.message)
            }
        }else if (error.response.status === 500) {
            toast.error('Произошла ошибка в сервере!')
        }
    
        return Promise.reject(error);
    },
);


export default instance;