<template>
  <section class="pb-20">




    <!-- =================================================================================================================================================
                                                                    HEADER_SECTION START
    ================================================================================================================================================= -->
    <div class="pt-6 pb-4 wrapper">
      <h3 class="sectionTitle dark:text-white">
        {{
          params.currentTable === "income"
            ? $t('comes_history')
            : params.currentTable === "outcome"
            ? $t('lefts_history')
            : params.currentTable === "store"
            ? $t('warehouse')
            : $t('processes')
        }}
      </h3>
      <span class="text-sm text-[#888A8F] mt-2">
        {{
          params.currentTable == 'income' 
          ? params.totalCountIcome 
          : params.currentTable == 'outcome' 
          ? params.totalCountOutcome 
          : params.totalCountStore
        }}{{$i18n.locale == 'ru' ? ' шт' : ' ta'}}
      </span>
    </div>
  

    <div class="flex items-center justify-between border-y-[1.5px] borderBox dark:border-[#1a283a] wrapper h-[70px]">
      <ul class="basicTab">
        <li
          v-if="$can('read', 'warehouse-accessories-coming')"
          @click="changeTable('income')"
          class="main-color-black font-medium duration-300"
          :class="params.currentTable === 'income' ? 'active' : ''"
        >
          {{$t('come')}}
        </li>
        <li
          v-if="$can('read', 'warehouse-accessories-expense')"
          @click="changeTable('outcome')"
          class="main-color-black font-medium duration-300"
          :class="params.currentTable === 'outcome' ? 'active' : ''"
        >
          {{$t('left')}}
        </li>
        <li
          v-if="$can('read', 'warehouse-accessories-warehouse')"
          @click="changeTable('store')"
          class="main-color-black font-medium duration-300"
          :class="params.currentTable === 'store' ? 'active' : ''"
        >
          {{$t('warehouse')}}
        </li>
      </ul>

       <button
        v-if="$can('read', 'warehouse-accessories-moving')"
        @click="toggleSendModal"
        class="mainBackgroundColor text-white basicBtn"
      >
        <PlusIcon stroke="stroke-current mr-2" />
        {{$t('movement')}}
      </button>
    </div>
    <!-- =================================================================================================================================================
                                                                    HEADER_SECTION END
    ================================================================================================================================================= -->









    <!-- =================================================================================================================================================
                                                                    TABLE_SECTION START
    ================================================================================================================================================= -->
    <div class="a-table border-b-[1.5px] borderBox dark:border-[#1a283a] min-h-[500px]">
      <div class="table-1" v-if="params.currentTable === 'income' && $can('read', 'warehouse-accessories-coming')">
        <div class="wrapper">


          <div class="a-table-header">
            <ul class="uk-grid-collapse a-table-list" uk-grid>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('date')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('code')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('title')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('party_num')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('from_where')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('raw_party_num')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('amount')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('price_per_item')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('total_sum')}}</h3>
              </li>
              <li class="w-[100px]">
                <h3 class="a-table-title">{{$t('exchange_rate')}}</h3>
              </li>
              <li class="w-[100px]">
                <h3 class="a-table-title flex justify-center">{{$t('actions')}}</h3>
              </li>
            </ul>
          </div>

          <div class="a-table-body" v-if="!isLoading && !isError">
            <ul
              v-for="(item, index) in incomeList"
              class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a]"
              uk-grid :key="index"
            >
              <li class="uk-width-expand">
                <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">
                  {{ $dayjs(item.created_at).format('DD-MM-YYYY, HH:mm') }}
                </h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text blue-text" :class="$isDark ? 'dark' : ''">{{ item.product.code }}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ item.product[`name_${locale}`] }}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{item.number_party}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{item.customer?.name}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{item.unit}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{formatPrice(item.amount)}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ formatPrice(item.price) }} {{item.currency}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ formatPrice(item.total_price) }} {{item.currency}}</h3>
              </li>
              <li class="w-[100px]">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ formatPrice(item.current_currency) }}</h3>
              </li>
              <li class="w-[100px] relative">
                <v-confirm v-if="confirmToDeleteProduct == item.id" classes="right-[100px] left-auto top-[15px] -translate-y-1/2" :question="$t('are_realy_want_to_delete_this')" @cancel="() => {confirmToDeleteProduct = null}" @confirm="deleteStorageProduct(item.id)" />
                <div
                  @click="togglePopup(item.id)"
                  class="cursor-pointer flex justify-center w-full" :class="$isDark ? 'text-[#66b2ff]' : 'text-[#5FC7D1]'"
                >
                  <FunctionsIcon
                    stroke="stroke-current"
                    width="30"
                    height="30"
                  />
                </div>

                <!-- <functions-popup
                  v-if="popUpActive == item.id"
                  :hideArrow="true"
                >
                  <template v-slot:FunctionsPopupContent>
                    <div class="flex flex-col space-y-3">
                      <button
                        @click="editProduct(item)"
                        class="functionsText mainColorText duration-100"
                      >
                        {{$t('edit')}}
                      </button>
                      <button
                        @click="() => { confirmToDeleteProduct = item.id, popUpActive = null}"
                        class="text-[#E54D43] functionsText"
                      >
                        {{$t('delete')}}
                      </button>
                    </div>
                  </template>
                </functions-popup> -->
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- =================================================================================================================================================
      ================================================================================================================================================= -->

      <div class="table-2" v-if="params.currentTable === 'outcome' && $can('read', 'warehouse-accessories-expense')">
        <div class="wrapper">
          <div class="a-table-header">
            <ul class="uk-grid-collapse a-table-list" uk-grid>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('date')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('code')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('title')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('amount')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('where')}}</h3>
              </li>
            </ul>
          </div>

          <div class="a-table-body" v-if="!isLoading && !isError">
            <ul
              v-for="(item, index) in outcomeList"
              class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a]"
              uk-grid :key="index"
            >
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">
                  {{ $dayjs(item.created_at).format('DD-MM-YYYY, HH:mm') }}
                </h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text blue-text" :class="$isDark ? 'dark' : ''">{{ item.product.code }}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{item.product[`name_${locale}`]}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ formatPrice(item.amount) }} {{item.unit}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ item.factory }}</h3>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- =================================================================================================================================================
      ================================================================================================================================================= -->

      <div class="table-3" v-if="params.currentTable === 'store' && $can('read', 'warehouse-accessories-warehouse')">
        <div class="wrapper h-full">
          <div
            class="uk-grid-medium uk-grid-match uk-child-width-expand h-full"
            uk-grid
          >
            <div class="h-full">
              <div class="a-card h-full">
                <div class="uk-grid-collapse uk-child-width-1-2 h-full" uk-grid>
                  <div>
                    <div class="border-r-[1.5px] borderBox dark:border-[#1a283a] pr-10 h-full">
                      <div class="a-card-header">
                        <ul
                          class="uk-grid-collapse a-table-list pb-5"
                          uk-grid
                        >
                          <li class="uk-width-expand">
                            <h3 class="a-table-title">{{$t('code')}}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-title">{{$t('product_name')}}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-title">{{$t('amount')}}</h3>
                          </li>
                          <li class="w-[100px]">
                            <h3 class="a-table-title flex justify-center">{{$t('actions')}}</h3>
                          </li>
                        </ul>
                      </div>
                      <div v-if="!isLoading" class="a-card-body">
                        <ul
                          v-for="item in storeListLeft"
                          class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a] "
                          uk-grid :key="item.id"
                        >
                          <li class="uk-width-expand">
                            <h3 class="a-table-text blue-text">{{ item.product.code }}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ item.product?.name_ru }}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ formatPrice(item.amount) }} {{item.unit}}</h3>
                          </li>
                          <li class="w-[100px]">
                            <div class="relative">
                              <v-confirm v-if="confirmToDeleteProduct == item.id" classes="right-[100px] left-auto top-[15px] -translate-y-1/2" :question="$t('are_realy_want_to_delete_this')" @cancel="() => {confirmToDeleteProduct = null}" @confirm="deleteProductStore(item.id)" />
                              <div
                                @click="togglePopup(item.id)"
                                class="cursor-pointer flex justify-center w-full" :class="$isDark ? 'text-[#66b2ff]' : 'text-[#5FC7D1]'"
                              >
                                <FunctionsIcon
                                  stroke="stroke-current"
                                  width="30"
                                  height="30"
                                />
                              </div>

                              <!-- <functions-popup
                                v-if="popUpActive == item.id"
                                additonalClasses="py-5"
                                :hideArrow="true"
                              >
                                <template v-slot:FunctionsPopupContent>
                                  <div class="flex flex-col space-y-3">
                                    <button
                                      @click="() => {
                                        confirmToDeleteProduct = item.id,
                                        popUpActive = null
                                      }"
                                      class="text-[#E54D43] functionsText cursor-pointer"
                                    >
                                      {{$t('delete')}}
                                    </button>
                                  </div>
                                </template>
                              </functions-popup> -->
                            </div>
                          </li>
                        </ul>
                      </div>

                      <Skeleton v-if="isLoading && $route.query.table == 'store'" classes="w-full min-h-[500px] " />
                      <null-data v-else-if="isErrorLeft || !storeListLeft.length" width='w-[120px]' classes='h-full min-h-[500px] ' />
                    </div>
                  </div>
                  <div>
                    <div class="pl-10">
                      <div class="a-card-header">
                        <ul
                          class="uk-grid-collapse a-table-list pb-5"
                          uk-grid
                        > 
                          <li class="uk-width-expand">
                            <h3 class="a-table-title">{{$t('code')}}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-title">{{$t('product_name')}}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-title">{{$t('amount')}}</h3>
                          </li>
                          <li class="w-[100px]">
                            <h3 class="a-table-title flex justify-center">{{$t('actions')}}</h3>
                          </li>
                        </ul>
                      </div>
  
                      <div v-if="!isLoading" class="a-card-body">
                        <ul
                          v-for="item in storeListRight"
                          class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a] "
                          uk-grid :key="item.id"
                        >
                          <li class="uk-width-expand">
                            <h3 class="a-table-text blue-text">{{ item.product.code }}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ item.product?.name_ru }}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ formatPrice(item.amount) }} {{item.unit}}</h3>
                          </li>
                          <li class="w-[100px]">
                            <div class="relative">
                              <v-confirm v-if="confirmToDeleteProduct == item.id" classes="right-[100px] left-auto top-[15px] -translate-y-1/2" :question="$t('are_realy_want_to_delete_this')" @cancel="() => {confirmToDeleteProduct = null}" @confirm="deleteProductStore(item.id)" />
                              <div
                                @click="togglePopup(item.id)"
                                class="cursor-pointer flex justify-center w-full" :class="$isDark ? 'text-[#66b2ff]' : 'text-[#5FC7D1]'"
                              >
                                
                                <FunctionsIcon
                                  stroke="stroke-current"
                                  width="30"
                                  height="30"
                                />
                              </div>

                              <!-- <functions-popup
                                v-if="popUpActive == item.id"
                                additonalClasses="py-5"
                                :hideArrow="true"
                              >
                                <template v-slot:FunctionsPopupContent>
                                  <div class="flex flex-col space-y-3">
                                    <button
                                      @click="() => {
                                        confirmToDeleteProduct = item.id,
                                        popUpActive = null
                                      }"
                                      class="text-[#E54D43] functionsText cursor-pointer z-[12]"
                                    >
                                      {{$t('delete')}}
                                    </button>
                                  </div>
                                </template>
                              </functions-popup> -->
                            </div>

                            <div
                              @click="popUpActive = null"
                              v-if="popUpActive == item.id"
                              class="w-[100vw] h-[100vh] z-[10] absolute top-1/2 -translate-y-1/2 right-0"
                            ></div>
                          </li>
                        </ul>
                      </div>

                      <Skeleton v-if="isLoading && $route.query.table == 'store'" classes="w-full min-h-[500px] " />
                      <null-data v-else-if="isErrorRight || !storeListRight.length" width='w-[120px]' classes='h-full min-h-[500px] ' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <!-- =================================================================================================================================================
                                                                    TABLE_SECTION END
    ================================================================================================================================================= -->







      <div class="wrapper" v-if="$route.query.table !== 'store'">
        <Skeleton classes='w-full min-h-[450px]' v-if="isLoading" />
        <NullData :text="$t('nullData')" v-if="isError && !isLoading" classes="min-h-[450px] py-0" />
      </div>
    </div>
    <SendAccessoriesModal :isModalActive="isModalActive" v-if="$can('read', 'warehouse-accessories-moving')"/>




    <div class="flex justify-end mt-10 wrapper" v-if="!isLoading && !isError">
        <v-pagination
          v-if="params.currentTable == 'income'"
          v-model="params.pagination.page"
          :pages="params.pagination.total_income"
          :range-size="1"
          @update:modelValue="updatePage"
          :hideFirstButton="true"
          hideLastButton="true"
        />
        <v-pagination
          v-else-if="params.currentTable == 'outcome'"
          v-model="params.pagination.page"
          :pages="params.pagination.total_outcome"
          :range-size="1"
          @update:modelValue="updatePage"
          :hideFirstButton="true"
          hideLastButton="true"
        />
        <v-pagination
          v-else
          v-model="params.pagination.page"
          :pages="params.pagination.total_store"
          :range-size="1"
          @update:modelValue="updatePage"
          :hideFirstButton="true"
          hideLastButton="true"
        />
    </div>
  </section>







  <!-- =================================================================================================================================================
                                                                    FILTER_SECTION START
  ================================================================================================================================================= -->
  <Filter buttonClass="mt-10" wrapperClass='top-[180px]' :cancelButtonText="$t('clean')">
    <template v-slot:filterBody>
      <div class="w-[300px] grid grid-cols-1 gap-3">
        <div class="relative">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="../../../assets/icons/baseIcons/user-square.svg"
            alt="icon"
          />
          <input
            v-debounce:500="handleFilterSearchName"
            type="text"
            name="text"
            autocomplete="off"
            required
            :placeholder="$t('search_by_name')"
            class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
          />
        </div>
        <div class="relative">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="../../../assets/icons/baseIcons/code.svg"
            alt="icon"
          />
          <input
            v-debounce:500="handleFilterSearchCode"
            type="text"
            name="text"
            autocomplete="off"
            required
            :placeholder="$t('search_by_code')"
            class="w-full py-[14px] px-[24px] pl-12 focus:outline-none blue-text border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
          />
        </div>
      </div>
    </template>
  </Filter>
  <!-- =================================================================================================================================================
                                                                    FILTER_SECTION END
  ================================================================================================================================================= -->



