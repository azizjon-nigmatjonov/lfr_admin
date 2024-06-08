<template>
   <Modal :isModalActive="isModalActive" @close="toggleModal" @submitModal="submitModal" :width="modalWidth">
    <template v-slot:modalHeader>
      <h3 class="text-lg font-medium text-center main-color-black dark:text-white">
        {{$t('sale')}}
      </h3>
    </template>

    <template v-slot:modalBody>
      <div class="mt-4 grid grid-cols-2 gap-y-5 gap-x-5">
        <div class="space-y-5">
          <div class="flex justify-between">
            <div class="relative py-[14px] px-[24px] w-1/2 pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg flex justify-between">
              <img
                class="absolute left-4 top-1/2 -translate-y-1/2"
                src="@/assets/icons/allMoney.svg"
                alt="user"
              />
              <span>{{$t('export')}}</span>
              <input type="radio" value="export" name="type" v-model="form.type" class="w-4 ml-5">
            </div>
            <div class="relative py-[14px] px-[24px] w-1/2 ml-2 pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg flex justify-between">
              <img
                class="absolute left-4 top-1/2 -translate-y-1/2"
                src="@/assets/icons/allMoney.svg"
                alt="user"
              />
              <span>{{$t('local')}}</span>
              <input type="radio" value="local" name="type" v-model="form.type" class="w-4 ml-5">
            </div>
        </div>
        <div class="relative">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="@/assets/icons/allMoney.svg"
            alt="user"
          />
          <Datepicker :inputClassName="`datepicker ${$isDark ? 'dark' : 'light'}`" menuClassName="dp-custom-menu"
          calendarClassName="dp-custom-calendar" v-model="form.created_at" :placeholder="$t('date')"
          :locale="locale == 'ru' ? 'ru' : 'uz'" readonly="true" @update:modelValue="handleCreatedAt"
          :cancelText="locale == 'ru' ? 'Отмена' : 'Bekor qilish'"
          :selectText="locale == 'ru' ? 'ОК' : 'Tanlash'"></Datepicker>
        </div>

        <div class="form-input-anim relative" :class="$isDark ? 'dark' : ''">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="@/assets/icons/number-icon.svg"
            alt="user"
          />
          <input
            type="text"
            name="text"
            autocomplete="off"
            required
            v-model="clientNum"
            class=" w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
          />
          <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.customer_id.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
          <label for="text" class="label-name">
            <span class="content-name">{{$t('client_number')}}</span>
          </label>
        </div>
        <div class="form-input-anim relative" :class="$isDark ? 'dark' : ''">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="@/assets/icons/baseIcons/user-square-2.svg"
            alt="user"
          />
          <input
            type="text"
            name="text"
            autocomplete="off"
            required
            v-model="clientName"
            class=" w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
          />
          <!-- <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.currency.$errors" :key="error.$uid">{{ $t(error.$message) }}</p> -->
          <label for="text" class="label-name">
            <span class="content-name">{{$t('customers_fullname')}}</span>
          </label>
        </div>
        <div class="form-input-anim relative" :class="$isDark ? 'dark' : ''">
         <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="@/assets/icons/phone.svg"
            alt="user"
          />
          <input
            type="text"
            name="text"
            autocomplete="off"
            required
            v-model="clientPhone"
            class=" w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
          />
          <!-- <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.currency.$errors" :key="error.$uid">{{ $t(error.$message) }}</p> -->
          <label for="text" class="label-name">
            <span class="content-name">{{$t('client_phone_number')}}</span>
          </label>
        </div>


        
        <div class="form-input-anim relative" :class="$isDark ? 'dark' : ''">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="@/assets/icons/allMoney.svg"
            alt="user"
          />
          <input
            type="text"
            name="text"
            autocomplete="off"
            required
            @input="formatPrice(form.paid, 'paid')"
            onkeypress="return /[0-9,/.]/i.test(event.key)"
            v-model="form.paid"
            class=" w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
          />
          <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.paid.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
          <label for="text" class="label-name">
            <span class="content-name">{{$t('amount_given')}}</span>
          </label>
        </div>
       
        <div class="form-input-anim relative" :class="$isDark ? 'dark' : ''" v-if="form.currency == 840 || form.currency == 978">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="../../assets/icons/baseIcons/trend-up.svg"
            alt="user"
          />
          <input
            type="text"
            name="text"
            autocomplete="off"
            required
            @input="formatPrice(form.current_currency, 'current_currency')"
            onkeypress="return /[0-9,/.]/i.test(event.key)"
            v-model="form.current_currency"
            class=" w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
          />
          <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.current_currency.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
          <label for="text" class="label-name">
            <span class="content-name">{{$t('current_currency')}}</span>
          </label>
        </div>

        <div class="relative">
          <img
              class="absolute left-4 top-1/2 -translate-y-1/2"
              src="../../assets/icons/baseIcons/curency.svg"
              alt="user"
          />
          <vue-select :options="currensies" :placeholder="$t('currency')" @select="(option) => form.currency = option.id" />
          <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.currency.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
        </div>
      

        
        </div>
        <div class="flex flex-col gap-5 max-h-[380px] overflow-y-scroll pr-2">
          <div class="relative flex" v-for="(item, index) in sale_products" :key="index">
            <img
              class="absolute left-4 top-1/2 -translate-y-1/2"
              src="@/assets/icons/allMoney.svg"
              alt="user"
            />
            <input
              :value="getSaleProductFormattedValue(item)"
              @click="toggleItemSellAddModal(item, index)"
              type="text"
              name="text"
              autocomplete="off"
              required
              :placeholder="$t('product_select')"
              class=" w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
            />

            <div class="flex align-center justify-end " v-if="sale_products.length == (index + 1)">
              <button
                @click="addProducts()"
                class="w-[60px] rounded-[12px] h-auto ml-2 bg-[#2597DE] text-2xl flex items-center justify-center text-white text-center hover:bg-opacity-80 duration-200"
              >
              +
              </button>
            </div>
          
            <div class="flex align-center justify-end " v-if="sale_products.length != index + 1">
              <button
                @click="removeProducts(index)"
                class="mainBackgroundColorRed w-[60px] h-auto ml-2 text-2xl flex rounded-[12px] items-center justify-center text-white text-center hover:bg-opacity-80 duration-200"
              >
              -
              </button>
            </div>
          </div>
        </div>
      </div>
      <itemSellAddModal :isModalActive="isItemSellAddModalActive" @closeModal="toggleItemSellAddModal" :sale_product_item="sale_product_item"/>
    </template>
  </Modal>
