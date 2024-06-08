<template>
     <div class="uk-inline">
        <button class="uk-animation-fade w-[45px] h-[45px] flex items-center justify-center rounded-[12px]" type="button"><SunIcon width="30" height="30" /></button>
        <div class="uk-padding-remove rounded-[4px]" style="min-width: 70px;" uk-dropdown="pos: bottom-center; animation: uk-animation-slide-top-small; duration: 200; mode: click">                
            <div class="p-4">
                 <div>
                    <label for="default-toggle" class="inline-flex relative items-center cursor-pointer">
                    <input @click="handleMode" type="checkbox" value="" id="default-toggle" class="sr-only peer">
                    <div class="w-11 h-6 peer-focus:outline-none outline-none rounded-full peer dark:bg-[#eac544] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#111]"></div>
                 </label>
                 </div>
            </div>
        </div>
      </div>
</template>

<script>
import SunIcon from "@/assets/iconsVue/SunIcon.vue";
export default {
    props: [''],
    components: {
        SunIcon
    },
    setup() {
     const handleMode = (e) => {
        console.log('eee', e)
     }
     return {
        handleMode
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