</template>

<script>


// ========================= IMPORTS_SECTION START =========================
import { onMounted, ref, watch } from 'vue';
import PlusIcon from "@/assets/iconsVue/PlusIcon.vue";
import SmallArrowRight from "@/assets/iconsVue/SmallArrowRight.vue";
import Modal from '@/components/base/Modal.vue'
import FunctionsIcon from "@/assets/iconsVue/FunctionsIcon.vue";
import SendAccessoriesModal from './components/sendAccessoriesModal.vue'

import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { useRouter, useRoute } from 'vue-router'
import { productIncomeToStore } from '@/store/modules/pages/Warehouse.js'
import { factoryIncomeStore } from '@/store/modules/FactoryIncome.js'
import { mainStore } from '@/store/main'
import formatter from '@/mixins/formatter.js'
// ========================= IMPORTS_SECTION END =========================


export default {
  components: {



    // ========================= COMPONENTS_DEFINE_SECTION START =========================
    Modal,
    SmallArrowRight,
    PlusIcon,
    FunctionsIcon,
    SendAccessoriesModal,
    // ========================= COMPONENTS_DEFINE_SECTION END =========================



  },
  setup() {





    // ========================= PRIMARY_DATA_SECTION START =========================
    const mainStorage = mainStore()
    const { locale, t } = useI18n()
    const route = useRoute()
    const router = useRouter()
    const toast = useToast()
    const isModalActive = ref(false)
    const popUpActive = ref(null)
    const factoryIncomeStorage = factoryIncomeStore()
    const warehouseStorage = productIncomeToStore()

    const {formatPrice} = formatter()

    const incomeList = ref([])
    const outcomeList = ref([])
    const storeListLeft = ref([])
    const storeListRight = ref([])
    const isLoading = ref(false)
    const isError = ref(false)
    const isErrorLeft = ref(false)
    const isErrorRight = ref(false)
    const confirmToDeleteProduct = ref(null)
    const params = ref({
      currentTable: 'income',
      totalCountIcome: 0,
      totalCountOutcome: 0,
      totalCountStore: 0,
      pagination: {
        page: 1,
        total_income: 0,
        total_outcome: 0,
        total_store: 0,
        limit: 10
      }
    })
    // ========================= PRIMARY_DATA_SECTION END =========================







    
    // ========================= CHANGE_TABLE_SECTION START =========================
    const changeTable = (e) => {
      router.push(`/warehouse-accessories?table=${e}`)
      // params.value.pagination.total = 0
      params.value.pagination.page = 1
      params.value.currentTable = e
      isLoading.value = true
      setTimeout(() => {
        isLoading.value = false
      }, 300)
    }
    // ========================= CHANGE_TABLE_SECTION END =========================







    // ========================= UPDATE_PAGE_SECTION START =========================
    async function updatePage(value) {
      const query = { ...route.query }
      
      router.push({ path: route.fullPath, query: { ...query, page: value } })
      params.value.pagination.page = value

      if (params.value.currentTable == 'income') {
          await getProductIncome()
        } else if (params.value.currentTable == 'outcome') {
          await getProductOutcome()
        } else if (params.value.currentTable == 'store') {
          await getStoreList()
      }
    }
    // ========================= UPDATE_PAGE_SECTION END =========================








    // ========================= GET_SECTION START =========================
    const getStoreList = async () => {
      isError.value = false
      isErrorLeft.value = false
      isErrorRight.value = false
      isLoading.value = true
      const data = {
          sort_key: 'created_at',
          sort_type: 'desc',
          per_page: 10, 
          page: params.value.pagination.page, 
          product_category_id: 7,
          storage_type: 'provider',
          product_case: 'provider'
      }
      await warehouseStorage.GET_RAW_MATERIALS_STORAGE(data).then(response => {
        if (response.data.data.data.length && response.data.data.data.length < 2) {
            storeListLeft.value = response.data.data.data
            storeListRight.value = []
        } else if (response.data.data.data.length && response.data.data.data.length > 1) {
            storeListLeft.value = response.data.data.data.slice(0, Math.ceil(response.data.data.data.length / 2))
            storeListRight.value = response.data.data.data.slice(Math.ceil(response.data.data.data.length / 2))
        } else {
            storeListLeft.value = []
            storeListRight.value = []
        }
        params.value.totalCountStore = response.data.data.total
        params.value.pagination.total_store = response.data.data.total > 9 ? Math.ceil(response.data.data.total / 10) : 1
      }) 
      .catch(() => {
        isErrorLeft.value = true
        isErrorRight.value = true
      })
      .finally(() => {
        isLoading.value = false
      })
    }

    const getProductIncome = async () => {
      isLoading.value = true
      const data = {
          sort_key: 'created_at',
          sort_type: 'desc',
          per_page: 10, 
          page: params.value.pagination.page, 
          product_category_id: 7,
      }
      await warehouseStorage.GET_PRODUCT_INCOME(data).then(response => {
        incomeList.value = response.data.data.data
        params.value.totalCountIcome = response.data.data.total
        params.value.pagination.total_income = response.data.data.total > 9 ? Math.ceil(response.data.data.total / 10) : 1
        if (!response.data.data.data.length) {
          isError.value = true
        } else {
          isError.value = false
        }
      })
      .catch(() => {
        setTimeout(() => {
          isError.value = true
        }, 500);
      })
      .finally(() => {
          isLoading.value = false
      })
    }

    const getProductOutcome = async () => {
      isLoading.value = true
      const data = {
          sort_key: 'created_at',
          sort_type: 'desc',
          per_page: 10, 
          page: params.value.pagination.page, 
          product_category_id: 7,
      }
      await factoryIncomeStorage.GET_FACTORY_INCOME(data).then(response => {
        outcomeList.value = response.data.data.data
        params.value.totalCountOutcome = response.data.data.total
        params.value.pagination.total_outcome = response.data.data.total > 9 ? Math.ceil(response.data.data.total / 10) : 1
        if (!response.data.data.data.length) {
          isError.value = true
        } else {
          isError.value = false
        }
      })
      .catch(() => {
        setTimeout(() => {
          isError.value = true
        }, 500);
      })
      .finally(() => {
          isLoading.value = false
      })
    }
    // ========================= GET_SECTION END =========================

    







    
    // ========================= OTHERS_SECTION START =========================
    
    // const editProduct = async (data) => {
    //   isModalActive.value = !isModalActive.value
    //   popUpActive.value = null
    //   const query = { ...route.query }
    //   router.push({ path: route.fullPath, query: { ...query, page: params.value.pagination.page, income_product: data.id } })
    // }

    const deleteStorageProduct = async (id) => {
      isLoading.value = true
      confirmToDeleteProduct.value = null
      await warehouseStorage.DELETE_STORAGE_PRODUCT(id).then( async (response) => {
        if (response.data) {
          toast.success(t('successfully-deleted'))
          await getProductIncome()
        }
      }).catch(() => {
        toast.error(t('error-occured'))
      }).finally(() => {
        isLoading.value = false
      })
    }

    const deleteProductStore = async (id) => {
      confirmToDeleteProduct.value = null
      await warehouseStorage.DELETE_STORAGE_PRODUCT(id).then(async (response) => {
          if (response.data) {
            toast.success(t('successfully-deleted'))
            await getStoreList()
          }
      })
    }
    // ========================= OTHERS_SECTION END =========================

   






    // ========================= POPUP_AND_MODAL_SECTION START =========================
    const togglePopup = (id) => {
      if (popUpActive.value === id) {
        popUpActive.value = null
      } else {
        popUpActive.value = id
      }
    }
    const toggleSendModal = async () => {
      isModalActive.value = !isModalActive.value
      await getProductIncome()
      await getProductOutcome()
      await getStoreList()
    }
    // ========================= POPUP_AND_MODAL_SECTION END =========================








    // ========================= MOUNTED_SECTION START =========================
    onMounted( async () => {
        if (route.query.table) {
          router.push(route.fullPath)
          params.value.currentTable = route.query.table
          params.value.pagination.page = route.query.page ? route.query.page : 1
        } else {
          changeTable('income')
        }

        await getProductIncome()
        await getProductOutcome()
        await getStoreList()
    })
    // ========================= MOUNTED_SECTION END =========================








    // ========================= WATCH_SECTION START =========================
    watch(() => mainStorage.current_product_income, async (value) => {
      console.log(value)
      if(value == 'accessory'){
          if (route.query.table) {
            router.push(route.fullPath)
            params.value.currentTable = route.query.table
            params.value.pagination.page = route.query.page ? route.query.page : 1
            
            if (route.query.table == 'income') {
              await getProductIncome()
              await getStoreList()
            } else if (route.query.table == 'outcome') {
              await getProductOutcome()
            } else if (route.query.table == 'store') {
              await getProductIncome()
              await getStoreList()
            }
          } else {
            changeTable('income')
          }

          mainStorage.current_product_income = ''
      }
    })
    // ========================= WATCH_SECTION END =========================





    return {
      changeTable,
      isModalActive,
      toggleSendModal,
      popUpActive,
      togglePopup,



      params,
      incomeList,
      outcomeList,
      locale,
      storeListLeft,
      storeListRight,
      isError,
      isErrorLeft,
      isErrorRight,
      isLoading,
      confirmToDeleteProduct,

      updatePage,
      deleteProductStore,
      deleteStorageProduct,
      // editProduct,

      formatPrice,
    };
  },
};
</script>

<style></style>
