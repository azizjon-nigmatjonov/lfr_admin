<template>
  <section class="pb-20">


    <!-- ==============================================================================================================
                                                      HEADER_SECTION START
    ============================================================================================================== -->
    <div class="pt-6 pb-4 wrapper flex items-center justify-between border-b-[1.5px] borderBox dark:border-[#1a283a] ">
      <div>
        <h3 class="sectionTitle">
       {{$t('roles')}}
      </h3>
      <span class="text-sm text-[#888A8F] mt-2" v-if="rolesList.length">{{rolesList.length}} ролей</span>
      </div>

      <button @click="toggleModal" class="mainBackgroundColor text-white basicBtn">
        <PlusIcon stroke="stroke-current mr-2" />
        {{$t('add')}}
      </button>
    </div>
    <!-- ==============================================================================================================
                                                      HEADER_SECTION END
    ============================================================================================================== -->






    <!-- =================================================================================================================================================
                                                                  MODAL_SECTION START
    ================================================================================================================================================= -->
    <div class="a-table">
      <div class="table-1">
        <div class="wrapper border-b-[1.5px] borderBox dark:border-[#1a283a] ">


          <div class="a-table-header">
            <ul class="uk-grid-collapse a-table-list" uk-grid>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('date')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('name')}}</h3>
              </li>
              <li class="w-[100px]">
                <h3 class="a-table-title">{{$t('functions')}}</h3>
              </li>
            </ul>
          </div>


          <div class="a-table-body" v-if="!isLoading && !isError">
            <ul
              v-for="item in rolesList"
              class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a] "
              uk-grid :key="item.id"
            >
              <li class="uk-width-expand">
                <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ $dayjs(item.created_at).format('YYYY-MM-DD') }}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ item.title }}</h3>
              </li>
              <li class="w-[100px]">
                <div class="relative">
                   <v-confirm v-if="confirmRoleDelete == item.id" classes="right-[100px] left-auto top-[15px] -translate-y-1/2" :question="$t('are_realy_want_to_delete_this')" @cancel="() => {confirmRoleDelete = null}" @confirm="deleteRole(item)" />
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
                  <functions-popup v-if="popUpActive == item.id" additonalClasses="z-[11]">
                    <template v-slot:FunctionsPopupContent>
                      <div class="flex flex-col space-y-3">
                        <button
                          @click="editRole(item)"
                          class="functionsText mainColorText duration-100"
                        >
                          {{$t('edit')}}
                        </button>
                        <button
                          @click="() => {confirmRoleDelete = item.id, popUpActive = null}"
                          class="text-[#E54D43] functionsText"
                        >
                          {{$t('delete')}}
                        </button>
                      </div>
                    </template>
                  </functions-popup>
                </div>

                  <div
                    v-if="popUpActive == item.id"
                    @click="togglePopup(item.id)"
                    class="w-[100vw] h-[100vh] z-[10] absolute top-1/2 -translate-y-1/2 right-0"
                  ></div>
              </li>
            </ul>
          </div>



        </div>
      </div>
    </div>
    <!-- =================================================================================================================================================
                                                                  MODAL_SECTION END
    ================================================================================================================================================= -->


    <Skeleton classes='w-full h-[350px]' v-if="isLoading" />
    <NullData :text="$t('nullData')" v-if="isError" />
  </section>




  <!-- =================================================================================================================================================
                                                                  MODAL_SECTION START
  ================================================================================================================================================= -->
  <Modal :isModalActive="isModalActive" @close="toggleModal" @submitModal="submitModal" :buttonText="$t(textBtn)" :outsideClose="true" width="w-[430px]">
    <template v-slot:modalHeader>
      <h3 class="text-lg font-medium text-center main-color-black dark:text-white">
        {{textBtn == 'сonfirm' ? $t('add_roles') : $t('edit_roles')}}
      </h3>
    </template>

    <template v-slot:modalBody>
      <div class="mt-9 space-y-3">
        <div class="relative mb-2 form-input-anim">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="../../assets/icons/baseIcons/user-square-2.svg"
            alt="user"
          />
           <input
            type="text"
            name="text"
            autocomplete="off"
            required
            v-model="formRoles.title"
            class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
          />
          <label for="text" class="label-name">
            <span class="content-name">{{$t('title')}}</span>
          </label>
          <p class="absolute -bottom-6 danger-text text-sm" v-for="error in v$.title.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
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
import { useToast } from 'vue-toastification'
import { roleStore } from '@/store/modules/pages/Roles.js';
import { useRouter, useRoute } from "vue-router";
import VConfirm from '../../components/base/v-confirm.vue';
import VInput from '../../components/base/v-input.vue'

