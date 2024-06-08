<template>
   <Modal :isModalActive="isModalActive" @close="toggleModal" @submitModal="onSubmitModal" width="w-[900]">

    <template v-slot:modalHeader>
      <h3 class="text-lg font-medium text-center main-color-black dark:text-white">
        {{$t('product_select')}}
      </h3>
    </template>

    <template v-slot:modalBody>
      <div class="mt-4 grid grid-cols-2 gap-5">

        <div class="relative">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="../../assets/icons/baseIcons/type.svg"
            alt="user"
          />
          <vue-select :options="categoriesList" @select="categorySelected($event)" :clearSelection="clearSelection" 
          :selectedElement="form.category_title" :placeholder="$t('product_category')" classes="main-color-black pl-11" />
          <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validateProduct.category_id.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
        </div>


        <div class="relative">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="../../assets/icons/baseIcons/product.svg"
            alt="user"
          />
          <vue-select :options="productsList"
           :optionsPagination="params" 
           @refresh="refresh($event)"
           @select="productSelected($event)" :clearSelection="clearSelection" :selectedElement="form.product_title" 
           classes="main-color-black pl-11" :placeholder="$t('product')" />
          <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validateProduct.factory_product_id.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
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
          <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validateProduct.amount.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
        </div>
 

        <div class="form-input-anim relative" :class="$isDark ? 'dark' : ''">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="../../assets/icons/baseIcons/fatrows.svg"
            alt="user"
          />
          <input
            v-model="form.length"
            @input="formatPrice(form.length, 'length')" onkeypress="return /[0-9,/.]/i.test(event.key)"
            autocomplete="off"
            required
            class="mt-1 w-full py-[14px] px-[24px] pl-12 focus:outline-none border-[1.5px] borderBox dark:border-[#1a283a] rounded-[12px] text-lg placeholder"
            :class="$isDark ? 'dark' : 'light'"
          />
          <label for="text" class="label-name">
            <span class="content-name">{{$t('length')}}</span>
          </label>
          <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validateProduct.length.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
        </div>


        <div class="form-input-anim relative" :class="$isDark ? 'dark' : ''">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="../../assets/icons/baseIcons/row-vertical.svg"
            alt="user"
          />
          <input
            v-model="form.width"
            @input="formatPrice(form.width, 'width')" onkeypress="return /[0-9,/.]/i.test(event.key)"
            autocomplete="off"
            required
            class="mt-1 w-full py-[14px] px-[24px] pl-12 focus:outline-none border-[1.5px] borderBox dark:border-[#1a283a] rounded-[12px] text-lg placeholder"
            :class="$isDark ? 'dark' : 'light'"
          />
          <label for="text" class="label-name">
            <span class="content-name">{{$t('width')}}</span>
          </label>
          <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validateProduct.width.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
        </div>



        <div class="form-input-anim relative" :class="$isDark ? 'dark' : ''">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="../../assets/icons/baseIcons/row-horizontal.svg"
            alt="user"
          />
          <input
            v-model="form.height"
            @input="formatPrice(form.height, 'height')" onkeypress="return /[0-9,/.]/i.test(event.key)"
            autocomplete="off"
            required
            class="mt-1 w-full py-[14px] px-[24px] pl-12 focus:outline-none border-[1.5px] borderBox dark:border-[#1a283a] rounded-[12px] text-lg placeholder"
            :class="$isDark ? 'dark' : 'light'"
          />
          <label for="text" class="label-name">
            <span class="content-name">{{$t('thickness')}}</span>
          </label>
          <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validateProduct.height.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
        </div>

       
        <!-- <div class="grid grid-cols-2 gap-5"> -->
          <div class="form-input-anim relative form-input-anim2" :class="$isDark ? 'dark' : ''">
            <img
              class="absolute left-4 top-1/2 -translate-y-1/2"
              src="../../assets/icons/baseIcons/box.svg"
              alt="user"
            />
              <!-- :disabled="true" -->
            <input
              v-model="totalCube"
              type="text"
              readonly
              :disabled="true"
              autocomplete="off"
              required
              class="mt-1 w-full py-[14px] px-[24px] pl-12 focus:outline-none border-[1.5px] borderBox dark:border-[#1a283a] rounded-[12px] text-lg placeholder"
              :class="$isDark ? 'dark' : 'light'"
            />
            <label for="text" class="label-name">
              <span class="content-name">{{$t('cube')}}</span>
            </label>
            <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validateProduct.cube.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
          </div>


          <!-- <div class="relative">
            <img
              class="absolute left-4 top-1/2 -translate-y-1/2"
              src="../../assets/icons/allMoney.svg"
              alt="user"
            />
            <vue-select :options="rawPartyNumOptions" @select="(option) => form.product_id = option.id"
            :clearSelection="clearSelection" classes="main-color-black pl-11" :placeholder="$t('units')" />
            <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validateProduct.product_id.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
          </div>
        </div> -->


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
            <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validateProduct.price.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
          </div>



          <div class="form-input-anim relative form-input-anim2" :class="$isDark ? 'dark' : ''">
            <img
              class="absolute left-4 top-1/2 -translate-y-1/2"
              src="../../assets/icons/allMoney.svg"
              alt="user"
            />
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
            <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validateProduct.total_price.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
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

