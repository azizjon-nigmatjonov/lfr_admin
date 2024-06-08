<template>
  <section class="finance">
     <div
      class="flex items-center justify-between border-b-[1.5px] borderBox dark:border-[#1a283a] wrapper h-[70px]"
    >
      <ul class="basicTab">
        <li
          @click="changeTable('dashboard')"
          class="main-color-black font-medium duration-300"
          :class="params.currentTable === 'dashboard' ? 'active' : ''"
        >
          {{$t('dashboard')}}
        </li>
        <li
          @click="changeTable('income')"
          class="main-color-black font-medium duration-300"
          :class="params.currentTable === 'income' ? 'active' : ''"
        >
          {{$t('come')}}
        </li>
        <li
          @click="changeTable('outcome')"
          class="main-color-black font-medium duration-300"
          :class="params.currentTable === 'outcome' ? 'active' : ''"
        >
          {{$t('left')}}
        </li>
        <li
          @click="changeTable('indeptedness')"
          class="main-color-black font-medium duration-300"
          :class="params.currentTable === 'indeptedness' ? 'active' : ''"
        >
          {{$t('indeptedness')}}
        </li>
      </ul>
    </div>

    <div v-if="params.currentTable === 'dashboard'">
      <div class="wrapper py-10">
        <div class="grid grid-cols-2 border-r-[1.5px] borderBox dark:border-[#1a283a]">
          <div>
            <div class="grid grid-cols-1 gap-5 border-r-[1.5px] borderBox dark:border-[#1a283a] pr-10">
              <div class="bg-white h-[130px] rounded-[12px] card p-4 flex items-center">
                <h1 class="text-2xl 2xl:text-3xl text-[#141839] dark:text-white text-center w-full">Добро пожаловать!</h1>
              </div>
              <div class="grid grid-cols-3 gap-5">
                <div class="bg-white h-[130px] rounded-[12px] card p-4 flex flex-col justify-center">
                  <span class="text-sm text-[#696F7A] font-medium">{{ $t('current_month') }}</span>
                  <p class="text-xl 2xl:text-2xl text-[#141839] dark:text-white font-bold mt-2">+ 729$</p>
                </div>
                <div class="bg-white h-[130px] rounded-[12px] card p-4 flex flex-col justify-center">
                  <span class="text-sm text-[#696F7A] font-medium">{{ $t('total_balance') }}</span>
                  <p class="text-xl 2xl:text-2xl text-[#141839] dark:text-white font-bold mt-2">+ 51 214$</p>
                </div>
                <div class="bg-white h-[130px] rounded-[12px] card p-4 flex flex-col justify-center">
                  <span class="text-sm text-[#696F7A] font-medium">{{ $t('current_month') }}</span>
                  <p class="text-xl 2xl:text-2xl text-[#141839] dark:text-white font-bold mt-2">- 372$</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="flex items-center">
              <div class="w-1/2">
                <div class="grid grid-cols-1 border-r-[1.5px] borderBox dark:border-[#1a283a]">
                  <p class="font-medium text-lg text-[#141839] dark:text-white text-center">Категории расходов</p>
                  <apexchart type="radialBar" height="270" :options="chartOptions2" :series="series2"></apexchart>
                  <div class="h-[2px] w-3/4 mx-auto bg-[#F2F5FA] dark:bg-[#1a283a]"></div>
                </div>
              </div>
              <div class="w-1/2">
                <div class="grid grid-cols-1">
                  <p class="font-medium text-lg text-[#141839] dark:text-white text-center">Категории доходов</p>
                  <apexchart type="radialBar" height="270" :options="chartOptions2" :series="series2"></apexchart>
                  <div class="h-[2px] w-3/4 mx-auto bg-[#F2F5FA] dark:bg-[#1a283a]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 w-full">
          <div class="flex w-full">
            <div class="w-[60%]">
              <h2 class="text-[#141839] dark:text-white 2xl:text-lg inline-block">Недавние транзакции</h2>
              <div class="grid grid-cols-2 gap-12 mt-5">
                <div class="border-r-[1.5px] borderBox dark:border-[#1a283a] pr-12">
                  <!-- <p class="text-[#141839] dark:text-white">{{ $t('left') }}</p> -->
                  <div v-for="item in 3" :key="item" class="flex items-center justify-between py-4 border-b-[1.5px] borderBox dark:border-[#1a283a]">
                    <span class="flex items-center">
                      <div class="w-[60px]">
                        <img v-if="item == 2" src="../../assets/icons/downgrade.svg" alt="icon">
                        <img v-else src="../../assets/icons/upgrade.svg" alt="icon">
                      </div>
                      <div>
                        <p class="text-[#141839] dark:text-white">{{ $t('raw') }}</p>
                        <span class="text-[#696F7A] text-[12px]">{{ $t(item == 2 ? 'left' : 'come') }}</span>
                      </div>
                    </span>
                    <div class="text-right">
                      <p class="text-[#141839] dark:text-white">{{ item == 2 ? '-' : '+' }} {{ item }}38,00$</p>
                      <span class="text-[#696F7A] text-[12px]">1{{item}}.0{{ item }}.2022</span>
                    </div>
                  </div>
                </div>
                <div class="pr-12">
                  <!-- <p class="text-[#141839] dark:text-white">{{ $t('come') }}</p> -->
                  <div v-for="item in 3" :key="item" class="flex items-center justify-between py-4 border-b-[1.5px] borderBox dark:border-[#1a283a]">
                    <span class="flex items-center">
                      <div class="w-[60px]">
                        <img v-if="item == 1" src="../../assets/icons/downgrade.svg" alt="icon">
                        <img v-else src="../../assets/icons/upgrade.svg" alt="icon">
                      </div>
                      <div>
                        <p class="text-[#141839] dark:text-white">{{ $t('tech') }}</p>
                        <span class="text-[#696F7A] text-[12px]">{{ $t(item == 1 ? 'left' : 'come') }}</span>
                      </div>
                    </span>
                    <div class="text-right">
                      <p class="text-[#141839] dark:text-white">{{ item == 1 ? '-' : '+' }} {{ item }}38,00$</p>
                      <span class="text-[#696F7A] text-[12px]">1{{item+1}}.0{{ item }}.2022</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="border-l-[1.5px] borderBox dark:border-[#1a283a] uk-width-expand">
              <div class="flex items-center justify-between pl-10">
                <h2 class="text-[#141839] dark:text-white 2xl:text-lg inline-block">История баланса</h2>
                <ul class="flex items-center">
                  <li 
                    v-for="item in lineChartFilters"
                    :key="item.title"
                    @click="handleLineChartFilter(item.title)"
                    :class="lineChartFilter == item.title ? 'border-[1.5px] text-[#141839] dark:text-white' : ''" 
                    class="cursor-pointer text-[#696F7A] text-sm px-2 border-[#2597DE] rounded-[4px]"
                    >
                    {{$t(item.title)}}
                  </li>
                </ul>
              </div>
              <div class="grid grid-cols-1 mt-10 pl-6">
                <apexchart type="area" height="250" :options="chartOptions" :series="series"></apexchart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="params.currentTable === 'income'">
      <div class="a-table border-b-[1.5px] borderBox dark:border-[#1a283a] min-h-[500px]">
        <div>
          <div class="wrapper">
            <div class="a-table-header">
              <ul class="uk-grid-collapse a-table-list" uk-grid>
                <li class="uk-width-expand">
                  <h3 class="a-table-title">{{$t('product_name')}}</h3>
                </li>
                <li class="uk-width-expand">
                  <h3 class="a-table-title">{{$t('total_indeptedness')}}</h3>
                </li>
                <li class="uk-width-expand">
                  <h3 class="a-table-title">{{$t('total_gived_money')}}</h3>
                </li>
                <li class="w-[150px]">
                  <h3 class="a-table-title">{{$t('date')}}</h3>
                </li>
                <li class="w-[120px]">
                  <h3 class="a-table-title flex justify-center">{{$t('actions')}}</h3>
                </li>
              </ul>
            </div>

            <div class="a-table-body" v-if="!isLoading && !isError">
              <ul
                v-for="(item, index) in 1"
                class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a]"
                uk-grid :key="index"
              >
                <li class="uk-width-expand">
                  <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">
                    {{ $t('raw') }}
                  </h3>
                </li>
                <li class="uk-width-expand">
                  <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ item }}00,00$</h3>
                </li>
                <li class="uk-width-expand">
                  <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ item }}000,00$</h3>
                </li>
                <li class="w-[150px]">
                  <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{item}}2.01.2022</h3>
                </li>
                <li class="w-[120px] relative">
                  <v-confirm v-if="confirmDeleteProduct == item" classes="right-[100px] left-auto top-[15px] -translate-y-1/2" :question="$t('are_realy_want_to_delete_this')" @cancel="() => {confirmDeleteProduct = null}" @confirm="console.log('aa')" />
                  <div
                    @click="togglePopup(item)"
                    class="cursor-pointer flex justify-center w-full" :class="$isDark ? 'text-[#66b2ff]' : 'text-[#5FC7D1]'"
                  >
                    <FunctionsIcon
                      stroke="stroke-current"
                      width="30"
                      height="30"
                    />
                  </div>

                  <!-- <functions-popup
                    v-if="popUpActive == item"
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
                          @click="() => {
                              confirmDeleteProduct = item,
                              popUpActive = null
                          }"
                          class="text-[#E54D43] functionsText"
                        >
                          {{$t('delete')}}
                        </button>
                      </div>
                    </template>
                  </functions-popup> -->
                </li>
              </ul>
            </div>
          </div>
        </div>

      <Skeleton classes='w-full min-h-[500px] ' v-if="isLoading && $route.query.table != 'outcome'" />
      <NullData :text="$t('nullData')" v-if="isError && !isLoading" classes="min-h-[500px] py-0" />
     </div>
     <div class="flex justify-end my-10 pr-[35px]" v-if="!isLoading && !isError">
        <v-pagination
          v-model="params.pagination.page"
          :pages="params.pagination.total"
          :range-size="1"
          @update:modelValue="updatePage"
          :hideFirstButton="true"
          hideLastButton="true"
        />
    </div>
      <!-- <div class="wrapper">
        <h2 class="text-2xl font-medium py-10">Категории расходов</h2>
        <div class="grid grid-cols-3 gap-10">
          <div class="border-r-[1.5px] borderBox dark:border-[#1a283a]">
            <div class="flex flex-col items-center h-full">
              <div>
                <apexchart type="radialBar" height="350" :options="chartOptions2" :series="series2"></apexchart>
              </div>
            </div>
          </div>

          <div class="col-span-2">
            <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
          </div>
        </div>
      </div> -->
    </div>

    <div v-if="params.currentTable === 'outcome'">
      <div class="wrapper py-8">
        <div class="grid grid-cols-5 gap-5">
          <div class="bg-white h-[130px] rounded-[12px] card p-4">
            <div class="flex flex-col justify-between h-full">
              <h3 class="text-sm a-table-title">Сегодня</h3>
              <p class="text-[#141839] dark:text-white font-medium 2xl:text-xl"> 1,000,00 сум</p>
            </div>
          </div>
          <div class="bg-white h-[130px] rounded-[12px] card p-4">
            <div class="flex flex-col justify-between h-full">
              <h3 class="text-sm a-table-title">Вчера</h3>
              <p class="text-[#141839] dark:text-white font-medium 2xl:text-xl"> 2,000,00 сум</p>
            </div>
          </div>
          <div class="bg-white h-[130px] rounded-[12px] card p-4">
            <div class="flex flex-col justify-between h-full">
              <h3 class="text-sm a-table-title">{{ $dayjs().subtract(2, 'day').format("DD-MM-YYYY") }}</h3>
              <p class="text-[#141839] dark:text-white font-medium 2xl:text-xl"> 3,000,00 сум</p>
            </div>
          </div>
          <div class="bg-white h-[130px] rounded-[12px] card p-4">
            <div class="flex flex-col justify-between h-full">
              <h3 class="text-sm a-table-title">{{ $dayjs().subtract(3, 'day').format("DD-MM-YYYY") }}</h3>
              <p class="text-[#141839] dark:text-white font-medium 2xl:text-xl"> 4,000,00 сум</p>
            </div>
          </div>
          <div class="bg-white h-[130px] rounded-[12px] card p-4">
            <div class="flex flex-col justify-between h-full">
              <h3 class="text-sm a-table-title">{{ $dayjs().subtract(4, 'day').format("DD-MM-YYYY") }}</h3>
              <p class="text-[#141839] dark:text-white font-medium 2xl:text-xl"> 5,000,00 сум</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex items-center justify-between border-y-[1.5px] borderBox dark:border-[#1a283a] wrapper h-[70px]"
       >
        <ul class="basicTab">
          <li
            @click="changeTableOutcomes('history')"
            class="main-color-black font-medium duration-300"
            :class="params.outcomes.current == 'history' ? 'active' : ''"
          >
            История расходов
          </li>
          <li
            @click="changeTableOutcomes('categories')"
            class="main-color-black font-medium duration-300"
            :class="params.outcomes.current == 'categories' ? 'active' : ''"
          >
            Категории расходов
          </li>
        </ul>  

        <button
          v-if="params.outcomes.current == 'categories'"
          @click="toggleModal()"
          class="mainBackgroundColor hover:scale-105 duration-100 text-white basicBtn"
        >
          <PlusIcon stroke="stroke-current mr-2" />
          {{$t('add')}}
        </button>
      </div>
      <div class="a-table">
         <!-- && $can('read', 'warehouse-raw-coming') -->
        <div class="table-1" v-if="params.outcomes.current == 'history'">
          <div class="wrapper border-b-[1.5px] borderBox dark:border-[#1a283a]">
            <div
              class="uk-grid-medium uk-grid-match uk-child-width-expand h-full"
              uk-grid
            >
              <div class="h-full">
                <div class="a-card h-full">
                  <div class="uk-grid-collapse uk-child-width-1-2 h-full" uk-grid>
                    <div>
                      <div class="border-r-[1.5px] borderBox dark:border-[#1a283a] pr-10 h-full">
                        <div class="a-card-header">
                          <ul
                            class="uk-grid-collapse a-table-list pb-5"
                            uk-grid
                          >
                            <li class="uk-width-expand">
                              <h3 class="a-table-title">{{$t('date')}}</h3>
                            </li>
                            <li class="uk-width-expand">
                              <h3 class="a-table-title">{{$t('category')}}</h3>
                            </li>
                            <li class="uk-width-expand">
                              <h3 class="a-table-title">{{$t('price')}}</h3>
                            </li>
                            <li class="w-[100px]">
                              <h3 class="a-table-title">{{$t('description')}}</h3>
                            </li>
                          </ul>
                        </div>

                        <div v-if="!isLoading" class="a-card-body">
                          <ul
                            v-for="(item, index) in expensesListLeft"
                            class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a]"
                            uk-grid
                            :key="index"
                          >
                            <li class="uk-width-expand">
                              <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">
                                {{ $dayjs(item.created_at).format('DD-MM-YYYY, HH:mm') }}
                              </h3>
                            </li>
                            <li class="uk-width-expand">
                              <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ item?.category?.name }}</h3>
                            </li>
                            <li class="uk-width-expand">
                              <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ formatPrice(item.amount) }} {{item?.currency}} ({{formatPrice(item.current_currency)}})</h3>
                            </li>
                            <li class="w-[100px]">
                              <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ item?.description }}</h3>
                            </li>
                          </ul>
                        </div>

                        <Skeleton v-if="isLoading" classes="w-full min-h-[500px] " />
                        <null-data v-else-if="isErrorLeft" width='w-[120px]' classes='h-full min-h-[500px] ' />
                      </div>
                    </div>
                    <div>
                      <div class="pl-10">
                        <div class="a-card-header">
                          <ul
                            class="uk-grid-collapse a-table-list pb-5"
                            uk-grid
                          >
                            <li class="uk-width-expand">
                              <h3 class="a-table-title">{{$t('date')}}</h3>
                            </li>
                            <li class="uk-width-expand">
                              <h3 class="a-table-title">{{$t('category')}}</h3>
                            </li>
                            <li class="uk-width-expand">
                              <h3 class="a-table-title">{{$t('price')}}</h3>
                            </li>
                            <li class="w-[100px]">
                              <h3 class="a-table-title">{{$t('description')}}</h3>
                            </li>
                          </ul>
                        </div>

                        <div v-if="!isLoading" class="a-card-body">
                          <ul
                            v-for="(item, index) in expensesListRight"
                            class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a]"
                            uk-grid
                            :key="index"
                          >
                            <li class="uk-width-expand">
                              <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">
                                {{ $dayjs(item.created_at).format('DD-MM-YYYY, HH:mm') }}
                              </h3>
                            </li>
                            <li class="uk-width-expand">
                              <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ item?.category?.name }}</h3>
                            </li>
                            <li class="uk-width-expand">
                              <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ formatPrice(item.amount) }} {{item?.currency}} ({{formatPrice(item.current_currency)}})</h3>
                            </li>
                            <li class="w-[100px]">
                              <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ item?.description }}</h3>
                            </li>
                          </ul>
                        </div>

                        <Skeleton v-if="isLoading" classes="w-full min-h-[500px] " />
                        <null-data v-else-if="isErrorRight" width='w-[120px]' classes='h-full min-h-[500px] ' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-8 pr-[35px]" v-if="!isLoading && !isError">
            <v-pagination
              v-model="params.pagination.page"
              :pages="params.pagination.total"
              :range-size="1"
              @update:modelValue="updatePage"
              :hideFirstButton="true"
              hideLastButton="true"
            />
        </div>
        </div>


