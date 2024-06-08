<template>
<section class="flex wrapperAll">
    <Sidebar v-if="this.$route.path !== '/'" />

    <div class="flex flex-col w-full border-l-[1.5px]" :class="$isDark ? 'border-[#1a283a]' : 'border-[#F2F5FA]'">
        <Header v-if="this.$route.path !== '/'" @changeTheme="changeTheme" :isDark="isDark" />

        <router-view />

    </div>
</section>
</template>

<script>
import Header from '../layouts/components/Header.vue'
import Sidebar from '../layouts/components/Sidebar.vue'
import { codebaseStore } from '@/store/modules/pages/Codebase.js'
import { onMounted, ref } from 'vue';
export default {
    components: {
        Sidebar,
        Header
    },
    setup() {
        // const codebaseStorage = codebaseStore()
        const isDark = ref(false)
        let isDarkValue = JSON.parse(localStorage.getItem('isDark'))

        function changeTheme(event) {
            isDark.value = event
            localStorage.setItem('isDark', JSON.stringify(event))
            let bodyWrapper = document.querySelector("body")
            
            let htmlElement = document.querySelector("html")
            if(event){
                htmlElement.classList.add("dark")
                bodyWrapper.style.backgroundColor = '#0b1929'
            }
            if(!event){
                htmlElement.classList.remove("dark")
                bodyWrapper.style.backgroundColor = 'transparent'
            }
            location.reload()
        }

        onMounted(() => {
            let htmlElement = document.querySelector("html")
            let bodyWrapper = document.querySelector("body")
            isDark.value = isDarkValue
            if (isDarkValue) {
                bodyWrapper.style.backgroundColor = '#0b1929'
            } else {
                bodyWrapper.style.backgroundColor = 'transparent'
            }
            if(isDarkValue){
                htmlElement.classList.add("dark")
            }
            if(!isDarkValue){
                htmlElement.classList.remove("dark")
            }
        })

        return {
            changeTheme,
            isDark
        }
    }
}
</script>

<style>

</style>