import { codebaseStore } from '@/store/modules/pages/Codebase.js'
import { useToast } from 'vue-toastification'
import dayjs from 'dayjs';
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { factoryProductStore } from '@/store/modules/FactoryProduct.js'
import { salesStore } from '@/store/modules/pages/Sales.js'
import { storeToRefs } from 'pinia'


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
      const codebaseStorage = codebaseStore()
      const factoryProductStorage = factoryProductStore()
      const salesStorage = salesStore()
      const { sale_products, saleProductIndex } = storeToRefs(salesStorage)


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
        context.emit('closeModal')
      };
      

      const categoriesList = ref([])
      const productsList = ref([])


      let form = ref({
        category_id: '',
        factory_product_id: '',
        category_title: '',
        product_title: '',
        amount: '',
        length: '',
        width: '',
        height: '',
        cube: '',
        price: '',
        total_price: ''
      })


      const rules = computed(() => {
          return {
              category_id: {
                  required: helpers.withMessage('Пожалуйста, выберите категорию продукта', required)
              },
              factory_product_id: {
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
              length: {
                required: helpers.withMessage('Пожалуйста, выберите валюту', required)
              },
              height: {
                required: helpers.withMessage('Пожалуйста, выберите валюту', required)
              },
              width: {
                required: helpers.withMessage('Пожалуйста, выберите валюту', required)
              },
              cube: {
                required: helpers.withMessage('Пожалуйста, выберите валюту', required)
              },
          }
      })
      const validateProduct = useVuelidate(rules, form)

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
      
      //     if(type == 'amount'){
      //       form.value.amount = currency
      //     }else if(type == 'price'){
      //       form.value.price = currency
      //     }else if(type == 'total_price'){
      //       return currency
      //     }else if(type == 'length'){
      //       form.value.length = currency
      //     }else if(type == 'width'){
      //       form.value.width = currency
      //     }else if(type == 'height'){
      //       form.value.height = currency
      //     }else if(type == 'cube'){
      //       return currency
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
              }else if(type == 'price'){
                form.value.price = currency
              }else if(type == 'total_price'){
                return currency
              }else if(type == 'length'){
                form.value.length = currency
              }else if(type == 'width'){
                form.value.width = currency
              }else if(type == 'height'){
                form.value.height = currency
              }else if(type == 'cube'){
                return currency
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
            }else if(type == 'length'){
              form.value.length = currency
            }else if(type == 'width'){
              form.value.width = currency
            }else if(type == 'height'){
              form.value.height = currency
            }else if(type == 'cube'){
              return currency
            }

          }
        }
        return 0;
      }
      // ========== PRICE_FORMATTER END ==========









      const totalPrice = computed(() => {
        if(form.value.amount && form.value.price && form.value.cube){
          let amount = form.value.amount.toString().replace(/,/g, '');
          let price = form.value.price.toString().replace(/,/g, '');
          let cube = form.value.cube.toString().replace(/,/g, '');
          
          if (amount && price) {
              let total_price = amount * price * cube
              form.value.total_price = formatPrice(total_price, 'total_price')
              return form.value.total_price;
          }
        }else{
          return 0
        }
      });
      
      
      const totalCube = computed(() => {
        if(form.value.length && form.value.width && form.value.height){
          let length = form.value.length.toString().replace(/,/g, '');
          let width = form.value.width.toString().replace(/,/g, '');
          let height = form.value.height.toString().replace(/,/g, '');
          
          if (length && width && height) {
              let cube = length * width * height
              form.value.cube = formatPrice(cube, 'cube')
              return form.value.cube;
          }
        }else{
          return 0
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
            if(elem.type == 'foam-rubber'){
              return elem
            }
            

            // else if(elem.type == 'sponge'){
            //   return elem
            // }else if(elem.type == 'mattress'){
            //   return elem
            // }else if(elem.type == 'curly-cutting'){
            //   return elem
            // }else if(elem.type == 'pillow'){
            //   return elem
            // }

           
          })
        })
      }

      const refresh = async (event) => {
        let factory = categoriesList.value.find((elem) => elem.id == form.value.category_id)
        await getStoreReadyProducts(factory.type)
      }


      const getStoreReadyProducts = async (factory) => {
        const data = {
            sort_key: 'created_at',
            sort_type: 'desc',
            per_page: 10, 
            page: params.value.pagination.page, 
            factory: factory,
            product_case: 'ready'
        }
        await factoryProductStorage.GET_FACTORY_PRODUCT(data).then(response => {
          productsList.value = response.data.data.data.map(item => {
            return {
              title: item.product && item.product[`name_${locale.value}`] ? item.product[`name_${locale.value}`] : '',
              ...item
            }
          })

          params.value.pagination.total = response.data.data.total > 9 ? Math.ceil(response.data.data.total / 10) : 1
        })
      }




      const categorySelected = async (option) => {
        form.value.category_title = option.title
        form.value.category_id = option.id
        getStoreReadyProducts(option.type)
      }


      const productSelected = async (option) => {
        form.value.factory_product_id = option.id
        form.value.product_title = option.title
      }


      getProductCategories()


      const onSubmitModal = async() => {
        clearSelection.value = true

        const result = await validateProduct.value.$validate()

        form.value.created_at = dayjs(form.value.created_at).format('YYYY-MM-DD HH:mm:ss');
        form.value.amount = Number(form.value.amount.toString().replace(/,/g, ''));
        form.value.price = Number(form.value.price.toString().replace(/,/g, ''));
        form.value.total_price = Number(form.value.total_price.toString().replace(/,/g, ''));
        
        form.value.length = Number(form.value.length.toString().replace(/,/g, ''));
        form.value.width = Number(form.value.width.toString().replace(/,/g, ''));
        form.value.height = Number(form.value.height.toString().replace(/,/g, ''));
        form.value.cube = Number(form.value.cube.toString().replace(/,/g, ''));


        if(result){
          sale_products.value.splice(saleProductIndex.value, 1)

          sale_products.value.splice(saleProductIndex.value, 0, {
            category_id: form.value.category_id,
            factory_product_id: form.value.factory_product_id,
            category_title: form.value.category_title,
            product_title: form.value.product_title,
            amount: form.value.amount,
            length: form.value.length,
            width: form.value.width,
            height: form.value.height,
            cube: form.value.cube,
            price: form.value.price,
            total_price: form.value.total_price,
            title: form.value.title
          });


          form.value.category_id = ''
          form.value.factory_product_id = ''
          form.value.category_title = ''
          form.value.product_title = ''
          form.value.amount = ''
          form.value.price = ''
          form.value.total_price = ''
          form.value.length = ''
          form.value.width = ''
          form.value.height = ''
          form.value.cube = ''
          form.value.created_at = ''


          validateProduct.value.$reset()
          toast.success(t('successfully-added'))
          toggleModal()
        }
        clearSelection.value = false
      }





      watch(props, async (value) => {
        if(value.sale_product_item){
          // await getProductCategories()
          form.value.category_id = value.sale_product_item.category_id
          
          let factory = categoriesList.value.find((elem) => elem.id == form.value.category_id)

          if(factory && factory.type){
            await getStoreReadyProducts(factory.type)
          }

          form.value.factory_product_id = value.sale_product_item.factory_product_id
          form.value.category_title = value.sale_product_item.category_title
          form.value.product_title = value.sale_product_item.product_title
          form.value.amount = value.sale_product_item.amount
          form.value.length = value.sale_product_item.length
          form.value.width = value.sale_product_item.width
          form.value.height = value.sale_product_item.height
          form.value.cube = value.sale_product_item.cube
          form.value.price = value.sale_product_item.price
          form.value.total_price = value.sale_product_item.total_price
        }
      })






        

        return {
          toggleModal,


          productsList,
          rawPartyNumOptions,
          validateProduct,
          form,
          categoriesList,
          categorySelected,
          productSelected,
          currensies,

          onSubmitModal,

          locale,
          params,
          formatPrice,
          totalPrice,
          totalCube,

          clearSelection,
          refresh,
          saleProductIndex,
        };
    }
}
</script>

<style>

</style>