<template>
   <Modal :isModalActive="isModalActive" @close="toggleModal" @submitModal="onSubmitModal" width="w-[1000px]">

    <template v-slot:modalHeader>
      <h3 class="text-lg font-medium text-center main-color-black dark:text-white">
        {{$t('product_expense')}}
      </h3>
    </template>

    <template v-slot:modalBody>
      <div class="mt-4 grid grid-cols-2 gap-5">

        <div class="relative flex w-full">
          <div class="w-full">
            <img
              class="absolute left-4 top-1/2 -translate-y-1/2"
              src="@/assets/icons/baseIcons/type.svg"
              alt="user"
            />
            <vue-select :options="categoriesList" @select="categorySelected($event)" :clearSelection="clearSelection" 
            :optionsPagination="params" 
            @refresh="getProductCategories($event)"
            :selectedElement="form.category_title" :placeholder="$t('expense_category')" classes="main-color-black pl-11" />
          </div>
          <!-- <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validateProduct.expense_category_id.$errors" :key="error.$uid">{{ $t(error.$message) }}</p> -->
          <button @click="toggleExpenseCategoryAddModal"
          class="w-[70px] rounded-[12px] h-auto ml-2 bg-[#2597DE] text-2xl flex items-center justify-center 
          text-white text-center hover:bg-opacity-80 duration-200">+
          </button>
        </div>



        <div class="form-input-anim relative" :class="$isDark ? 'dark' : ''">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="@/assets/icons/baseIcons/calculation.svg"
            alt="user"
          />
          <input
            v-model="form.amount"
            @input="formatPrice(form.amount, 'amount')" onkeypress="return /[0-9,/.]/i.test(event.key)"
            autocomplete="off"
            required
            class="mt-1 w-full py-[14px] px-[24px] pl-12 focus:outline-none border-[1.5px] borderBox dark:border-[#1a283a] rounded-[12px] text-lg placeholder"
            :class="$isDark ? 'dark' : 'light'"
          />
          <label for="text" class="label-name">
            <span class="content-name">{{$t('price')}}</span>
          </label>
          <!-- <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validateProduct.amount.$errors" :key="error.$uid">{{ $t(error.$message) }}</p> -->
        </div>
 
   


  



        <div class="form-input-anim relative" :class="$isDark ? 'dark' : ''" v-if="form.currency == 840 || form.currency == 978">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="@/assets/icons/baseIcons/trend-up.svg"
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
          <!-- <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validateProduct.current_currency.$errors" :key="error.$uid">{{ $t(error.$message) }}</p> -->
          <label for="text" class="label-name">
            <span class="content-name">{{$t('current_currency')}}</span>
          </label>
        </div>
        
        <div class="relative">
          <img
              class="absolute left-4 -translate-y-1/2"
              src="@/assets/icons/baseIcons/curency.svg"
              alt="user"
              :class="(form.currency == 860 || form.currency == null) ? 'top-1/3' : 'top-1/2'"
          />
          <vue-select :options="currensies" :placeholder="$t('currency')" @select="(option) => form.currency = option.id"
            :selectedElement="form.currency == 840 ? 'USD' : form.currency == 860 ? 'UZS': form.currency == 978 ? 'EUR' : ''" :clearSelection="clearSelection" />
          <!-- <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validateProduct.currency.$errors" :key="error.$uid">{{ $t(error.$message) }}</p> -->
        </div>


        <div class="form-input-anim relative" :class="$isDark ? 'dark' : ''">
          <img
            class="absolute left-4 top-1/3 -translate-y-1/2"
            src="@/assets/icons/baseIcons/row-horizontal.svg"
            alt="user"
          />
          <textarea
            v-model="form.description"
            autocomplete="off"
            required
            rows="2"
            style="resize:none;"
            class="w-full py-[14px] px-[24px] pl-12 focus:outline-none border-[1.5px] borderBox dark:border-[#1a283a] rounded-[12px] text-lg placeholder"
            :class="$isDark ? 'dark' : 'light'"
          />
          <!-- <input
            v-model="form.description"
            autocomplete="off"
            required
            class="mt-1 w-full py-[14px] px-[24px] pl-12 focus:outline-none border-[1.5px] borderBox dark:border-[#1a283a] rounded-[12px] text-lg placeholder"
            :class="$isDark ? 'dark' : 'light'"
          /> -->
          <label for="text" class="label-name" style="top: -45px !important;">
            <span class="content-name">{{$t('description')}}</span>
          </label>
          <!-- <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validateProduct.description.$errors" :key="error.$uid">{{ $t(error.$message) }}</p> -->
        </div>



      </div>

      <addExpenseCategoryModal :isModalActive="isExpenseCategoryModalActive" @closeModal="toggleExpenseCategoryAddModal"/>
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

import { useToast } from 'vue-toastification'
import dayjs from 'dayjs';
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { storeToRefs } from 'pinia'

import { productIncomeToStore } from '@/store/modules/pages/Warehouse'
import addExpenseCategoryModal from './addExpenseCategoryModal.vue'

