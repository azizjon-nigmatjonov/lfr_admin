<template>
  <div class="login">
    <div class="card">
      <div class="card__left">
        <img src="@/assets/logotip.png" alt="logotip" />
      </div>
      <div class="card__right">
        <div class="flex flex-col justify-center">
          <span class="title">Вход в систему</span>
          <div class="mt-6">
            <label class="text-[#ffffff] text-sm">{{ $t('login') }}</label>
            <div class="relative">
              <img
                width="20px"
                class="absolute left-4 top-1/2 -translate-y-1/2 w-[20px]"
                src="@/assets/icons/user-white.svg"
                alt="user"
              />
              <input
                v-model="form.username"
                type="text"
                name="text"
                autocomplete="off"
                required
                placeholder="Логин"
                class="w-full py-[14px] px-[24px] pl-11 focus:outline-none border rounded-[12px] text-white"
                :class="isError ? 'danger-border' : 'border-[#1a283a]'"
              />
              <!-- main-color-black -->
            </div>
          </div>
          <div class="mt-4">
            <label class="text-[#ffffff] text-sm">{{ $t('password') }}</label>
            <div class="relative">
              <img
                width="20px"
                class="absolute left-4 top-1/2 -translate-y-1/2 w-[20px]"
                src="@/assets/icons/baseIcons/lock-white.svg"
                alt="lock"
              />
              <input
                v-model="form.password"
                :type="passwordType ? 'password' : 'text'"
                name="text"
                autocomplete="current-password"
                required
                minlength="8"
                placeholder="Пароль"
                class="w-full py-[14px] px-[24px] pl-11 focus:outline-none border rounded-[12px] text-white"
                :class="isError ? 'danger-border' : 'border-[#1a283a]'"
              />
              <!-- main-color-black -->
              <div @click="() => passwordType = !passwordType" class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
                <img v-if="passwordType" src="@/assets/icons/eye-line-white.svg" class="" alt="svg">
                <img v-else src="@/assets/icons/eye-off-line-white.svg" alt="svg">
              </div>
              <p v-if="isError" class="absolute -bottom-8 whitespace-nowrap danger-text">{{ $t('login_error') }}</p>
            </div>
          </div>
          <button
            @click="signIn"
            class="basicBtn w-[400px] bg-[#03396c] flex justify-center text-white mt-10 text-center hover:bg-[#011f4b] duration-200"
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {authStore} from '../../store/auth';
import { mainStore } from '@/store/main.js';
import { useRouter } from "vue-router";
import {useToast} from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import {ability} from '@/plugins/ability';

export default {
  setup() {
    const router = useRouter()
    const toast = useToast()
    const authStorage = authStore();
    const mainStorage = mainStore();
    const passwordType = ref(true)
    const { t, locale } = useI18n()
    const isError = ref(false)
    const form = {
        username: '',
        password: ''
    }
    
    const signIn = async () => {
      await authStorage.SIGNIN(form).then(async (response) => {
        if (response.data.data.access_token) {
          



      
          
          await authStorage.GET_USER_INFO().then(async response => {
            if (response.status == 200) {
                let path = '/finance'
                let pathFound = false
                locale.value = response.data.data.lang


                  await mainStorage.GET_PERMISSIONS_LIST(response.data.data.role_id).then(response2 => {


                    
                    // ================ THIS BELOW CODE GIVE PERMISSIONS TO USER ================
                    // response2.data.forEach((elem) => {
                    //   elem.action = [true, true, true]
                    // })
                    // ==========================================================================
                    


                    response2.data.forEach((elem, index) => {
                      if(elem.action && elem.action[0] && elem.action[0] == true){
                        elem.action[0] = 'read'          
                        

                        // ================= CHANGE_PATH_SECTION START =================
                        if(!pathFound){
                          switch (elem.section) {
                            case 'sidebar-finance':
                              path = '/finance'
                              pathFound = true
                              break;
                            case 'sidebar-warehouse-raw':
                              path = '/warehouse-raw-material'
                              pathFound = true
                              break;
                            case 'sidebar-warehouse-accessories':
                              path = '/warehouse-accessories'
                              pathFound = true
                              break;
                            case 'sidebar-warehouse-equipment':
                              path = '/warehouse-equipment'
                              pathFound = true
                              break;
                            case 'sidebar-warehouse-tech':
                              path = '/warehouse-machines'
                              pathFound = true
                              break;
                            case 'sidebar-production':
                              path = '/production'
                              pathFound = true
                              break;
                            case 'sidebar-factories-mattress':
                              path = '/mattress'
                              pathFound = true
                              break;
                            case 'sidebar-factories-pillow':
                              path = '/pillow-factory'
                              pathFound = true
                              break;
                            case 'sidebar-factories-sponge':
                              path = '/sponge-factory'
                              pathFound = true
                              break;
                            case 'sidebar-factories-curly-cutting':
                              path = '/curly-cutting-factory'
                              pathFound = true
                              break;
                            case 'sidebar-sellings':
                              path = '/sale'
                              pathFound = true
                              break;
                            case 'sidebar-customers':
                              path = '/customers'
                              pathFound = true
                              break;
                            case 'sidebar-suppliers':
                              path = '/suppliers'
                              pathFound = true
                              break;
                            case 'sidebar-orders':
                              path = '/orders'
                              pathFound = true
                              break;
                            // case 'sidebar-employees':
                            //   path = '/employees'
                            //   pathFound = true
                            //   break;
                            default:
                              break;
                          }
                        }
                        // ================= CHANGE_PATH_SECTION END =================


                      }
                      if(elem.action && elem.action[1] && elem.action[1] == true){
                        elem.action[1] = 'update'
                      }
                      if(elem.action && elem.action[2] && elem.action[2] == true){
                        elem.action[2] = 'delete'
                      }
                    })

                    localStorage.setItem('permissions',  JSON.stringify(response2.data))
                    ability.update(response2.data)

                    // userPermissions.value = response.data
                    // if(userPermissions.value && userPermissions.value.length != 0){
                    //   permissions.value.forEach((elem) => {
                    //     let a = userPermissions.value.find((item) => item.subject == elem.subject)
                    //     elem.action = a.action
                    //   })
                    // }else {
                    //   permissions.value.forEach((elem) => {
                    //     elem.action = [false, false, false]
                    //   })
                    // }
                    // permissionsIntoTwoArrays()

                  })
                  .catch((error) => {
                    console.log(error)
                  })
                isError.value = false
                toast.success(t('successfully_logged'))
                router.push({path: path})
            }
          }) .catch(() => {
              toast.error(t('error-occured'))
          })
          
        }
      })
      .catch(() => {
        isError.value = true
        toast.error(t('error-occured'))
      })
    
    }



    return {
      form,
      signIn,
      passwordType,
      isError
    }
  }
};
</script>

<style></style>
