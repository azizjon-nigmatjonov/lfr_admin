<template>
  <section class="pb-20">
    <div class="pt-6 pb-4 wrapper">
      <!-- <h3 class="sectionTitle">
        {{
          currantTable === "table-1"
            ? "Kirim tarixi"
            : currantTable === "table-2"
            ? "Chiqimlar tarixi"
            : currantTable === "table-3"
            ? "Mavjud xomashyolar"
            : "Jarayondagi Xomashyolar"
        }}
      </h3>
      <span class="text-sm text-[#888A8F] mt-2">245 ta</span> -->
      <h3 class="sectionTitle">{{$t('client_name')}}: Jahongir Jumaev</h3>
      <div class="text-sm text-[#888A8F] mt-2">{{$t('our_debt')}}: 0 {{$i18n.locale == 'ru' ? ' сум' : ' so`m'}}</div>
      <div class="text-sm text-[#888A8F] mt-2">{{$t('debts')}}: 0 {{$i18n.locale == 'ru' ? ' сум' : ' so`m'}}</div>
    </div>
    <div
      class="flex items-center justify-between border-y-[1.5px] borderBox dark:border-[#1a283a] wrapper h-[70px]"
    >
      <ul class="basicTab">
        <li
          @click="changeTable('table-1')"
          class="main-color-black font-medium duration-300"
          :class="currantTable === 'table-1' ? 'active' : ''"
        >
          Jarayonlar tarixi
        </li>
        <li
          @click="changeTable('table-2')"
          class="main-color-black font-medium duration-300"
          :class="currantTable === 'table-2' ? 'active' : ''"
        >
          Statistika
        </li>
      </ul>
    </div>

    <div class="a-table">
      <div class="table-1" v-if="currantTable === 'table-1'">
        <div class="wrapper border-b-[1.5px] borderBox dark:border-[#1a283a] ">
          <div class="a-table-header">
            <ul class="uk-grid-collapse a-table-list" uk-grid>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('date')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('status')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('product')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('density')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('color')}}</h3>
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
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('amount_given')}}</h3>
              </li>
              <li class="w-[100px]">
                <h3 class="a-table-title flex justify-center">{{$t('actions')}}</h3>
              </li>
            </ul>
          </div>

          <div class="a-table-body">
            <ul
              v-for="(item, index) in 10"
              class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a] "
              uk-grid
              :key="index"
            >
              <li class="uk-width-expand">
                <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">
                  1{{ item }}.06.2022
                </h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text uk-badge">
                  Berildi
                </h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{$t('foam')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">100</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">Ko'k</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ 99 * item }} ta</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">1,200</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ 99 * item * 1200 }}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">200,000</h3>
              </li>
              <li class="w-[100px] relative">
                <div
                  @click="togglePopup(index)"
                  class="cursor-pointer flex justify-center w-full" :class="$isDark ? 'text-[#66b2ff]' : 'text-[#5FC7D1]'"
                >
                  <FunctionsIcon
                    stroke="stroke-current"
                    width="30"
                    height="30"
                  />
                </div>

                <functions-popup
                  v-if="popUpActive == index"
                  additonalClasses="z-[11]"
                >
                  <template v-slot:FunctionsPopupContent>
                    <div class="flex flex-col space-y-3">
                      <button
                        class="text-[#eac544] functionsText"
                      >
                        {{$t('edit')}}
                      </button>
                      <button
                        class="text-[#E54D43] functionsText"
                      >
                        {{$t('delete')}}
                      </button>
                    </div>
                  </template>
                </functions-popup>
              </li>
            </ul>
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

      <div class="table-2" v-if="currantTable === 'table-2'">

        <div class="w-full">
          <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
          <apexchart type="radialBar" height="350" :options="chartOptions2" :series="series2"></apexchart>
        </div>
        <div class="w-full">
          <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
        </div>
        
      </div>







    </div>
    <!-- <productionModal :isModalActive="isModalActive"/> -->
  </section>
</template>

<script>
import { ref } from "vue";
import PlusIcon from "@/assets/iconsVue/PlusIcon.vue";
import SmallArrowRight from "@/assets/iconsVue/SmallArrowRight.vue";
// import productionModal from './components/productionModal.vue'
import FunctionsIcon from "@/assets/iconsVue/FunctionsIcon.vue";

export default {
  components: {
    // productionModal,
    SmallArrowRight,
    PlusIcon,
    FunctionsIcon
  },
  setup() {
    let currantTable = ref("table-1");
    let isModalActive = ref(false)
    
    let popUpActive0 = ref([false]);
    let popUpActive1 = ref([false]);
    let popUpActive2 = ref([false]);
    let popUpActive3 = ref([false]);
    let popUpActive4 = ref([false]);
    let popUpActive = ref([false]);

    const params = ref({
      page: 1,
    });

    const toggleModal = () => {
      isModalActive.value = !isModalActive.value
    }

    const togglePopup = (index) => {
      popUpActive.value[index] = !popUpActive.value[index];
    };

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

    const changeTable = (e) => {
      currantTable.value = e;
    };



    let series = ref([{
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    }, {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41]
    }])

    let chartOptions = ref({
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    })




    let series2 = ref([44, 55, 67, 83])
    let chartOptions2 = ref({
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return 249
              }
            }
          }
        }
      },
      labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
    })


    return {
      params,
      changeTable,
      currantTable,
      updatePage,
      isModalActive,
      toggleModal,


      popUpActive0,
      popUpActive1,
      popUpActive2,
      popUpActive3,
      popUpActive4,
      popUpActive,
      togglePopup,


      series,
      series2,
      chartOptions,
      chartOptions2,



    };
  },
};
</script>

<style></style>
