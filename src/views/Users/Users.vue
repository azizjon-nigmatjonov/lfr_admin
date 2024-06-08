<template>
  <section class="pb-20">



    <!-- =================================================================================================================================================
                                                                    HEADER_SECTION START
    ================================================================================================================================================= -->
    <div class="pt-6 pb-4 wrapper flex items-center justify-between border-b-[1.5px] borderBox dark:border-[#1a283a] ">
      <div>
        <h3 class="sectionTitle">{{$t('users')}}</h3>
        <span class="text-sm text-[#888A8F] mt-2" v-if="usersTotalCount">{{ usersTotalCount }} {{ $t('usersCount') }}</span>
      </div>
      <button @click="toggleModal" class="mainBackgroundColor text-white basicBtn" v-if="$can('read', 'employees-add-modal')">
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
    <div class="a-table" v-if="$can('read', 'employees')">
      <div class="table-1">
        <div class="wrapper border-b-[1.5px] borderBox dark:border-[#1a283a] ">


          <div class="a-table-header">
            <ul class="uk-grid-collapse a-table-list" uk-grid>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('fullname')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('login')}}</h3>
              </li>
              <!-- <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('job')}}</h3>
              </li> -->
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('role')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('created_date')}}</h3>
              </li>
              <li class="w-[120px]">
                <h3 class="a-table-title">{{$t('status')}}</h3>
              </li>
              <li class="w-[100px]">
                <h3 class="a-table-title">{{$t('functions')}}</h3>
              </li>
            </ul>
          </div>


          <div class="a-table-body" v-if="!isLoading && !isError">
            <ul
              v-for="item in usersList"
              class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a]  scroll"
              uk-grid :key="item.id"
            >
              <li class="uk-width-expand">
                <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ item.full_name }}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ item.username }}</h3>
              </li>
              <!-- <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ item.type }}</h3>
              </li> -->
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''" v-if="item.role">{{ item.role.title }}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ $dayjs(item.created_at).format('DD-MM-YYYY') }}</h3>
              </li>
              <li class="w-[120px]">
                <h3 class="px-2 rounded-[4px] text-center" :class="item.status == 'active' ? 'green-background text-white' : 'disabled-background disabled-text'">{{ $t(item.status) }}</h3>
              </li>
              <li class="w-[100px]">
                <div class="relative">
                  <v-confirm v-if="confirmUserDelete == item.id" classes="right-[100px] left-auto top-[15px] -translate-y-1/2" :question="$t('are_realy_want_to_delete_this')" @cancel="() => {confirmUserDelete = null}" @confirm="deleteUser(item.id)" />
                  <div
                    @click="togglePopup(item.id)"
                    class="cursor-pointer flex justify-center w-full" :class="$isDark ? 'text-[#66b2ff]' : 'text-[#5FC7D1]'"
                  >
                    <!-- ref="popUpRef" -->
                    <FunctionsIcon
                      stroke="stroke-[#5FC7D1] z-[1]"
                      width="30"
                      height="30"
                    />
                  </div>

                  <functions-popup v-if="popUpActive == item.id" additonalClasses="z-[11]">
                    <template v-slot:FunctionsPopupContent>
                      <div class="flex flex-col space-y-3">
                        <button
                          @click="freezOrUnfreezUser(item)"
                          class="functionsText duration-100"
                          :class="item.status == 'active' ? 'disabled-text' : 'green-color'"
                        >
                          {{ item.status == 'active' ? $t('freeze') : $t('unFreeze') }}
                        </button>
                        <button
                          @click="editUser(item)"
                          class="functionsText mainColorText duration-100"
                        >
                          {{$t('edit')}}
                        </button>
                        <button
                          @click="() => {
                            confirmUserDelete = item.id,
                            popUpActive = null
                          }"
                          class="text-[#E54D43] functionsText"
                        >
                          {{$t('delete')}}
                        </button>
                      </div>
                    </template>
                  </functions-popup>
                </div>

                  <div
                    @click="togglePopup(index)"
                    v-if="popUpActive == item.id"
                    class="w-[100vw] h-[100vh] z-[10] absolute top-1/2 -translate-y-1/2 right-0"
                  ></div>
              </li>
            </ul>
          </div>



        </div>
      </div>
    </div>
    <!-- =================================================================================================================================================
                                                                    TABLE_SECTION END
    ================================================================================================================================================= -->




    <Skeleton classes="w-full h-[350px]" v-if="isLoading" />
    <null-data :text="$t('nullData')" v-if="isError" />
    <div class="flex justify-center mt-10" v-if="!isLoading && !isError">
          <v-pagination
          v-model="pagination.page"
          :pages="pagination.total"
          :range-size="1"
          @update:modelValue="updatePage"
          :hideFirstButton="true"
          hideLastButton="true"
          />
    </div>
  </section>





  <!-- =================================================================================================================================================
                                                                    MODAL_SECTION START
  ================================================================================================================================================= -->
  <Modal :isModalActive="isModalActive" @close="toggleModal" @submitModal="createOrUpdateUser" :buttonText="$t(textBtn)" width="w-[430px]" 
  v-if="$can('read', 'employees-add-modal')">
    <template v-slot:modalHeader>
      <h3 class="text-lg font-medium text-center main-color-black dark:text-white">
        {{$t($route.query.id ? 'edit_users' : 'add_users')}}
      </h3>
    </template>

    <template v-slot:modalBody>
      <div class="mt-4 space-y-5">

        <div class="relative form-input-anim" :class="$isDark ? 'dark' : ''">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="../../assets/icons/user.svg"
            alt="user"
          />
          <input
            v-model="formUsers.first_name"
            type="text"
            name="text"
            autocomplete="off"
            required
            class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
          />
          <label for="text" class="label-name">
            <span class="content-name">{{$t('name')}}</span>
          </label>
          <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.first_name.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
        </div>

        <div class="relative form-input-anim" :class="$isDark ? 'dark' : ''">
          <img
            class="absolute left-4 top-[33px] -translate-y-1/2"
            src="../../assets/icons/baseIcons/user-square.svg"
            alt="user"
          />
          <input
            v-model="formUsers.last_name"
            type="text"
            name="text"
            autocomplete="off"
            required
            class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
          />
          <label for="text" class="label-name">
            <span class="content-name">{{$t('last_name')}}</span>
          </label>
           <!-- <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.last_name.$errors" :key="error.$uid">{{ $t(error.$message) }}</p> -->
        </div>

         <div class="relative form-input-anim" :class="$isDark ? 'dark' : ''">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="../../assets/icons/baseIcons/user-square-2.svg"
            alt="user"
          />
          <input
            v-model="formUsers.username"
            type="text"
            name="text"
            autocomplete="off"
            required
            class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
          />
          <label for="text" class="label-name">
            <span class="content-name">{{$t('login')}}</span>
          </label>
          <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.username.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
        </div>

        <div class="relative">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="../../assets/icons/baseIcons/user-checked.svg"
            alt="user"
          />
          <vue-select :options="optionRoles" @select="(option) => formUsers.role_id = option" classes="mainColor text-base pl-14"
             :placeholder="$t('roles')" :clearSelection="clearSelection" 
             :selectedElement="formUsers.role?.title" />
          <p class="absolute -bottom-4 whitespace-nowrap danger-text text-sm" v-for="error in validate.role_id.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
        </div>

        <div class="relative form-input-anim" :class="$isDark ? 'dark' : ''" v-if="!$route.query.id">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="../../assets/icons/baseIcons/lock.svg"
            alt="user"
          />
          <input
            v-model="formUsers.password"
            :type="passwordType ? 'password' : 'text'"
            name="password"
            autocomplete="off"
            required
            class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
          />
          <label for="text" class="label-name">
            <span class="content-name">{{$t('password')}}</span>
          </label>
          <div @click="() => passwordType = !passwordType" v-if="formUsers.password && formUsers.password.length > 0" class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
            <img v-if="passwordType" src="../../assets/icons/eye-line.svg" alt="svg">
            <img v-else src="../../assets/icons/eye-off-line.svg" alt="svg">
          </div>
          <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.password.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
        </div>


      </div>
    </template>
  </Modal>
  <!-- =================================================================================================================================================
                                                                    MODAL_SECTION END
  ================================================================================================================================================= -->









