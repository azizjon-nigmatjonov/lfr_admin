<template>
    <section>
        <div class="pt-6 pb-4 wrapper flex items-center justify-between border-b-[1.5px] borderBox dark:border-[#1a283a] ">
            <div>
                <h3 class="sectionTitle capitalize">
                {{$t('employee')}}
            </h3>
            </div>
            <button @click="toggleModal" class="mainBackgroundColor text-white basicBtn">
                <PlusIcon stroke="stroke-current mr-2" />
                {{$t('add')}}
            </button>
        </div>
        <div class="a-table border-b-[1.5px] borderBox dark:border-[#1a283a] min-h-[500px]">
        <div class="table-1">
            <div class="wrapper">
            <div class="a-table-header">
                <ul class="uk-grid-small a-table-list" uk-grid>
                <li class="uk-width-expand">
                    <h3 class="a-table-title">{{$t('fullname')}}</h3>
                </li>
                <li class="uk-width-expand">
                    <h3 class="a-table-title">{{$t('department')}}</h3>
                </li>
                <li class="uk-width-expand">
                    <h3 class="a-table-title">{{$t('job')}}</h3>
                </li>
                <li class="uk-width-expand">
                    <h3 class="a-table-title">{{$t('salary')}}</h3>
                </li>
                <li class="uk-width-expand">
                    <h3 class="a-table-title">{{$t('payed')}}</h3>
                </li>
                <li class="uk-width-expand">
                    <h3 class="a-table-title">{{$t('employment_date')}}</h3>
                </li>
                <li class="w-[100px]">
                    <h3 class="a-table-title text-right">{{$t('actions')}}</h3>
                </li>
                </ul>
            </div>

            <div class="a-table-body" v-if="!isLoading && !isError">
                <ul
                v-for="item in employeeList"
                class="uk-grid-small a-table-list border-t-[1.5px] borderBox dark:border-[#1a283a] "
                uk-grid :key="item.id"
                >
                <li class="uk-width-expand">
                    <h3 class="a-table-text"  :class="$isDark ? 'dark' : ''">{{ item.full_name }}</h3>
                </li>
                <li class="uk-width-expand">
                    <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ item.detail.branch }}</h3>
                </li>
                <li class="uk-width-expand">
                    <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ item.detail.job_title }}</h3>
                </li>
                <li class="uk-width-expand">
                    <h3 class="a-table-text relative blue-text" v-on:mouseover="salaryPopup = item.id" v-on:mouseleave="salaryPopup = null">{{ $t('show') }}

                    <functions-popup v-if="salaryPopup == item.id" :additonalClasses="'z-[11] left-auto top-[80px] left-[50%] -translate-x-1/2'" :hideArrow="true">
                        <template v-slot:FunctionsPopupContent>
                        <div class="px-4 py-2">
                            <span class="text-sm disabled-text">{{$t('salary')}}</span>
                            <p class="blue-text font-semibold text-xl mt-1 whitespace-nowrap">
                                {{ formatPrice((item.detail.salary)) }}{{' '}}{{ $t('sum') }}
                            </p>
                        </div>
                        </template>
                    </functions-popup>
                    </h3>
                </li>
                <li class="uk-width-expand">
                    <h3 class="a-table-text relative blue-text" v-on:mouseover="salaryPayedPopup = item.id" v-on:mouseleave="salaryPayedPopup = null">{{ $t('show') }}

                    <functions-popup v-if="salaryPayedPopup == item.id" :additonalClasses="'z-[11] left-auto top-[80px] left-[50%] -translate-x-1/2'" :hideArrow="true">
                        <template v-slot:FunctionsPopupContent>
                        <div class="px-4 py-2">
                            <span class="text-sm disabled-text">{{$t('salary')}}</span>
                            <p class="blue-text font-semibold text-xl mt-1 whitespace-nowrap">
                                {{ formatPrice((item.payment_info.amount)) }}{{' '}}{{ $t('sum') }}
                            </p>
                        </div>
                        </template>
                    </functions-popup>
                    </h3>
                </li>
                <li class="uk-width-expand">
                    <h3 class="a-table-text" :class="$isDark ? 'dark' : ''">{{ $dayjs(item.detail.employment_date).format('DD-MM-YYYY') }}</h3>
                </li>
                <li class="w-[100px] flex justify-center">
                    <div class="relative">
                    <v-confirm v-if="confirmEmployeeDelete == item.id" classes="right-[100px] left-auto top-[15px] -translate-y-1/2" :question="$t('are_realy_want_to_delete_this')" @cancel="() => {confirmEmployeeDelete = null}" @confirm="deleteEmployee(item.id)" />
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

                    <functions-popup v-if="popUpActive == item.id" :additonalClasses="'z-[11] left-[-220px] min-w-[200px]'">
                        <template v-slot:FunctionsPopupContent>
                        <div class="flex flex-col space-y-3">
                            <button
                                @click="paySalary(item)"
                                class="functionsText orange-text duration-100"
                                >
                                {{$t('pay_salary')}}
                            </button>
                            <button
                            @click="editEmployee(item)"
                            class="functionsText mainColorText duration-100"
                            >
                            {{$t('edit')}}
                            </button>
                            <button
                            @click="() => {
                                confirmEmployeeDelete = item.id,
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

                    <div
                        @click="togglePopup(index)"
                        v-if="popUpActive == item.id"
                        class="w-[100vw] h-[100vh] z-[10] absolute top-1/2 -translate-y-1/2 right-0"
                    ></div>
                </li>
                </ul>
            </div>
            </div>
            </div>
           <div class="wrapper">
             <Skeleton classes="w-full min-h-[500px] " v-if="isLoading" />
                <null-data :text="$t('nullData')" classes="min-h-[500px] py-0" v-if="isError" />
           </div>
        </div>

        <div class="flex justify-end mt-10 wrapper">
            <v-pagination
            v-model="pagination.page"
            :pages="pagination.total"
            :range-size="1"
            @update:modelValue="updatePage"
            :hideFirstButton="true"
            hideLastButton="true"
            />
        </div>
    </section>

    <Modal :outsideClose="true" :isModalActive="isModalActive" @close="toggleModal" @submitModal="createOrUpdateUser" :width="$route.query.pay_salary ? 'min-w-[450px]' : 'min-w-[700px]'" :buttonText="$t(textBtn)">
        <template v-slot:modalHeader>
            <h3 class="text-lg font-medium text-center main-color-black dark:text-white">
                {{$t($route.query.pay_salary ? 'pay_salary' : $route.query.id ? 'edit_employee' : 'add_employee')}}
            </h3>
        </template>
        <template v-slot:modalBody>
            <div v-if="!$route.query.pay_salary" class="mt-4 grid grid-cols-2 gap-y-5 gap-x-12">
                <div class="relative form-input-anim" :class="$isDark ? 'dark' : ''">
                    <img
                        class="absolute left-4 top-1/2 -translate-y-1/2"
                        src="../../assets/icons/user.svg"
                        alt="user"
                    />
                    <input
                        v-model="form.first_name"
                        type="text"
                        name="text"
                        autocomplete="off"
                        required
                        class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
                    />
                    <label for="text" class="label-name">
                        <span class="content-name">{{$t('name')}}</span>
                    </label>
                    <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.first_name.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
                </div>
                <div class="relative form-input-anim" :class="$isDark ? 'dark' : ''">
                    <img
                        class="absolute left-4 top-1/2 -translate-y-1/2"
                        src="../../assets/icons/baseIcons/users-family.svg"
                        alt="user"
                    />
                    <input
                        v-model="form.last_name"
                        type="text"
                        name="text"
                        autocomplete="off"
                        required
                        class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
                    />
                    <label for="text" class="label-name">
                        <span class="content-name">{{$t('last_name')}}</span>
                    </label>
                    <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.last_name.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
                </div>
                <!-- <div class="relative">
                    <Datepicker :inputClassName="`datepicker ${$isDark ? 'dark' : 'light'}`" menuClassName="dp-custom-menu" calendarClassName="dp-custom-calendar" v-model="form.birthday" @update:modelValue="handleBirthday" :placeholder="$t('birth_date')"
                    :locale="locale == 'ru' ? 'ru' : 'uz'"
                    :cancelText="locale == 'ru' ? 'Отмена' : 'Bekor qilish'"
                    :selectText="locale == 'ru' ? 'ОК' : 'Tanlash'"></Datepicker>
                    <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.birthday.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
                </div> -->
                <div class="relative form-input-anim" :class="$isDark ? 'dark' : ''">
                    <img
                        class="absolute left-4 top-1/2 -translate-y-1/2"
                        src="../../assets/icons/baseIcons/branch.svg"
                        alt="user"
                    />
                    <input
                        v-model="form.detail.branch"
                        type="text"
                        name="text"
                        autocomplete="off"
                        required
                        class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
                    />
                    <label for="text" class="label-name">
                        <span class="content-name">{{$t('department')}}</span>
                    </label>
                    <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.detail.branch.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
                </div>
                <div class="relative form-input-anim" :class="$isDark ? 'dark' : ''">
                    <img
                        class="absolute left-4 top-1/2 -translate-y-1/2"
                        src="../../assets/icons/baseIcons/task.svg"
                        alt="user"
                    />
                    <input
                        v-model="form.detail.job_title"
                        type="text"
                        name="text"
                        autocomplete="off"
                        required
                        class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
                    />
                    <label for="text" class="label-name">
                        <span class="content-name">{{$t('job')}}</span>
                    </label>
                    <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.detail.job_title.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
                </div>
                <div class="relative">
                    <Datepicker :inputClassName="`datepicker ${$isDark ? 'dark' : 'light'}`" menuClassName="dp-custom-menu" calendarClassName="dp-custom-calendar" modelAuto v-model="form.detail.employment_date" @update:modelValue="handleDate" :placeholder="$t('employment_date')"
                    :locale="locale == 'ru' ? 'ru' : 'uz'"
                    :cancelText="locale == 'ru' ? 'Отмена' : 'Bekor qilish'"
                    :selectText="locale == 'ru' ? 'ОК' : 'Tanlash'"></Datepicker>
                    <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.detail.employment_date.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
                </div>
                <div class="relative form-input-anim" :class="$isDark ? 'dark' : ''">
                    <img
                        class="absolute left-4 top-1/2 -translate-y-1/2"
                        src="../../assets/icons/allMoney.svg"
                        alt="user"
                    />
                    <input
                        v-model="form.detail.salary"
                        @input="formatPrice2(form.detail.salary, 'salary')"
                        onkeypress="return /[0-9,/.]/i.test(event.key)"
                        type="text"
                        name="text"
                        autocomplete="off"
                        required
                        class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
                    />
                    <label for="text" class="label-name">
                        <span class="content-name">{{$t('salary')}}</span>
                    </label>
                    <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.detail.salary.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
                </div>
            </div>
             <div v-else class="mt-4 grid grid-cols-1 gap-5">
                <div class="relative form-input-anim" :class="$isDark ? 'dark' : ''">
                    <img
                        class="absolute left-4 top-1/2 -translate-y-1/2"
                        src="../../assets/icons/user.svg"
                        alt="user"
                    />
                    <input
                        :value="$route.query.name"
                        type="text"
                        name="text"
                        autocomplete="off"
                        required
                        disabled
                        class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
                    />
                </div>
                 <div class="relative">
                    <Datepicker :inputClassName="`datepicker ${$isDark ? 'dark' : 'light'}`" menuClassName="dp-custom-menu" calendarClassName="dp-custom-calendar" 
                    v-model="salaryForm.created_at" @update:modelValue="handleSalaryDate" :placeholder="$t('date')"
                    :locale="locale == 'ru' ? 'ru' : 'uz'"
                    :cancelText="locale == 'ru' ? 'Отмена' : 'Bekor qilish'"
                    :selectText="locale == 'ru' ? 'ОК' : 'Tanlash'"></Datepicker>
                    <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validateSalary.created_at.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
                </div>
                <div class="relative form-input-anim" :class="$isDark ? 'dark' : ''">
                    <img
                        class="absolute left-4 top-1/2 -translate-y-1/2"
                        src="../../assets/icons/baseIcons/money.svg"
                        alt="user"
                    />
                    <input
                        v-model="salaryForm.amount"
                        @input="formatPrice2(salaryForm.amount, 'amount')"
                        onkeypress="return /[0-9,/.]/i.test(event.key)"
                        type="text"
                        name="text"
                        autocomplete="off"
                        required
                        class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg"
                    />
                    <label for="text" class="label-name">
                        <span class="content-name">{{$t('salary')}}</span>
                    </label>
                    <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validateSalary.amount.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
                </div>
                <div class="relative">
                    <img
                        class="absolute left-4 top-1/2 -translate-y-1/2"
                        src="../../assets/icons/baseIcons/curency.svg"
                        alt="user"
                    />
                    <vue-select :options="currensies" :placeholder="$t('currency')" @select="(option) => salaryForm.currency = option.id" />
                        <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validateSalary.currency.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
                </div>
            </div>
        </template>
    </Modal>

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
import { employeeStore } from '@/store/modules/pages/Employee';
import useVuelidate from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import dayjs from 'dayjs'
import Modal from '@/components/base/Modal.vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import FunctionsIcon from "@/assets/iconsVue/FunctionsIcon.vue";
import { useRouter, useRoute } from 'vue-router'
import PlusIcon from "@/assets/iconsVue/PlusIcon.vue";
import formatter from '@/mixins/formatter.js'


