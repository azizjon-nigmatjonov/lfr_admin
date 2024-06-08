<template>
<div v-on:mouseover="isVisible = true" v-on:mouseleave="isVisible = false" class="fixed top-20 right-0 h-[50vh] w-[50px]">
    <div class="relative w-[50px]">
      <div @click="isFilterActive = !isFilterActive" class="absolute bg-[#2597DE] flex items-center justify-center h-[50px] w-[50px] rounded-[12px] cursor-pointer shadow-lg z-[888] duration-300" :class="[isVisible ? 'right-8' : 'right-[-20px]', buttonClass]">
        <img src="../../assets/icons/filter.svg" alt="">
      </div>
    </div>
</div>
<div class="fixed duration-300 border top-1/3 bg-[#fff] z-[999] p-10 shadow-2xl rounded-[12px]" :class="[isFilterActive ? 'right-8' : 'right-[-380px]', wrapperClass]">
    <slot name="filterBody"></slot>
    <footer class="w-full">
      <button
        v-if="cancelButtonText"
        @click="cancel"
        class="basicBtn whitespace-nowrap w-full disabled-background flex justify-center text-[#141839] mt-8 text-center hover:bg-opacity-80 duration-200"
      >
        {{cancelButtonText}}
      </button>
      <button
        v-if="buttonText"
        @click="submit"
        class="basicBtn whitespace-nowrap w-full bg-[#2597DE] flex justify-center text-white mt-8 text-center hover:bg-opacity-80 duration-200"
      >
        {{buttonText}}
      </button>
    </footer>
</div>
<div v-if="isFilterActive" @click="isFilterActive = !isFilterActive" class="w-full h-full fixed top-0 right-0 z-[889]"></div>
</template>

<script>
import { onMounted, ref } from 'vue'
export default {
  props: ['buttonClass', 'wrapperClass', 'buttonText', 'cancelButtonText'],
  setup(props, context) {
    const isFilterActive = ref(false)
    const isVisible = ref(false)

    const submit = () => {
      context.emit('submitFilter')
    }

    const cancel = () => {
      context.emit('cancelFilter')
    } 

    return {
        isFilterActive,
        isVisible,

        submit,
        cancel
    }
  },
};
</script>

<style lang="scss" scoped>
</style>