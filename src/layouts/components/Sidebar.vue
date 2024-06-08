<template>
  <section
    :class="!sidebarOpenActive ? 'w-[95px]' : 'w-[360px]'"
    class="h-[100vh] relative duration-300 px-[10px] py-[20px]"
  >
    <div>
      <div
      @click="toggleSidebar"
      class="absolute z-[10] right-[-16px] top-[78px] p-1 mainBackgroundColor rounded-full cursor-pointer"
    >
      <img
        :class="!sidebarOpenActive ? '' : 'rotate-180'"
        class="duration-300"
        src="../../assets/icons/smallArrow.svg"
        alt="image"
      />
    </div>

    <div class="flex items-center">
      <img class="w-[70px]" src="@/assets/logotip.png" alt="logo" />
      <!-- <img
        :class="!sidebarOpenActive ? 'opacity-0' : ''"
        class="duration-300 w-[170px] object-contain ml-4"
        src="../../assets/logo-text.png"
        alt="img"
      /> -->
      <p class="ml-4 text-[#5fc7d1] whitespace-nowrap logo__font_family" :class="!sidebarOpenActive ? 'hidden' : ''">LEADER FOAM RUBBER</p>
    </div>

    <!-- <div
      class="flex items-center rounded-[4px] mt-5 py-[15px] px-[25px] bg-[#F2F5F7]"
    >
      <span
        class="pr-[18px] border-r-[1.5px] border-[#111] border-opacity-[0.1] duration-300 cursor-pointer min-w-[50px]"
        :class="sidebarOpenActive ? '' : 'border-opacity-0'"
      >
        <search-icon stroke="stroke-[#BCC6D2]" width="23" height="23" />
      </span>
      <input
        type="text"
        class="w-full caret-[#5FC7D1] pl-[12px] bg-transparent focus:outline-none text-[#141839] placeholder:text-[#BCC6D2] text-[15px]"
        placeholder="Izlash"
        :class="!sidebarOpenActive ? 'opacity-0' : ''"
      />
    </div> -->

    <div
      class="sidebarLinks w-full mt-[27px] py-4 h-[70vh] overflow-y-scroll sidebar-navigation-wrapper scroll-none border-y-[1.5px]"
      :class="[!sidebarOpenActive ? 'active' : '', $isDark ? 'border-[#1a283a]' : 'border-[#F2F5FA]']"
    >
      <ul class="flex flex-col">
        <li class="hover:bg-[#F2F5F7] rounded-[4px] duration-300" :class="$isDark ? 'hover:bg-[#0a1f39]' : ''" v-if="$can('read', 'sidebar-finance')">
          <router-link :to="{ name: 'Finance' }">
            <ComputingIcon stroke="stroke-current" width="24" :class="$route.name == 'Finance' ? $isDark ? 'text-white' : 'main-color-black' : ''"/>
            <span class="ml-[18px]" :class="$route.name == 'Finance' ? $isDark ? 'text-white' : 'main-color-black' : ''"> {{$t('finance')}} </span>
          </router-link>
        </li>
        <li class="hover:bg-[#F2F5F7] rounded-[4px] duration-300" :class="$isDark ? 'hover:bg-[#0a1f39]' : ''" v-if="$can('read', 'sidebar-warehouse')">
          <ul class="uk-nav-default group" uk-nav="multiple: true">
            <li class="uk-parent">
              <a href="#">
                <div class="flex items-center w-full">
                  <HouseIcon
                    stroke="stroke-current mr-4"
                    width="24"
                    style="min-width: 30px !important"
                  />
                  <span class="ml-[18px]">{{$t('storage')}}</span>
                </div>
                <span uk-nav-parent-icon></span
              ></a>
              <ul class="uk-nav-sub">
                <li
                  v-if="$can('read', 'sidebar-warehouse-raw')"
                  class="hover:bg-[#344566] hover:bg-opacity-[0.18] rounded-[4px] duration-300"
                >
                  <router-link :to="{ name: 'RawMaterial' }">
                    <GlassIcon style="min-width: 20px !important" :class="$route.name == 'RawMaterial' ? $isDark ? 'text-white' : 'main-color-black' : ''" />
                    <span :class="$route.name == 'RawMaterial' ? $isDark ? 'text-white' : 'main-color-black' : ''"> {{$t('raw')}} </span>
                  </router-link>
                </li>
                <li
                  v-if="$can('read', 'sidebar-warehouse-accessories')"
                  class="hover:bg-[#344566] hover:bg-opacity-[0.18] rounded-[4px] duration-300"
                >
                  <router-link :to="{ name: 'Accessories' }">
                    <AccessoriesIcon style="min-width: 20px !important" :class="$route.name == 'Accessories' ? $isDark ? 'text-white' : 'main-color-black' : ''"/>
                    <span :class="$route.name == 'Accessories' ? $isDark ? 'text-white' : 'main-color-black' : ''"> {{$t('accessories')}} </span>
                  </router-link>
                </li>
                <li
                  v-if="$can('read', 'sidebar-warehouse-equipment')"
                  class="hover:bg-[#344566] hover:bg-opacity-[0.18] rounded-[4px] duration-300"
                >
                  <router-link :to="{ name: 'Equipment' }">
                    <RullerIcon style="min-width: 20px !important" :class="$route.name == 'Equipment' ? $isDark ? 'text-white' : 'main-color-black' : ''"/>
                    <span :class="$route.name == 'Equipment' ? $isDark ? 'text-white' : 'main-color-black' : ''"> {{$t('equipment')}} </span>
                  </router-link>
                </li>
                <li
                  v-if="$can('read', 'sidebar-warehouse-tech')"
                  class="hover:bg-[#344566] hover:bg-opacity-[0.18] rounded-[4px] duration-300"
                >
                  <router-link :to="{ name: 'Machines' }">
                    <GroupIcon style="min-width: 20px !important" :class="$route.name == 'Machines' ? $isDark ? 'text-white' : 'main-color-black' : ''"/>
                    <span :class="$route.name == 'Machines' ? $isDark ? 'text-white' : 'main-color-black' : ''"> {{$t('tech')}} </span>
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="hover:bg-[#F2F5F7] rounded-[4px] duration-300" :class="$isDark ? 'hover:bg-[#0a1f39]' : ''" v-if="$can('read', 'sidebar-production')">
          <router-link :to="{ name: 'Production' }">
            <BucketSquareIcon style="min-width: 30px !important" :class="$route.name == 'Production' ? $isDark ? 'text-white' : 'main-color-black' : ''"/>
            <span class="ml-[18px]" :class="$route.name == 'Production' ? $isDark ? 'text-white' : 'main-color-black' : ''">{{$t('production')}}</span>
          </router-link>
        </li>
        <li class="hover:bg-[#F2F5F7] rounded-[4px] duration-300" :class="$isDark ? 'hover:bg-[#0a1f39]' : ''" v-if="$can('read', 'sidebar-factories')">
          <ul class="uk-nav-default group" uk-nav="multiple: true">
            <li class="uk-parent">
              <a href="#"
                ><div
                  class="flex items-center w-full"
                >
                  <FactoryIcon
                    stroke="stroke-current mr-4"
                    width="24"
                    style="min-width: 30px !important"
                  />
                  <span>{{$t('firms')}}</span>
                </div>
                <span uk-nav-parent-icon></span
              ></a>
              <ul class="uk-nav-sub">
                <li
                  v-if="$can('read', 'sidebar-factories-mattress')"
                  class="hover:bg-[#344566] hover:bg-opacity-[0.18] rounded-[4px] duration-300"
                >
                  <router-link :to="{ name: 'Mattress' }">
                    <MatrasIcon style="min-width: 20px !important" :class="$route.name == 'Mattress' ? $isDark ? 'text-white' : 'main-color-black' : ''"/>
                    <span :class="$route.name == 'Mattress' ? $isDark ? 'text-white' : 'main-color-black' : ''"> {{$t('mattress')}} </span>
                  </router-link>
                </li>
                <li
                  v-if="$can('read', 'sidebar-factories-pillow')"
                  class="hover:bg-[#344566] hover:bg-opacity-[0.18] rounded-[4px] duration-300"
                >
                  <router-link :to="{ name: 'Pillow' }">
                    <PillowIcon style="min-width: 20px !important" :class="$route.name == 'Pillow' ? $isDark ? 'text-white' : 'main-color-black' : ''"/>
                    <span :class="$route.name == 'Pillow' ? $isDark ? 'text-white' : 'main-color-black' : ''"> {{$t('pillow')}} </span>
                  </router-link>
                </li>
                <li
                  v-if="$can('read', 'sidebar-factories-sponge')"
                  class="hover:bg-[#344566] hover:bg-opacity-[0.18] rounded-[4px] duration-300"
                >
                  <router-link :to="{ name: 'Sponge' }">
                    <SpongeIcon style="min-width: 20px !important" :class="$route.name == 'Sponge' ? $isDark ? 'text-white' : 'main-color-black' : ''"/>
                    <span :class="$route.name == 'Sponge' ? $isDark ? 'text-white' : 'main-color-black' : ''"> {{$t('sponge')}} </span>
                  </router-link>
                </li>
                <li
                  v-if="$can('read', 'sidebar-factories-curly-cutting')"
                  class="hover:bg-[#344566] hover:bg-opacity-[0.18] rounded-[4px] duration-300"
                >
                  <router-link :to="{ name: 'CurlyCutting' }">
                    <CurlyCutting style="min-width: 20px !important" :class="$route.name == 'CurlyCutting' ? $isDark ? 'text-white' : 'main-color-black' : ''"/>
                    <span :class="$route.name == 'CurlyCutting' ? $isDark ? 'text-white' : 'main-color-black' : ''"> {{$t('curly_cutting')}} </span>
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="hover:bg-[#F2F5F7] rounded-[4px] duration-300" :class="$isDark ? 'hover:bg-[#0a1f39]' : ''" v-if="$can('read', 'sidebar-sellings')">
          <router-link :to="{ name: 'Sailing' }">
            <SailingHistory width="24" :class="$route.name == 'Sailing' ? $isDark ? 'text-white' : 'main-color-black' : ''" />
            <span class="ml-[18px]" :class="$route.name == 'Sailing' ? $isDark ? 'text-white' : 'main-color-black' : ''">{{$t('sales')}}</span>
          </router-link>
        </li>
        <li class="hover:bg-[#F2F5F7] rounded-[4px] duration-300" :class="$isDark ? 'hover:bg-[#0a1f39]' : ''" v-if="$can('read', 'sidebar-customers')">
          <router-link :to="{ name: 'Customers' }">
            <PeopleIcon width="24" :class="$route.name == 'Customers' ? $isDark ? 'text-white' : 'main-color-black' : ''"/>
            <span class="ml-[18px]" :class="$route.name == 'Customers' ? $isDark ? 'text-white' : 'main-color-black' : ''">{{$t('clients')}}</span>
          </router-link>
        </li>
        <li class="hover:bg-[#F2F5F7] rounded-[4px] duration-300" :class="$isDark ? 'hover:bg-[#0a1f39]' : ''" v-if="$can('read', 'sidebar-suppliers')">
          <router-link :to="{ name: 'Suppliers' }">
            <BoxIcon width="24" :class="$route.name == 'Suppliers' ? $isDark ? 'text-white' : 'main-color-black' : ''"/>
            <span class="ml-[18px]" :class="$route.name == 'Suppliers' ? $isDark ? 'text-white' : 'main-color-black' : ''">{{$t('suppliers')}}</span>
          </router-link>
        </li>
        <li class="hover:bg-[#F2F5F7] rounded-[4px] duration-300" :class="$isDark ? 'hover:bg-[#0a1f39]' : ''" v-if="$can('read', 'sidebar-orders')">
          <router-link :to="{ name: 'Orders' }">
            <CalendarEditIcon width="24" :class="$route.name == 'Orders' ? $isDark ? 'text-white' : 'main-color-black' : ''"/>
            <span class="ml-[18px]" :class="$route.name == 'Orders' ? $isDark ? 'text-white' : 'main-color-black' : ''"> {{$t('orders')}} </span>
          </router-link>
        </li>
        <li class="hover:bg-[#F2F5F7] rounded-[4px] duration-300" :class="$isDark ? 'hover:bg-[#0a1f39]' : ''" v-if="$can('read', 'sidebar-employees')">
          <router-link :to="{ name: 'Employees' }">
            <EmployeeIcon :class="$route.name == 'Employees' ? $isDark ? 'text-white' : 'main-color-black' : ''"/>
            <span class="ml-[18px]" :class="$route.name == 'Employees' ? $isDark ? 'text-white' : 'main-color-black' : ''">{{$t('employees')}}</span>
          </router-link>
        </li>
      </ul>
    </div>
    </div>

    <!-- <div @click="() => isDark ? $emit('changeTheme', false) : $emit('changeTheme', true)" class="w-full flex items-center justify-between cursor-pointer main-color-black py-1 duration-300 rounded-[4px] mt-[20px]" 
    :class="[$isDark ? 'hover:bg-[#0a1f39] text-[#8292aa] hover:text-white' : 'hover:bg-[#F2F5F7] hover:text-[#141839]', sidebarOpenActive ? 'px-[24px]' : '']">
      <span :class="!sidebarOpenActive ? 'hidden' : ''">{{$t(isDark ? 'light' : 'dark')}}</span>
      <div 
        class="bg-[#000] bg-opacity-[0.1] dark:bg-opacity-[0.4] h-[45px] flex items-center justify-between rounded-full overflow-hidden relative"
        :class="sidebarOpenActive ? 'w-[100px]' : 'w-full'"
        >
        <div class="w-1/2 h-full flex items-center">
          <sun-icon class="ml-4 relative z-[2]" />
        </div>
        <div class="w-1/2 h-full flex items-center">
          <img src="../../assets/icons/moon.svg" alt="moon" class="ml-[10px] relative z-[2]">
        </div>
        <div 
          class="w-1/2 h-[80%] absolute top-1/2 -translate-y-1/2 rounded-full duration-300 bg-white dark:bg-[#0a1f39]"
          :class="isDark ? 'right-1' : 'left-1'"
        ></div>
      </div>
    </div> -->
    <div @click="toggleModal" class="w-full flex items-center justify-center cursor-pointer main-color-black px-[24px] py-[12px] duration-300 rounded-[4px] mt-4" 
    :class="[$isDark ? 'hover:bg-[#0a1f39] text-[#8292aa] hover:text-white' : 'hover:bg-[#F2F5F7] hover:text-[#141839]', sidebarOpenActive ? 'justify-between' : '']">
      <span :class="!sidebarOpenActive ? 'hidden' : ''">{{$t('exit')}}</span>
      <span><ExitIcon style="min-width: 25px; margin-right: 10px" /></span>
    </div>
  </section>
  
  <Modal :outsideClose="true" :isModalActive="isModalActive" @close="toggleModal" @submitModal="logout" :buttonText="$t('yes')"
   :cancelbuttonText="$t('not')" width="min-w-[400px]">
     <template v-slot:modalBody>
      <div class="flex items-center justify-center flex-col">
        <exit-icon style="min-width: 100px" />
        <h2 class="text-2xl my-5 px-5 text-[#141839] dark:text-white">{{ $t('are_you_sure_to_logout') }}</h2>
      </div>
     </template>
  </Modal>

