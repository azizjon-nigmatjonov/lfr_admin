<template>
  <section class="pb-20">
    




    <!-- =================================================================================================================================================
                                                                    HEADER_SECTION START
    ================================================================================================================================================= -->
    <div class="pt-6 pb-4 wrapper flex justify-between items-center border-b-[1.5px] borderBox dark:border-[#1a283a] ">
      <div>
        <h3 class="sectionTitle">{{$t('list_of_suppliers')}}</h3>
        <span class="text-sm text-[#888A8F] mt-2">{{ params.totalCount }} шт</span>
      </div>
      <button
        v-if="$can('read', 'suppliers-add-modal')"
        @click="toggleModal()"
        class="mainBackgroundColor text-white basicBtn"
      >
        <PlusIcon stroke="stroke-current mr-2" />
        {{$t('add')}}
      </button>
    </div>
    <!-- =================================================================================================================================================
                                                                    HEADER_SECTION END
    ================================================================================================================================================= -->







    <!-- =================================================================================================================================================
                                                                    TABLE_SECTION START
    ================================================================================================================================================= -->
    <div class="a-table border-b-[1.5px] borderBox dark:border-[#1a283a] min-h-[500px]" v-if="$can('read', 'suppliers')">
      <div class="table-1">
        <div class="wrapper">

          <div class="a-table-header">
            <ul class="uk-grid-collapse a-table-list" uk-grid>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('supplier_number')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('fullname')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('phone_number')}}</h3>
              </li>
              <li class="w-[100px]">
                <h3 class="a-table-title text-center">{{$t('functions')}}</h3>
              </li>
            </ul>
          </div>

          <div class="a-table-body" v-if="!isLoading && !isError">
            <ul
              v-for="(item, index) in suppliersList"
              class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a] "
              uk-grid
              :key="index"
            >
              <li class="uk-width-expand">
                <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{item.number}}</h3>
              </li>
              <!-- <router-link tag="li" class="uk-width-expand" :to="{name: 'CustomersShow', params: { id: index } }">
                <h3 class="a-table-text mainColorText dark:text-[#2597DE]">{{item.name}}</h3>
              </router-link> -->
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ item.name }}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">
                  {{ item.phone }}
                </h3>
              </li>
              <li class="w-[100px]">
                <div class="relative">
                  <div
                    @click="togglePopup(item.id)"
                    class="cursor-pointer flex justify-center w-full" :class="$isDark ? 'text-[#66b2ff]' : 'text-[#5FC7D1]'"
                  >
                    <FunctionsIcon
                      stroke="stroke-[#5FC7D1] z-[1]"
                      width="30"
                      height="30"
                    />
                  </div>

                  <v-confirm v-if="confirmDeletion == item.id" classes="right-[100px] left-auto top-[15px] -translate-y-1/2" 
                  :question="$t('are_realy_want_to_delete_this')" @cancel="() => {confirmDeletion = null}" @confirm="deleteSupplier(item.id)" />
             
                  <functions-popup
                    v-if="popUpActive == item.id"
                    additonalClasses="z-[11]"
                    :hideArrow="true"
                  >
                    <template v-slot:FunctionsPopupContent>
                      <div class="flex flex-col space-y-3">
                        <button
                          @click="editSupplier(item)"
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
                  </functions-popup>
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
    <!-- =================================================================================================================================================
                                                                    TABLE_SECTION END
    ================================================================================================================================================= -->





    <div class="flex justify-end mt-10 wrapper" v-if="!isLoading">
      <v-pagination
        v-model="params.pagination.page"
        :pages="params.pagination.total"
        :range-size="1"
        @update:modelValue="updatePage"
        :hideFirstButton="true"
        hideLastButton="true"
      />
    </div>
    <suppliersModal :isModalActive="isModalActive" :formSupplier="formSupplier" v-if="$can('read', 'suppliers-add-modal')"/>
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
  <!-- =================================================================================================================================================
                                                                    FILTER_SECTION END
  ================================================================================================================================================= -->


</template>

<script>


// ========================= IMPORTS_SECTION START =========================
import { onMounted, ref } from 'vue';
import { suppliersStore } from '@/store/modules/pages/Suppliers';

