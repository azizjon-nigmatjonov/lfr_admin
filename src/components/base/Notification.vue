<template>
     <div class="uk-inline">
        <button class="uk-animation-fade w-[45px] h-[45px] flex items-center justify-center rounded-[12px]" type="button">
            <img src="../../assets/icons/notification.svg" alt="nitification">
        </button>
        <div 
            class="uk-padding-remove rounded-[4px]" 
            style="min-width: 300px;" uk-dropdown="pos: bottom-center; animation: uk-animation-slide-top-small; duration: 200; mode: click"
            :class="$isDark ? 'bg-[#011e3c] shadow-2xl shadow-[#111] border border-[#132f4c]' : 'bg-[#fff] shadow-lg'"
        >                
            <div class="p-4">
                 <ul class="relative">
                    <li
                    v-for="index in 3"
                    class="py-6 border-b-[1.5px] border-opacity-[0.4] relative dark:text-white"
                    :key="index"
                    >
                    <p>
                        200ta 1 zichlik porolon sotildi
                    </p>

                    <span class="text-sm absolute right-0 bottom-0 dark:text-[#ffffff88]">20.07.2022</span>
                </li>
              </ul>
            </div>
        </div>
      </div>
</template>

<script>
export default {
    props: [''],
    setup() {},
}
</script>

<style scoped>
.uk-dropdown {
    border-radius: 4px;
    border-top: 4px solid #5fc7d1;
}
</style>
