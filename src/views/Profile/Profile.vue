<template>
  <div class="mt-5">
    <div class="flex items-center space-x-5 mt-10 wrapper">
      <div class="border w-16 h-16 rounded-full overflow-hidden">
        <img
          src="../../assets/man.png"
          alt=""
          class="w-full h-full object-cover cursor-pointer"
        />
      </div>
      <div>
        <p class="main-color-black text-lg font-[700]">{{userInfo?.full_name}}</p>
        <!-- <span class="text-sm font-medium mainColorText">{{userInfo.role_id}}</span> -->
      </div>
    </div>

    <div class="py-10 flex items-center space-x-8 wrapper">
      <!-- <div
        class="border-[1.5px] borderBox dark:border-[#1a283a]  flex items-center rounded-[12px] py-5 px-6 space-x-6"
      >
        <img src="../../assets/icons/phone.svg" alt="icon" />
        <div>
          <span class="text-sm text-[#888A8F]">{{$t('phone_number')}}</span>
          <div class="flex space-x-6 mt-2">
            <input 
              v-model="userInfo.phone"
              type="phone" 
              readonly 
              name="text"
              autocomplete="off" 
              class="main-color-black font-semibold w-[150px]" 
            />
            <span
              @click="toggleModal('phone')"
              class="cursor-pointer mainColorText mainBorderColor font-medium border-b borderBox dark:border-[#1a283a] "
            >
              {{ $t('change')}}
            </span>
          </div>
        </div>
      </div> -->
      <div
        class="border-[1.5px] borderBox dark:border-[#1a283a]  flex items-center rounded-[12px] py-5 px-6 space-x-6"
      >
        <img src="../../assets/icons/lock.svg" alt="icon" />
        <div>
          <span class="text-sm text-[#888A8F]">{{$t('password')}}</span>
          <div class="flex space-x-6 mt-2">
            <input 
              v-model="currentPassword"
              type="password" 
              readonly 
              name="password"
              autocomplete="off" 
              class="main-color-black font-semibold w-[110px]" 
            />
            <span
              @click="toggleModal('password')"
              class="cursor-pointer mainColorText mainBorderColor font-medium border-b borderBox dark:border-[#1a283a] "
            >
              {{ $t('change')}}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="py-10 border-t-[1.5px] borderBox dark:border-[#1a283a]  wrapper">
      <h3 class="sectionTitle">{{$t('profile_settings')}}</h3>
      <div class="mt-8 grid grid-cols-2 gap-8 w-1/2">
        <div class="form-input-anim relative" :class="$isDark ? 'dark' : ''">
          <img class="absolute left-4 top-1/2 -translate-y-1/2" src="../../assets/icons/baseIcons/user-square.svg" alt="icon">
          <input
            v-model="userInfo.first_name"
            type="text"
            name="text"
            autocomplete="off"
            required
            class="w-full py-[14px] px-[24px] pl-11 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px]"
          />
          <label for="text" class="label-name">
            <span class="content-name">{{$t('your_name')}}</span>
          </label>
        </div>
        <div class="form-input-anim relative" :class="$isDark ? 'dark' : ''">
          <img class="absolute left-4 top-1/2 -translate-y-1/2" src="../../assets/icons/baseIcons/user-square-2.svg" alt="icon">
          <input
            v-model="userInfo.last_name"
            type="text"
            name="text"
            autocomplete="off"
            required
            class="w-full py-[14px] px-[24px] pl-11 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px]"
          />
          <label for="text" class="label-name">
            <span class="content-name">{{$t('your_last_name')}}</span>
          </label>
        </div>
        
        <div>
          <Datepicker :inputClassName="`datepicker ${$isDark ? 'dark' : 'light'}`" menuClassName="dp-custom-menu"
          calendarClassName="dp-custom-calendar" v-model="userInfo.birthday" :placeholder="$t('birth_date')" 
          :locale="userInfo.lang == 'ru' ? 'ru' : 'uz'" :enableTimePicker="false"
          :cancelText="userInfo.lang == 'ru' ? 'Отмена' : 'Bekor qilish'"
          :selectText="userInfo.lang == 'ru' ? 'ОК' : 'Tanlash'"></Datepicker>
        </div>
        <div>
          <div class="relative">
            <div class="absolute left-4 top-1/2 -translate-y-1/2">
              <img v-if="userInfo.gender == true" src="../../assets/icons/men-line.svg" alt="icon">
              <img v-else src="../../assets/icons/women-line.svg" alt="icon">
            </div>
            <vue-select :options="genderList" @select="(option) => userInfo.gender = option.id" :selectedElement="selectedGender" classes="main-color-black text-base pl-11" :placeholder="$t('gender')" />
          </div>
        </div>
      </div>
    </div>

    <div class="py-10 border-t-[1.5px] borderBox dark:border-[#1a283a]  wrapper">
      <h3 class="sectionTitle">{{$t('program_settings')}}</h3>
      <div class="mt-8 grid grid-cols-2 gap-8 w-1/2">
        <div class="relative">
          <div class="absolute left-4 top-1/2 -translate-y-1/2">
            <flag v-if="currentLang == 'ru'" iso="ru" />
            <flag v-else iso="uz" />
          </div>
          <vue-select :options="languages" @select="(option) => currentLang = option.slug" :selectedElement="userInfo.lang" classes="main-color-black text-base pl-11" :placeholder="$t('language')" />
        </div>
      </div>
    </div>

    <div class="py-10 border-t-[1.5px] borderBox dark:border-[#1a283a]  wrapper">
      <h3 class="sectionTitle">{{$t('notifications')}}</h3>
      <div class="mt-8">
        <div class="animateForm">
          <div>
            <label class="relative cursor-pointer">
              <input
                class="uk-checkbox absolute top-1 left-0"
                id="formcheck"
                type="checkbox"
              />
              <p class="ml-8 text-sm font-medium mainColor">
                Разрешить уведомления
              </p>
            </label>
          </div>
        </div>
      </div>

      <button
        @click="submit"
        class="mainBackgroundColor hover:scale-105 duration-200 text-white mt-16 basicBtn"
      >
        {{$t('save')}}
      </button>

    </div>
  </div>

  <Modal :isModalActive="isModalActive" @close="toggleModal" @submitModal="updatePhoneOrPassword" :buttonText="$t('edit')" width="w-[430px]">
    <template v-slot:modalHeader>
      <h3 class="text-lg font-medium text-left main-color-black pr-20">
        {{ $t('editing') }}
      </h3>
    </template>

    <template v-slot:modalBody>
      <div class="mt-4 space-y-5">
        <div v-if="$route.query.phone" class="relative">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="../../assets/icons/phone.svg"
            alt="user"
          />
           <input
            v-model="currentPhone"
            type="text"
            name="phone"
            autocomplete="off"
            required
            :placeholder="$t('phone_number')"
            class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
          />
        </div>

        <div v-if="$route.query.password" class="relative">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="../../assets/icons/lock.svg"
            alt="user"
          />
           <input
            v-model="currentPassword"
            :type="!typePassword ? 'password' : 'text'"
            name="password"
            autocomplete="current-password"
            required
            :placeholder="$t('password')"
            class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
          />
          <div @click="() => typePassword = !typePassword" class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
            <img v-if="typePassword" src="../../assets/icons/eye-line.svg" alt="svg">
            <img v-else src="../../assets/icons/eye-off-line.svg" alt="svg">
          </div>
        </div>
      </div>
    </template>
  </Modal>