import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { useRouter, useRoute } from 'vue-router'

import suppliersModal from './components/suppliersModal.vue'
import PlusIcon from "@/assets/iconsVue/PlusIcon.vue";
import FunctionsIcon from "@/assets/iconsVue/FunctionsIcon.vue";
import SmallArrowRight from "@/assets/iconsVue/SmallArrowRight.vue";
// ========================= IMPORTS_SECTION END =========================



export default {
  components: {



    // ========================= COMPONENTS_DEFINE_SECTION START =========================
    suppliersModal,
    SmallArrowRight,
    PlusIcon,
    FunctionsIcon,
    // ========================= COMPONENTS_DEFINE_SECTION END =========================



  },
  setup() {





    // ========================= PRIMARY_DATA_SECTION START =========================
    const suppliersStorage = suppliersStore()
    const { t } = useI18n()
    const route = useRoute()
    const router = useRouter()
    const toast = useToast()
    const suppliersList = ref([])
    const popUpActive = ref(null)
    const confirmDeletion = ref(null)
    const isModalActive = ref(false)
    const isLoading = ref(false)
    const isError = ref(false)
    const params = ref({
      currentTable: 'income',
      totalCount: 0,
      pagination: {
        page: 1,
        total: 0,
        limit: 10
      }
    })
    const formSupplier = ref(null)
    // ========================= PRIMARY_DATA_SECTION END =========================








    // ========================= GET_SECTION START =========================
    const FETCH_SUPPLIERS_LIST = async () => {
        isLoading.value = true
        const data = {
          type: 'supplier',
          per_page: 10,
          page: params.value.pagination.page
        }
        await suppliersStorage.GET_SUPPLIERS_OR_CUSTOMERS_LIST(data).then(response => {
          if (!response.data.data.data.length) {
            isError.value = true
          } else {
            isError.value = false
            suppliersList.value = response.data.data.data
            params.value.totalCount = response.data.data.total
            params.value.pagination.total = response.data.data.total > 9 ? Math.ceil(response.data.data.total / 10) : 1
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



    



    // ========================= POPUP_AND_MODAL_SECTION START =========================
    const toggleModal = () => {
      isModalActive.value = !isModalActive.value
      popUpActive.value = null

      if (!isModalActive.value) {
        formSupplier.value = null
      }
    }

    const togglePopup = (id) => {
        if (popUpActive.value === id) {
            popUpActive.value = null
        } else {
            popUpActive.value = id
        }
    };
    // ========================= POPUP_AND_MODAL_SECTION END =========================








    // ========================= OTHERS_SECTION START =========================
    const editSupplier = (data) => {
      formSupplier.value = data
      isModalActive.value = !isModalActive.value
      popUpActive.value = null
      const query = { ...route.query }
      router.push({ path: route.fullPath, query: { ...query, page: params.value.pagination.page, supplier: data.id } })
    }

    const deleteSupplier = async (id) => {
        confirmDeletion.value = null
        await suppliersStorage.DELETE_SUPPLIER(id).then( async () => {
          params.value.pagination.page = 1
          suppliersStorage.updateSupplier = true
          toast.success(t('successfully-deleted'))
          await FETCH_SUPPLIERS_LIST()
        })
    }

    async function updatePage(value) {
      const query = { ...route.query }
      
      router.push({ path: route.fullPath, query: { ...query, page: value } })
      params.value.pagination.page = value
      await FETCH_SUPPLIERS_LIST()
    }
    // ========================= OTHERS_SECTION START =========================






    // ========================= MOUNTED_SECTION START =========================
    onMounted( async () => {
        params.value.pagination.page = route.query.page ? route.query.page : 1
        await FETCH_SUPPLIERS_LIST()
    })
    // ========================= MOUNTED_SECTION END =========================





    return {
      popUpActive,
      togglePopup,
      isModalActive,
      toggleModal,
      confirmDeletion,
      suppliersList,

      params,
      isLoading,
      isError,

      updatePage,
      FETCH_SUPPLIERS_LIST,
      deleteSupplier,
      editSupplier,
      formSupplier,
    };
  },
};
</script>





<style></style>