</template>

<script>
import { ref, reactive, computed, getCurrentInstance, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from 'vue-i18n';
import PlusIcon from "@/assets/iconsVue/PlusIcon.vue";
import Modal from "@/components/base/Modal.vue";
import Notification from "@/components/base/Notification.vue";
import SunIcon from "@/assets/iconsVue/SunIcon.vue";
import Dropdown from "@/components/base/Dropdown.vue";
import MoonIcon from "@/assets/iconsVue/MoonIcon.vue";
import vueSelect from '@/components/base/v-select.vue'

import itemSellAddModal from './itemSellAddModal.vue'
import { suppliersStore } from '@/store/modules/pages/Suppliers';
import { salesStore } from '@/store/modules/pages/Sales.js'
import { mainStore } from '@/store/main'
import { useToast } from 'vue-toastification'
import dayjs from 'dayjs';
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { storeToRefs } from 'pinia'
 

export default {
    props: {
        isModalActive: {
            type: [Boolean],
            required: true,
        },
        modalWidth: {
            type: [Number, String],
            required: false,
        },
    },
    components: {
        PlusIcon,
        Modal,
        Notification,
        SunIcon,
        Dropdown,
        MoonIcon,
        itemSellAddModal,
        vueSelect
    },
    setup(props) {
        const mainStorage = mainStore()
        const suppliersStorage = suppliersStore()
        const salesStorage = salesStore()
        const { sale_products, saleProductIndex } = storeToRefs(salesStorage)
        
        const instance = getCurrentInstance();
        const router = useRouter();
        const route = useRoute();
        const { t, locale } = useI18n()
        const toast = useToast()


        let clearSelection = ref(false)

    


        
        //================= VARIABLES START =================
        let today = new Date()
        const dateTime = ref(today);
        const clientNum = ref();
        const clientName = ref();
        const clientPhone = ref();
        const sale_product_item = ref();


        let _timerId = 0;

        let form = ref({
          type: 'local',
          customer_id: '',
          created_at: '',
          currency: 840,
          current_currency: '',
          paid: '',
          payment_type: "prepayment",
          sale_products: []
        })
        //================= VARIABLES END =================

     




     

        watch(clientNum, async (newValue, prevValue) => {
          if(newValue){
            
            clearTimeout(_timerId)
            _timerId = setTimeout(async () => {
                await suppliersStorage.GET_SUPPLIERS_OR_CUSTOMERS_LIST({type: 'customer', number: newValue}).then(response => {
                  let element = response.data.data.data.find(item => item.number == newValue);
                  
                  clientName.value = element?.name
                  clientPhone.value = element.phone

                  form.value.customer_id = element.id
                })
            }, 500)

          }
        })




        const isItemSellAddModalActive = ref(false);

        const toggleItemSellAddModal = (item, index) => {
          saleProductIndex.value = index
          isItemSellAddModalActive.value = !isItemSellAddModalActive.value
          sale_product_item.value = item
        };

        
      



        const rules = computed(() => {
            return {
                customer_id: {
                    required: helpers.withMessage('Пожалуйста, выберите поставщика', required)
                },
                paid: {
                    required: helpers.withMessage('Пожалуйста, введите выплаченную сумму', required)
                },
                currency: {
                  required: helpers.withMessage('Пожалуйста, выберите валюту', required)
                },
                current_currency: {
                  required: helpers.withMessage('Пожалуйста, выберите кол-во', required)
                },
            }
        })
        const validate = useVuelidate(rules, form, { $scope: false })

        const currensies = ref([
            {
                title: 'UZS',
                id: '860',
            },
            {
                title: 'USD',
                id: '840'
            },
            {
                title: 'EUR',
                id: '978'
            }
        ])



        

        // // ========== PRICE_FORMATTER START ==========
        // function formatPrice(value, type){
        //   if(value){
        //     let currency = value.toString().replace(/,/g, '');
        //     currency = parseFloat(currency);
        //     currency = new Intl.NumberFormat('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2}).format(currency);
        
        //     if(type == 'paid'){
        //       form.value.paid = currency
        //     }else if(type == 'current_currency'){
        //       form.value.current_currency = currency
        //     }
        //   }
        //   return 0;
        // }
        // // ========== PRICE_FORMATTER END ==========


        let _timerId2 = 0;

        // ========== PRICE_FORMATTER START ==========
        function formatPrice(value, type){
          if(value && value != ''){
            let currency = value.toString().replace(/,/g, '');
            if(currency.includes('.')){

              clearTimeout(_timerId2)
              _timerId2 = setTimeout(async () => {
                currency = parseFloat(currency);
                currency = new Intl.NumberFormat('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2}).format(currency);

                if(type == 'paid'){
                  form.value.paid = currency
                }else if(type == 'current_currency'){
                  form.value.current_currency = currency
                }


              }, 1000)
            }else{
              currency = parseFloat(currency);
              currency = new Intl.NumberFormat('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2}).format(currency);
          
              if(type == 'paid'){
                form.value.paid = currency
              }else if(type == 'current_currency'){
                form.value.current_currency = currency
              }

            }
          }
          return 0;
        }
        // ========== PRICE_FORMATTER END ==========









        function getSaleProductFormattedValue(item){
          let value = '';
          if(item.product_title && item.cube && item.amount){
            value = item.product_title + ' - ' + item.cube + 'м3 - ' + item.amount + 'шт'
          }
          return value
        }




        const submitModal = async() => {
          clearSelection.value = true

          if(form.value.currency == '860'){
            form.value.current_currency = 0;
          }
          let result = await validate.value.$validate()
          form.value.created_at = dayjs(form.value.created_at).format('YYYY-MM-DD HH:mm:ss');
          form.value.paid = Number(form.value.paid.toString().replace(/,/g, ''));
          form.value.currency = Number(form.value.currency.toString().replace(/,/g, ''));
          form.value.current_currency = Number(form.value.current_currency.toString().replace(/,/g, ''));
          form.value.sale_products = sale_products.value.filter((elem) => {
            if(elem.id != 0){
              return elem
            }
          })


          if(result){
            await salesStorage.CREATE_SALE(form.value).then((response) => {

              if(response && response.status && response.status == 200){
                form.value.customer_id = null
                form.value.paid = ''
                form.value.currency = 840
                form.value.current_currency = ''
                form.value.created_at = ''


                clientNum.value = ''
                clientName.value = ''
                clientPhone.value = ''

                sale_products.value = [{id: 0, title: '', amount: ''}]

                
                validate.value.$reset()
                salesStorage.refreshSales = true
                toast.success(t('successfully-added'))
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


        const handleCreatedAt = (modelData) => {
          form.value.created_at = dayjs(modelData).format('YYYY-MM-DD HH:mm:ss')
        }


        const toggleModal = () => {
            instance.parent.setupState.toggleSoldModal()
        };


        function addProducts(){
          sale_products.value.push({id: 0, title: '', amount: ''})
        }
        
        function removeProducts(index){
          sale_products.value.splice(index, 1);
        }
        

        return {
            clientNum,
            clientName,
            clientPhone,
            sale_product_item,


            dateTime,
            form,


            toggleModal,

            isItemSellAddModalActive,
            toggleItemSellAddModal,

            addProducts,
            removeProducts,

            locale,




            validate,
            form,
            currensies,

            submitModal,
            handleCreatedAt,

            formatPrice,

            clearSelection,
            sale_products,

            getSaleProductFormattedValue,
        };
    }
}
</script>

<style>

</style>