</template>

<script>
import { onMounted, ref } from "vue";
import AccessoriesIcon from "../../assets/iconsVue/AccessoriesIcon.vue";
import AdminsIcon from "../../assets/iconsVue/AdminsIcon.vue";
import EmployeeIcon from '@/assets/iconsVue/EmployeeIcon.vue'
import SailingHistory from "../../assets/iconsVue/SailingHistory.vue";
import FactoryIcon from "../../assets/iconsVue/FactoryIcon.vue";
import SearchIcon from "../../assets/iconsVue/SearchIcon.vue";
import FoamRubberIcon from "../../assets/iconsVue/FoamRubberIcon.vue";
import MatrasIcon from "../../assets/iconsVue/MatrasIcon.vue";
import PillowIcon from "../../assets/iconsVue/PillowIcon.vue";
import SpongeIcon from "../../assets/iconsVue/SpongeIcon.vue";
import CurlyCutting from "../../assets/iconsVue/CurlyCutting.vue";
import HouseIcon from "../../assets/iconsVue/HouseIcon.vue";
import ComputingIcon from "../../assets/iconsVue/ComutingIcon.vue";
import PeopleIcon from "../../assets/iconsVue/PeopleIcon.vue";
import BoxIcon from "../../assets/iconsVue/BoxIcon.vue";
import CalendarEditIcon from "../../assets/iconsVue/CalendarEditIcon.vue";
import RullerIcon from "../../assets/iconsVue/RullerIcon.vue";
import GlassIcon from "../../assets/iconsVue/GlassIcon.vue";
import GroupIcon from "../../assets/iconsVue/GroupIcon.vue";
import ExitIcon from "../../assets/iconsVue/ExitIcon.vue";
import BucketSquareIcon from "../../assets/iconsVue/BucketSquareIcon.vue";
import Modal from '@/components/base/Modal.vue'
import { useRouter } from 'vue-router'
import SunIcon from '../../assets/iconsVue/SunIcon.vue';

