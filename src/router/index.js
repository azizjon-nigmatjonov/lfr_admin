import {createRouter, createWebHistory} from 'vue-router'
import {authStore} from '../store/auth';
import {ability} from '../plugins/ability';

const routes = [
    // {
    //     path: '/',
    //     component: () => import('../views/Login/Login.vue'),
    //     name: 'Login',
    //     meta: {authRequired: false, layout: 'empty'},
    // },
    // {
    //     path: '/print',
    //     component: () => import('../views/Print.vue'),
    //     name: 'Print',
    //     meta: {authRequired: false, layout: 'empty'},
    // },
    {
        path: '/',
        component: () => import('../layouts/MainLayout.vue'),
        meta: {authRequired: true},
        children: [
            {path: '/', name: 'Login', component: () => import('../views/Login/Login.vue'), meta: {authRequired: true}},
            {path: 'codebase', name: 'Codebase', component: () => import('../views/Codebase/Index.vue'), meta: {authRequired: true}},


            {path: 'finance', name: 'Finance', component: () => import('../views/Finance/Finance.vue'), meta: {authRequired: true}},
            // {path: 'admins', name: 'Admins', component: () => import('../views/Admins/Admins.vue'),meta: {authRequired: true}},
            {path: 'roles', name: 'Roles', component: () => import('../views/Roles/Roles.vue'), meta: {authRequired: true}},
            {path: 'permissions', name: 'Permissions', component: () => import('../views/Permissions/Permissions.vue'), meta: {authRequired: true}},
            {path: 'users', name: 'Users', component: () => import('../views/Users/Users.vue'), meta: {authRequired: true}},
            {path: 'employees', name: 'Employees', component: () => import('../views/Employees/Employees.vue'), meta: {authRequired: true}},
            {path: 'profile', name: 'Profile', component: () => import('../views/Profile/Profile.vue'), meta: {authRequired: true}},
            {path: 'sale', name: 'Sailing', component: () => import('../views/Selling/Selling.vue'), meta: {authRequired: true}},
            {path: 'mattress', name: 'Mattress', component: () => import('../views/Factories/Mattress.vue'), meta: {authRequired: true}},
            // {
            //     path: 'foam-rubber-factory', name: 'FoamRubber', component: () => import('../views/Factories/FoamRubber.vue'),
            //     meta: {authRequired: true}
            // },
            {path: 'pillow-factory', name: 'Pillow', component: () => import('../views/Factories/Pillow.vue'), meta: {authRequired: true}},
            {path: 'sponge-factory', name: 'Sponge', component: () => import('../views/Factories/Sponge.vue'), meta: {authRequired: true}},
            {path: 'curly-cutting-factory', name: 'CurlyCutting', component: () => import('../views/Factories/CurlyCutting.vue'),
                meta: {authRequired: true}},


            {path: 'warehouse-machines', name: 'Machines', component: () => import('../views/Warehouse/Machines/Index.vue'),
                meta: {authRequired: true}},
            {path: 'warehouse-accessories', name: 'Accessories', component: () => import('../views/Warehouse/Accessories/Index.vue'),
                meta: {authRequired: true}},
            {path: 'warehouse-equipment', name: 'Equipment', component: () => import('../views/Warehouse/Equipment/Index.vue'),
                meta: {authRequired: true}},
            {path: 'warehouse-raw-material', name: 'RawMaterial', component: () => import('../views/Warehouse/RawMaterial/Index.vue'),
                meta: {authRequired: true}},
           
           
            {path: 'production', name: 'Production', component: () => import('../views/Production/Index.vue'), meta: {authRequired: true}},

            {path: 'customers', name: 'Customers', component: () => import('../views/Customers/Index.vue'), meta: {authRequired: true}},
            {path: 'customers/show/:id', name: 'CustomersShow', component: () => import('../views/Customers/Show.vue'), meta: {authRequired: true}},

            {path: 'suppliers', name: 'Suppliers', component: () => import('../views/Suppliers/Index.vue'), meta: {authRequired: true}},
            {path: 'suppliers/show/:id', name: 'SuppliersShow', component: () => import('../views/Suppliers/Show.vue'), meta: {authRequired: true}},

            {path: 'orders', name: 'Orders', component: () => import('../views/Orders/Index.vue'), meta: {authRequired: true}},


        ]
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes,
    mode: 'hash'
})


// router.beforeEach(async (to, from, next) => {
//     const authStorage = authStore();
//     let user = authStorage.user
//     if (to.matched.some(route => route.meta.authRequired)) {
//         if (user && user.token) {
//             next()
//         } else {
//             if (localStorage.getItem('user')) {
//                 const userData = JSON.parse(localStorage.getItem('user'));
//                 const isDarkData = JSON.parse(localStorage.getItem('isDark'));

//                 authStorage.user = userData;
//                 authStorage.isDark = isDarkData;

//                 if (userData.is_admin == '1') {
//                     let array = [
//                         {
//                             action: ['read', 'update', 'delete'],
//                             subject: 'admins',
//                         },
//                         {
//                             action: ['read', 'update', 'delete'],
//                             subject: 'users',
//                         },
//                     ]
//                     if (userData.department_type == 'drobilka') {
//                         array.push(
//                             {
//                                 action: ['read', 'update', 'delete'],
//                                 subject: 'crusher',
//                             },
//                         )
//                     }
//                     ability.update(array)
//                 } else {
//                     let array = [
//                         {
//                             action: ['read', 'update', 'delete'],
//                             subject: 'users',
//                         },
//                     ]
//                     if (userData.department_type == 'drobilka') {
//                         array.push(
//                             {
//                                 action: ['read', 'update', 'delete'],
//                                 subject: 'crusher',
//                             },
//                         )
//                     }
//                     ability.update(array)
//                 }

//                 next()
//             } else {
//                 next('/')
//             }

//         }
//     } else {
//         next()
//     }
// })


const DEFAULT_TITLE = 'Project'
router.afterEach((to, from) => {
    document.title = to.meta.title || DEFAULT_TITLE;
})


export default router