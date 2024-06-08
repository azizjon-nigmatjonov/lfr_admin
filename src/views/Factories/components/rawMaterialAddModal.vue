<template>
   <Modal :isModalActive="isRawAddModalActive" @close="toggleModal" width="w-[430px]" @submitModal="onSubmit">

    <template v-slot:modalHeader>
      <h3 class="text-lg font-medium text-center main-color-black dark:text-white">
        {{$t('raw_material_select')}}
      </h3>
    </template>

    <template v-slot:modalBody>
      <div class="mt-4 space-y-4">
        
        <!-- <div class="relative">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="@/assets/icons/allMoney.svg"
            alt="user"
          />
          <vue-select :options="categoriesList" @select="getStoreList($event)" :placeholder="$t('product_category')" classes="main-color-black pl-11" />
        </div> -->



        <div class="relative">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="@/assets/icons/allMoney.svg"
            alt="user"
          />
          <vue-select :options="productsList" @select="productSelect($event)" classes="main-color-black pl-11" 
          :optionsPagination="params" @refresh="getStoreList($event)" :clearSelection="clearSelection"
          :placeholder="$t('raw_material_type')" />
        </div>
        <div class="form-input-anim relative" :class="$isDark ? 'dark' : ''">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="@/assets/icons/allMoney.svg"
            alt="user"
          />
          <input
            v-model="order_raw_foam[rawAddModalIndex].amount"
            @input="formatPrice(order_raw_foam[rawAddModalIndex].amount, 'amount')" 
            onkeypress="return /[0-9,/.]/i.test(event.key)"
            type="text"
            name="text"
            autocomplete="off"
            required
            class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg" :class="$isDark ? 'dark' : 'light'"
          />
          <label for="text" class="label-name">
            <span class="content-name">{{$t('amount')}}</span>
          </label>
        </div>



        <!-- <div class="relative">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="@/assets/icons/allMoney.svg"
            alt="user"
          />
          <vue-select :options="productsList" @select="productSelect($event)" classes="main-color-black pl-11" 
          :placeholder="$t('units')" />
        </div> -->


      </div>
    </template>
  </Modal>
</template>

<script>
import { onMounted, ref, computed, getCurrentInstance, watch } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification'
import { storeToRefs } from 'pinia'


import PlusIcon from "@/assets/iconsVue/PlusIcon.vue";
import Modal from "@/components/base/Modal.vue";
import Notification from "@/components/base/Notification.vue";
import SunIcon from "@/assets/iconsVue/SunIcon.vue";
import Dropdown from "@/components/base/Dropdown.vue";
import MoonIcon from "@/assets/iconsVue/MoonIcon.vue";


import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import dayjs from 'dayjs'

import { orderStore } from '@/store/modules/Order.js'
import { factoryProductStore } from '@/store/modules/FactoryProduct.js'

