<template>
  <section class="sailing-section pb-20">
    <div
      class="pt-6 pb-4 border-b-[1.5px] borderBox dark:border-[#1a283a]  wrapper flex items-center justify-between"
    >
      <div>
        <h3 class="sectionTitle">{{$t('sales_history')}}</h3>
        <span class="text-sm text-[#888A8F] mt-2">{{ params.totalCount }} шт</span>
      </div>
      <!-- <button
        v-if="$can('read', 'customers-add-modal')"
        @click="toggleModal()"
        class="mainBackgroundColor text-white basicBtn"
      >
        <PlusIcon stroke="stroke-current mr-2" />
        {{$t('add')}}
      </button> -->
    </div>

    <div class="a-table border-b-[1.5px] borderBox dark:border-[#1a283a] min-h-[500px]" v-if="$can('read', 'sellings')">
      <div class="table-1">
        <div class="wrapper">
          <div class="a-table-header">
            <ul class="uk-grid-collapse a-table-list" uk-grid>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('date')}}</h3>
              </li>
              <li class="uk-width-expand text-center">
                <h3 class="a-table-title">{{$t('sale_type')}}</h3>
              </li>
              <li class="uk-width-expand text-center">
                <h3 class="a-table-title">{{$t('client')}}</h3>
              </li>
              <li class="uk-width-expand text-center">
                <h3 class="a-table-title">{{$t('product')}}</h3>
              </li>
              <!-- <li class="uk-width-expand text-center">
                <h3 class="a-table-title">{{$t('total_amount')}}</h3>
              </li>
              <li class="uk-width-expand text-center">
                <h3 class="a-table-title">{{$t('total_sum')}}</h3>
              </li> -->
              <!-- <li class="uk-width-expand text-center">
                <h3 class="a-table-title">{{$t('total_sum')}}</h3>
              </li> -->
              <li class="uk-width-expand text-center">
                <h3 class="a-table-title">{{$t('prepayed_sum')}}</h3>
              </li>
              <li class="w-[100px]">
                <h3 class="a-table-title text-center">{{$t('functions')}}</h3>
              </li>
            </ul>
          </div>

          <div class="a-table-body" v-if="!isLoading && !isError">
            <ul
              v-for="(item, index) in sellersList"
              class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a] "
              uk-grid
              :key="index"
            >
              <li class="uk-width-expand">
                <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ $dayjs(item.created_at).format('DD-MM-YYYY, HH:mm') }}</h3>
              </li>
              <li class="uk-width-expand text-center">
                <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ item.type }}</h3>
              </li>
              <li class="uk-width-expand text-center">
                <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''" v-if="item.customer && item.customer.number && item.customer.name">{{ item.customer.number }} - {{ item.customer.name }}</h3>
              </li>
              <li class="uk-width-expand text-center">
                <span class="a-table-text relative blue-text cursor-pointer" @click="toggleModal(index)">{{ $t('show') }}</span>
              </li>
              <!-- <li class="uk-width-expand text-center">
                <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ formatPrice(item.items_sum_amount) }}</h3>
              </li>
              <li class="uk-width-expand text-center">
                <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ formatPrice(item.items_sum_total_price) }}</h3>
              </li> -->
              <!-- <li class="uk-width-expand text-center">
                <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ formatPrice(item.sale_payments_sum_amount) }}</h3>
              </li> -->
              <li class="uk-width-expand text-center">
                <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ formatPrice(item.sale_pre_payments_sum_amount / 100) }}</h3>
              </li>
              <li class="w-[100px]">
                  <div class="relative">  
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

                    <!-- <v-confirm v-if="confirmDeletion == item.id" classes="right-[100px] left-auto top-[15px] -translate-y-1/2" 
                    :question="$t('are_realy_want_to_delete_this')" @cancel="() => {confirmDeletion = null}" @confirm="deleteCustomer(item.id)" />
  
                    <functions-popup
                      v-if="popUpActive == item.id"
                      additonalClasses="z-[11]"
                      :hideArrow="true"
                    >
                      <template v-slot:FunctionsPopupContent>
                        <div class="flex flex-col space-y-3">
                          <button
                            @click="editCustomer(item)"
                            class="functionsText mainColorText duration-100"
                          >
                            {{$t('edit')}}
                          </button>
                          <button
                            @click="() => { confirmDeletion = item.id, popUpActive = null}"
                            class="text-[#E54D43] functionsText"
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
        </div>
        <div class="wrapper">
          <Skeleton classes='w-full min-h-[500px] ' v-if="isLoading" />
          <NullData :text="$t('nullData')" v-if="isError && !isLoading" classes="min-h-[500px] py-0" />
        </div>
      </div>
    </div>

        <div class="flex justify-end mt-10 wrapper" v-if="!isLoading && !isError">
        <v-pagination
          v-model="params.pagination.page"
          :pages="params.pagination.total"
          :range-size="1"
          @update:modelValue="updatePage"
          :hideFirstButton="true"
          hideLastButton="true"
        />
      </div>

  </section>

  <Filter buttonClass="mt-10" wrapperClass='top-[180px]' :cancelButtonText="$t('clean')">
    <template v-slot:filterBody>
      <div class="w-[300px] grid grid-cols-1 gap-3">
        <div class="relative">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="../../assets/icons/baseIcons/user-square.svg"
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
            src="../../assets/icons/baseIcons/code.svg"
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
  <seeSoldProductsModal :isModalActive="isModalActive" :saleItemsIndex="saleItemsIndex"/>