import useVuelidate from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'
// ========================= IMPORTS_SECTION END =========================


export default {
  components: {



    // ========================= COMPONENTS_DEFINE_SECTION END =========================
    SmallArrowRight,
    PlusIcon,
    FunctionsIcon,
    Modal,
    VConfirm,
    VInput
    // ========================= COMPONENTS_DEFINE_SECTION END =========================



  },
  setup() {




    // ========================= PRIMARY_DATA_SECTION START =========================
    const router = useRouter()
    const route = useRoute()
    const popUpActive = ref(null);
    const isModalActive = ref(false)
    const toast = useToast()
    const roleStorage = roleStore();
    const rolesList = ref([])
    const textBtn = ref('сonfirm')
    const confirmRoleDelete = ref(null)
    const isLoading = ref(false)
    const isError = ref(false)
    const { t } = useI18n()
    let formRoles = ref({
      title: '',
    })
    // ========================= PRIMARY_DATA_SECTION END =========================







    // ========================= VALIDATION_SECTION START =========================
    const rules = computed(() => {
      return {
        title: { 
          required: helpers.withMessage('Пожалуйста, введите название', required),
          minLength: helpers.withMessage('Пожалуйста, введите минимум 3 чисел', minLength(3)),
        }
      }
    })
    const v$ = useVuelidate(rules, formRoles)
    // ========================= VALIDATION_SECTION END =========================








    // ========================= POPUP_AND_MODALS_SECTION START =========================
    const togglePopup = (id) => {
      if (popUpActive.value === id) {
        popUpActive.value = null
      } else {
        popUpActive.value = id
      }
    };
    const toggleModal = () => {
      isModalActive.value = !isModalActive.value
      router.replace('/roles')
      popUpActive.value = null

      if (!isModalActive.value) {
        formRoles.value = {
          title: ''
        }
      }
      if (!route.query.id) {
        textBtn.value = 'сonfirm'
      }
    }
    // ========================= POPUP_AND_MODALS_SECTION END =========================






    // ========================= GET_UPDATE_AND_DELETE_ROLES_SECTION START =========================
    const getRoleList = async () => {
      isLoading.value = true
      await roleStorage.GET_ROLES_LIST().then(response => {
        rolesList.value = response.data.data.sort((a, b) => a.created_at < b.created_at ? 1 : -1)
        if (!response.data.data.length) {
          isError.value = true
        }else{
          isError.value = false
        }
      })
      .catch(() => {
        isLoading.value = false
        setTimeout(() => {
          isError.value = true
        }, 500);
      })
      .finally(() => {
        isLoading.value = false
      })
    }
    const editRole = async (role) => {
      formRoles.value = role
      textBtn.value = 'edit'
      isModalActive.value = !isModalActive.value
      popUpActive.value = null
      router.replace(`/roles?id=${role.id}`)
    }
    const deleteRole = async (role) => {
      await roleStorage.DELETE_ROLE(role).then(response => {
          if (response.status == 200) {
            confirmRoleDelete.value = null
            toast.success(t('successfully-deleted'))
            getRoleList()
          }
        }) 
        .catch(error => {
          toast.error(t('error-occured'))
          console.error(error)
        })
    }
    // ========================= GET_UPDATE_AND_DELETE_ROLES_SECTION END =========================










    // ========================= ON_SUBMIT_SECTION START =========================
    const submitModal = async () => {
      const result = await v$.value.$validate()
      if (result) {
        if (route.query.id) {
          await roleStorage.EDIT_ROLE(formRoles.value).then( async response => {
            if (response.status == 200) {
              toast.success(t('successfully-edited'))
              await getRoleList()
              await toggleModal()
            }
          }) 
          .catch(() => {
            toast.error(t('error-occured'))
          })
        } else {
          await roleStorage.POST_NEW_ROLE(formRoles.value).then(async response => {
            if (response.status == 200) {
              toast.success(t('successfully-added'))
              setTimeout(async() => {
                await getRoleList()
              }, 500)
              await toggleModal()
            }
          }) 
          .catch(() => {
            toast.error(t('error-occured'))
          })
        }
        v$.value.$reset()
      }
    }
    // ========================= ON_SUBMIT_SECTION END =========================






    
    // ========================= MOUNTED_SECTION START =========================
    onMounted( async () => {
      await getRoleList()
    })
    // ========================= MOUNTED_SECTION END =========================




    return {
      popUpActive,
      togglePopup,
      isModalActive,
      toggleModal,
      formRoles,
      submitModal,
      rolesList,
      textBtn,
      editRole,
      deleteRole,
      confirmRoleDelete,
      v$,
      isLoading,
      isError
    }
  }
}
</script>

<style></style>
