<template>
    <div 
        class="v-confirm absolute left-0 top-0 min-w-[200px] rounded-[12px]" 
        :class="[classes, $isDark ? 'shadow-2xl shadow-[#111] border border-[#132f4c]' : 'shadow-2xl shadow-[#887] bg-white']"
        >
        <div 
            class="relative p-4 rounded-[12px]"
            :class="$isDark ? 'bg-[#011e3c] text-white' : 'bg-white main-color-black'"
            >
            <p class="whitespace-nowrap flex items-center space-x-1 pr-14 text-inherit">
                <img src="../../assets/icons/error-warning-line.svg" alt="icon">
                <span>{{ question }}</span>
            </p>
            <div class="flex items-center justify-end space-x-2 mt-4">
            <button
                @click="cancel"
                class="h-[40px] items-center px-[14px] rounded-[8px] bg-[#1d3260] dark:bg-[#111111aa] dark:text-white bg-opacity-20 inline-flex justify-center main-color-black text-center hover:bg-opacity-30 duration-200"
              >
                {{$t('not')}}
              </button>
              <button
                @click="confirm"
                class="h-[40px] px-[14px] rounded-[8px] bg-[#2597DE] inline-flex justify-center text-white text-center items-center hover:bg-opacity-80 duration-200"
              >
                {{buttonText ? buttonText : $t('yes')}}
              </button>
            </div>
            <div
            :class="$isDark ? 'border border-[#132f4c] bg-[#011e3c]' : 'bg-white'"
            class="z-[-1] w-[40px] h-[40px] rounded-[4px] absolute right-[-6px] -translate-y-1/2 top-1/2 rotate-45"
            ></div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
export default ({
    props: ['classes', 'question', 'buttonText'],
    setup(props, { emit }) {

        const cancel = () => {
            emit('cancel')
        }

        const confirm = () => {
            emit('confirm')
        }

        return {
            confirm,
            cancel
        }
    }
})
</script>

<style scoped>
</style>