</template>

<script>

// ========================= IMPORTS_SECTION START =========================
import { ref, onMounted, computed } from "vue";
import PlusIcon from "@/assets/iconsVue/PlusIcon.vue";
import FunctionsIcon from "@/assets/iconsVue/FunctionsIcon.vue";
import SmallArrowRight from "@/assets/iconsVue/SmallArrowRight.vue";
import Modal from '@/components/base/Modal.vue'

import { usersStore } from '@/store/modules/pages/Users.js';
import { roleStore } from '@/store/modules/pages/Roles.js'

import { useToast } from 'vue-toastification'
import { useRouter, useRoute } from "vue-router";

import VConfirm from '../../components/base/v-confirm.vue';
import dayjs from 'dayjs'
import useVuelidate from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'
// ========================= IMPORTS_SECTION END =========================


export default {
  components: {



    // ========================= COMPONENTS_DEFINE_SECTION START =========================
    SmallArrowRight,
    PlusIcon,
    FunctionsIcon,
    Modal,
    VConfirm,
    // ========================= COMPONENTS_DEFINE_SECTION END =========================



  },
  setup() {




    // ========================= PRIMARY_DATA_SECTION START =========================
    const router = useRouter()
    const route = useRoute()
    const popUpActive = ref(null);
    const isModalActive = ref(false)
    const toast = useToast()
    const usersStorage = usersStore();
    const roleStorage = roleStore()
    const usersTotalCount = ref(null)
    const usersList = ref([])
    const optionRoles = ref([])
    const textBtn = ref('сonfirm')
    const confirmUserDelete = ref(null)
    const isError = ref(false)
    const isLoading = ref(false)
    const { t } = useI18n()
    const passwordType = ref(true)
    const pagination = ref({
      page: 1,
      total: 1,
      per_page: 10
    })
    const formUsers = ref({
      first_name: '',
      last_name: '',
      username: '',
      type: 'user',
      role_id: null,
      password: '',
      created_at: dayjs().format('YYYY-MM-DD')
    })
    let clearSelection = ref(false)
    // ========================= PRIMARY_DATA_SECTION END =========================







    // ========================= VALIDATION_SECTION START =========================
    const rules = computed(() => {
      return {
        first_name: { 
          required: helpers.withMessage('Пожалуйста, введите имя', required),
          minLength: helpers.withMessage('Пожалуйста, введите минимум 3 чисел', minLength(3)),
        },
        // last_name: { 
        //   required,
        //   minLength: minLength(3)
        // },
        username: { 
          required: helpers.withMessage('Пожалуйста, введите логин', required),
          minLength: helpers.withMessage('Пожалуйста, введите минимум 3 чисел', minLength(3)),
        },
        role_id: { 
          required: helpers.withMessage('Пожалуйста, выберите роль', required),
        },
        password: { 
          required: helpers.withMessage('Пожалуйста, введите пароль', required),
          minLength: helpers.withMessage('Пожалуйста, введите минимум 4 чисел', minLength(4)),
        }
      }
    })
    const validate = useVuelidate(rules, formUsers)
    // ========================= VALIDATION_SECTION END =========================








    // ========================= POPUP_AND_MODAL_SECTION START =========================
    const togglePopup = (id) => {
      if (popUpActive.value === id) {
        popUpActive.value = null
      } else {
        popUpActive.value = id
      }
    };

    const toggleModal = () => {
      validate.value.$reset()
      isModalActive.value = !isModalActive.value
      router.replace('/users')
      popUpActive.value = null
      if (!isModalActive.value) {
        formUsers.value = {
          first_name: '',
          last_name: '',
          username: '',
          type: 'user',
          role_id: null,
          password: '',
          created_at: '2022-09-16'
        }
      }
      if (!route.query.id) {
        textBtn.value = 'сonfirm'
      }
    }
    // ========================= POPUP_AND_MODAL_SECTION END =========================







    // ========================= GET_SECTION START =========================
    const getUsersList = async () => {
      isLoading.value = true
      const params = {
        page: pagination.value.page,
        per_page: pagination.value.per_page
      }
      await usersStorage.GET_USERS_LIST(params).then(response => {
        usersTotalCount.value = response.data.data.total
        pagination.value.total = response.data.data.total > 9 ? Math.ceil(response.data.data.total / 10) : 1
        usersList.value = response.data.data.data
        if (!response.data.data) {
          isError.value = true
        }
      })
      .catch(() => {
        setTimeout(() => {
          isError.value = true
        }, 500);
        isLoading.value = false
      })
      .finally(() => {
        isLoading.value = false
      })
    }

    const getRoleList = async () => {
      await roleStorage.GET_ROLES_LIST().then(response => {
        optionRoles.value = response.data.data
      })
    }
    // ========================= GET_SECTION END =========================









    // ========================= CREATE_OR_UPDATE_SECTION START =========================
    const createOrUpdateUser = async () => {
      clearSelection.value = true

      const result = await validate.value.$validate()
        if (route.query.id) { 
            const params = {
              first_name: formUsers.value.first_name,
              username: formUsers.value.username,
              role_id: formUsers.value.role_id.id,
              password: formUsers.value.password,
            }

            if(formUsers.value.last_name != ''){
              params.last_name = formUsers.value.last_name
            }

            await usersStorage.UPDATE_USER({data: params, id: route.query.id}).then( async response => {
              if (response.status == 200) {
                toast.success(t('successfully-edited'))
                await getUsersList()
                await toggleModal()
              }
            }) 
            .catch(() => {
              toast.error(t('error-occured'))
            })
        } else {
          if (result) {
            const params = {
              first_name: formUsers.value.first_name,
              username: formUsers.value.username,
              role_id: formUsers.value.role_id.id,
              password: formUsers.value.password,
              type: 'user',
              created_at: dayjs().format('YYYY-MM-DD')
            }
            textBtn.value = 'confirm'

            if(formUsers.value.last_name != ''){
              params.last_name = formUsers.value.last_name
            }

            await usersStorage.CREATE_USER({...params, role_id: formUsers.value.role_id.id})
            .then( async response => {
              if (response.status == 200) {
                toast.success(t('successfully-added'))
                await getUsersList()
                await toggleModal()
              }else{
                toast.error(response.response.data.message)
              }
            }) 
            .catch(() => {
              toast.error(t('error-occured'))
            })
          }
        }

      clearSelection.value = false
    }
    // ========================= CREATE_OR_UPDATE_SECTION START =========================










    // ========================= OTHERS_SECTION START =========================
    const deleteUser = async (id) => {
      confirmUserDelete.value = null
      await usersStorage.DELETE_USER(id).then( async () => {
        await getUsersList()
        toast.success(t('successfully-deleted'))
      })
    }

    const editUser = async (user) => {
      formUsers.value = user
      textBtn.value = 'edit'
      isModalActive.value = !isModalActive.value
      router.replace(`/users?id=${user.id}`)
      popUpActive.value = null
      // formUsers.role_id = user.role
    }

    const freezOrUnfreezUser = async (user) => {
      let userStatus = false
      if (user.status == 'active') {
        userStatus = false
      } else {
        userStatus = true
      }
      await usersStorage.FREEZ_OR_UNFREEZ_USER({data: { status: userStatus }, id: user.id}).then( async (response) => {
          await getUsersList()
          popUpActive.value = null
      })
    }

    async function updatePage(value) {
        pagination.value.page = value
        await getUsersList()
    }
    // ========================= OTHERS_SECTION END =========================









    // ========================= MOUNTED_SECTION START =========================
    onMounted( async () => {
      await getUsersList()
      await getRoleList()
    })
    // ========================= MOUNTED_SECTION END =========================






    return {
      popUpActive,
      togglePopup,
      toggleModal,
      isModalActive,
      usersList,
      formUsers,
      optionRoles,
      createOrUpdateUser,
      deleteUser,
      editUser,
      textBtn,
      freezOrUnfreezUser,
      usersTotalCount,
      confirmUserDelete,
      isError,
      isLoading,
      validate,
      passwordType,
      pagination,
      updatePage,

      clearSelection,
    };
  },
};
</script>

<style></style>