<!-- && $can('read', 'warehouse-raw-coming') -->
        <div class="table-1" v-if="params.outcomes.current == 'categories'">
          <div class="wrapper border-b-[1.5px] borderBox dark:border-[#1a283a]">
            <div
              class="uk-grid-medium uk-grid-match uk-child-width-expand h-full"
              uk-grid
            >
              <div class="h-full">
                <div class="a-card h-full">
                  <div class="uk-grid-collapse uk-child-width-1-2 h-full" uk-grid>
                    <div>
                      <div class="border-r-[1.5px] borderBox dark:border-[#1a283a] pr-10 h-full">
                        <div class="a-card-header">
                          <ul
                            class="uk-grid-collapse a-table-list pb-5"
                            uk-grid
                          >
                            <li class="uk-width-expand">
                              <h3 class="a-table-title">{{$t('title')}}</h3>
                            </li>
                            <li class="uk-width-expand">
                              <h3 class="a-table-title">{{$t('color')}}</h3>
                            </li>
                            <li class="uk-width-expand">
                              <h3 class="a-table-title">{{$t('description')}}</h3>
                            </li>
                            <li class="w-[120px]">
                              <h3 class="a-table-title flex justify-center">{{$t('actions')}}</h3>
                            </li>
                          </ul>
                        </div>

                        <div v-if="!isLoading" class="a-card-body">
                          <ul
                            v-for="(item, index) in expenseCategoriesListLeft"
                            class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a]"
                            uk-grid
                            :key="index"
                          >
                            <li class="uk-width-expand">
                              <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ item.name }}</h3>
                            </li>
                            <li class="uk-width-expand">
                              <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ getColor(item.color) }}</h3>
                            </li>
                            <li class="uk-width-expand">
                              <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ item.description }}</h3>
                            </li>
                            <li class="w-[120px]">
                              <div class="relative">
                                <v-confirm v-if="confirmDeleteProduct == item.id" classes="right-[100px] left-auto top-[15px] -translate-y-1/2" :question="$t('are_realy_want_to_delete_this')" @cancel="() => {confirmDeleteProduct = null}" @confirm="deleteProduct(item.id)" />
                                <div
                                  @click="togglePopup(item.id)"
                                  class="cursor-pointer flex justify-center w-full" :class="$isDark ? 'text-[#66b2ff]' : 'text-[#5FC7D1]'"
                                >
                                  <FunctionsIcon
                                    stroke="stroke-current"
                                    width="30"
                                    height="30"
                                  />
                                </div>

                                <functions-popup
                                  v-if="popUpActive == item.id"
                                  additonalClasses="z-[11]"
                                >
                                  <template v-slot:FunctionsPopupContent>
                                    <div class="flex flex-col space-y-3">
                                      <button
                                        @click="editProduct(item)"
                                        class="functionsText mainColorText"
                                      >
                                        {{$t('edit')}}
                                      </button>
                                      <button
                                        @click="() => {
                                          confirmDeleteProduct = item.id,
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
                            </li>
                          </ul>
                        </div>

                        <Skeleton v-if="isLoading" classes="w-full min-h-[500px] " />
                        <null-data v-else-if="isErrorLeft" width='w-[120px]' classes='h-full min-h-[500px] ' />
                      </div>
                    </div>
                    <div>
                      <div class="pl-10">
                        <div class="a-card-header">
                          <ul
                            class="uk-grid-collapse a-table-list pb-5"
                            uk-grid
                          >
                            <li class="uk-width-expand">
                              <h3 class="a-table-title">{{$t('title')}}</h3>
                            </li>
                            <li class="uk-width-expand">
                              <h3 class="a-table-title">{{$t('color')}}</h3>
                            </li>
                            <li class="uk-width-expand">
                              <h3 class="a-table-title">{{$t('description')}}</h3>
                            </li>
                            <li class="w-[120px]">
                              <h3 class="a-table-title flex justify-center">{{$t('actions')}}</h3>
                            </li>
                          </ul>
                        </div>

                        <div v-if="!isLoading" class="a-card-body">
                          <ul
                            v-for="(item, index) in expenseCategoriesListRight"
                            class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a]"
                            uk-grid
                            :key="index"
                          >
                            <li class="uk-width-expand">
                              <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ item.name }}</h3>
                            </li>
                            <li class="uk-width-expand">
                              <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ getColor(item.color) }}</h3>
                            </li>
                            <li class="uk-width-expand">
                              <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ item.description }}</h3>
                            </li>
                            <li class="w-[120px]">
                              <div class="relative">
                                <v-confirm v-if="confirmDeleteProduct == item.id" classes="right-[100px] left-auto top-[15px] -translate-y-1/2" :question="$t('are_realy_want_to_delete_this')" @cancel="() => {confirmDeleteProduct = null}" @confirm="deleteProduct(item.id)" />
                                <div
                                  @click="togglePopup(item.id)"
                                  class="cursor-pointer flex justify-center w-full" :class="$isDark ? 'text-[#66b2ff]' : 'text-[#5FC7D1]'"
                                >
                                  <FunctionsIcon
                                    stroke="stroke-current"
                                    width="30"
                                    height="30"
                                  />
                                </div>

                                <functions-popup
                                  v-if="popUpActive == item.id"
                                  additonalClasses="z-[11]"
                                >
                                  <template v-slot:FunctionsPopupContent>
                                    <div class="flex flex-col space-y-3">
                                      <button
                                        @click="editProduct(item)"
                                        class="functionsText mainColorText"
                                      >
                                        {{$t('edit')}}
                                      </button>
                                      <button
                                        @click="() => {
                                          confirmDeleteProduct = item.id,
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
                            </li>
                          </ul>
                        </div>

                        <Skeleton v-if="isLoading" classes="w-full min-h-[500px] " />
                        <null-data v-else-if="isErrorRight" width='w-[120px]' classes='h-full min-h-[500px] ' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-8 pr-[35px]" v-if="!isLoading && !isError">
            <v-pagination
              v-model="params.pagination2.page"
              :pages="params.pagination2.total"
              :range-size="1"
              @update:modelValue="updatePage"
              :hideFirstButton="true"
              hideLastButton="true"
            />
        </div>
        </div>




      </div>
    </div>

    <div v-if="params.currentTable === 'indeptedness'">
      <div class="wrapper py-8">
        <div class="grid grid-cols-5 gap-5">
          <div v-for="item in 5" :key="item" class="bg-white h-[130px] rounded-[12px] card p-4">
            <div class="flex flex-col justify-between h-full">
              <h3 class="text-sm a-table-title">{{ $t(item == 1 ? 'total_indeptedness' : item == 2 ? 'raw' : 'accessories') }}</h3>
              <p class="text-[#141839] dark:text-white font-medium 2xl:text-xl"> {{ item }},461,40{{ item + 1 }} сум</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex items-center justify-between border-y-[1.5px] borderBox dark:border-[#1a283a] wrapper h-[70px]"
       >
        <ul class="basicTab">
          <li
            v-for="item in indeptednessTableTitles"
            :key="item"
            @click="changeTableindeptedness(item)"
            class="main-color-black font-medium duration-300"
            :class="params.indeptedness.current === item ? 'active' : ''"
          >
            {{$t(item)}}
          </li>
        </ul>  
      </div>
      <div class="a-table border-b-[1.5px] borderBox dark:border-[#1a283a] min-h-[500px]">
        <div>
          <div class="wrapper">
            <div class="a-table-header">
              <ul class="uk-grid-collapse a-table-list" uk-grid>
                <li class="uk-width-expand">
                  <h3 class="a-table-title">{{$t('from_whome')}}</h3>
                </li>
                <li class="uk-width-expand">
                  <h3 class="a-table-title">{{$t('indeptedness')}}</h3>
                </li>
                <li class="uk-width-expand">
                  <h3 class="a-table-title">{{$t('paid')}}</h3>
                </li>
                <li class="uk-width-expand">
                  <h3 class="a-table-title">{{$t('left_sum')}}</h3>
                </li>
                <li class="uk-width-expand">
                  <h3 class="a-table-title">{{$t('started_date')}}</h3>
                </li>
                <li class="w-[120px]">
                  <h3 class="a-table-title flex justify-center">{{$t('actions')}}</h3>
                </li>
              </ul>
            </div>

            <div class="a-table-body" v-if="!isLoading && !isError">
              <ul
                v-for="(item, index) in (params.indeptedness.current == 'raw' || params.indeptedness.current == 'equipment' ? 3 : 1)"
                class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a] "
                uk-grid :key="index"
              >
                <li class="uk-width-expand">
                  <h3 class="a-table-text blue-text">
                    {{ $t('firms') }}
                  </h3>
                </li>
                <li class="uk-width-expand">
                  <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ item }}00,00</h3>
                </li>
                <li class="uk-width-expand">
                  <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ item }}000,00</h3>
                </li>
                <li class="uk-width-expand">
                  <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{item}}0,00</h3>
                </li>
                <li class="uk-width-expand">
                  <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{item}}1.01.2022</h3>
                </li>
                <li class="w-[120px] relative">
                  <v-confirm v-if="confirmDeleteProduct == item" classes="right-[100px] left-auto top-[15px] -translate-y-1/2" :question="$t('are_realy_want_to_delete_this')" @cancel="() => {confirmDeleteProduct = null}" @confirm="console.log('aa')" />
                  <div
                    @click="togglePopup(item)"
                    class="cursor-pointer flex justify-center w-full" :class="$isDark ? 'text-[#66b2ff]' : 'text-[#5FC7D1]'"
                  >
                    <FunctionsIcon
                      stroke="stroke-current"
                      width="30"
                      height="30"
                    />
                  </div>

                  <!-- <functions-popup
                    v-if="popUpActive == item"
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
                          @click="() => {
                              confirmDeleteProduct = item,
                              popUpActive = null
                          }"
                          class="text-[#E54D43] functionsText"
                        >
                          {{$t('delete')}}
                        </button>
                      </div>
                    </template>
                  </functions-popup> -->
                </li>
              </ul>
            </div>
          </div>
        </div>

      <Skeleton classes='w-full min-h-[500px] ' v-if="isLoading && $route.query.table != 'outcome'" />
      <NullData :text="$t('nullData')" v-if="isError && !isLoading" classes="min-h-[500px] py-0" />
     </div>
     <div class="flex justify-end my-10 wrapper" v-if="!isLoading && !isError">
        <v-pagination
          v-model="params.pagination.page"
          :pages="params.pagination.total"
          :range-size="1"
          @update:modelValue="updatePage2"
          :hideFirstButton="true"
          hideLastButton="true"
        />
    </div>
    </div>

    <!-- <div class="pt-6 pb-4 border-b-[1.5px] borderBox dark:border-[#1a283a] wrapper">
      <h3 class="sectionTitle">
        {{ currentFilter == 'day' ? $t('filter_daily') : currentFilter == 'month' ? $t('filter_monthly') : $t('filter_yearly') }}
      </h3>
    </div>
    <div class="wrapper grid grid-cols-5 gap-4 mt-8">
      <div v-for="(item, index) in 5" :key="index" class="border-[1.5px] borderBox dark:border-[#1a283a]  w-full h-[200px] rounded-[12px] p-4 flex flex-col justify-between">
        <span class="border border-[#34B968] rounded-[12px] w-[50px] h-[50px] flex items-center justify-center" :class="index == 3 ? 'border-[#e03333]' : ''">
          <img src="../../assets/icons/allMoney.svg" alt="">
        </span>
        <div>
          <h2 class="text-2xl green-color mb-2" :class="index == 3 ? 'text-[#e03333]' : ''">Kirim</h2>
          <p class="text-2xl font-medium main-color-black">92 669 сум</p>
        </div>
      </div>
    </div>

  <div class="wrapper mt-14">
    <div class="flex items-center justify-center">
      <h2 class="sectionTitle">Maxsulotlar</h2>
    </div>
    <div class="grid grid-cols-1">
      <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div> -->

    <!-- <div class="w-full">
      <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
      <apexchart type="radialBar" height="350" :options="chartOptions2" :series="series2"></apexchart>
    </div>
    <div class="w-full">
      <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
    </div> -->
  </section>