export default {
    props: {
        isRawAddModalActive: {
            type: [Boolean],
            required: true,
        }
    },
    components: {
        PlusIcon,
        Modal,
        Notification,
        SunIcon,
        Dropdown,
        MoonIcon,

    },
    setup(props) {
        const instance = getCurrentInstance();
        const router = useRouter();
        const route = useRoute();
        const { t, locale } = useI18n()
        const toast = useToast()
        const datePicker = ref();

        const orderStorage = orderStore()
        const { order_raw_foam, rawAddModalIndex } = storeToRefs(orderStorage)


        const factoryProductStorage = factoryProductStore()

        const isLoading = ref(false)
        const isError = ref(false)
        const productsList = ref([])
        let clearSelection = ref(false)

        
        const params = ref({
          currentTable: 'income',
          totalCount: 0,
          pagination: {
            page: 1,
            total: 0,
            limit: 10
          }
        })

        // const form = ref({
        //   factory_product_id: '',
        //   unit: "m3",
        //   amount: '',
        // })





        // // ========== PRICE_FORMATTER START ==========
        // function formatPrice(value, type){
        //   if(value){
        //     let currency = value.toString().replace(/,/g, '');
        //     currency = parseFloat(currency);
        //     currency = new Intl.NumberFormat('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2}).format(currency);
        
        //     if(type == 'amount'){
        //       order_raw_foam.value[rawAddModalIndex.value].amount = currency
        //     }
        //   }
        //   return 0;
        // }
        // // ========== PRICE_FORMATTER END ==========
        

        let _timerId = 0;

        // ========== PRICE_FORMATTER START ==========
        function formatPrice(value, type){
          if(value && value != ''){
            let currency = value.toString().replace(/,/g, '');
            if(currency.includes('.')){

              clearTimeout(_timerId)
              _timerId = setTimeout(async () => {
                currency = parseFloat(currency);
                currency = new Intl.NumberFormat('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2}).format(currency);

                if(type == 'amount'){
                  order_raw_foam.value[rawAddModalIndex.value].amount = currency
                }

              }, 1000)
            }else{
              currency = parseFloat(currency);
              currency = new Intl.NumberFormat('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2}).format(currency);
          
              if(type == 'amount'){
                order_raw_foam.value[rawAddModalIndex.value].amount = currency
              }

            }
          }
          return 0;
        }
        // ========== PRICE_FORMATTER END ==========



        
        const toggleModal = () => {
          instance.parent.parent.setupState.toggleRawAddModal()

          // order_raw_foam.value[rawAddModalIndex.value].factory_product_id = ''
          // order_raw_foam.value[rawAddModalIndex.value].title = ''
          // order_raw_foam.value[rawAddModalIndex.value].amount = ''
        };


        const onSubmit = () => {
          clearSelection.value = true

          instance.parent.parent.setupState.toggleRawAddModal()

          setTimeout(() => {
            clearSelection.value = false
          }, 500)
        };

        watch(() => props.isRawAddModalActive, async (newValue) => {
          if(newValue){
            await getStoreList()
          }
        });


        const getProductCategories = async() => {
          // await codebaseStorage.GET_PRODUCT_CATEGORIES().then(response => {
          //   categoriesList.value = response.data.data.map(item => {
          //     return {
          //       title: item[`name_${locale.value}`],
          //       ...item
          //     }
          //   })
          // })
        }


        // const categorySelected = async (option) => {
        //   const data = {
        //     product_category_id: option.id,
        //     page: params.value.pagination.page,
        //     per_page: params.value.pagination.limit,
        //     // code: route.query.search_code ? route.query.search_code : '',
        //     // name_ru: route.query.search_name ? route.query.search_name : ''
        //   }
        //   await codebaseStorage.GET_PRODUCTS(data).then(response => {
        //     productsList.value = response.data.data.data.map(item => {
        //       return {
        //         title: item[`name_${locale.value}`],
        //         ...item
        //       }
        //     })
        //   })
        // }




        const getStoreList = async () => {
          isError.value = false
          isLoading.value = true
          let data = {
              sort_key: 'created_at',
              sort_type: 'desc',
              per_page: 10, 
              page: params.value.pagination.page, 
              factory: '',
              product_case: 'raw'
          }

          if(route.path == '/mattress'){
            data.factory = 'mattress'
          }else if(route.path == '/pillow-factory'){
            data.factory = 'pillow'
          }else if(route.path == '/sponge-factory'){
            data.factory = 'sponge'
          }else if(route.path == '/curly-cutting-factory'){
            data.factory = 'curly-cutting'
          }


          
          await factoryProductStorage.GET_FACTORY_PRODUCT(data).then(response => {
            if(response.status == 200){
              productsList.value = response.data.data.data
              productsList.value.forEach((elem) => {
                elem.title = elem.product['name_' + locale.value]
              })
            }

            params.value.totalCount = response.data.data.total
            params.value.pagination.total = response.data.data.total > 9 ? Math.ceil(response.data.data.total / 10) : 1
          }) 
          .catch(() => {
            isError.value = true
          })
          .finally(() => {
            isLoading.value = false
          })
        }

        function productSelect(option){
          order_raw_foam.value[rawAddModalIndex.value].factory_product_id = option.id
          order_raw_foam.value[rawAddModalIndex.value].title = option.title
        }

        onMounted(async () => {
          // await getProductCategories()
        });




        return {
          datePicker,
          toggleModal,
          onSubmit,

          // form,
          productsList,
          rawAddModalIndex,
          order_raw_foam,

          productSelect,
          formatPrice,
          getStoreList,
          params,
          clearSelection,
        };
    }
}
</script>

<style>

</style>