<template>
  <section class="pb-20">
     <input
              v-model="params.search_code"
              v-debounce:500="handleFilterSearchCode"
              type="text"
              name="text"
              autocomplete="off"
              required
              :placeholder="$t('search_by_code')"
              class="w-full py-[14px] px-[24px] pl-12 focus:outline-none blue-text border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
            />
  </section>
</template>

<script>

import { useRouter, useRoute } from 'vue-router'
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    function handleRouter (categoryId, branchId, positionId) {
      router.push(`/codebase?category_id=${categoryId}&branch=${branchId}&position=${positionId}`)
    }

    

    handleRouter()





    // ========================= PRIMARY_DATA_SECTION START =========================
    const { t, locale } = useI18n()
    const codebaseStorage = codebaseStore()
    // const router = useRouter()
    // const route = useRoute()
    const toast = useToast()
    const productsListLeft = ref([])
    const productsListRight = ref([])
    const categoriesList = ref([])
    const createdDate = ref('')
    const currantTable = ref()
    const popUpActive = ref(null)
    const textBtn = ref('confirm')
    const isModalActive = ref(false)
    const confirmDeleteProduct = ref(false)
    const isLoading = ref(false)
    const isError = ref(false)
    const isErrorLeft = ref(false)
    const isErrorRight = ref(false)
    const categoriesPopupActive = ref(false)
    const windowWidth = window.innerWidth
    const params = ref({
      search_name: '',
      search_code: '',
      pagination: {
        page: 1,
        total: 1,
        limit: 10
      }
    });


    const formProduct = ref({
      code: '',
      product_category_id: null,
      name_ru: '',
      created_at: '',
      category: {name_ru: '', name_uz: ''}
    })
    let clearSelection = ref(false)
    // ========================= PRIMARY_DATA_SECTION END =========================










    // ========================= VALIDATION_SECTION START =========================
    const rules = computed(() => {
      return {
        name_ru: {
          required: helpers.withMessage('Пожалуйста, введите имя', required)
        },
        code: { 
          required: helpers.withMessage('Пожалуйста, введите код', required)
        },
        product_category_id: { 
          required: helpers.withMessage('Пожалуйста, выберите категорию', required)
        }
      }
    })
    const validate = useVuelidate(rules, formProduct)
    // ========================= VALIDATION_SECTION END =========================










    // ========================= CHANGE_TABLE_SECTION START =========================
    const changeTable = (e) => {
      router.push(`/codebase?product_category_id=${e}`)
      params.value.pagination.page = 1
      currantTable.value = e
      getProducts(e)
    };
    // ========================= CHANGE_TABLE_SECTION END =========================








    // ========================= POPUP_AND_MODAL_SECTION START =========================
    const togglePopup = (id) => {
      if (popUpActive.value === id) {
        popUpActive.value = null
      } else {
        popUpActive.value = id
      }
    };

    const toggleModal = (product_category_id) => {
      isModalActive.value = !isModalActive.value
      router.replace(`/codebase?product_category_id=${product_category_id ? product_category_id : currantTable.value}`)
      popUpActive.value = null

      if (!isModalActive.value) {
        formProduct.value = {
          code: '',
          product_category_id: null,
          name_ru: '',
        }
        createdDate.value = ''
      }
      if (!route.query.product) {
        textBtn.value = 'сonfirm'
        createdDate.value = new Date
        formProduct.value.product_category_id = currantTable.value
        let a = categoriesList.value.find((e) => e.id == currantTable.value)
        formProduct.value.category = a
      }
    }
    // ========================= POPUP_AND_MODAL_SECTION END =========================








    // ========================= EDIT_AND_DELETE_SECTION START =========================
    const editProduct = async (data) => {
      formProduct.value = data
      createdDate.value = data.created_at
      textBtn.value = 'edit'
      isModalActive.value = !isModalActive.value
      popUpActive.value = null
      router.replace(`/codebase?product_category_id=${currantTable.value}&product=${data.id}`)

      formProduct.value.product_category_id = currantTable.value
      let a = categoriesList.value.find((e) => e.id == currantTable.value)
      formProduct.value.category= a
    }

    const deleteProduct = async (id) => {
      confirmDeleteProduct.value = null
      await codebaseStorage.DELETE_PRODUCT(id).then((response) => {
          if (response.data) {
            codebaseStorage.updateCodebase = true
            toast.success(t('successfully-deleted'))
            getProducts(route.query.product_category_id)
          }
      })
    }
    // ========================= EDIT_AND_DELETE_SECTION END =========================










    // ========================= CREATE_OR_UPDATE_SECTION START =========================
    const createOrUpdateProduct = async () => {
      clearSelection.value = true

      const result = await validate.value.$validate()
      if (result) {
        if (route.query.product) {
          const data = {
            code: formProduct.value.code,
            product_category_id: formProduct.value.product_category_id,
            name_ru: formProduct.value.name_ru,
            created_at: formProduct.value.created_at ? dayjs(formProduct.value.created_at).format('YYYY-MM-DD HH:mm:ss') : dayjs().format('YYYY-MM-DD HH:mm:ss')
          }
          await codebaseStorage.EDIT_PRODUCT({data: data, id: route.query.product}).then(async (response) => {
            if (response && response.status && response.status == '200') {
              validate.value.$reset()
              codebaseStorage.updateCodebase = true
              toast.success(t('successfully-edited'))
              await getProducts(route.query.product_category_id)
              await toggleModal(route.query.product_category_id)
            }else{
              // toast.error(t('error-occured'))
            }

          })
        } else {
          const data = {
            code: formProduct.value.code,
            product_category_id: formProduct.value.product_category_id,
            name_ru: formProduct.value.name_ru,
            created_at: createdDate.value ? dayjs(createdDate.value).format('YYYY-MM-DD HH:mm:ss') : dayjs().format('YYYY-MM-DD HH:mm:ss')
          }
          await codebaseStorage.ADD_PRODUCT(data).then(async (response) => {
            if(response && response.status && response.status == '200'){
              validate.value.$reset()
              codebaseStorage.updateCodebase = true
              toast.success(t('successfully-added'))
              await getProducts(route.query.product_category_id)
              await toggleModal(route.query.product_category_id)
            }else{
              // toast.error(t('error-occured'))
            }
          })
        }
      }

      clearSelection.value = false  
    }
    // ========================= CREATE_OR_UPDATE_SECTION END =========================






    // ========================= GET_SECTION START =========================
    const getProductCategories = async () => {
      await codebaseStorage.GET_PRODUCT_CATEGORIES().then(response => {
        categoriesList.value = response.data.data.sort((a, b) => a > b ? 1 : -1).map(item => {
          return {
            title: item[`name_${locale.value}`],
            ...item
          }
        })
        if (route.query.product_category_id) {
          router.push(route.fullPath)
          currantTable.value = route.query.product_category_id
          setTimeout(() => {
            getProducts(route.query.product_category_id)
          }, 0)
        } else {
          router.push(`/codebase?product_category_id=${response.data.data[0].id}`)
          currantTable.value = response.data.data[0].id
          setTimeout(() => {
            getProducts(response.data.data[0].id)
          }, 0)
        }
      })
    }


    const getProducts = async (product_category_id) => {
      isLoading.value = true
      const data = {
        product_category_id: product_category_id,
        page: params.value.pagination.page,
        per_page: params.value.pagination.limit,
        code: route.query.search_code ? route.query.search_code : '',
        name_ru: route.query.search_name ? route.query.search_name : ''
      }
      await codebaseStorage.GET_PRODUCTS(data).then(response => {
        if (response.status == 200) {
          params.value.pagination.total = response.data.data.total > 9 ? Math.ceil(response.data.data.total / 10) : 1
          if (response.data.data.data.length && response.data.data.data.length < 2) {
            productsListLeft.value = response.data.data.data
            productsListRight.value = []
          } else if (response.data.data.data.length && response.data.data.data.length > 1) {
            productsListLeft.value = response.data.data.data.slice(0, Math.ceil(response.data.data.data.length / 2))
            productsListRight.value = response.data.data.data.slice(Math.ceil(response.data.data.data.length / 2))
          } else {
            productsListLeft.value = []
            productsListRight.value = []
          }
          if (route.query.product) {
            // editProduct(response.data.data.data.filter(item => item.id == route.query.product)[0])
          }
        }
      })
      .catch(() => {
        isErrorLeft.value = true
        isErrorRight.value = true
      })
      .finally(() => {
        isLoading.value = false
      })
    }
    // ========================= GET_SECTION END =========================






    // ========================= OTHERS_SECTION START =========================
    async function updatePage(value) {
      params.value.pagination.page = value
      await getProducts(route.query.product_category_id)
    }

    function handleFilterSearchName(value) {
      router.push(`/codebase?product_category_id=${currantTable.value}&search_name=${value}&search_code=${params.value.search_code}`)
      setTimeout(() => {
        getProducts(route.query.product_category_id)
      }, 500);
    }


    const clearTheFilter = () => {
      params.value.search_name = ''
      params.value.search_code = ''
      router.push(`/codebase?product_category_id=${currantTable.value}`)
      setTimeout(() => {
        getProducts(route.query.product_category_id)
      }, [0])
    }
    // ========================= OTHERS_SECTION END =========================






    // ========================= MOUNTED_SECTION START =========================
    onMounted( async () => {
      await getProductCategories()
    })
    // ========================= MOUNTED_SECTION END =========================




    return {
      formProduct,
      categoriesList,
      isModalActive,
      createdDate,
      productsListLeft,
      productsListRight,
      locale,
      popUpActive,
      textBtn,
      confirmDeleteProduct,
      isLoading,
      isError,
      isErrorLeft,
      isErrorRight,
      validate,
      currantTable,
      params,
      categoriesPopupActive,
      windowWidth,

      changeTable,
      createOrUpdateProduct,
      editProduct,
      deleteProduct,
      toggleModal,
      togglePopup,
      updatePage,
      handleFilterSearchCode,
      handleFilterSearchName,
      clearTheFilter,

      clearSelection,
    }
  },
};
</script>

<style></style>
