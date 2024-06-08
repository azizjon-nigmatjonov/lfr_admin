<template>
<div>
  <div
    class="py-[20px] px-[30px] flex items-center justify-between border-b-[1.5px]" :class="$isDark ? 'border-[#1a283a]' : 'border-[#F2F5FA]'"
  >
    <div>
      <h1 class="mainTitle capitalize dark:text-white">{{ getHeaderTitle() }}</h1>
    </div>

    <div class="flex items-center">

 


      <button
        v-if="$can('read', 'navbar-product-sell')"
        @click="toggleSoldModal()"
        class="mainBackgroundColor hover:scale-105 duration-100 text-white basicBtn rounded-lg"
      >
        <PlusIcon stroke="stroke-current mr-2" />
        {{$t('sale')}}
      </button>


      <div class="w-[1.5px] h-[40px] bg-[#F2F5FA] dark:bg-[#1a283a] mx-6" v-if="$can('read', 'navbar-product-sell') || $can('read', 'navbar-raw-add')"></div>


      <button
        v-if="$can('read', 'navbar-codebase')"
        class="mainBackgroundColorYellow hover:scale-105 duration-100 text-white basicBtn rounded-lg"
        @click="$router.push('/codebase')"
      >
        <img src="@/assets/icons/navbar/element-plus.svg" class="mr-2" alt="">
        {{$t('codebase')}}
      </button>


      <div class="w-[1.5px] h-[40px] bg-[#F2F5FA] dark:bg-[#1a283a] mx-6" v-if="$can('read', 'navbar-codebase')"></div>


      <!-- <LanguageDropdown /> -->
      <!-- <ModeDropdown class="mx-4" /> -->
      <div class="mr-4 w-[45px] h-[45px] overflow-hidden rounded-[12px]" v-if="$can('read', 'navbar-darkmode')">
        <div v-if="!isDark" @click="$emit('changeTheme', true)" class="cursor-pointer uk-animation-fade w-full h-full flex items-center justify-center">
          <SunIcon width="30" height="30" />
        </div>
        <div v-else @click="$emit('changeTheme', false)" class="cursor-pointer uk-animation-fade w-full h-full flex items-center justify-center">
          <img src="../../assets/icons/moon.svg" alt="moon">
        </div>
      </div>
      <Notification v-if="$can('read', 'navbar-notification')" class="mr-4"/>
      <ProfileDropdown v-if="$can('read', 'navbar-settings')"/>
    </div>
  </div>

  <RawMaterialsAddModal :isModalActive="isModalActive"/>
  <SoldModal :isModalActive="isSoldModalActive" :modalWidth="430"/>
</div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from 'vue-i18n';

import ProfileDropdown from "@/components/base/ProfileDropdown.vue";
import PlusIcon from "@/assets/iconsVue/PlusIcon.vue";
import Modal from "../../components/base/Modal.vue";
import Notification from "../../components/base/Notification.vue";
import SunIcon from "@/assets/iconsVue/SunIcon.vue";
import Dropdown from "@/components/base/Dropdown.vue";
import RawMaterialsAddModal from './RawMaterialsAddModal.vue'
import SoldModal from './SoldModal.vue'
import LanguageDropdown from '@/components/cards/LanguageDropdown.vue'
import ModeDropdown from '@/components/cards/ModeDropdown.vue'

export default {
  components: {
    ProfileDropdown,
    PlusIcon,
    Modal,
    Notification,
    SunIcon,
    Dropdown,
    LanguageDropdown,
    RawMaterialsAddModal,
    SoldModal,
    ModeDropdown
  },
  props: ['isDark'],
  watch: {
      isDark: function (newValue, oldValue) {},
  },
  setup() {
    const instance = getCurrentInstance();
    const globalVariables = instance.appContext.config.globalProperties;
    const route = useRoute();
    const { locale } = useI18n()

    let isModalActive = ref(false);
    let isSoldModalActive = ref(false);
    let profileDropdownActive = ref(false);
    let isNotificationDropdownActive = ref(false);
    let isSystemDropdownActive = ref(false);


    const profileRef = ref(null);
    const nitificationRef = ref(null);
    const systemColorRef = ref(null);

    const toggleProfileDropdown = (e) => {
      if (e.target == profileRef.value) {
        profileDropdownActive.value = true;
      } else {
        profileDropdownActive.value = false;
      }

      if (e.target == nitificationRef.value) {
        isNotificationDropdownActive.value = true;
      } else {
        isNotificationDropdownActive.value = false;
      }

      if (e.target == systemColorRef.value) {
        isSystemDropdownActive.value = true;
      } else {
        isSystemDropdownActive.value = false;
      }
    };
    
    function getHeaderTitle() {
      switch (route.name) {
        case "Admins":
          return globalVariables.$t('staff_admins');
        case "Profile":
          return globalVariables.$t('profile_settings');
        case "Factories":
          return globalVariables.$t('mattress');
        case "Pillow":
          return globalVariables.$t('pillow');
        case "Sponge":
          return globalVariables.$t('sponge');
        case "CurlyCutting":
          return globalVariables.$t('curly_cutting');
        case "Sailing":
          return globalVariables.$t('sales');
        case "RawMaterial":
          return globalVariables.$t('raw');
        case "Equipment":
          return globalVariables.$t('equipment');
        case "Machines":
          return globalVariables.$t('tech');
        case "Orders":
          return globalVariables.$t('orders');
        case "Customers":
          return globalVariables.$t('clients');
        case "Codebase":
          return globalVariables.$t('');
        case "Finance": 
          return globalVariables.$t('finance')
        case "Employees":
          return globalVariables.$t('employee')
        case "Accessories":
          return globalVariables.$t('accessories')
        case "Suppliers":
          return globalVariables.$t('suppliers')
        case "Mattress":
          return globalVariables.$t('mattress')
        case "Production":
          return globalVariables.$t('production')
        // case "Roles":
        //   return globalVariables.$t('roles')
        // case "Permissions":
        //   return globalVariables.$t('production')
        // case "Users":
        //   return globalVariables.$t('production')
        default:
          return "LFR.uz";
      }
    }

    const toggleModal = () => {
      isModalActive.value = !isModalActive.value;
    };
    const toggleSoldModal = () => {
      isSoldModalActive.value = !isSoldModalActive.value;
    };

    onMounted(() => {
      window.addEventListener("click", toggleProfileDropdown);
    });

    return {
      getHeaderTitle,
      toggleProfileDropdown,
      profileDropdownActive,
      profileRef,
      locale,
      isModalActive,
      isSoldModalActive,


      toggleModal,
      toggleSoldModal,


      isNotificationDropdownActive,
      nitificationRef,
      systemColorRef,
      isSystemDropdownActive
    };
  },
};
</script>
