<template>
    <div class="relative">
        <img :src="icons" :alt="alt ? alt : 'image'">
        <!-- <input v-model="input" :type="type ? type : 'text'" :name="name" :value="value" class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg" :class="classes" :placeholder="placeholder" :required="required" :autocomplete="autocomplete ? autocomplete : 'off'"> -->
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
export default ({
    props: ['input', 'type', 'name', 'value', 'icons', 'alt', 'classes', 'placeholder', 'required'],
    setup(props, { emit }) {
     
    },
    watch: {
        'icons': (val) => {
            console.log('val 1', val)
        }
    }
})
</script>

<style scoped>
</style>