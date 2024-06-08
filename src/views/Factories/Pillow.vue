<template>
  <section class="pb-20">
    <div class="pt-6 pb-4 wrapper">
      <h3 class="sectionTitle">
        {{
          params.currentTable === "table-1"
            ?$t('comes_history')
            : params.currentTable === "table-2"
            ?$t('comes_history')
            : params.currentTable === "table-3"
            ?$t('lefts_history')
            : params.currentTable === "table-4"
            ?$t('warehouse')
            :$t('ready_products')
        }}
      </h3>
      <!-- <span class="text-sm text-[#888A8F] mt-2">245 ta kirim chiqim tarixi</span> -->
      <span class="text-sm text-[#888A8F] mt-2">{{ params.totalCount }} шт приходов и расходов</span>
    </div>
    <div
      class="flex items-center justify-between border-y-[1.5px] borderBox dark:border-[#1a283a] wrapper h-[70px]"
    >
      <ul class="basicTab">
        <li
          v-if="$can('read', 'factories-pillow-coming-raw')"
          @click="changeTable('table-1')"
          class="main-color-black font-medium duration-300"
          :class="params.currentTable === 'table-1' ? 'active' : ''"
        >
          {{$t('come_raw')}}
        </li>
        <li
          v-if="$can('read', 'factories-pillow-coming-ready')"
          @click="changeTable('table-2')"
          class="main-color-black font-medium duration-300"
          :class="params.currentTable === 'table-2' ? 'active' : ''"
        >
          {{$t('come_product')}}
        </li>
        <li
          v-if="$can('read', 'factories-pillow-expense')"
          @click="changeTable('table-3')"
          class="main-color-black font-medium duration-300"
          :class="params.currentTable === 'table-3' ? 'active' : ''"
        >
          {{$t('left')}}
        </li>
        <li
          v-if="$can('read', 'factories-pillow-warehouse')"
          @click="changeTable('table-4')"
          class="main-color-black font-medium duration-300"
          :class="params.currentTable === 'table-4' ? 'active' : ''"
        >
          {{$t('warehouse')}}
        </li>
        <li
          v-if="$can('read', 'factories-pillow-ready-warehouse')"
          @click="changeTable('table-5')"
          class="main-color-black font-medium duration-300"
          :class="params.currentTable === 'table-5' ? 'active' : ''"
        >
          {{$t('ready_products')}}
        </li>
      </ul>

      <button
        v-if="$can('read', 'factories-pillow-produce')"
        @click="toggleModal()"
        class="mainBackgroundColor text-white basicBtn"
      >
        <PlusIcon stroke="stroke-current mr-2" />
        {{$t('production')}}
      </button>
    </div>


    <div class="a-table border-b-[1.5px] borderBox dark:border-[#1a283a] min-h-[500px]">

      
      <div class="table-1" v-if="params.currentTable === 'table-1' && $can('read', 'factories-pillow-coming-raw')">
        <div class="wrapper">
          <div class="a-table-header">
            <ul class="uk-grid-collapse a-table-list" uk-grid>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('date')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('code')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('title')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('amount')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('where')}}</h3>
              </li>
              <li class="w-[100px]">
                <h3 class="a-table-title flex justify-center">{{$t('actions')}}</h3>
              </li>
            </ul>
          </div>

          <div class="a-table-body" v-if="!isLoading && !isError">
            <ul
              v-for="item in incomeList"
              class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a]"
              uk-grid :key="item.id"
            >
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">
                  {{ $dayjs(item.created_at).format('DD-MM-YYYY, HH:mm') }}
                </h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text blue-text">{{ item.product.code }}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{item.product[`name_${locale}`]}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ formatPrice(item.amount) }} {{item.unit}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ item.factory }}</h3>
              </li>
              <li class="w-[100px] relative">
                <!-- <v-confirm v-if="confirmToDeleteProduct == item.id" classes="right-[100px] left-auto top-[15px] -translate-y-1/2" :question="$t('are_realy_want_to_delete_this')" @cancel="() => {confirmToDeleteProduct = null}" @confirm="deleteProductStore(item.id)" /> -->
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

                <!-- <functions-popup
                  v-if="popUpActive[index]"
                  :additonalClasses="'z-[11]'"
                >
                  <template v-slot:FunctionsPopupContent>
                    <div class="flex flex-col space-y-3">
                      <button
                        class="text-[#eac544] hover:scale-105 duration-300"
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
                </functions-popup> -->
              </li>
            </ul>
          </div>


        </div>

         <!-- <div class="flex justify-center mt-10">
          <v-pagination
            v-model="params.page"
            :pages="5"
            :range-size="1"
            @update:modelValue="updatePage"
            :hideFirstButton="true"
            hideLastButton="true"
          />
        </div> -->
      </div>



      <div class="table-1" v-if="params.currentTable === 'table-2' && $can('read', 'factories-pillow-coming-ready')">
        <div class="wrapper">
          <div class="a-table-header">
            <ul class="uk-grid-collapse a-table-list" uk-grid>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('date')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('code')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('title')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('amount')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('where')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('expenses')}}</h3>
              </li>
              <li class="w-[100px]">
                <h3 class="a-table-title flex justify-center">{{$t('actions')}}</h3>
              </li>
            </ul>
          </div>

          <div class="a-table-body" v-if="!isLoading && !isError">
            <ul
              v-for="(item, index) in income2List"
              class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a]"
              uk-grid :key="index"
            >
              <li class="uk-width-expand">
                <h3 class="a-table-text main-color-black" :class="$isDark ? 'dark' : ''">
                  {{ $dayjs(item.created_at).format('DD-MM-YYYY, HH:mm') }}
                </h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text  main-color-black blue-text" :class="$isDark ? 'dark' : ''">{{ item.product.code }}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text main-color-black">{{item.product[`name_${locale}`]}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text warn-color" :class="$isDark ? 'dark' : ''">{{ formatPrice(item.amount) }} {{item.unit}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text warn-color">{{ item.factory }}</h3>
              </li>
              <li class="uk-width-expand">
                <div class="inline-block relative group">
                  <h3 class="a-table-text mainColorText blue-text dark:text-[#2597DE] dark:text-[#2597DE]">{{$t('show')}}</h3>
                  <div
                    class="hidden group-hover:block duration-300 z-[2] absolute left-1/2 top-1/2 h-auto -translate-x-1/2 mainBackgroundColorBlack w-[150px] p-4 rounded-[12px]"
                  >
                    <div class="relative w-full">
                      <div v-for="(item2, index2) in item.order_extra_products" :key="index2">
                        <span class="text-[12px] text-[#888A8F]">{{item2.product[`name_${locale}`]}}</span>
                        <p class="text-white text-sm font-semibold">
                          {{item2.amount}} {{item2.unit}}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="w-[100px] relative">
                <!-- <v-confirm v-if="confirmToDeleteProduct == index" classes="right-[100px] left-auto top-[15px] -translate-y-1/2" :question="$t('are_realy_want_to_delete_this')" @cancel="() => {confirmToDeleteProduct = null}" @confirm="deleteProductStore(index)" /> -->
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
<!-- 
                <functions-popup
                  v-if="popUpActive[index]"
                  :additonalClasses="'z-[11]'"
                >
                  <template v-slot:FunctionsPopupContent>
                    <div class="flex flex-col space-y-3">
                      <button
                        class="text-[#eac544] hover:scale-105 duration-300"
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
                </functions-popup> -->
              </li>
            </ul>
          </div>
        </div>

        <!-- <div class="flex justify-center mt-10">
          <v-pagination
            v-model="params.page"
            :pages="5"
            :range-size="1"
            @update:modelValue="updatePage"
            :hideFirstButton="true"
            hideLastButton="true"
          />
        </div> -->
      </div>





      <div class="table-2" v-if="params.currentTable === 'table-3' && $can('read', 'factories-pillow-expense')">
        <div class="wrapper">
          <div class="a-table-header">
            <ul class="uk-grid-collapse a-table-list" uk-grid>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('date')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('code')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('title')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('amount')}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('where')}}</h3>
              </li>
              <li class="w-[100px]">
                <h3 class="a-table-title flex justify-center">{{$t('actions')}}</h3>
              </li>
            </ul>
          </div>

          <div class="a-table-body" v-if="!isLoading && !isError">
            <ul
              v-for="(item, index) in outcomeList"
              class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a]"
              uk-grid :key="index"
            >
              <li class="uk-width-expand">
                <h3 class="a-table-text main-color-black" :class="$isDark ? 'dark' : ''">
                  {{ $dayjs(item.created_at).format('DD-MM-YYYY, HH:mm') }}
                </h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text  main-color-black blue-text" :class="$isDark ? 'dark' : ''">{{ item.product.code }}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text main-color-black">{{item.product[`name_${locale}`]}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text warn-color" :class="$isDark ? 'dark' : ''">{{ formatPrice(item.amount) }} {{item.unit}}</h3>
              </li>
              <li class="uk-width-expand">
                <h3 class="a-table-text warn-color">{{ item.factory }}</h3>
              </li>
              <li class="w-[100px] relative">
                <!-- <v-confirm v-if="confirmToDeleteProduct == index" classes="right-[100px] left-auto top-[15px] -translate-y-1/2" :question="$t('are_realy_want_to_delete_this')" @cancel="() => {confirmToDeleteProduct = null}" @confirm="deleteProductStore(index)" /> -->
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
<!-- 
                <functions-popup
                  v-if="popUpActive[index]"
                  :additonalClasses="'z-[11]'"
                >
                  <template v-slot:FunctionsPopupContent>
                    <div class="flex flex-col space-y-3">
                      <button
                        class="text-[#eac544] hover:scale-105 duration-300"
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
                </functions-popup> -->
              </li>
            </ul>
          </div>
        </div>
        <!-- <div class="flex justify-center mt-10">
          <v-pagination
            v-model="params.page"
            :pages="5"
            :range-size="1"
            @update:modelValue="updatePage"
            :hideFirstButton="true"
            hideLastButton="true"
          />
        </div> -->
      </div>

     <div class="table-4" v-if="params.currentTable === 'table-4' && $can('read', 'factories-pillow-warehouse')">
        <div class="wrapper">
          <div
            class="uk-grid-medium uk-grid-match uk-child-width-expand"
            uk-grid
          >
            <div>
              <div class="a-card">
                <div class="uk-grid-collapse uk-child-width-1-2" uk-grid>
                  <div>
                    <div class="border-r-[1.5px] borderBox dark:border-[#1a283a] pr-10">
                      <div class="a-card-header">
                        <ul
                          class="uk-grid-collapse a-table-list pb-5"
                          uk-grid
                        >
                          <li class="uk-width-expand">
                            <h3 class="a-table-title">{{$t('code')}}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-title">{{$t('product_name')}}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-title">{{$t('amount')}}</h3>
                          </li>
                          <li class="w-[100px]">
                            <h3 class="a-table-title flex justify-center">{{$t('actions')}}</h3>
                          </li>
                        </ul>
                      </div>

                      <div class="a-card-body" v-if="!isLoading">
                        <ul
                          v-for="item in storeListLeft"
                          class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a] "
                          uk-grid :key="item.id"
                        >
                          <li class="uk-width-expand">
                            <h3 class="a-table-text blue-text"  :class="$isDark ? 'dark' : ''">{{ item.product.code }}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ item.product?.name_ru }}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ formatPrice(item.amount) }} {{item.unit}}</h3>
                          </li>
                          <li class="w-[100px] relative">
                            <!-- <v-confirm v-if="confirmToDeleteProduct == item.id" classes="right-[100px] left-auto top-[15px] -translate-y-1/2" :question="$t('are_realy_want_to_delete_this')" @cancel="() => {confirmToDeleteProduct = null}" @confirm="deleteProductStore(item.id)" /> -->
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
            <!-- 
                            <functions-popup
                              v-if="popUpActive[index]"
                              :additonalClasses="'z-[11]'"
                            >
                              <template v-slot:FunctionsPopupContent>
                                <div class="flex flex-col space-y-3">
                                  <button
                                    class="text-[#eac544] hover:scale-105 duration-300"
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
                            </functions-popup> -->
                          </li>
                        </ul>
                      </div>
                      <Skeleton v-if="isLoading && $route.query.table == 'table-4'" classes="w-full min-h-[500px] h-full" />
                      <null-data v-else-if="isErrorLeft || !storeListLeft.length" width='w-[120px]' classes='h-full min-h-[500px] h-full' />
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
                            <h3 class="a-table-title">{{$t('code')}}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-title">{{$t('product_name')}}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-title">{{$t('amount')}}</h3>
                          </li>
                          <li class="w-[100px]">
                            <h3 class="a-table-title flex justify-center">{{$t('actions')}}</h3>
                          </li>
                        </ul>
                      </div>

                      <div class="a-card-body" v-if="!isLoading">
                        <ul
                          v-for="item in storeListRight"
                          class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a] "
                          uk-grid :key="item.id"
                        >
                          <li class="uk-width-expand">
                            <h3 class="a-table-text blue-text" :class="$isDark ? 'dark' : ''">{{ item.product.code }}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ item.product?.name_ru }}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ formatPrice(item.amount) }} {{item.unit}}</h3>
                          </li>
                          <li class="w-[100px] relative">
                            <!-- <v-confirm v-if="confirmToDeleteProduct == item.id" classes="right-[100px] left-auto top-[15px] -translate-y-1/2" :question="$t('are_realy_want_to_delete_this')" @cancel="() => {confirmToDeleteProduct = null}" @confirm="deleteProductStore(item.id)" /> -->
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
            <!-- 
                            <functions-popup
                              v-if="popUpActive[index]"
                              :additonalClasses="'z-[11]'"
                            >
                              <template v-slot:FunctionsPopupContent>
                                <div class="flex flex-col space-y-3">
                                  <button
                                    class="text-[#eac544] hover:scale-105 duration-300"
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
                            </functions-popup> -->
                          </li>
                        </ul>
                      </div>
                      <Skeleton v-if="isLoading && $route.query.table == 'table-4'" classes="w-full min-h-[500px] h-full" />
                      <null-data v-else-if="isErrorRight || !storeListRight.length" width='w-[120px]' classes='h-full min-h-[500px] h-full' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="flex justify-center mt-10">
          <v-pagination
            v-model="params.page"
            :pages="5"
            :range-size="1"
            @update:modelValue="updatePage"
            :hideFirstButton="true"
            hideLastButton="true"
          />
        </div> -->
      </div>


      <div class="table-5 h-full" v-if="params.currentTable === 'table-5' && $can('read', 'factories-pillow-ready-warehouse')">
        <div class="wrapper">
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
                            <h3 class="a-table-title">{{$t('code')}}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-title">{{$t('product_name')}}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-title">{{$t('amount')}}</h3>
                          </li>
                           <li class="w-[100px]">
                            <h3 class="a-table-title flex justify-center">{{$t('actions')}}</h3>
                          </li>
                        </ul>
                      </div>

                      <div class="a-card-body" v-if="!isLoading">
                        <ul
                          v-for="(item, index) in store2ListLeft"
                          class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a] "
                          uk-grid :key="index"
                        >
                          <li class="uk-width-expand">
                            <h3 class="a-table-text blue-text">{{ item.product.code }}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ item.product?.name_ru }}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ formatPrice(item.amount) }} {{item.unit}}</h3>
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

                            <!-- <functions-popup
                              v-if="popUpActive[index]"
                              :additonalClasses="'z-[11]'"
                            >
                              <template v-slot:FunctionsPopupContent>
                                <div class="flex flex-col space-y-3">
                                  <button
                                    class="text-[#eac544] hover:scale-105 duration-300"
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
                            </functions-popup> -->
                          </li>
                        </ul>
                      </div>
                      <Skeleton v-if="isLoading && $route.query.table == 'table-5'" classes="w-full min-h-[500px] " />
                      <null-data v-else-if="isErrorLeft || !store2ListLeft.length" width='w-[120px]' classes='h-full min-h-[500px] ' />
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
                            <h3 class="a-table-title">{{$t('code')}}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-title">{{$t('product_name')}}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-title">{{$t('amount')}}</h3>
                          </li>
                           <li class="w-[100px]">
                            <h3 class="a-table-title flex justify-center">{{$t('actions')}}</h3>
                          </li>
                        </ul>
                      </div>

                      <div class="a-card-body" v-if="!isLoading">
                        <ul
                          v-for="(item, index) in store2ListRight"
                          class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a] "
                          uk-grid :key="index"
                        >
                          <li class="uk-width-expand">
                            <h3 class="a-table-text blue-text">{{ item.product.code }}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ item.product?.name_ru }}</h3>
                          </li>
                          <li class="uk-width-expand">
                            <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ formatPrice(item.amount) }} {{item.unit}}</h3>
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
<!-- 
                            <functions-popup
                              v-if="popUpActive[index]"
                              :additonalClasses="'z-[11]'"
                            >
                              <template v-slot:FunctionsPopupContent>
                                <div class="flex flex-col space-y-3">
                                  <button
                                    class="text-[#eac544] hover:scale-105 duration-300"
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
                            </functions-popup> -->
                          </li>
                        </ul>
                      </div>
                      <Skeleton v-if="isLoading && $route.query.table == 'table-5'" classes="w-full min-h-[500px] " />
                      <null-data v-else-if="isErrorRight || !store2ListRight.length" width='w-[120px]' classes='h-full min-h-[500px] ' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="wrapper" v-if="isLoading && $route.query.table !== 'table-4' && $route.query.table !== 'table-5'">
        <Skeleton classes='w-full min-h-[450px]' v-if="isLoading" />
        <NullData :text="$t('nullData')" v-if="isError && !isLoading" classes="min-h-[450px] py-0" />
      </div>
    </div>
    <div class="flex justify-end mt-10 wrapper" v-if="!isLoading && !isError">
      <v-pagination 
        v-model="params.pagination.page"
        :pages="params.pagination.total"
        :range-size="1"
        @update:modelValue="updatePage"
        :hideFirstButton="true"
        hideLastButton="true"
      />
    </div>
    <pillowModal :isModalActive="isModalActive" v-if="$can('read', 'factories-pillow-produce')"/>
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
import { onMounted, ref, computed, reactive, watchEffect } from 'vue';
import PlusIcon from "@/assets/iconsVue/PlusIcon.vue";
import SmallArrowRight from "@/assets/iconsVue/SmallArrowRight.vue";
import FunctionsIcon from "@/assets/iconsVue/FunctionsIcon.vue";
import pillowModal from './components/pillowModal.vue'

