<template>
<div class="table">
    <div class="table__header">
        <div v-if="currantTable == 'table-1'" class="table-1">
            <ul>
                <li v-for="i in 6" key="i">
                    <h3>Admin lavozimi</h3>
                </li>
            </ul>
        </div>
         <div v-if="currantTable == 'table-2'" class="table-2">
            <ul>
                <li v-for="i in 4" key="i">
                    <h3>Admin lavozimi</h3>
                </li>
            </ul>
        </div>
    </div>
    <div class="table__body mt-2">
        <div v-if="currantTable == 'table-1'" class="table-1">
            <ul v-for="(item, index) in 2" :key="index">
                <li>
                    <div class="flex items-center">
                        <div class="mr-5">
                            <img class="w-[42px] h-[42px] rounded-full object-cover" src="../../assets/man.png" alt="image">
                        </div>
                        <div>
                            <h3>Alisher Anvarov</h3>
                            <span class="text-sm text-[#888A8F]">21.02.1981</span>
                        </div>
                    </div>
                </li>
                <li v-for="i in 5" key="i">
                    <h3>Sotuvchi</h3>
                </li>
            </ul>
        </div>

        <div v-if="currantTable == 'table-2'" class="table-2">
            <ul v-for="(item, index) in 5" :key="index">
                <li>
                    <div class="flex items-center">
                        <div class="mr-5">
                            <img class="w-[42px] h-[42px] rounded-full object-cover" src="../../assets/man.png" alt="image">
                        </div>
                        <div>
                            <h3>Alisher Anvarov</h3>
                            <span class="text-sm text-[#888A8F]">21.02.1981</span>
                        </div>
                    </div>
                </li>
                <li v-for="i in 3" key="i">
                    <h3>Sotuvchi</h3>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import {
    ref
} from 'vue'
export default {
    props: ['currantTable'],
    setup() {
        return {

        }
    },
    watch: {
        currantTable: function (newValue, oldValue) {
            // console.log(newValue, oldValue)
        },
    },
}
</script>

<style>

</style>