</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router'
import { authStore } from '../../store/auth';
import { useToast } from 'vue-toastification'
import dayjs from 'dayjs';
import Modal from '../../components/base/Modal.vue'

import CheckedIcon from "../../assets/iconsVue/CheckedIcon.vue";

export default {
  components: {
    CheckedIcon,
    Modal
  },
  setup() {
    const authStorage = authStore()
    const { locale, t }  = useI18n()
    const router = useRouter()
    const toast = useToast()

    const typePassword = ref(true)
    const password = ref(false);
    const PhoneInputRef = ref(null);
    const PasswordInputRef = ref(null);
    const isModalActive = ref(false)
    const currentPassword = ref('')
    const currentPhone = ref('')
    const currentLang = ref('ru')
    let changePhone = ref(false);

    let userInfo = ref({
      full_name: '',
      phone: '',
      first_name: '',
      last_name: '',
      birthday: '',
      gender: 'male',
      lang: 'ru'
    })
    
    const genderList = reactive([
      {
        id: 1,
        title: 'male'
      },
      {
        id: 0,
        title: 'female'
      }
    ])
    const languages = reactive([
      {
        title: "O'zbekcha",
        slug: 'uz'
      },
      {
        title: "Русский",
        slug: 'ru'
      }
    ])

    const toggleModal = (e) => {
      if (!isModalActive.value) {
        if (e == 'phone') {
          router.replace('/profile?phone=true')
        } else {
          router.replace('/profile?password=true')
        }
      }
      typePassword.value = false
      isModalActive.value = !isModalActive.value
    }

    const changePhoneNumber = () => {
      changePhone.value = !changePhone.value;
      setTimeout(() => {
        PhoneInputRef.value.focus();
      }, 300);
    }

    const handleLanguage = (e) => {
      if (e == "uz"){
          localStorage.setItem('lang', 'uz')
          locale.value = 'uz'
          userInfo.value.lang = 'uz'
      } else {
          localStorage.setItem('lang', 'ru')
          locale.value = 'ru'
          userInfo.value.lang = 'ru'
      }
    }

    const getUserInfo = async () => {
      await authStorage.GET_USER_INFO().then(response => {
        if (response.status == 200) {
            userInfo.value = response.data.data
            currentLang.value = locale.value
            userInfo.value.birthday = dayjs(userInfo.value.birthday).format('YYYY-MM-DD')
        }
      }) .catch(() => {
          toast.error(t('error-occured'))
      })
    }



    const selectedGender = computed(() => {
      return userInfo.value.gender ?  'Мужской' : 'Женский'
    });



    const submit = async () => {
      const userData = new FormData()

      userData.append('full_name', userInfo.value.full_name)
      // userData.append('phone_number', userInfo.value.phone)
      userData.append('birthday', dayjs(userInfo.value.birthday).format('YYYY-MM-DD'))
      userData.append('gender', Boolean(userInfo.value.gender))
      // userData.append('avatar', avatar)

      await authStorage.UPDATE_PROFILE_INFO(userData)
      .then((response) => {
        if(response && response.status && response.status == 200){
          toast.success(t('successfully-added'))
        }
      })
      .catch((err) => {
        toast.error(t('error-occured'))
        console.log(err)
      })
      handleLanguage(currentLang.value)
    }
  
  
    const updatePhoneOrPassword = async () => {
      await authStorage.UPDATE_PROFILE_INFO({password: currentPassword.value})
      .then((response) => {
        if(response && response.status && response.status == 200){
          toast.success(t('successfully-added'))
        }
      })
      .catch((err) => {
        toast.error(t('error-occured'))
        console.log(err)
      })
    }
 

    onMounted( async () => {
      await getUserInfo()
    })


    return {
      changePhone,
      PhoneInputRef,
      changePhoneNumber,
      password,
      PasswordInputRef,
      genderList,
      handleLanguage,
      languages,
      currentPassword,
      isModalActive,
      toggleModal,
      typePassword,
      currentPhone,
      locale,
      currentLang,
      submit,
      userInfo,
      selectedGender,

      updatePhoneOrPassword,
    };
  },
};
</script>

<style></style>