export default {
  components: {
    AccessoriesIcon,
    AdminsIcon,
    SearchIcon,
    SailingHistory,
    FactoryIcon,
    FoamRubberIcon,
    MatrasIcon,
    PillowIcon,
    SpongeIcon,
    CurlyCutting,
    HouseIcon,
    ComputingIcon,
    PeopleIcon,
    BoxIcon,
    CalendarEditIcon,
    GroupIcon,
    GlassIcon,
    RullerIcon,
    ExitIcon,
    BucketSquareIcon,
    Modal,
    EmployeeIcon,
    SunIcon
  },
  // props: ['isDark'],
  // watch: {
  //     isDark: function (newValue, oldValue) {},
  // },
  setup(props, context) {
    const router = useRouter()
    const isModalActive = ref(false)
    const sidebarOpenActive = ref(false)
    let sidebarOpen = JSON.parse(localStorage.getItem('sidebarOpenActive'))
    const toggleSidebar = () => {
      if (!sidebarOpen) {
        localStorage.setItem('sidebarOpenActive', true)
        sidebarOpen = JSON.parse(localStorage.getItem('sidebarOpenActive'))
      } else {
        localStorage.setItem('sidebarOpenActive', false)
        sidebarOpen = JSON.parse(localStorage.getItem('sidebarOpenActive'))
      }
      sidebarOpenActive.value = sidebarOpen
    };

    const toggleModal = () => {
      isModalActive.value = !isModalActive.value
    }

    // const toggleMode = () => {
    //   console.log('eee', props.isDark)
    //   if (props.isDark) {
    //     context.emit('changeTheme', true)
    //   } else {
    //     context.emit('changeTheme', false)
    //   }
    // }

    const logout = () => {
      localStorage.removeItem('user')
      localStorage.removeItem('sidebarOpenActive')
      localStorage.removeItem('lang')
      router.push('/')
    }

    onMounted(() => {
      sidebarOpenActive.value = sidebarOpen
    })

    return {
      toggleSidebar,
      sidebarOpenActive,
      isModalActive,
      toggleModal,
      logout
    };
  },
};
</script>

<style scoped>
.navigation-wrapper::-webkit-scrollbar {
    display: none;
}
</style>