import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { useRouter, useRoute } from 'vue-router'
import { factoryIncomeStore } from '@/store/modules/FactoryIncome.js'
import { factoryProductStore } from '@/store/modules/FactoryProduct.js'
import { orderStore } from '@/store/modules/Order.js'

import formatter from '@/mixins/formatter.js'

export default {
  components: {
    pillowModal,
    SmallArrowRight,
    PlusIcon,
    FunctionsIcon,

  },
  setup() {
    const { locale, t } = useI18n()
    const route = useRoute()
    const router = useRouter()

    const factoryIncomeStorage = factoryIncomeStore()
    const factoryProductStorage = factoryProductStore()
    const orderStorage = orderStore()

    const {formatPrice} = formatter()

    const incomeList = ref([])
    const income2List = ref([])
    const outcomeList = ref([])
    const storeListLeft = ref([])
    const storeListRight = ref([])
    const store2ListLeft = ref([])
    const store2ListRight = ref([])
    const toast = useToast()
    const isModalActive = ref(false)
    const popUpActive = ref([false])
    const isLoading = ref(false)
    const isError = ref(false)
    const isErrorLeft = ref(false)
    const isErrorRight = ref(false)
    const confirmToDeleteProduct = ref(null)

    const params = ref({
      currentTable: 'income',
      totalCount: 0,
      pagination: {
        page: 1,
        total: 0,
        limit: 10
      }
    })

  

    const getFactoryIncome = async () => {
      isLoading.value = true
      const data = {
          sort_key: 'created_at',
          sort_type: 'desc',
          per_page: 10, 
          page: params.value.pagination.page, 
          factory: 'pillow',
      }
      await factoryIncomeStorage.GET_FACTORY_INCOME(data).then(response => {
        incomeList.value = response.data.data.data
        params.value.totalCount = response.data.data.total
        params.value.pagination.total = response.data.data.total > 9 ? Math.ceil(response.data.data.total / 10) : 1
        if (!response.data.data.data.length) {
          isError.value = true
        } else {
          isError.value = false
        }
      })
      .catch(() => {
        setTimeout(() => {
          isError.value = true
        }, 500);
      })
      .finally(() => {
          isLoading.value = false
      })
    }

    const getOrders = async () => {
      isLoading.value = true
      const data = {
          sort_key: 'created_at',
          sort_type: 'desc',
          per_page: 10, 
          page: params.value.pagination.page, 
          factory: 'pillow',
      }
      await orderStorage.GET_ORDER(data).then(response => {
        income2List.value = response.data.data.data
        params.value.totalCount = response.data.data.total
        params.value.pagination.total = response.data.data.total > 9 ? Math.ceil(response.data.data.total / 10) : 1
        if (!response.data.data.data.length) {
          isError.value = true
        } else {
          isError.value = false
        }
      })
      .catch(() => {
        setTimeout(() => {
          isError.value = true
        }, 500);
      })
      .finally(() => {
          isLoading.value = false
      })
    }

    const getOrdersOutcome = async () => {
      isLoading.value = true
      const data = {
          sort_key: 'created_at',
          sort_type: 'desc',
          per_page: 10, 
          page: params.value.pagination.page, 
          factory: 'pillow',
      }
      await orderStorage.GET_ORDER_EXTRA_PRODUCT(data).then(response => {
        outcomeList.value = response.data.data.data
        params.value.totalCount = response.data.data.total
        params.value.pagination.total = response.data.data.total > 9 ? Math.ceil(response.data.data.total / 10) : 1
        if (!response.data.data.data.length) {
          isError.value = true
        } else {
          isError.value = false
        }
      })
      .catch(() => {
        setTimeout(() => {
          isError.value = true
        }, 500);
      })
      .finally(() => {
          isLoading.value = false
      })
    }

    const getStoreList = async () => {
      isError.value = false
      isLoading.value = true
      const data = {
          sort_key: 'created_at',
          sort_type: 'desc',
          per_page: 10, 
          page: params.value.pagination.page, 
          factory: 'pillow',
          product_case: 'raw'
      }
      await factoryProductStorage.GET_FACTORY_PRODUCT(data).then(response => {
        if (response.data.data.data.length && response.data.data.data.length < 2) {
            storeListLeft.value = response.data.data.data
            storeListRight.value = []
        } else if (response.data.data.data.length && response.data.data.data.length > 1) {
            storeListLeft.value = response.data.data.data.slice(0, Math.ceil(response.data.data.data.length / 2))
            storeListRight.value = response.data.data.data.slice(Math.ceil(response.data.data.data.length / 2))
        } else {
            storeListLeft.value = []
            storeListRight.value = []
        }

        params.value.totalCount = response.data.data.total
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

    const getStoreReadyProducts = async () => {
      isError.value = false
      isLoading.value = true
      const data = {
          sort_key: 'created_at',
          sort_type: 'desc',
          per_page: 10, 
          page: params.value.pagination.page, 
          factory: 'pillow',
          product_case: 'ready'
      }
      await factoryProductStorage.GET_FACTORY_PRODUCT(data).then(response => {
        if (response.data.data.data.length && response.data.data.data.length < 2) {
            store2ListLeft.value = response.data.data.data
            store2ListRight.value = []
        } else if (response.data.data.data.length && response.data.data.data.length > 1) {
            store2ListLeft.value = response.data.data.data.slice(0, Math.ceil(response.data.data.data.length / 2))
            store2ListRight.value = response.data.data.data.slice(Math.ceil(response.data.data.data.length / 2))
        } else {
            store2ListLeft.value = []
            store2ListRight.value = []
        }

        params.value.totalCount = response.data.data.total
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



    const deleteProductStore = async (id) => {
      confirmToDeleteProduct.value = null
      await factoryIncomeStorage.DELETE_RAW_MATERIALS_STORAGE(id).then((response) => {
          if (response.data) {
            toast.success(t('successfully-deleted'))
            getStoreList()
          }
      })
    }

    const toggleModal = () => {
      isModalActive.value = !isModalActive.value
    }

     const changeTable = async (e) => {
      router.push(`/pillow-factory?table=${e}`)
      params.value.pagination.total = 0
      params.value.pagination.page = 1
      params.value.currentTable = e
      popUpActive.value = null
      confirmToDeleteProduct.value = null

      if (params.value.currentTable == 'table-1') {
        await getFactoryIncome()
      } else if (params.value.currentTable == 'table-2') {
        await getOrders()
      } else if (params.value.currentTable == 'table-3') {
        await getOrdersOutcome()
      } else if (params.value.currentTable == 'table-4') {
        await getStoreList()
      } else if (params.value.currentTable == 'table-5') {
        await getStoreReadyProducts()
      }
    }

    async function updatePage(value) {
      const query = { ...route.query }
      
      router.push({ path: route.fullPath, query: { ...query, page: value } })
      params.value.pagination.page = value

      if (params.value.currentTable == 'table-1') {
        await getFactoryIncome()
      } else if (params.value.currentTable == 'table-2') {
        await getOrders()
      } else if (params.value.currentTable == 'table-3') {
        await getOrdersOutcome()
      } else if (params.value.currentTable == 'table-4') {
        await getStoreList()
      } else if (params.value.currentTable == 'table-5') {
        await getStoreReadyProducts()
      }
    }

    const togglePopup = (id) => {
      if (popUpActive.value === id) {
        popUpActive.value = null
      } else {
        popUpActive.value = id
      }
    }

    const handleCreatNewAction = () => {
      getOrders()
      getOrdersOutcome()
      getStoreList()
      getStoreReadyProducts()
    }
  
    onMounted(async () => {
        if (route.query.table) {
          router.push(route.fullPath)
          params.value.currentTable = route.query.table
          params.value.pagination.page = route.query.page ? route.query.page : 1
          
          if (route.query.table == 'table-1') {
            await getFactoryIncome()
          } else if (route.query.table == 'table-2') {
            await getOrders()
          } else if (route.query.table == 'table-3') {
            await getOrdersOutcome()
          } else if (route.query.table == 'table-4') {
            await getStoreList()
          } else if (route.query.table == 'table-5') {
            await getStoreReadyProducts()
          }
        } else {
          changeTable('table-1')
        }
    })

    return {
      toggleModal,
      changeTable,
      isModalActive,
      popUpActive,
      togglePopup,


      params,
      locale,
      formatPrice,

      incomeList,
      income2List,
      outcomeList,

      storeListLeft,
      storeListRight,
      
      store2ListLeft,
      store2ListRight,

      isError,
      isErrorLeft,
      isErrorRight,

      isLoading,
      confirmToDeleteProduct,
      
      updatePage,
      deleteProductStore,
      handleCreatNewAction
    };
  },
};
</script>

<style></style>