<!-- 
  <Filter buttonClass="mt-10 right-8" wrapperClass='top-[180px]'>
    <template v-slot:filterBody>
      <div class="w-[300px]">
        <div class="relative">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="../../assets/icons/filter-select.svg"
            alt="icon"
          />
          <vue-select :options="optionsDate" @select="(option) => currentFilter = option.slug" classes="main-color-black pl-12" :placeholder="$t('days')" />
        </div>
      </div>
    </template>
  </Filter> -->

  <addExpenseCategoryModal :isModalActive="isModalActive" @closeModal="toggleModal"/>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n';
import { productIncomeToStore } from '@/store/modules/pages/Warehouse'
import { mainStore } from '@/store/main'
import { useToast } from 'vue-toastification'

import addExpenseCategoryModal from './components/addExpenseCategoryModal.vue'
import FunctionsIcon from "@/assets/iconsVue/FunctionsIcon.vue";
import PlusIcon from "@/assets/iconsVue/PlusIcon.vue";
import formatter from '@/mixins/formatter.js'

export default {
  components: {
    FunctionsIcon,
    PlusIcon,
    addExpenseCategoryModal,
  },
  setup() {
    const { t, locale } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const toast = useToast()
    const mainStorage = mainStore()
    const productIncomeStorage = productIncomeToStore()


    const {formatPrice} = formatter()
    const popUpActive = ref(null)
    const isModalActive = ref(false)

    const confirmDeleteProduct = ref(false)
    const isLoading = ref(false)
    const isError = ref(false)
    const isErrorLeft = ref(false)
    const isErrorRight = ref(false)
    const lineChartFilter = ref('month')
    const params = ref({
      currentTable: 'dashboard',
      indeptedness: {
        current: 'raw'
      },
      outcomes: {
        current: 'history'
      },
      pagination: {
        page: 1,
        total: 1,
        limit: 10
      },
      pagination2: {
        page: 1,
        total: 1,
        limit: 10
      }
    })
    const expensesListLeft = ref([])
    const expensesListRight = ref([])

    const expenseCategoriesListLeft = ref([])
    const expenseCategoriesListRight = ref([])

    const indeptednessTableTitles = ref([
      'raw',
      'accessories',
      'equipment',
      'tech'
    ])

    const lineChartFilters = ref([
      {
        title: 'week'
      },
      {
        title: 'month'
      },
      {
        title: 'quarter'
      },
      {
        title: 'year'
      }
    ])

 

    let series = ref([
      {
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100]
      }, 
      {
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
        type: 'Pie',
      },
      plotOptions: {
        pie: {
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

    const currentFilter = ref('day')
    const optionsDate = ref([
      {
        title: 'Days',
        slug: 'day'
      },
      {
        title: 'Months',
        slug: 'month'
      },
      {
        title: 'Year',
        slug: 'year'
      }
    ])


    const getColor = (value) => {
      if(value == 'red'){
        return 'Красный'
      }else if(value == 'blue'){
        return 'Синий'
      }else if(value == 'yellow'){
        return 'Жёлтый'
      }else if(value == 'brown'){
        return 'Коричневый'
      }else if(value == 'green'){
        return 'Зелёный'
      }else if(value == 'black'){
        return 'Чёрный'
      }else if(value == 'purple'){
        return 'Фиолетовый'
      }else if(value == 'orange'){
        return 'Оранжевый'
      }
    }






    const changeTable = (e) => {
      router.push(`/finance?table=${e}`)
      params.value.currentTable = e

      if (params.value.currentTable == 'income') {
      } else if (params.value.currentTable == 'outcome') {
      } else if (params.value.currentTable == 'indeptedness') {
      }
    }

    const changeTableindeptedness = (e) => {
      const query = { ...route.query }
      router.push({ path: route.fullPath, query: { ...query, indeptedness: e } })
      params.value.indeptedness.current = e
    }
    
    const changeTableOutcomes = (e) => {
      const query = { ...route.query }
      router.push({ path: route.fullPath, query: { ...query, outcomes: e } })
      params.value.outcomes.current = e
    }

    const togglePopup = (id) => {
      if (popUpActive.value === id) {
        popUpActive.value = null
      } else {
        popUpActive.value = id
      }
    }

    const handleLineChartFilter = (e) => {
      lineChartFilter.value = e
      if (e == 'week') {
        series.value = [
        {
          name: 'series1',
          data: [31, 28, 109, 100]
        }, 
        {
          name: 'series2',
          data: [11, 32, 41]
          }
        ]
      }
    }

    const getExpenses = async() => {
      isErrorLeft.value = false
      isLoading.value = true
      const data = {
        page: params.value.pagination.page,
        per_page: params.value.pagination.limit,
      }

      await productIncomeStorage.GET_EXPENSES({...data}).then(response => {
    
        if (response.data.data.data.length && response.data.data.data.length < 2) {
          expensesListLeft.value = response.data.data.data
          expensesListRight.value = []
        } else if (response.data.data.data.length && response.data.data.data.length > 1) {
          expensesListLeft.value = response.data.data.data.slice(0, Math.ceil(response.data.data.data.length / 2))
          expensesListRight.value = response.data.data.data.slice(Math.ceil(response.data.data.data.length / 2))
        } else {
          expensesListLeft.value = []
          expensesListRight.value = []
        }

        params.value.pagination.total = response.data.data.total > 9 ? Math.ceil(response.data.data.total / 10) : 1
      })
      .catch(() => {
        isErrorLeft.value = true
        isErrorRight.value = true
      })
      .finally(() => {
        isLoading.value = false
      })
    }


    async function updatePage(value) {
      params.value.pagination.page = value
      await getExpenses()
    }
    async function updatePage2(value) {
      params.value.pagination2.page = value
      await getExpenseCategories()
    }


    const getExpenseCategories = async() => {
      isErrorLeft.value = false
      isLoading.value = true
      const data = {
        page: params.value.pagination2.page,
        per_page: params.value.pagination2.limit,
      }

      await productIncomeStorage.GET_EXPENSE_CATEGORIES({...data}).then(response => {
        if (response.data.data.data.length && response.data.data.data.length < 2) {
          expenseCategoriesListLeft.value = response.data.data.data
          expenseCategoriesListRight.value = []
        } else if (response.data.data.data.length && response.data.data.data.length > 1) {
          expenseCategoriesListLeft.value = response.data.data.data.slice(0, Math.ceil(response.data.data.data.length / 2))
          expenseCategoriesListRight.value = response.data.data.data.slice(Math.ceil(response.data.data.data.length / 2))
        } else {
          expenseCategoriesListLeft.value = []
          expenseCategoriesListRight.value = []
        }
        params.value.pagination2.total = response.data.data.total > 9 ? Math.ceil(response.data.data.total / 10) : 1
      })
      .catch(() => {
        isErrorLeft.value = true
        isErrorRight.value = true
      })
      .finally(() => {
        isLoading.value = false
      })
    }

   
    onMounted( async () => {
        if (route.query.table) {
          router.push(route.fullPath)
          params.value.currentTable = route.query.table
          params.value.pagination.page = route.query.page ? route.query.page : 1
          params.value.pagination2.page = route.query.page ? route.query.page : 1
          
          if (route.query.table == 'income') {
          } else if (route.query.table == 'outcome') {
            await getExpenses()
            await getExpenseCategories()
          } else if (route.query.table == 'indeptedness') {
          }
        } else {
        }
        if (route.query.indeptedness) {
          router.push(route.fullPath)
          params.value.indeptedness.current = route.query.indeptedness
        }
    })


    // ========================= WATCH_SECTION START =========================
    watch(() => mainStorage.current_product_income, async (value) => {
        if (route.query.table) {
          router.push(route.fullPath)
          params.value.currentTable = route.query.table
          params.value.pagination.page = route.query.page ? route.query.page : 1
          params.value.pagination2.page = route.query.page ? route.query.page : 1
          
        if (route.query.table == 'income') {
        } else if (route.query.table == 'outcome') {
          await getExpenses()
        } else if (route.query.table == 'indeptedness') {
        }
        } else {
        }

        mainStorage.current_product_income = ''
    })
    // ========================= WATCH_SECTION END =========================




    // ========================= WATCH_SECTION START =========================
    watch(() => productIncomeStorage.refreshExpenseCategories, async (value) => {
        if (route.query.table) {
          router.push(route.fullPath)
          params.value.currentTable = route.query.table
          params.value.pagination.page = route.query.page ? route.query.page : 1
          params.value.pagination2.page = route.query.page ? route.query.page : 1
          
        // if (route.query.table == 'income') {
          //   } else if (route.query.table == 'outcome') {
        //   await getExpenseCategories()
        // } else if (route.query.table == 'indeptedness') {
          // }
        // } else {


        }

        if(value){
          await getExpenseCategories()
          productIncomeStorage.refreshExpenseCategories = false
        }

    })
    // ========================= WATCH_SECTION END =========================





    // ========================= POPUP_AND_MODAL_SECTION START =========================
    // const togglePopup = (id) => {
    //   if (popUpActive.value === id) {
    //     popUpActive.value = null
    //   } else {
    //     popUpActive.value = id
    //   }
    // };

    const toggleModal = (product_category_id) => {
      isModalActive.value = !isModalActive.value
      // router.replace(`/codebase?product_category_id=${product_category_id ? product_category_id : currantTable.value}`)
      popUpActive.value = null

      // if (!isModalActive.value) {
      //   formProduct.value = {
      //     code: '',
      //     product_category_id: null,
      //     name_ru: '',
      //   }
      //   createdDate.value = ''
      // }
      // if (!route.query.product) {
      //   textBtn.value = 'сonfirm'
      //   createdDate.value = new Date
      //   formProduct.value.product_category_id = currantTable.value
      //   let a = categoriesList.value.find((e) => e.id == currantTable.value)
      //   formProduct.value.category = a
      // }
    }
    // ========================= POPUP_AND_MODAL_SECTION END =========================







    // ========================= EDIT_AND_DELETE_SECTION START =========================
    const editProduct = async (data) => {
      // formProduct.value = data
      // // textBtn.value = 'edit'
      // isModalActive.value = !isModalActive.value
      // popUpActive.value = null
      // router.replace(`/codebase?product_category_id=${currantTable.value}&product=${data.id}`)

      // formProduct.value.product_category_id = currantTable.value
      // let a = categoriesList.value.find((e) => e.id == currantTable.value)
      // formProduct.value.category= a
    }

    const deleteProduct = async (id) => {
      confirmDeleteProduct.value = null
      await productIncomeStorage.DELETE_EXPENSE_CATEGORY(id).then((response) => {
          if (response.data) {
            // productIncomeStorage.updateCodebase = true
            toast.success(t('successfully-deleted'))
            getExpenseCategories()
          }
      })
    }
    // ========================= EDIT_AND_DELETE_SECTION END =========================


    return {
      params,
      series,
      series2,
      chartOptions,
      chartOptions2,
      lineChartFilter,
      optionsDate,
      currentFilter,
      lineChartFilters,
      popUpActive,
      isModalActive,
      confirmDeleteProduct,
      isLoading,
      isError,
      isErrorLeft,
      isErrorRight,

      changeTable,
      togglePopup,
      toggleModal,
      getColor,

      changeTableindeptedness,
      changeTableOutcomes,


      indeptednessTableTitles,
      handleLineChartFilter,

      expensesListLeft,
      expensesListRight,


      expenseCategoriesListLeft,
      expenseCategoriesListRight,


      editProduct,
      deleteProduct,
      updatePage,
      updatePage2,

      formatPrice,
    };
  },
};
</script>

<style scoped>
.dark .card {
  background-color: #011e3c;
  box-shadow: 6px 12px 30px rgba(22,28,36,.03)!important;
}
.card {
  box-shadow: 6px 12px 30px rgba(22,28,36,.07)!important;
}
</style>
