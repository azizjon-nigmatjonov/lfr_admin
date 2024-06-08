<template>
   <Modal :isModalActive="isModalActive" @close="toggleModal" width="w-[870px]" @submitModal="onSubmit">

    <template v-slot:modalHeader>
      <h3 class="text-lg font-medium text-center main-color-black dark:text-white">
        {{$t('curly_cutting_production')}}
      </h3>
    </template>

    <template v-slot:modalBody>

      <div class="mt-4 grid grid-cols-2 gap-y-5 gap-x-5">
        <div class="space-y-5">
          <div class="relative">
            <img
              class="absolute left-4 top-1/2 -translate-y-1/2"
              src="@/assets/icons/allMoney.svg"
              alt="user"
            />
            <Datepicker :inputClassName="`datepicker ${$isDark ? 'dark' : 'light'}`" menuClassName="dp-custom-menu" calendarClassName="dp-custom-calendar" 
            v-model="form.created_at" :placeholder="$t('date')" readonly @update:modelValue="handleCreatedAt"
            :locale="locale == 'ru' ? 'ru' : 'uz'"
            :cancelText="locale == 'ru' ? 'Отмена' : 'Bekor qilish'"
            :selectText="locale == 'ru' ? 'ОК' : 'Tanlash'"></Datepicker>
            <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.created_at.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
          </div>
          <div class="relative">
            <img
              class="absolute left-4 top-1/2 -translate-y-1/2"
              src="@/assets/icons/number-icon.svg"
              alt="user"
            />
            <vue-select :options="productsList" @select="(option) => form.product_id = option.id" classes="main-color-black pl-11" 
            :optionsPagination="params" @refresh="getProducts($event)" :clearSelection="clearSelection"
            :placeholder="$t('product')" />
            <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.product_id.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
          </div>
          <div class="form-input-anim relative" :class="$isDark ? 'dark' : ''">
            <img
              class="absolute left-4 top-1/2 -translate-y-1/2"
              src="@/assets/icons/allMoney.svg"
              alt="user"
            />
            <input
              v-model="form.amount"
              @input="formatPrice(form.amount, 'amount')" 
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
            <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.amount.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
          </div>
        </div>

        <!-- <hr> -->
        <div class="flex flex-col gap-5 max-h-[380px] overflow-y-scroll pr-2">
          <div class="relative flex" v-for="(item, index) in order_raw_foam" :key="index">
            <img
              class="absolute left-4 top-1/2 -translate-y-1/2"
              src="@/assets/icons/allMoney.svg"
              alt="user"
            />
            <input
              v-model="item.title"
              @click="openRawAddModal(index)"
              type="text"
              name="text"
              autocomplete="off"
              required
              :placeholder="$t('raw_material_select')"
              class=" w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
            />

            <div class="flex align-center justify-end " v-if="order_raw_foam.length == (index + 1)">
              <button
                @click="addRawMaterials()"
                class="w-[60px] rounded-[12px] h-auto ml-2 bg-[#2597DE] text-2xl flex items-center justify-center text-white text-center hover:bg-opacity-80 duration-200"
              >
              +
              </button>
            </div>
          
            <div class="flex align-center justify-end " v-if="order_raw_foam.length != index + 1">
              <button
                @click="removeRawMaterials(index)"
                class="mainBackgroundColorRed w-[60px] h-auto ml-2 text-2xl flex rounded-[12px] items-center justify-center text-white text-center hover:bg-opacity-80 duration-200"
              >
              -
              </button>
            </div>
          </div>
        </div>


      </div>


      <rawMaterialAddModal :isRawAddModalActive="isRawAddModalActive"/>
    </template>
  </Modal>
</template>

<script>
import { onMounted, ref, computed, watch, getCurrentInstance } from 'vue';
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
import { required, helpers } from '@vuelidate/validators'
import dayjs from 'dayjs'

import { orderStore } from '@/store/modules/Order.js'
import { codebaseStore } from '@/store/modules/pages/Codebase.js'
import rawMaterialAddModal from './rawMaterialAddModal.vue'

