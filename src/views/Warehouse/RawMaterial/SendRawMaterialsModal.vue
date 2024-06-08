<template>
   <Modal :isModalActive="isModalActive" @close="toggleModal" width="w-[430px]" @submitModal="onSubmit">

    <template v-slot:modalHeader>
      <h3 class="text-lg font-medium text-center main-color-black dark:text-white">
        {{$t('movement')}}
      </h3>
    </template>

    <template v-slot:modalBody>
      <div class="mt-4 space-y-7">
        <div class="relative">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="@/assets/icons/allMoney.svg"
            alt="user"
          />
          <Datepicker :inputClassName="`datepicker ${$isDark ? 'dark' : 'light'}`" menuClassName="dp-custom-menu" calendarClassName="dp-custom-calendar"
           v-model="form.created_at" :placeholder="$t('date')"
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
          <vue-select :options="optionsWhere" @select="(option) => form.factory = option.id" :clearSelection="clearSelection"
          classes="main-color-black pl-11 dark:border-[#1a283a]" :placeholder="$t('factory_select')" />
          <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.factory.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
        </div>


        <div class="relative">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="@/assets/icons/number-icon.svg"
            alt="user"
          />
          <vue-select :options="productsList" name="title" @select="(option) => form.storage_id = option.id"
          classes="main-color-black pl-11 dark:border-[#1a283a]" :optionsPagination="params" :clearSelection="clearSelection"
          @refresh="getStoreList($event)" :placeholder="$t('raw_material_select')" />
          <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.storage_id.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
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
            class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg
           "
            :class="$isDark ? 'dark' : 'light'"
          />
          <label for="text" class="label-name">
            <span class="content-name">{{$t('amount')}}</span>
          </label>
          <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.amount.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
        </div>


      </div>
    </template>
  </Modal>
</template>

<script>



// ========================= IMPORTS_SECTION START =========================
import { getCurrentInstance } from "vue";
import { onMounted, ref, computed, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification'

import PlusIcon from "@/assets/iconsVue/PlusIcon.vue";
import Modal from "@/components/base/Modal.vue";
import Notification from "@/components/base/Notification.vue";
import SunIcon from "@/assets/iconsVue/SunIcon.vue";
import Dropdown from "@/components/base/Dropdown.vue";
import MoonIcon from "@/assets/iconsVue/MoonIcon.vue";

import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import dayjs from 'dayjs'

import { factoryIncomeStore } from '@/store/modules/FactoryIncome.js'
import { productIncomeToStore } from '@/store/modules/pages/Warehouse'
// ========================= IMPORTS_SECTION END =========================



export default {
    props: {
        isModalActive: {
            type: [Boolean],
            required: true,
        }
    },
    components: {


        // ========================= COMPONENTS_DEFINE_SECTION START =========================
        PlusIcon,
        Modal,
        Notification,
        SunIcon,
        Dropdown,
        MoonIcon,
        // ========================= COMPONENTS_DEFINE_SECTION END =========================



    },
    setup(props) {




        // ========================= PRIMARY_DATA_SECTION START =========================
        const instance = getCurrentInstance();
        const { t, locale } = useI18n()
        const toast = useToast()

        const warehouseStorage = productIncomeToStore()
        const factoryIncomeStorage = factoryIncomeStore()

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

        let form = ref({
          storage_id: '',
          factory: '',
          amount: null,
          created_at: '',
        })
        // ========================= PRIMARY_DATA_SECTION END =========================






        // ========================= VALIDATION_SECTION START =========================
        const rules = computed(() => {
          return {
            storage_id: {
              required: helpers.withMessage('Пожалуйста, выберите сырьё', required)
            },
            factory: { 
              required: helpers.withMessage('Пожалуйста, выберите цех', required)
            },
            amount: { 
              required: helpers.withMessage('Пожалуйста, введите кол-во', required)
            },
            created_at: {
              required: helpers.withMessage('Пожалуйста, выберите дату', required)
            }
          }
        })
        const validate = useVuelidate(rules, form)
        // ========================= VALIDATION_SECTION END =========================






     
        // ========================= GET_SECTION START =========================
        const getStoreList = async () => {
          isError.value = false
          isLoading.value = true
          const data = {
              sort_key: 'created_at',
              sort_type: 'desc',
              per_page: 10, 
              page: params.value.pagination.page, 
              product_category_id: 6,
              storage_type: 'raw',
              product_case: 'raw'
          }
          await warehouseStorage.GET_RAW_MATERIALS_STORAGE(data).then(response => {
            productsList.value = response.data.data.data.map(item => {
              return {
                title: item.product[`name_${locale.value}`],
                ...item
              }
            })
            params.value.totalCount = response.data.data.total
            params.value.pagination.total = response.data.data.total > 9 ? Math.ceil(response.data.data.total / 10) : 1
          }) 
          .catch(() => {
          })
          .finally(() => {
            isLoading.value = false
          })
        }
        // ========================= GET_SECTION END =========================







        // ========================= WATCH_SECTION START =========================
        watch(props, (value) => {
          if(value){
            form.value.created_at = dayjs(new Date).format('YYYY-MM-DD HH:mm:ss')
          }
        })
        // ========================= WATCH_SECTION END =========================






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







        // ========================= ON_SUBMIT_SECTION START =========================
        const onSubmit = async() => {
          clearSelection.value = true

          const result = await validate.value.$validate()
          form.value.created_at = form.value.created_at ? dayjs(form.value.created_at).format('YYYY-MM-DD HH:mm:ss') : ''
          form.value.amount = Number(form.value.amount.toString().replace(/,/g, ''));
          if (result) {
            await factoryIncomeStorage.CREATE_FACTORY_INCOME(form.value).then((response) => {

              if(response && response.status && response.status == 200){
                form.value = ref({
                  storage_id: '',
                  factory: '',
                  amount: null,
                  created_at: '',
                })
  
                validate.value.$reset()
                toast.success(t('successfully-added'))
                toggleModal()
              }

            })
          }

          clearSelection.value = false
        }
        // ========================= ON_SUBMIT_SECTION END =========================

      


        // ========================= OTHERS_SECTION START =========================
        const optionsWhere = reactive([
          {
              id: 'foam-rubber',
              title: 'Цех производства поролона'
          },
          {
              id: 'curly-cutting',
              title: 'Цех производства фигурной резки'
          },
          {
              id: 'mattress',
              title: 'Цех производства матрасов'
          },
          {
              id: 'pillow',
              title: 'Цех производства подушек'
          },
          {
              id: 'sponge',
              title: 'Цех производства губки'
          },
        ])
        
        const toggleModal = () => {
            instance.parent.setupState.toggleSendFoamModal()
        };

        onMounted(async () => {
          await getStoreList()
        })

        // const handleCreatedAt = (modelData) => {
        //   form.value.created_at = dayjs(modelData).format('YYYY-MM-DD HH:mm:ss')
        // }

        // ========================= OTHERS_SECTION START =========================



        return {
          optionsWhere,
          validate,
          toggleModal,
          locale,
          form,
          // handleCreatedAt,
          productsList,
          onSubmit,

          formatPrice,
          params,
          getStoreList,
          clearSelection,
        };
    }
}
</script>

<style>

</style>