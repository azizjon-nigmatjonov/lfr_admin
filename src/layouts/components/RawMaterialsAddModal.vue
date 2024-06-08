<template>
   <Modal :isModalActive="isModalActive" @close="toggleModal" @submitModal="submitModal" width="w-[1200px]">
    <template v-slot:modalHeader>
      <h3 class="text-lg font-medium text-center main-color-black dark:text-white">
        {{$t('raw_material_arrived')}}
      </h3>
    </template>

    <template v-slot:modalBody>
      <div class="flex w-full mt-4">
        <div class="w-full">
          <div class="grid gap-y-5 gap-x-8">
            <div class="relative">
              <img
                class="absolute left-4 top-1/2 -translate-y-1/2"
                src="../../assets/icons/allMoney.svg"
                alt="user"
              />
              <Datepicker :inputClassName="`datepicker ${$isDark ? 'dark' : 'light'}`" menuClassName="dp-custom-menu" calendarClassName="dp-custom-calendar" 
              v-model="form.created_at" :placeholder="$t('date')" readonly="true"
              :locale="locale == 'ru' ? 'ru' : 'uz'" @update:modelValue="handleCreatedAt"
              :cancelText="locale == 'ru' ? 'Отмена' : 'Bekor qilish'"
              :selectText="locale == 'ru' ? 'ОК' : 'Tanlash'"></Datepicker>
            </div>
          </div>
          <div class="mt-4 grid grid-cols-2 gap-y-5 gap-x-8">
            <div class="relative">
              <img
                class="absolute left-4 top-1/2 -translate-y-1/2"
                src="../../assets/icons/baseIcons/type.svg"
                alt="user"
              />
              <vue-select :options="categoriesList" @select="categorySelected($event)" :clearSelection="clearSelection" :placeholder="$t('product_category')" classes="main-color-black pl-11" />
              <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.category_id.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
            </div>
            <div class="relative">
              <img
                class="absolute left-4 top-1/2 -translate-y-1/2"
                src="../../assets/icons/baseIcons/product.svg"
                alt="user"
              />
              <vue-select :options="productsList" @select="(option) => form.product_id = option.id" :clearSelection="clearSelection"
                :optionsPagination="params" 
                @refresh="refresh($event)" 
                classes="main-color-black pl-11" :placeholder="$t('product')" />
              <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.product_id.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
            </div>
            <div class="relative">
              <img
                class="absolute left-4 top-1/2 -translate-y-1/2"
                src="../../assets/icons/baseIcons/main-component.svg"
                alt="user"
              />
              <vue-select :options="rawPartyNumOptions" @select="(option) => form.unit = option.id" :clearSelection="clearSelection" classes="main-color-black pl-11" :placeholder="$t('raw_party_num')" />
              <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.unit.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
            </div>
            <div class="form-input-anim relative" :class="$isDark ? 'dark' : ''">
              <img
                class="absolute left-4 top-1/2 -translate-y-1/2"
                src="../../assets/icons/baseIcons/list-ordered.svg"
                alt="user"
              />
              <input
                v-model="form.number_party"
                type="text"
                name="text"
                autocomplete="off"
                required
                class="mt-1 w-full py-[14px] px-[24px] pl-12 focus:outline-none border-[1.5px] borderBox dark:border-[#1a283a] rounded-[12px] text-lg placeholder"
                :class="$isDark ? 'dark' : 'light'"
              />
              <label for="text" class="label-name">
                <span class="content-name">{{$t('party_num')}}</span>
              </label>
              <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.number_party.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
            </div>
            <div class="relative">
              <img
                class="absolute left-4 top-1/2 -translate-y-1/2"
                src="../../assets/icons/baseIcons/global.svg"
                alt="user"
              />
              <vue-select :options="suppliersList" @select="(option) => form.customer_id = option.id" 
              :clearSelection="clearSelection" classes="main-color-black pl-11" :placeholder="$t('from_where')"
              :optionsPagination="params2" 
              @refresh="getSuppliersList($event)" />
              <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.customer_id.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
            </div>
            <div class="form-input-anim relative" :class="$isDark ? 'dark' : ''">
              <img
                class="absolute left-4 top-1/2 -translate-y-1/2"
                src="../../assets/icons/baseIcons/calculation.svg"
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
                <span class="content-name">{{$t('amount')}}</span>
              </label>
              <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.amount.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
            </div>
            <div class="form-input-anim relative" :class="$isDark ? 'dark' : ''">
              <img
                class="absolute left-4 top-1/2 -translate-y-1/2"
                src="../../assets/icons/baseIcons/money.svg"
                alt="user"
              />
              <input
                v-model="form.price"
                @input="formatPrice(form.price, 'price')" onkeypress="return /[0-9,/.]/i.test(event.key)"
                type="text"
                autocomplete="off"
                required
                class="mt-1 w-full py-[14px] px-[24px] pl-12 focus:outline-none border-[1.5px] borderBox dark:border-[#1a283a] rounded-[12px] text-lg placeholder"
                :class="$isDark ? 'dark' : 'light'"
              />
              <label for="text" class="label-name">
                <span class="content-name">{{$t('price_per_item')}}</span>
              </label>
              <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.price.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
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
              <vue-select :options="currensies" :placeholder="$t('currency')" @select="(option) => form.currency = option.id"
                :selectedElement="form.currency == 840 ? 'USD' : ''" :clearSelection="clearSelection" />
              <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.currency.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
            </div>

            <div class="form-input-anim relative form-input-anim2" :class="$isDark ? 'dark' : ''">
              <img
                class="absolute left-4 top-1/2 -translate-y-1/2"
                src="../../assets/icons/allMoney.svg"
                alt="user"
              />
                <!-- :disabled="true" -->
              <input
                v-model="totalPrice"
                type="text"
                readonly
                :disabled="true"
                autocomplete="off"
                required
                class="mt-1 w-full py-[14px] px-[24px] pl-12 focus:outline-none border-[1.5px] borderBox dark:border-[#1a283a] rounded-[12px] text-lg placeholder"
                :class="$isDark ? 'dark' : 'light'"
              />
              <label for="text" class="label-name">
                <span class="content-name">{{$t('total_sum')}}</span>
              </label>
              <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.currency.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
            </div>
            
          </div>

          <div class="form-input-anim relative mt-4" :class="$isDark ? 'dark' : ''">
            <img
              class="absolute left-4 top-1/3 -translate-y-1/2"
              src="../../assets/icons/baseIcons/row-horizontal.svg"
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
            <label for="text" class="label-name" style="top: -45px !important;">
              <span class="content-name">{{$t('description')}}</span>
            </label>
            <!-- <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.description.$errors" :key="error.$uid">{{ $t(error.$message) }}</p> -->
          </div>
        </div>


        <div class="ml-2 w-full">
          <div class="flex flex-col gap-5 max-h-[380px] overflow-y-scroll pr-2">
            <div class="relative flex" v-for="(item, index) in expense_list" :key="index">
              <img
                class="absolute left-4 top-1/2 -translate-y-1/2"
                src="@/assets/icons/allMoney.svg"
                alt="user"
              />
              <input
                :value="getExpenseFormattedValue(item)"
                @click="toggleItemExpenseAddModal(item, index)"
                type="text"
                name="text"
                autocomplete="off"
                required
                :placeholder="$t('product_expense')"
                class=" w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
              />

              <div class="flex align-center justify-end " v-if="expense_list.length == (index + 1)">
                <button
                  @click="addExpenses()"
                  class="w-[60px] rounded-[12px] h-auto ml-2 bg-[#2597DE] text-2xl flex items-center justify-center text-white text-center hover:bg-opacity-80 duration-200"
                >
                +
                </button>
              </div>
            
              <div class="flex align-center justify-end " v-if="expense_list.length != index + 1">
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


      </div>
      <itemExpenseAddModal :isModalActive="isItemExpenseAddModalActive" @closeModal="toggleItemExpenseAddModal" :expense_item="expense_item"/>
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
import itemExpenseAddModal from './itemExpenseAddModal.vue'

