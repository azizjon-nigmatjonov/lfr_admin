<template>
    <component :is="layout">
        <router-view/>
    </component>
</template>

<script>
import { computed, provide, ref } from "vue";
import { useRouter } from 'vue-router';
import EmptyLayout from './layouts/EmptyLayout.vue';
import MainLayout from "./layouts/MainLayout.vue";
import { authStore } from './store/auth';
import {storeToRefs} from 'pinia';
import {ability} from '@/plugins/ability';

export default {
    components: {
        EmptyLayout,
        MainLayout
    },
    setup() {
        const router = useRouter()
        const authStorage = authStore();
        const layout = computed(() => {
            return (router.currentRoute.value.meta.layout || 'empty') + '-layout'
        })
        // const { user } = storeToRefs(authStorage) //REACTIVE
        const user = ref(JSON.parse(localStorage.getItem('user')));
        if (user.value) {
            provide('$user', user);
            // provide('$departmentId', user.value.department_id);
        }

        if(localStorage.getItem('permissions')){
            let permissions = JSON.parse(localStorage.getItem('permissions'));
            ability.update(permissions)
        }

        return {
            layout
        }
    }
}
</script>