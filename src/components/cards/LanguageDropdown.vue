<template>
     <div class="uk-inline">
         <a href="#" class="uppercase font-medium main-color-black inline-flex items-center uk-animation-fade text-xl border px-5 py-2 rounded-[12px]">
            <flag v-if="locale && locale == 'uz'" iso="uz" />
            <flag class="border" v-if="locale && locale == 'ru'" iso="ru" />
            <span class="ml-2">{{ locale }}</span>
        </a>
        <div class="uk-padding-remove rounded-[4px]" style="min-width: 160px; left: -50px" uk-dropdown="pos: bottom-center; animation: uk-animation-slide-top-small; duration: 200; mode: click">                
            <ul class="flex uk-flex-column uk-padding-small space-y-3">
                <li @click="handleLanguage('uz')" class="main-color-black text-lg font-medium flex items-center space-x-2 cursor-pointer hover:text-[#2597DE] duration-100">       
                    <span>O'zbekcha</span>
                </li>
                <li @click="handleLanguage('ru')" class="main-color-black text-lg font-medium flex items-center space-x-2 cursor-pointer hover:text-[#2597DE] duration-100">
                    <span>Русский</span>
                </li>
            </ul>
        </div>
      </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
    props: [''],
    setup() {
    const { locale } = useI18n()
    const currentLang = ref('ru')

    const handleLanguage = (e) => {
        if (e == "uz"){
            localStorage.setItem('lang', 'uz')
            locale.value = 'uz'
        } else {
            localStorage.setItem('lang', 'ru')
            locale.value = 'ru'
        }
    };

    return {
        handleLanguage,
        locale
    }
    },
}
</script>

<style scoped>
.uk-dropdown {
    border-radius: 4px;
    border-top: 4px solid #5fc7d1;
}
</style>
