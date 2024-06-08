<template>
   <Modal :isModalActive="isModalActive" @close="toggleModal" @submitModal="onSubmitModal" width="w-[600px]">

    <template v-slot:modalHeader>
      <h3 class="text-lg font-medium text-center main-color-black dark:text-white">
        {{$t('add_expense_category')}}
      </h3>
    </template>

    <template v-slot:modalBody>
      <div class="mt-4 grid grid-cols-2 gap-5">



        <div class="form-input-anim relative" :class="$isDark ? 'dark' : ''">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="@/assets/icons/allMoney.svg"
            alt="user"
          />
          <input
            v-model="form.name"
            autocomplete="off"
            required
            class="mt-1 w-full py-[14px] px-[24px] pl-12 focus:outline-none border-[1.5px] borderBox dark:border-[#1a283a] rounded-[12px] text-lg placeholder"
            :class="$isDark ? 'dark' : 'light'"
          />
          <label for="text" class="label-name">
            <span class="content-name">{{$t('title')}}</span>
          </label>
          <!-- <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validateProduct.name.$errors" :key="error.$uid">{{ $t(error.$message) }}</p> -->
        </div>
 


        <div class="relative flex w-full">
          <div class="w-full">
            <img
              class="absolute left-4 top-1/2 -translate-y-1/2"
              src="@/assets/icons/baseIcons/main-component.svg"
              alt="user"
            />
            <vue-select :options="categoriesList" @select="categorySelected($event)" :clearSelection="clearSelection" 
            :placeholder="$t('color')" classes="main-color-black pl-11" />
          </div>
          <!-- <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validateProduct.category_id.$errors" :key="error.$uid">{{ $t(error.$message) }}</p> -->
        </div>
   


        <div class="form-input-anim relative" :class="$isDark ? 'dark' : ''">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="@/assets/icons/baseIcons/row-horizontal.svg"
            alt="user"
          />
          <input
            v-model="form.description"
            autocomplete="off"
            required
            class="mt-1 w-full py-[14px] px-[24px] pl-12 focus:outline-none border-[1.5px] borderBox dark:border-[#1a283a] rounded-[12px] text-lg placeholder"
            :class="$isDark ? 'dark' : 'light'"
          />
          <label for="text" class="label-name">
            <span class="content-name">{{$t('description')}}</span>
          </label>
          <!-- <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validateProduct.description.$errors" :key="error.$uid">{{ $t(error.$message) }}</p> -->
        </div>



      </div>
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
import { salesStore } from '@/store/modules/pages/Sales.js'
import { storeToRefs } from 'pinia'
import { productIncomeToStore } from '@/store/modules/pages/Warehouse'


export default {
    props: {
        isModalActive: {
            type: [Boolean],
            required: true,
        },
        sale_product_item: {
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
        vueSelect

    },
    watch: {
      isModalActive: function (newValue, oldValue) {},
    },
    setup(props, context) {
      const salesStorage = salesStore()
      const { sale_products, saleProductIndex } = storeToRefs(salesStorage)
      const productIncomeStorage = productIncomeToStore()


      const instance = getCurrentInstance();
      const router = useRouter();
      const route = useRoute();
      const { t, locale } = useI18n()
      const toast = useToast()

      let clearSelection = ref(false)


 
    
      const toggleModal = () => {
        context.emit('closeModal')
      };
      

      const categoriesList = ref([
        {title: 'Красный', id: 'red'},
        {title: 'Синий', id: 'blue'},
        {title: 'Жёлтый', id: 'yellow'},
        {title: 'Коричневый', id: 'brown'},
        {title: 'Зелёный', id: 'green'},
        {title: 'Чёрный', id: 'black'},
        {title: 'Фиолетовый', id: 'purple'},
        {title: 'Оранжевый', id: 'orange'},
      ])


      let form = ref({
        name: '',
        color: '',
        description: '',
      })
      let category_title = ref('')

      const rules = computed(() => {
          return {
              name: {
                  required: helpers.withMessage('Пожалуйста, выберите категорию продукта', required)
              },
              color: {
                  required: helpers.withMessage('Пожалуйста, введите цену', required)
              },
              description: {
                required: helpers.withMessage('Пожалуйста, выберите валюту', required)
              },
          }
      })
      // const validateProduct = useVuelidate(rules, form)





      const categorySelected = async (option) => {
        category_title.value = option.title
        form.value.color = option.id
      }





      const onSubmitModal = async() => {
        clearSelection.value = true

        // const result = await validateProduct.value.$validate()



        // if(result){
          await productIncomeStorage.CREATE_EXPENSE_CATEGORY(form.value).then((response) => {

            if(response && response.status && response.status == 200){
              form.value.name = ''
              form.value.color = ''
              form.value.description = ''
              category_title.value = ''
          
  
              productIncomeStorage.refreshExpenseCategories = true
              // validate.value.$reset()
              toast.success(t('successfully-added'))
              toggleModal()
            }

          })

        // }
        clearSelection.value = false
      }




        

        return {
          toggleModal,

          // validateProduct,
          form,
          categoriesList,
          categorySelected,

          onSubmitModal,

          locale,

          clearSelection,
          saleProductIndex,
        };
    }
}
</script>

<style>

</style>