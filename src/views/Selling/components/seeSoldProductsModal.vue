<template>
   <Modal :isModalActive="isModalActive" @close="toggleModal" width="w-[1200px]" :outsideClose="true" :footerHide="true">

    <template v-slot:modalHeader>
      <h3 class="text-lg font-medium text-center main-color-black dark:text-white">
        {{$t('sold_products')}}
      </h3>
    </template>

    <template v-slot:modalBody>
      <div class="mt-4 space-y-5" v-if="sales && sales[saleItemsIndex] && sales[saleItemsIndex].items">

        <div class="a-table border-b-[1.5px] borderBox dark:border-[#1a283a] min-h-[500px] mb-10" v-if="$can('read', 'sellings')">
          <div class="table-1">
            <div class="wrapper">
              <div class="a-table-header">
                <ul class="uk-grid-collapse a-table-list" uk-grid>
                  <li class="uk-width-expand">
                    <h3 class="a-table-title">Код</h3>
                  </li>
                  <li class="uk-width-expand">
                    <h3 class="a-table-title">{{$t('title')}}</h3>
                  </li>
                  <li class="uk-width-expand">
                    <h3 class="a-table-title">{{$t('length')}}</h3>
                  </li>
                  <li class="uk-width-expand">
                    <h3 class="a-table-title">{{$t('width')}}</h3>
                  </li>
                  <li class="uk-width-expand">
                    <h3 class="a-table-title">{{$t('height')}}</h3>
                  </li>
                  <li class="uk-width-expand">
                    <h3 class="a-table-title">{{$t('cube')}}</h3>
                  </li>
                  <li class="uk-width-expand">
                    <h3 class="a-table-title">{{$t('amount')}}</h3>
                  </li>
                  <li class="uk-width-expand">
                    <h3 class="a-table-title">{{$t('price_per_item')}}</h3>
                  </li>
                  <li class="uk-width-expand">
                    <h3 class="a-table-title">{{$t('currency')}}</h3>
                  </li>
                  <li class="uk-width-expand">
                    <h3 class="a-table-title">{{$t('exchange_rate')}}</h3>
                  </li>
                  <li class="uk-width-expand">
                    <h3 class="a-table-title">{{$t('total_sum')}}</h3>
                  </li>
                </ul>
              </div>

              <div class="a-table-body" v-if="!isLoading && !isError">
                <ul
                  v-for="(item, index) in sales[saleItemsIndex].items"
                  class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a] "
                  uk-grid
                  :key="index"
                >
                  <li class="uk-width-expand">
                    <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ item.product.code }}</h3>
                  </li>
                  <li class="uk-width-expand">
                    <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ item.product?.name_ru }}</h3>
                  </li>
                  <li class="uk-width-expand">
                    <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ formatPrice(item.length) }}</h3>
                  </li>
                  <li class="uk-width-expand">
                    <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ formatPrice(item.width) }}</h3>
                  </li>
                  <li class="uk-width-expand">
                    <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ formatPrice(item.height) }}</h3>
                  </li>
                  <li class="uk-width-expand">
                    <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ formatPrice(item.length * item.width * item.height) }}</h3>
                  </li>
                  <li class="uk-width-expand">
                    <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ formatPrice(item.amount) }}</h3>
                  </li>
                  <li class="uk-width-expand">
                    <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ formatPrice(item.price) }}</h3>
                  </li>
                  <li class="uk-width-expand">
                    <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ item.currency }}</h3>
                  </li>
                  <li class="uk-width-expand">
                    <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ formatPrice(item.current_currency) }}</h3>
                  </li>
                  <li class="uk-width-expand">
                    <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ formatPrice(item.total_price) }}</h3>
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




      </div>
    </template>
  </Modal>
</template>

<script>
import { getCurrentInstance, watchEffect, ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import PlusIcon from "@/assets/iconsVue/PlusIcon.vue";
import Modal from "@/components/base/Modal.vue";
import Notification from "@/components/base/Notification.vue";
import SunIcon from "@/assets/iconsVue/SunIcon.vue";
import Dropdown from "@/components/base/Dropdown.vue";
import MoonIcon from "@/assets/iconsVue/MoonIcon.vue";
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import dayjs from 'dayjs'

import FunctionsIcon from "@/assets/iconsVue/FunctionsIcon.vue";
import SmallArrowRight from "@/assets/iconsVue/SmallArrowRight.vue";

import { salesStore } from '@/store/modules/pages/Sales.js'
import { storeToRefs } from 'pinia'
import formatter from '@/mixins/formatter.js'


export default {
    props: {
        isModalActive: {
            type: [Boolean],
            required: true,
        },
        saleItemsIndex: {
            type: [Boolean],
            required: true,
        },
    },
    components: {
        PlusIcon,
        Modal,
        Notification,
        SunIcon,
        Dropdown,
        MoonIcon,
        FunctionsIcon,

    },
    setup(props, context) {
        const instance = getCurrentInstance();
        const { t, locale } = useI18n()
        const route = useRoute()
        const router = useRouter()
        const toast = useToast()

        const salesStorage = salesStore()
        const { sales } = storeToRefs(salesStorage)

        const {formatPrice} = formatter()

        const toggleModal = () => {
          router.push('/sale?page=1')
          instance.parent.setupState.toggleModal()
        };



        onMounted(() => {

        })

        return {
          locale,

          formatPrice,  
          toggleModal,
          sales,
        };
    }
}
</script>

<style>

</style>