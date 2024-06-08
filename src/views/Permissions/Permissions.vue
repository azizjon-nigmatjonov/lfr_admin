<template>
  <section class="pb-20">




    <!-- =================================================================================================================================================
                                                                  HEADER_SECTION START
    ================================================================================================================================================= -->
    <div class="pt-6 pb-4 wrapper flex items-center justify-between border-b-[1.5px] borderBox dark:border-[#1a283a] ">
      
      <div>
        <h3 class="sectionTitle">{{$t('permissions')}}</h3>
        <span class="text-sm text-[#888A8F] mt-2">{{permissions.length}} шт разрешений</span>
      </div>

      <div class="flex items-center space-x-5">

        <div class="relative w-[250px]">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="@/assets/icons/baseIcons/user-square-2.svg"
            alt="user"
          />
          <vue-select :options="roles" classes="main-color-black text-base pl-12" :placeholder="$t('roles')" 
          :selectedElement="roleChoosed.title"  @select="getPermissions($event)"/>
        </div>

        <button class="mainBackgroundColor text-white basicBtn" @click="updateRolePermissions()">
          <img src="@/assets/icons/archive-add.svg" alt="" class="mr-2">
          {{$t('save')}}
        </button>

      </div>

    </div>
    <!-- =================================================================================================================================================
                                                                    HEADER_SECTION END
    ================================================================================================================================================= -->








    <div class="a-table flex">
      



      <!-- =================================================================================================================================================
                                                                    TABLE_SECTION START
      ================================================================================================================================================= -->
      <div class="table-1 w-full border-r-[1.5px]">
        <div class="wrapper border-b-[1.5px] borderBox dark:border-[#1a283a]  pb-10">
          <div class="a-table-header">
            <ul class="uk-grid-collapse a-table-list" uk-grid>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('name')}}</h3>
              </li>
              <li class="w-[100px]">
                <h3 class="a-table-title">{{$t('functions')}}</h3>
              </li>
            </ul>
          </div>

          <div class="a-table-body">
            <ul class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a] " uk-grid v-for="(item, index) in permissionsFirstHalf" :key="index">
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{item.title}}</h3>
              </li>
              <li class="w-[100px]">
                  <label class="relative cursor-pointer" v-if="item.action[0] == true || item.action[0] == false">
                    <input class="uk-checkbox mr-1 mainBackgroundColor" type="checkbox" v-model="item.action[0]">
                  </label>
                  <label class="relative cursor-pointer" v-if="item.action[1] == true || item.action[1] == false">
                    <input class="uk-checkbox mr-1 mainBackgroundColorYellow" type="checkbox" v-model="item.action[1]">
                  </label>
                  <label class="relative cursor-pointer" v-if="item.action[2] == true || item.action[2] == false">
                    <input class="uk-checkbox mainBackgroundColorRed" type="checkbox" v-model="item.action[2]">
                  </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- =================================================================================================================================================
                                                                    TABLE_SECTION END
      ================================================================================================================================================= -->








      <!-- =================================================================================================================================================
                                                                    TABLE_SECTION START
      ================================================================================================================================================= -->
      <div class="table-1 w-full border-r-[1.5px]">
        <div class="wrapper border-b-[1.5px] borderBox dark:border-[#1a283a]  pb-10">
          <div class="a-table-header">
            <ul class="uk-grid-collapse a-table-list" uk-grid>
              <li class="uk-width-expand">
                <h3 class="a-table-title">{{$t('name')}}</h3>
              </li>
              <li class="w-[100px]">
                <h3 class="a-table-title">{{$t('functions')}}</h3>
              </li>
            </ul>
          </div>



          <div class="a-table-body">
            <ul class="uk-grid-collapse a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a] " uk-grid v-for="(item, index) in permissionsSecondHalf" :key="index">
              <li class="uk-width-expand">
                <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{item.title}}</h3>
              </li>
              <li class="w-[100px]">
                  <label class="relative cursor-pointer" v-if="item.action[0] == true || item.action[0] == false">
                    <input class="uk-checkbox mr-1 mainBackgroundColor" type="checkbox" v-model="item.action[0]">
                  </label>
                  <label class="relative cursor-pointer" v-if="item.action[1] == true || item.action[1] == false">
                    <input class="uk-checkbox mr-1 mainBackgroundColorYellow" type="checkbox" v-model="item.action[1]">
                  </label>
                  <label class="relative cursor-pointer" v-if="item.action[2] == true || item.action[2] == false">
                    <input class="uk-checkbox mainBackgroundColorRed" type="checkbox" v-model="item.action[2]">
                  </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- =================================================================================================================================================
                                                                    TABLE_SECTION END
      ================================================================================================================================================= -->





   
       
    </div>
  </section>