export default {
    props: {
        isModalActive: {
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
        rawMaterialAddModal,
    },
    setup(props) {
        const instance = getCurrentInstance();
        const { t, locale } = useI18n()
        const toast = useToast()

        const orderStorage = orderStore()
        const { order_raw_foam, rawAddModalIndex } = storeToRefs(orderStorage)

        const storage = codebaseStore()

        const isLoading = ref(false)
        const isError = ref(false)
        let clearSelection = ref(false)
        const productsList = ref([])


        
        const params = ref({
          currentTable: 'income',
          totalCount: 0,
          pagination: {
            page: 1,
            total: 0,
            limit: 10
          }
        })






        const form = ref({
          product_id: '',
          factory: 'curly-cutting',
          unit: "m3",
          amount: 0,
          created_at: '',
          order_extra_products: []
        })

        const rules = computed(() => {
            return {
                created_at: {
                  required: helpers.withMessage('Пожалуйста, выберите дату', required)
                },
                product_id: {
                    required: helpers.withMessage('Пожалуйста, выберите продукт', required)
                },
                amount: {
                    required: helpers.withMessage('Пожалуйста, введите кол-во', required)
                }
            }
        })
        const validate = useVuelidate(rules, form)

        const isRawAddModalActive = ref(false);
      
      




        function openRawAddModal(index){
          rawAddModalIndex.value = index
          isRawAddModalActive.value = true
        }
        
        function addRawMaterials(){
          order_raw_foam.value.push({id: 1, factory_product_id: '', amount: ''})
        }
        
        function removeRawMaterials(index){
          order_raw_foam.value.splice(index, 1);
        }
        
      
        const toggleModal = () => {
            instance.parent.setupState.toggleModal()
        };

        const toggleRawAddModal = () => {
            isRawAddModalActive.value = !isRawAddModalActive.value
        };




        // // ========== PRICE_FORMATTER START ==========
        // function formatPrice(value, type){
        //   if(value){
        //     let currency = value.toString().replace(/,/g, '');
        //     currency = parseFloat(currency);
        //     currency = new Intl.NumberFormat('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2}).format(currency);
        
        //     if(type == 'amount'){
        //       form.value.amount = currency
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
                  form.value.amount = currency
                }

              }, 1000)
            }else{
              currency = parseFloat(currency);
              currency = new Intl.NumberFormat('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2}).format(currency);
          
              if(type == 'amount'){
                form.value.amount = currency
              }

            }
          }
          return 0;
        }
        // ========== PRICE_FORMATTER END ==========



     
        // const getStoreList = async () => {
        //   isError.value = false
        //   isLoading.value = true
        //   const data = {
        //       sort_key: 'created_at',
        //       sort_type: 'desc',
        //       per_page: 10, 
        //       page: params.value.pagination.page, 
        //       factory: 'foam-rubber',
        //       product_case: 'raw'
        //   }
        //   await factoryProductStorage.GET_FACTORY_PRODUCT(data).then(response => {
        //     if(response.status == 200){
        //       productsList.value = response.data.data.data
        //       productsList.value.forEach((elem) => {
        //         elem.title = elem.product['name_' + locale.value]
        //       })
        //     }

        //     params.value.totalCount = response.data.data.total
        //     params.value.pagination.total = response.data.data.total > 9 ? Math.ceil(response.data.data.total / 10) : 1
        //   }) 
        //   .catch(() => {
        //     isError.value = true
        //   })
        //   .finally(() => {
        //     isLoading.value = false
        //   })
        // }




        const getProducts = async () => {
          isError.value = false
          isLoading.value = true
          const data = {
            product_category_id: 5,
            page: params.value.pagination.page,
            per_page: params.value.pagination.limit,
            // code: route.query.search_code ? route.query.search_code : '',
            // name_ru: route.query.search_name ? route.query.search_name : ''
          }

          await storage.GET_PRODUCTS(data).then(response => {
            if(response.status == 200){
              productsList.value = response.data.data.data
              productsList.value.forEach((elem) => {
                elem.title = elem['name_' + locale.value]
              })

              params.value.pagination.total = response.data.data.total > 9 ? Math.ceil(response.data.data.total / 10) : 1
            }
          })
          .catch(() => {
            isError.value = true
          })
          .finally(() => {
            isLoading.value = false
          })
        }




        const onSubmit = async() => {
          clearSelection.value = true

          const result = await validate.value.$validate()
          form.value.created_at = form.value.created_at ? dayjs(form.value.created_at).format('YYYY-MM-DD HH:mm:ss') : ''
          form.value.amount = Number(form.value.amount.toString().replace(/,/g, ''));
          let order_extra_products = order_raw_foam.value.filter((item) => item.factory_product_id != '')
          order_extra_products.forEach(elem => {
            elem.amount = Number(elem.amount.toString().replace(/,/g, ''));
          })
          if (result) {
            await orderStorage.CREATE_ORDER({...form.value, order_extra_products: order_extra_products}).then((response) => {

              if(response && response.status && response.status == 200){
                form.value.product_id = ''
                form.value.factory = 'curly-cutting'
                form.value.unit = 'm3'
                form.value.amount = 0
                form.value.created_at = ''
  
                validate.value.$reset()
                toast.success(t('successfully-added'))
                instance.parent.setupState.handleCreatNewAction()
                toggleModal()
              }

            })
          }

          clearSelection.value = false
        }

        watch(props, (value) => {
          if(value){
            form.value.created_at = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
          }
        })

        onMounted(async () => {
          await getProducts()
        })

        const handleCreatedAt = (modelData) => {
          form.value.created_at = dayjs(modelData).format('YYYY-MM-DD HH:mm:ss')
        }


        return {
          isRawAddModalActive,
          toggleModal,
          toggleRawAddModal,
          validate,

          addRawMaterials,
          removeRawMaterials,

          openRawAddModal,
          locale,
          clearSelection,



          form,
          handleCreatedAt,
          productsList,
          onSubmit,


          order_raw_foam,

          formatPrice,
          params,
          getProducts,
        };
    }
}
</script>

<style>

</style>