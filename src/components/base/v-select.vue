<template>
    <div class="v-select border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px]">
        <p ref="selectRef" class="value py-[14px] px-[24px] pl-12 focus:outline-none text-lg cursor-pointer flex items-center justify-between w-full overflow-hidden whitespace-nowrap" 
        :class="[classes, selectedElem || selectedElement ? 'dark:text-white dark-hover:text-white text-[#111]' : 'text-[#696F7A] hover:text-[#696F7A]']" >
            {{ selectedElem ? $t(selectedElem) : selectedElement ? selectedElement : placeholder }}
            <img :class="(optionVisible && !readonly) ? 'rotate-[180deg]' : ''" class="duration-300 absolute right-3" src="../../assets/icons/arrowBottom.svg" alt="arrow">
        </p>
        <div 
            v-if="optionVisible && !readonly" 
            class="options shadow-2xl flex flex-col py-2 z-[999] max-h-[220px] overflow-y-scroll absolute left-0 top-16 rounded-[4px] w-full"
            :class="$isDark ? 'bg-[#011e3c] shadow-2xl shadow-[#111] border border-[#132f4c]' : 'bg-white'">
            <span v-if="options.length">
                <p
                    v-for="(option, i) in options" 
                    :key="i"
                    @click="selectOption(option)" 
                    class="option py-2 px-4 cursor-pointer"
                    :class="$isDark ? 'hover:bg-[#111] hover:bg-opacity-[0.5] text-white hover:text-white' : 'hover:bg-[#efefef] main-color-black'"
                    >
                    {{ $t(option.title) }}
                </p>
                <div class="flex w-full mt-1" v-if="optionsPagination">

                    <button class="w-full px-[5px] py-[5px] ml-1 bg-[#2597DE] text-white"
                    :class="optionsPagination.pagination.page > 1 ? '' : 'bg-[#D2D6DF]'" 
                    :disabled="!(optionsPagination.pagination.page > 1)"
                    @click="prevPage()">Предыдущий</button>

                    <button class="w-full px-[5px] py-[5px] mx-1 bg-[#2597DE] text-white"
                     :class="optionsPagination.pagination.page != optionsPagination.pagination.total ?  '' : 'bg-[#D2D6DF]'"
                      :disabled="!(optionsPagination.pagination.page != optionsPagination.pagination.total)"
                    @click="nextPage()">Следующие</button>

                </div>
            </span>
            <span v-else class="w-full h-[200px] flex items-center justify-center">
                <img class="w-[70px]" src="../../assets/images/no-data.png" alt="image">
            </span>
        </div>
        
    </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
export default ({
    props: ['options', 'classes', 'placeholder', 'selectedElement', 'readonly', 'clearSelection', 'optionsPagination'],
    setup(props, { emit }) {
        let optionVisible = ref(false)
        const selectRef = ref(null)
        let selectedElem = ref('')

        const openSelect = (e) => {
            if (e.target === selectRef.value) {
                optionVisible.value = !optionVisible.value
            } else {
                optionVisible.value = false
            }
        }

        const selectOption = (option) => {
            emit("select", option)
            selectedElem.value = option.title
        }
        
        watch(props, (value) => {
            if(value.clearSelection){
                selectedElem.value = ''
            }
        })

        const prevPage = () => {
            props.optionsPagination.pagination.page--;
            emit("refresh", props.optionsPagination)
        }
        
        const nextPage = () => {
            props.optionsPagination.pagination.page++; 
            emit("refresh", props.optionsPagination)
        }
        

        onMounted(() => {
            window.addEventListener("click", openSelect);
        });

        return {
            optionVisible,
            selectRef,
            selectOption,
            selectedElem,
            prevPage,
            nextPage,
        }
    }
})
</script>

<style scoped>
.v-select {
    position: relative;
}
</style>