</template>

<script>


// ========================= IMPORTS_SECTION START =========================
import { ref, onMounted } from "vue";
import { mainStore } from '@/store/main.js';
import { roleStore } from '@/store/modules/pages/Roles.js';
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

import PlusIcon from "../../assets/iconsVue/PlusIcon.vue";
import FunctionsIcon from "../../assets/iconsVue/FunctionsIcon.vue";
import SmallArrowRight from "../../assets/iconsVue/SmallArrowRight.vue";
// ========================= IMPORTS_SECTION END =========================



export default {
  components: {


    // ========================= COMPONENTS_DEFINE_SECTION START =========================
    SmallArrowRight,
    PlusIcon,
    FunctionsIcon,
    // ========================= COMPONENTS_DEFINE_SECTION END =========================



  },

  setup() {




    // ================================================== PRIMARY_DATA_SECTION START ==================================================
    const mainStorage = mainStore();
    const roleStorage = roleStore();
    const toast = useToast()
    const { t } = useI18n()

    let roles = ref([]);
    let roleChoosed = ref({
      title: '',
      id: '',
    });

    let permissionsFirstHalf = ref([])
    let permissionsSecondHalf = ref([])

    let userPermissions = ref([])
    // ================================================== PRIMARY_DATA_SECTION END ==================================================






    // ================================================== SECONDARY_DATA_SECTION START ==================================================
    let permissions = ref([
      {title: 'Боковая панель -> Финансы', subject: 'sidebar-finance', action: [false]},
      {title: 'Боковая панель -> Склад', subject: 'sidebar-warehouse', action: [false]},
      {title: 'Боковая панель -> Склад -> Сырьё', subject: 'sidebar-warehouse-raw', action: [false]},
      {title: 'Боковая панель -> Склад -> Аксессуары', subject: 'sidebar-warehouse-accessories', action: [false]},
      {title: 'Боковая панель -> Склад -> Оборудование', subject: 'sidebar-warehouse-equipment', action: [false]},
      {title: 'Боковая панель -> Склад -> Техника', subject: 'sidebar-warehouse-tech', action: [false]},
      {title: 'Боковая панель -> Производство', subject: 'sidebar-production', action: [false]},
      {title: 'Боковая панель -> Цехи', subject: 'sidebar-factories', action: [false]},
      {title: 'Боковая панель -> Цехи -> Матрас', subject: 'sidebar-factories-mattress', action: [false]},
      {title: 'Боковая панель -> Цехи -> Подушка', subject: 'sidebar-factories-pillow', action: [false]},
      {title: 'Боковая панель -> Цехи -> Губка', subject: 'sidebar-factories-sponge', action: [false]},
      {title: 'Боковая панель -> Цехи -> Фигурная резка', subject: 'sidebar-factories-curly-cutting', action: [false]},
      {title: 'Боковая панель -> Продажи', subject: 'sidebar-sellings', action: [false]},
      {title: 'Боковая панель -> Клиенты', subject: 'sidebar-customers', action: [false]},
      {title: 'Боковая панель -> Поставщики', subject: 'sidebar-suppliers', action: [false]},
      {title: 'Боковая панель -> Заказы', subject: 'sidebar-orders', action: [false]},
      {title: 'Боковая панель -> Сотрудники', subject: 'sidebar-employees', action: [false]},



      {title: 'Верхняя панель -> Приход', subject: 'navbar-raw-add', action: [false]},
      {title: 'Верхняя панель -> Продажа', subject: 'navbar-product-sell', action: [false]},
      {title: 'Верхняя панель -> Кодовая база', subject: 'navbar-codebase', action: [false]},
      {title: 'Верхняя панель -> Темный режим', subject: 'navbar-darkmode', action: [false]},
      {title: 'Верхняя панель -> Уведомление', subject: 'navbar-notification', action: [false]},
      {title: 'Верхняя панель -> Настройки', subject: 'navbar-settings', action: [false]},
      
      
      
      {title: 'Настройки -> Профиль', subject: 'settings-profile', action: [false]},
      {title: 'Настройки -> Роли', subject: 'settings-roles', action: [false]},
      {title: 'Настройки -> Разрешения', subject: 'settings-permissions', action: [false]},
      {title: 'Настройки -> Пользователи', subject: 'settings-users', action: [false]},
      
      

      {title: 'Финансы', subject: 'finance', action: [false, false, false]},

      {title: 'Склад -> Сырьё -> Приход', subject: 'warehouse-raw-coming', action: [false, false, false]},
      {title: 'Склад -> Сырьё -> Расход', subject: 'warehouse-raw-expense', action: [false, false, false]},
      {title: 'Склад -> Сырьё -> Склад', subject: 'warehouse-raw-warehouse', action: [false, false, false]},
      {title: 'Склад -> Сырьё -> Перемещение', subject: 'warehouse-raw-moving', action: [false]},

      {title: 'Склад -> Аксессуары -> Приход', subject: 'warehouse-accessories-coming', action: [false, false, false]},
      {title: 'Склад -> Аксессуары -> Расход', subject: 'warehouse-accessories-expense', action: [false, false, false]},
      {title: 'Склад -> Аксессуары -> Склад', subject: 'warehouse-accessories-warehouse', action: [false, false, false]},
      {title: 'Склад -> Аксессуары -> Перемещение', subject: 'warehouse-accessories-moving', action: [false]},


      {title: 'Склад -> Оборудование -> Приход', subject: 'warehouse-equipment-coming', action: [false, false, false]},
      {title: 'Склад -> Оборудование -> Расход', subject: 'warehouse-equipment-expense', action: [false, false, false]},
      {title: 'Склад -> Оборудование -> Склад', subject: 'warehouse-equipment-warehouse', action: [false, false, false]},
      // {title: 'Склад -> Оборудование -> Перемещение', subject: 'warehouse-equipment-moving', action: [false]},

      
      {title: 'Склад -> Техника -> Приход', subject: 'warehouse-tech-coming', action: [false, false, false]},
      {title: 'Склад -> Техника -> Расход', subject: 'warehouse-tech-expense', action: [false, false, false]},
      {title: 'Склад -> Техника -> Склад', subject: 'warehouse-tech-warehouse', action: [false, false, false]},
      // {title: 'Склад -> Техника -> Перемещение', subject: 'warehouse-tech-moving', action: [false]},


      {title: 'Производство -> Приход(Сырьё)', subject: 'production-coming-raw', action: [false, false, false]},
      {title: 'Производство -> Приход(Готовая продукция)', subject: 'production-coming-ready', action: [false, false, false]},
      {title: 'Производство -> Расход', subject: 'production-expense', action: [false, false, false]},
      {title: 'Производство -> Склад', subject: 'production-warehouse', action: [false, false, false]},
      {title: 'Производство -> Готовая продукция', subject: 'production-ready-warehouse', action: [false, false, false]},
      {title: 'Производство -> Перемещение', subject: 'production-moving', action: [false]},
      {title: 'Производство -> Производство', subject: 'production-produce', action: [false]},



      {title: 'Цехи -> Матрас -> Приход(Сырьё)', subject: 'factories-mattress-coming-raw', action: [false, false, false]},
      {title: 'Цехи -> Матрас -> Приход(Готовая продукция)', subject: 'factories-mattress-coming-ready', action: [false, false, false]},
      {title: 'Цехи -> Матрас -> Расход', subject: 'factories-mattress-expense', action: [false, false, false]},
      {title: 'Цехи -> Матрас -> Склад', subject: 'factories-mattress-warehouse', action: [false, false, false]},
      {title: 'Цехи -> Матрас -> Готовая продукция', subject: 'factories-mattress-ready-warehouse', action: [false, false, false]},
      {title: 'Цехи -> Матрас -> Производство', subject: 'factories-mattress-produce', action: [false]},



      {title: 'Цехи -> Подушка -> Приход(Сырьё)', subject: 'factories-pillow-coming-raw', action: [false, false, false]},
      {title: 'Цехи -> Подушка -> Приход(Готовая продукция)', subject: 'factories-pillow-coming-ready', action: [false, false, false]},
      {title: 'Цехи -> Подушка -> Расход', subject: 'factories-pillow-expense', action: [false, false, false]},
      {title: 'Цехи -> Подушка -> Склад', subject: 'factories-pillow-warehouse', action: [false, false, false]},
      {title: 'Цехи -> Подушка -> Готовая продукция', subject: 'factories-pillow-ready-warehouse', action: [false, false, false]},
      {title: 'Цехи -> Подушка -> Производство', subject: 'factories-pillow-produce', action: [false]},



      {title: 'Цехи -> Губка -> Приход(Сырьё)', subject: 'factories-sponge-coming-raw', action: [false, false, false]},
      {title: 'Цехи -> Губка -> Приход(Готовая продукция)', subject: 'factories-sponge-coming-ready', action: [false, false, false]},
      {title: 'Цехи -> Губка -> Расход', subject: 'factories-sponge-expense', action: [false, false, false]},
      {title: 'Цехи -> Губка -> Склад', subject: 'factories-sponge-warehouse', action: [false, false, false]},
      {title: 'Цехи -> Губка -> Готовая продукция', subject: 'factories-sponge-ready-warehouse', action: [false, false, false]},
      {title: 'Цехи -> Губка -> Производство', subject: 'factories-sponge-produce', action: [false]},


      {title: 'Цехи -> Фигурная резка -> Приход(Сырьё)', subject: 'factories-curly-cutting-coming-raw', action: [false, false, false]},
      {title: 'Цехи -> Фигурная резка -> Приход(Готовая продукция)', subject: 'factories-curly-cutting-coming-ready', action: [false, false, false]},
      {title: 'Цехи -> Фигурная резка -> Расход', subject: 'factories-curly-cutting-expense', action: [false, false, false]},
      {title: 'Цехи -> Фигурная резка -> Склад', subject: 'factories-curly-cutting-warehouse', action: [false, false, false]},
      {title: 'Цехи -> Фигурная резка -> Готовая продукция', subject: 'factories-curly-cutting-ready-warehouse', action: [false, false, false]},
      {title: 'Цехи -> Фигурная резка -> Производство', subject: 'factories-curly-cutting-produce', action: [false]},


      {title: 'Продажи', subject: 'sellings', action: [false, false, false]},

      {title: 'Клиенты', subject: 'customers', action: [false, false, false]},
      {title: 'Клиенты -> Добавить', subject: 'customers-add-modal', action: [false]},
      
      {title: 'Поставщики', subject: 'suppliers', action: [false, false, false]},
      {title: 'Поставщики -> Добавить', subject: 'suppliers-add-modal', action: [false]},

      {title: 'Заказы', subject: 'orders', action: [false, false, false]},

      {title: 'Сотрудники', subject: 'employees', action: [false, false, false]},
      {title: 'Сотрудники -> Добавить', subject: 'employees-add-modal', action: [false]},
    ])
    // ================================================== SECONDARY_DATA_SECTION END ==================================================







    
    
    // ================================================== MOUNTED_SECTION END ==================================================
    onMounted(async () => {
      await roleStorage.GET_ROLES_LIST().then(response => {
        roles.value = response.data.data
      })
    })
    permissionsIntoTwoArrays()
    // ================================================== MOUNTED_SECTION END ==================================================









    
    // ==================== DIVIDING_INTO_SUB_ARRAYS_SECTION START ====================
    function permissionsIntoTwoArrays(){
      const middleIndex = Math.ceil(permissions.value.length / 2);

      permissionsFirstHalf = permissions.value.splice(0, middleIndex);   
      permissionsSecondHalf = permissions.value.splice(-middleIndex);

      permissions.value = permissionsFirstHalf.concat(permissionsSecondHalf)
    }
    // ==================== DIVIDING_INTO_SUB_ARRAYS_SECTION END ====================










    // ==================== GET_PERMISSIONS_SECTION START ====================
    async function getPermissions(role){
      roleChoosed.title = role.title
      roleChoosed.id = role.id
      await mainStorage.GET_PERMISSIONS_LIST(roleChoosed.id).then(response => {
        userPermissions.value = response.data

        if(userPermissions.value && userPermissions.value.length != 0){
          permissions.value.forEach((elem) => {
            let a = userPermissions.value.find((item) => item.subject == elem.subject)
            elem.action = a.action
          })
        }else {
          permissions.value.forEach((elem) => {
            if(elem.action[0] == true){
              elem.action[0] = false
            }
            if(elem.action[1] && elem.action[1] == true){
              elem.action[1] = false
            }
            if(elem.action[2] && elem.action[2] == true){
              elem.action[2] = false
            }
          })
        }
      })
      .catch(() => {
        toast.error(t('error-occured'))
      })
    }
    // ==================== GET_PERMISSIONS_SECTION END ====================







    // ==================== UPDATE_PERMISSIONS_SECTION END ====================
    async function updateRolePermissions(){
      let permissionsArray = permissions.value.map((elem, index) => {
        return  {action: elem.action, subject: elem.subject, section: elem.subject}
      })
      await mainStorage.PUT_PERMISSIONS_LIST({id: roleChoosed.id, permissions: permissionsArray}).then(response => {
        toast.success(t('successfully-saved'))
      })
      .catch(() => {
        toast.error(t('error-occured'))
      })
    }
    // ==================== UPDATE_PERMISSIONS_SECTION END ====================





    return {
      roles,
      roleChoosed,
      getPermissions,
      updateRolePermissions,

      permissionsFirstHalf,
      permissionsSecondHalf,

      permissions,
    };
  },
};
</script>

<style>

</style>
