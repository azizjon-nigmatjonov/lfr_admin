<template>
  <section class="order-page pb-20">
    <div
      class="pt-6 pb-4 wrapper flex justify-between items-center border-b-[1.5px] borderBox dark:border-[#1a283a] "
    >
      <div>
        <h3 class="sectionTitle">{{$t('orders')}}</h3>
        <!-- <span class="text-sm text-[#888A8F] mt-2">5ta buyurtma mavjud</span> -->
        
        <span class="text-sm text-[#888A8F] mt-2">5шт заказов</span>
      </div>
      <button
        @click="toggleModal()"
        class="mainBackgroundColor text-white basicBtn"
      >
        <PlusIcon stroke="stroke-current mr-2" />
        {{$t('add')}}
      </button>
    </div>

    <div class="a-table" v-if="$can('read', 'orders')">
      <div class="table-1">
        <div class="wrapper border-b-[1.5px] borderBox dark:border-[#1a283a] ">
          <div class="a-table-header">
            <ul class="uk-grid-collapse a-table-list" uk-grid>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('date')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('fullname')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('phone_number')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('name')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('amount')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('price_per_item')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('total_sum')}}</h3>
              </li>
              <li class="w-[100px]">
                <h3 class="a-table-title">{{$t('functions')}}</h3>
              </li>
            </ul>
          </div>

          <div class="a-table-body">
            <ul
              v-for="(item, index) in 5"
              class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a] "
              uk-grid
              :key="index"
            >
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">17.07.2022</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">Jahongir Jumaev</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">+998975554433</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{$t('foam')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">1,000 шт</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">500 {{$i18n.locale == 'ru' ? ' сум' : ' so`m'}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">500,000 {{$i18n.locale == 'ru' ? ' сум' : ' so`m'}}</h3>
              </li>
              <li class="w-[100px]">
                <div class="relative">
                  <div
                    @click="togglePopup(index)"
                    class="cursor-pointer flex justify-center w-full" :class="$isDark ? 'text-[#66b2ff]' : 'text-[#5FC7D1]'"
                  >
                    <!-- ref="popUpRef" -->
                    <FunctionsIcon
                      stroke="stroke-current"
                      width="30"
                      height="30"
                    />
                  </div>

                  <functions-popup
                    v-if="popUpActive == index"
                    additonalClasses="z-[11]"
                    :hideArrow="true"
                  >
                    <template v-slot:FunctionsPopupContent>
                      <div class="flex flex-col space-y-3">
                        <button
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
                  v-if="popUpActive == index"
                  class="w-[100vw] h-[100vh] z-[10] absolute top-1/2 -translate-y-1/2 right-0"
                ></div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-10">
        <v-pagination
          v-model="params.page"
          :pages="5"
          :range-size="1"
          @update:modelValue="updatePage"
          :hideFirstButton="true"
          hideLastButton="true"
        />
      </div>
    </div>
    <ordersModal :isModalActive="isModalActive"/>
  </section>

  <Filter buttonClass="mt-10" wrapperClass='top-[180px]' :cancelButtonText="$t('clean')">
    <template v-slot:filterBody>
      <div class="w-[300px] grid grid-cols-1 gap-3">
        <div class="relative">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="../../assets/icons/baseIcons/user-square.svg"
            alt="icon"
          />
          <input
            v-debounce:500="handleFilterSearchName"
            type="text"
            name="text"
            autocomplete="off"
            required
            :placeholder="$t('search_by_name')"
            class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
          />
        </div>
        <div class="relative">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="../../assets/icons/baseIcons/code.svg"
            alt="icon"
          />
          <input
            v-debounce:500="handleFilterSearchCode"
            type="text"
            name="text"
            autocomplete="off"
            required
            :placeholder="$t('search_by_code')"
            class="w-full py-[14px] px-[24px] pl-12 focus:outline-none blue-text border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
          />
        </div>
      </div>
    </template>
  </Filter>
</template>

<script>
import { ref } from "vue";
import ordersModal from './components/ordersModal.vue'
import PlusIcon from "@/assets/iconsVue/PlusIcon.vue";
import FunctionsIcon from "@/assets/iconsVue/FunctionsIcon.vue";
import SmallArrowRight from "@/assets/iconsVue/SmallArrowRight.vue";

export default {
  components: {
    ordersModal,
    SmallArrowRight,
    PlusIcon,
    FunctionsIcon,
  },
  setup() {
    let isModalActive = ref(false)
    let popUpActive = ref([false]);

    const togglePopup = (index) => {
      popUpActive.value[index] = !popUpActive.value[index];
    };

    const toggleModal = () => {
      isModalActive.value = !isModalActive.value
    }

     const params = ref({
      page: 1,
    });

    function updatePage(value) {
      console.log(value)
      if (currantTable === 'table-1') {
        // getSomeData(params)
      }
      if (currantTable === 'table-2') {
        // getAnotherData(params)
      }
      params.page = value;
    }

    return {
      popUpActive,
      togglePopup,
      params,
      updatePage,

      isModalActive,
      toggleModal,
    };
  },
};
</script>

<style></style>