export default {
    components: {
        Modal,
        FunctionsIcon,
        PlusIcon
    },
    setup() {
        const store = employeeStore()
        const { t, locale } = useI18n()
        const route = useRoute()
        const router = useRouter()
        const toast = useToast()
        const isModalActive = ref(false)
        const birthDay = ref('')
        const employeeList = ref([])
        const isError = ref(false)
        const isLoading = ref(false)
        const popUpActive = ref(null)
        const confirmEmployeeDelete = ref(null)
        const salaryPopup = ref(null)
        const salaryPayedPopup = ref(null)
        const textBtn = ref('сonfirm')
        const {formatPrice} = formatter()
        const pagination = ref({
            page: 1,
            total: 1,
            per_page: 10
        })
        const types = reactive([
            {
                id: 1,
                title: 'Employee',
                slug: 'employee'
            },
            {
                id: 2,
                title: 'User',
                slug: 'user'
            },
        ])
        const form = ref({
            first_name: '',
            last_name: '',
            birthday: '',
            type: 'employee',
            detail: {
                branch: '',
                job_title: '',
                salary: '',
                employment_date: ''
            }
        })
        const rules = computed(() => {
            return {
                first_name: { 
                    required: helpers.withMessage('Пожалуйста, введите имя', required)
                },
                last_name: { 
                    required: helpers.withMessage('Пожалуйста, введите фамилию', required)
                },
                // birthday: { 
                //     required: helpers.withMessage('Пожалуйста, введите дату рождение', required)
                // },
                detail: { 
                    branch: {
                        required: helpers.withMessage('Пожалуйста, введите отделение сотрудника', required)
                    },
                    job_title: {
                        required: helpers.withMessage('Пожалуйста, введите должность сотрудника', required)
                    },
                    salary: {
                        required: helpers.withMessage('Пожалуйста, введите зарплату сотрудника', required)
                    },
                    employment_date: {
                        required: helpers.withMessage('Пожалуйста, введите дату приёма на работу', required)
                    }
                }
            }
        })
        const validate = useVuelidate(rules, form)
        const salaryForm = ref({
            user_id: '',
            amount: '',
            currency: '',
            created_at: ''
        })
        const rulesSalary = computed(() => {
            return {
                amount: {
                    required
                },
                created_at: {
                    required
                },
                currency: {
                    required
                },
            }
        })
        const validateSalary = useVuelidate(rulesSalary, salaryForm)
        const currensies = ref([
            {
                title: 'UZS',
                id: '860',
            },
            {
                title: 'USD',
                id: '840'
            },
            {
                title: 'EUR',
                id: '978'
            }
        ])



        // ========== PRICE_FORMATTER START ==========
        function formatPrice2(value, type){
          if(value){
            let currency = value.toString().replace(/,/g, '');
            currency = parseFloat(currency);
            currency = new Intl.NumberFormat('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2}).format(currency);
        
            if(type == 'amount'){
              salaryForm.value.amount = currency
            }else if(type == 'salary'){
              form.value.detail.salary = currency
            }
          }
          return 0;
        }
        // ========== PRICE_FORMATTER END ==========


        const paySalary = async (employee) => {
            salaryForm.value.user_id = employee.id
            router.replace(`/employees?pay_salary=true&name=${employee.first_name}`)
            isModalActive.value = !isModalActive.value
            popUpActive.value = null
        }

        const editEmployee = async (employee) => {
            form.value = employee
            formatPrice2(form.value.detail.salary, 'salary')
            textBtn.value = 'edit'
            isModalActive.value = !isModalActive.value
            router.replace(`/employees?id=${employee.id}`)
            popUpActive.value = null
        }

        const getEmployeesList = async () => {
            isLoading.value = true
            const params = {
                type: 'employee',
                page: pagination.value.page,
                per_page: 10
            }
            await store.GET_EMPLOYEE_LIST(params).then(response => {
                employeeList.value = response.data.data.data
                pagination.value.total = response.data.data.total > 9 ? Math.ceil(response.data.data.total / 10) : 1
            })
            .finally(() => {
                isLoading.value = false
            })
        }

        const deleteEmployee = async (id) => {
            confirmEmployeeDelete.value = null
            await store.DELETE_EMPLOYEE(id).then(() => {
                toast.success(t('successfully-deleted'))
                getEmployeesList()
            })
        }

        const createOrUpdateUser = async () => {
           if (route.query.pay_salary) {
            const result = await validateSalary.value.$validate()
            const params = {
                user_id: parseInt(salaryForm.value.user_id),
                amount: Number(salaryForm.value.amount.toString().replace(/,/g, '')),
                currency: salaryForm.value.currency,
                created_at: dayjs(salaryForm.value.created_at).format('YYYY-MM-DD'), 
            }
            if (result) {
                await store.PAY_SALARY_EMPLOYEE(params).then(response => {
                if (response.status == 200) {
                    toast.success(t('successfully-payed'))
                    getEmployeesList()
                    toggleModal()
                }
                }) 
                .catch(() => {
                    toast.error(t('error-occured'))
                })
            }
           } else {
            const result = await validate.value.$validate()
            if (result) {
                if (route.query.id) {
                    const params = {
                        first_name: form.value.first_name,
                        last_name: form.value.last_name,
                        birthday: dayjs(form.value.birthday).format('YYYY-MM-DD'),
                        type: 'employee',
                        detail: {
                            branch: form.value.detail.branch,
                            job_title: form.value.detail.job_title,
                            salary: Number(form.value.detail.salary.toString().replace(/,/g, '')),
                            employment_date: form.value.detail.employment_date
                        }
                    }
                    await store.UPDATE_EMPLOYEE({data: params, id: route.query.id}).then(response => {
                        if (response.status == 200) {
                            toast.success(t('successfully-edited'))
                            getEmployeesList()
                            toggleModal()
                        }
                    }) 
                    .catch(() => {
                        toast.error(t('error-occured'))
                    })
                } else {
                    await store.CREATE_EMPLOYEE(form.value).then(response => {
                        if (response.status == 200) {
                            toast.success(t('successfully-added'))
                            getEmployeesList()
                            toggleModal()
                        }
                    }) 
                    .catch(() => {
                        toast.error(t('error-occured'))
                    })
                }
            }
           }
        }

        const toggleModal = () => {
            validate.value.$reset()
            validateSalary.value.$reset()
            isModalActive.value = !isModalActive.value
            router.replace('/employees')
            popUpActive.value = null
            if (!isModalActive.value) {
                form.value = {
                    first_name: '',
                    last_name: '',
                    birthday: '',
                    type: 'employee',
                    detail: {
                        branch: '',
                        job_title: '',
                        salary: '',
                        employment_date: ''
                    }
                }
                salaryForm.value = {
                    user_id: '',
                    amount: '',
                    currency: '',
                    created_at: ''
                }
            }
            if (!route.query.id) {
                textBtn.value = 'сonfirm'
            }
        }

        const handleDate = (modelData) => {
            form.value.detail.employment_date = dayjs(modelData).format('YYYY-MM-DD')
        }

        const handleBirthday = (modelData) => {
            form.value.birthday = dayjs(modelData).format('YYYY-MM-DD')
        }

        const handleSalaryDate = (modelData) => {
            salaryForm.value.created_at = dayjs(modelData).format('YYYY-MM-DD HH:mm:ss')
        }

        const togglePopup = (id) => {
            if (popUpActive.value === id) {
                popUpActive.value = null
            } else {
                popUpActive.value = id
            }
        };

        function updatePage(value) {
            pagination.value.page = value
            getEmployeesList()
        }

        const moneyFormat = (str) => {
            if (!str) return '0.00'
            return str.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ')
        }

        onMounted(() => {
            getEmployeesList()
        })

        return {
            isModalActive,
            form,
            birthDay,
            types,
            employeeList,
            isError,
            isLoading,
            confirmEmployeeDelete,
            popUpActive,
            salaryPopup,
            salaryPayedPopup,
            textBtn,
            deleteEmployee,
            salaryForm,
            currensies,
            validate,
            validateSalary,
            pagination,

            createOrUpdateUser,
            togglePopup,
            toggleModal,
            handleDate,
            handleBirthday,
            editEmployee,
            paySalary,
            handleSalaryDate,
            updatePage,
            moneyFormat,

            locale,
            formatPrice,
            formatPrice2,
        }
    }
}
</script>

<style>

</style>