export default {
    props: {
        isModalActive: {
            type: [Boolean],
            required: true,
        },
        expense_item: {
            type: [Object, Array],
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
        vueSelect,
        addExpenseCategoryModal

    },
    watch: {
      isModalActive: function (newValue, oldValue) {},
    },
    setup(props, context) {
      const productIncomeStorage = productIncomeToStore()
      const { expense_list, expenseIndex } = storeToRefs(productIncomeStorage)



      const instance = getCurrentInstance();
      const router = useRouter();
      const route = useRoute();
      const { t, locale } = useI18n()
      const toast = useToast()

      let clearSelection = ref(false)


      const params = ref({
        totalCount: 0,
        pagination: {
          page: 1,
          total: 1,
          limit: 10
        }
      });




 
    
      const toggleModal = () => {
        context.emit('closeModal')
      };
      

      const categoriesList = ref([])


      let form = ref({
        expense_category_id: '',
        category_title: '',
        amount: '',
        currency: 840,
        current_currency: '',
      })


      const rules = computed(() => {
          return {
              expense_category_id: {
                  required: helpers.withMessage('Пожалуйста, выберите категорию расхода', required)
              },
              amount: {
                  required: helpers.withMessage('Пожалуйста, введите стоимость', required)
              },
              description: {
                required: helpers.withMessage('Пожалуйста, введите примечание', required)
              },
              currency: {
                required: helpers.withMessage('Пожалуйста, выберите курс валюты', required)
              },  
              current_currency: {
                required: helpers.withMessage('Пожалуйста, выберите валюту', required)
              },
          }
      })
      // const validateProduct = useVuelidate(rules, form)

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
              }else if(type == 'current_currency'){
                form.value.current_currency = currency
              }


            }, 1000)
          }else{
            currency = parseFloat(currency);
            currency = new Intl.NumberFormat('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2}).format(currency);
        
            if(type == 'amount'){
              form.value.amount = currency
            }else if(type == 'current_currency'){
              form.value.current_currency = currency
            }

          }
        }
        return 0;
      }
      // ========== PRICE_FORMATTER END ==========







      const getProductCategories = async() => {
        const data = {
          page: params.value.pagination.page,
          per_page: params.value.pagination.limit,
        }
        await productIncomeStorage.GET_EXPENSE_CATEGORIES(data).then(response => {
          categoriesList.value = response.data.data.data.map(item => {
            return {
              title: item.name,
              ...item
            }
          })
          params.value.pagination.total = response.data.data.total > 9 ? Math.ceil(response.data.data.total / 10) : 1
        })
      }

      // const refresh = async (event) => {
      //   const data = {
      //     page: params.value.pagination.page,
      //     per_page: params.value.pagination.limit,
      //   }
      //   await codebaseStorage.GET_PRODUCTS(data).then(response => {
      //     productsList.value = response.data.data.data.map(item => {
      //       return {
      //         title: item[`name_${locale.value}`],
      //         ...item
      //       }
      //     })

      //     params.value.pagination.total = response.data.data.total > 9 ? Math.ceil(response.data.data.total / 10) : 1
      //   })
      // }



      // const refresh = async (event) => {
      //   let factory = categoriesList.value.find((elem) => elem.id == form.value.expense_category_id)
      // }



      const categorySelected = async (option) => {
        form.value.category_title = option.title
        form.value.expense_category_id = option.id
      }




      getProductCategories()


      const onSubmitModal = async() => {
        clearSelection.value = true

        // const result = await validateProduct.value.$validate()

  
        // form.value.created_at = dayjs(form.value.created_at).format('YYYY-MM-DD HH:mm:ss');
        form.value.amount = Number(form.value.amount.toString().replace(/,/g, ''));
        if(form.value.current_currency && form.value.current_currency != ''){
          form.value.current_currency = Number(form.value.current_currency.toString().replace(/,/g, ''));
        }else{
          form.value.current_currency = 0
        }


        // if(result){
          expense_list.value.splice(expenseIndex.value, 1)

          expense_list.value.splice(expenseIndex.value, 0, {
            expense_category_id: form.value.expense_category_id,
            category_title: form.value.category_title,
            amount: form.value.amount,
            description: form.value.description,
            currency: form.value.currency,
            current_currency: form.value.current_currency,
          });


          form.value.expense_category_id = ''
          form.value.category_title = ''
          form.value.amount = ''
          form.value.description = ''
          form.value.currency = ''
          form.value.current_currency = ''


          // validateProduct.value.$reset()
          toast.success(t('successfully-added'))
          toggleModal()
        // }
        clearSelection.value = false
      }


      const isExpenseCategoryModalActive = ref(false)
      const toggleExpenseCategoryAddModal = (item, index) => {
        isExpenseCategoryModalActive.value = !isExpenseCategoryModalActive.value
      };




      watch(props, async (value) => {
        if(value.expense_item){
          // await getProductCategories()
          form.value.expense_category_id = value.expense_item.expense_category_id
          
          let factory = categoriesList.value.find((elem) => elem.id == form.value.expense_category_id)

          if(factory && factory.type){
            await getStoreReadyProducts(factory.type)
          }

          form.value.category_title = value.expense_item.category_title
          form.value.amount = value.expense_item.amount
          form.value.description = value.expense_item.description
          form.value.currency = value.expense_item.currency
          form.value.current_currency = value.expense_item.current_currency
        }
      })




      // ========================= WATCH_SECTION START =========================
      watch(() => productIncomeStorage.refreshExpenseCategories, async (value) => {
        if(value){
          await getProductCategories()
          productIncomeStorage.refreshExpenseCategories = false
        }
      })
      // ========================= WATCH_SECTION END =========================


        

        return {
          toggleModal,

          // validateProduct,
          form,
          categoriesList,
          categorySelected,
          currensies,

          onSubmitModal,

          locale,
          params,
          formatPrice,

          clearSelection,
          expenseIndex,

          toggleExpenseCategoryAddModal,
          isExpenseCategoryModalActive,

          getProductCategories,
        };
    }
}
</script>

<style>

</style>