</template>

<script>
import { onMounted, ref, computed, reactive, watch } from 'vue';

import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { useRouter, useRoute } from 'vue-router'

import PlusIcon from "@/assets/iconsVue/PlusIcon.vue";
import FunctionsIcon from "@/assets/iconsVue/FunctionsIcon.vue";
import SmallArrowRight from "@/assets/iconsVue/SmallArrowRight.vue";

import { salesStore } from '@/store/modules/pages/Sales.js'
import { storeToRefs } from 'pinia'
import formatter from '@/mixins/formatter.js'
import seeSoldProductsModal from './components/seeSoldProductsModal.vue'

export default {
  components: {
    SmallArrowRight,
    PlusIcon,
    FunctionsIcon,
    seeSoldProductsModal,
  },
  setup() {
    const { t, locale } = useI18n()
    const route = useRoute()
    const router = useRouter()
    const toast = useToast()

    const isModalActive = ref(false)
    const sellersList = ref([])
    const isLoading = ref(false)
    const isError = ref(false)
    const popUpActive = ref(null)
    const saleItemsIndex = ref()
    const confirmDeletion = ref(null)
    const productPopup = ref()
    const params = ref({
      currentTable: 'income',
      totalCount: 0,
      pagination: {
        page: 1,
        total: 0,
        limit: 10
      }
    })

    const salesStorage = salesStore()
    const { sale_products } = storeToRefs(salesStorage)

    const {formatPrice} = formatter()


    async function FETCH_CUSTOMERS_LIST() {
        isLoading.value = true
        await salesStorage.GET_SALES().then(response => {

          if(response && response.status && response.status == 200){
            sellersList.value = response.data.data.data
            params.value.totalCount = response.data.data.total
            params.value.pagination.total = response.data.data.total > 9 ? Math.ceil(response.data.data.total / 10) : 1
          }else{
            sError.value = true
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

  
    const toggleModal = (index) => {
      isModalActive.value = !isModalActive.value
      popUpActive.value = null
      saleItemsIndex.value = index
    }

    const togglePopup = (id) => {
        if (popUpActive.value === id) {
            popUpActive.value = null
        } else {
            popUpActive.value = id
        }
    };

    async function updatePage(value) {
      const query = { ...route.query }
      
      router.push({ path: route.fullPath, query: { ...query, page: value } })
      params.value.pagination.page = value
      await FETCH_CUSTOMERS_LIST()
    }

    onMounted( async () => {
        params.value.pagination.page = route.query.page ? route.query.page : 1
        await FETCH_CUSTOMERS_LIST()
    })

     watch(() => salesStorage.refreshSales, async (value) => {
      if(value){
        await FETCH_CUSTOMERS_LIST()

        salesStorage.refreshSales = false
      }
    })

    return {
      popUpActive,
      productPopup,
      togglePopup,
      locale,
      isModalActive,
      saleItemsIndex,
      toggleModal,
      confirmDeletion,
      sellersList,
      params,
      isLoading,
      isError,

      updatePage,
      FETCH_CUSTOMERS_LIST,

      formatPrice,
    };
  },
};
</script>





<style></style>