import { suppliersStore } from '@/store/modules/pages/Suppliers';
import { productIncomeToStore } from '@/store/modules/pages/Warehouse'
import { codebaseStore } from '@/store/modules/pages/Codebase.js'
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
        itemExpenseAddModal,
    },
    setup(props) {
        const mainStorage = mainStore()
        const suppliersStorage = suppliersStore()
        const productIncomeStorage = productIncomeToStore()
        const codebaseStorage = codebaseStore()
        const instance = getCurrentInstance();
        const router = useRouter();
        const route = useRoute();
        const { t, locale } = useI18n()
        const toast = useToast()

        let clearSelection = ref(false)

        const params = ref({
          search_name: '',
          search_code: '',
          pagination: {
            page: 1,
            total: 1,
            limit: 10
          }
        });
        const params2 = ref({
          search_name: '',
          search_code: '',
          pagination: {
            page: 1,
            total: 1,
            limit: 10
          }
        });


        const rawPartyNumOptions = reactive([
            {
                id: 'barrel',
                title: 'Бочка'
            },
            {
                id: 'kg',
                title: 'Килограмм'
            },
            {
                id: 'meter',
                title: 'Метр'
            },
            {
                id: 'm2',
                title: 'Метр квадрат'
            },
            {
                id: 'm3',
                title: 'Метр куб'
            },
            {
                id: 'piece',
                title: 'Штук'
            },
            {
                id: 'litr',
                title: 'Литр'
            },
        ])

      
        const toggleModal = () => {
            instance.parent.setupState.toggleModal()
        };


        const categoriesList = ref([])
        const productsList = ref([])
        const suppliersList = ref([])

        let product_category_id = ref()
        const { expense_list, expenseIndex } = storeToRefs(productIncomeStorage)
        const expense_item = ref();

        let form = ref({
          number_party: '',
          customer_id: null,
          category_id: null,
          product_id: null,
          amount: '',
          price: '',
          total_price: '',
          paid: '',
          unit: '',
          currency: '840',
          current_currency: '',
          created_at: '',
          expense_list: [],
          description: ''
        })

        const rules = computed(() => {
            return {
                number_party: {
                    required: helpers.withMessage('Пожалуйста, введите номер партии', required)
                },
                customer_id: {
                    required: helpers.withMessage('Пожалуйста, выберите поставщика', required)
                },
                category_id: {
                    required: helpers.withMessage('Пожалуйста, выберите категорию продукта', required)
                },
                product_id: {
                    required: helpers.withMessage('Пожалуйста, выберите продукт', required)
                },
                amount: {
                    required: helpers.withMessage('Пожалуйста, введите кол-во', required)
                },
                price: {
                    required: helpers.withMessage('Пожалуйста, введите цену', required)
                },
                total_price: {
                    required: helpers.withMessage('Пожалуйста, введите общую цену', required)
                },
                // paid: {
                //     required: helpers.withMessage('Пожалуйста, введите выплаченную сумму', required)
                // },
                unit: {
                  required: helpers.withMessage('Пожалуйста, выберите тару', required)
                },
                currency: {
                  required: helpers.withMessage('Пожалуйста, выберите валюту', required)
                },
                current_currency: {
                  required: helpers.withMessage('Пожалуйста, выберите курс валюты', required)
                },
                // description: {
                //   required: helpers.withMessage('Пожалуйста, введите примечание', required)
                // },
            }
        })
        const validate = useVuelidate(rules, form)

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
          if(value){
            let currency = value.toString().replace(/,/g, '');
            if(currency.includes('.')){
              

              clearTimeout(_timerId)
              _timerId = setTimeout(async () => {
                currency = parseFloat(currency);
                currency = new Intl.NumberFormat('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2}).format(currency);

                if(type == 'amount'){
                  form.value.amount = currency
                }else if(type == 'price'){
                  form.value.price = currency
                }else if(type == 'total_price'){
                  return currency
                }else if(type == 'current_currency'){
                  form.value.current_currency = currency
                }
              }, 1000)
            }else{
              currency = parseFloat(currency);
              currency = new Intl.NumberFormat('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2}).format(currency);
          
              if(type == 'amount'){
                form.value.amount = currency
              }else if(type == 'price'){
                form.value.price = currency
              }else if(type == 'total_price'){
                return currency
              }else if(type == 'current_currency'){
                form.value.current_currency = currency
              }
            }

            

          }
          return 0;
        }
        // ========== PRICE_FORMATTER END ==========





        const totalPrice = computed(() => {
            let amount = form.value.amount.toString().replace(/,/g, '');
            let price = form.value.price.toString().replace(/,/g, '');

            amount = parseFloat(amount);
            price = parseFloat(price);
            if (amount && price) {
                let total_price = amount * price

                total_price = parseFloat(total_price);
                total_price = new Intl.NumberFormat('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2}).format(total_price);

                form.value.total_price = total_price
                return form.value.total_price;
            }
        });






        const getProductCategories = async() => {
          await codebaseStorage.GET_PRODUCT_CATEGORIES().then(response => {
            categoriesList.value = response.data.data.map(item => {
              return {
                title: item[`name_${locale.value}`],
                ...item
              }
            })
            categoriesList.value = categoriesList.value.filter((elem) => {
              if(elem.type == 'raw-material'){
                return elem
              }else if(elem.type == 'accessory'){
                return elem
              }else if(elem.type == 'technology'){
                return elem
              }else if(elem.type == 'equipment'){
                return elem
              }
            })
          })
        }


        const getSuppliersList = async() => {
          const data = {
            page: params2.value.pagination.page,
            per_page: params2.value.pagination.limit,
          }

          await suppliersStorage.GET_SUPPLIERS_OR_CUSTOMERS_LIST({type: 'supplier', ...data}).then(response => {
            suppliersList.value = response.data.data.data.map(item => {
              return {
                title: item[`name`],
                ...item
              }
            })

            params2.value.pagination.total = response.data.data.total > 9 ? Math.ceil(response.data.data.total / 10) : 1
          })
        }


        const categorySelected = async (option) => {
          const data = {
            product_category_id: option.id,
            page: params.value.pagination.page,
            per_page: params.value.pagination.limit,
            // code: route.query.search_code ? route.query.search_code : '',
            // name_ru: route.query.search_name ? route.query.search_name : ''
          }
          form.value.category_id = option.type
          product_category_id.value = option.id
          await codebaseStorage.GET_PRODUCTS(data).then(response => {
            productsList.value = response.data.data.data.map(item => {
              return {
                title: item[`name_${locale.value}`],
                ...item
              }
            })

            params.value.pagination.total = response.data.data.total > 9 ? Math.ceil(response.data.data.total / 10) : 1
          })
        }

        const refresh = async (event) => {
          console.log(product_category_id.value)
          const data = {
            product_category_id: product_category_id.value,
            page: params.value.pagination.page,
            per_page: params.value.pagination.limit,
          }
          await codebaseStorage.GET_PRODUCTS(data).then(response => {
            productsList.value = response.data.data.data.map(item => {
              return {
                title: item[`name_${locale.value}`],
                ...item
              }
            })

            params.value.pagination.total = response.data.data.total > 9 ? Math.ceil(response.data.data.total / 10) : 1
          })
        }
      


        const submitModal = async() => {
          clearSelection.value = true

          if(form.value.currency == '860'){
            form.value.current_currency = 0;
          }
          const result = await validate.value.$validate()

          // form.value.created_at = dayjs(form.value.created_at).format('YYYY-MM-DD HH:mm:ss');
          form.value.amount = Number(form.value.amount.toString().replace(/,/g, ''));
          form.value.price = Number(form.value.price.toString().replace(/,/g, ''));
          form.value.total_price = Number(form.value.total_price.toString().replace(/,/g, ''));
          form.value.current_currency = Number(form.value.current_currency.toString().replace(/,/g, ''));
          expense_list.value = expense_list.value.filter((elem) => {
            if(elem.id != 0){
              return elem
            }
          })
          

          if(result){
            await productIncomeStorage.CREATE_PRODUCT_INCOME(form.value).then((response) => {


              if(response && response.status && response.status == 200){
                form.value.number_party = ''
                form.value.customer_id = null
                form.value.product_id = null
                form.value.amount = ''
                form.value.price = ''
                form.value.total_price = ''
                form.value.paid = ''
                form.value.unit = ''
                form.value.currency = '840'
                form.value.current_currency = ''
                form.value.created_at = ''
                form.value.description = ''


                

                mainStorage.getCurrentProductIncome(form.value.category_id)
                validate.value.$reset()
                toast.success(t('successfully-added'))
                toggleModal()
              }


            })
            expense_list.value.forEach( async (elem) => {
              console.log(elem)
              await productIncomeStorage.CREATE_EXPENSE(elem).then((response) => {
                if(response && response.status && response.status == 200){
  
                  expense_list.value = [{id: 0, category_title: '', amount: ''}]
                  
                  mainStorage.getCurrentProductIncome('1')
                  validate.value.$reset()
                  // toast.success(t('successfully-added'))
                  toggleModal()
                }
              })

            })
          }
          clearSelection.value = false
        }


        watch(props, (value) => {
          if(value){
            form.value.created_at = dayjs(new Date).format('YYYY-MM-DD HH:mm:ss')
          }
        })
        
        watch(() => suppliersStorage.updateSupplier, (value) => {
          if(value){
            params2.value.pagination.page = 1
            getSuppliersList()
            suppliersStorage.updateSupplier = false
          }
        })
        
        watch(() => codebaseStorage.updateCodebase, (value) => {
          if(value){
            params.value.pagination.page = 1
            refresh()
            codebaseStorage.updateCodebase = false
          }
        })


        const handleCreatedAt = (modelData) => {
          form.value.created_at = dayjs(modelData).format('YYYY-MM-DD HH:mm:ss')
        }

        function getExpenseFormattedValue(item){
          let value = '';
          if(item.category_title && item.amount){
            value = item.category_title + ' - ' + formatPrice(item.amount, 'total_price')
            //  + item.currency
          }
          return value
        }

        const isItemExpenseAddModalActive = ref(false);

        const toggleItemExpenseAddModal = (item, index) => {
          expenseIndex.value = index
          isItemExpenseAddModalActive.value = !isItemExpenseAddModalActive.value
          expense_item.value = item
        };


        function addExpenses(){
          expense_list.value.push({id: 0, title: '', amount: ''})
        }
        
        function removeProducts(index){
          expense_list.value.splice(index, 1);
        }

        onMounted(async () => {
          await getProductCategories()
          await getSuppliersList()
        })

        return {
            productsList,
            rawPartyNumOptions,
            toggleModal,
            validate,
            form,
            categoriesList,
            suppliersList,
            categorySelected,
            currensies,

            submitModal,
            handleCreatedAt,

            locale,
            formatPrice,
            totalPrice,

            clearSelection,
            params,
            refresh,
            params2,
            getSuppliersList,

            expense_list,
            getExpenseFormattedValue,
            toggleItemExpenseAddModal,
            expense_item,
            isItemExpenseAddModalActive,

            addExpenses,
            removeProducts,
        };
    }
}
</script>

<style>

</style>