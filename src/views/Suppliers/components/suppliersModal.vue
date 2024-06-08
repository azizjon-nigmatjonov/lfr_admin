<template>
   <Modal :isModalActive="isModalActive" @close="toggleModal" width="w-[430px]" @submitModal="onSubmit()" :buttonText="$t(textBtn)" :outsideClose="true">

    <template v-slot:modalHeader>
      <h3 class="text-lg font-medium text-center main-color-black dark:text-white">
        {{isEdit ? $t('editing') : $t('add_supplier')}}
      </h3>
    </template>

    <template v-slot:modalBody>
      <div class="mt-4 space-y-5">
        <div class="relative form-input-anim" :class="$isDark ? 'dark' : ''">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="@/assets/icons/baseIcons/user-square-2.svg"
            alt="user"
          />
          <input
            v-model="form.name"
            type="text"
            name="text"
            autocomplete="off"
            required
            class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg" :class="$isDark ? 'dark' : 'light'"
          />
          <label for="text" class="label-name">
            <span class="content-name">{{$t('fullname')}}</span>
          </label>
          <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.name.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
        </div>
        <div class="relative form-input-anim" :class="$isDark ? 'dark' : ''">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="@/assets/icons/number-icon.svg"
            alt="user"
          />
          <input
            v-model="form.number"
            type="text"
            name="text"
            autocomplete="off"
            required
            class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg" :class="$isDark ? 'dark' : 'light'"
          />
          <label for="text" class="label-name">
            <span class="content-name">{{$t('supplier_number')}}</span>
          </label>
          <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.number.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
        </div>
        <div class="relative form-input-anim" :class="$isDark ? 'dark' : ''">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="@/assets/icons/phone.svg"
            alt="user"
          />
          <input
            v-model="form.phone"
            type="number"
            name="text"
            autocomplete="off"
            required
            class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg" :class="$isDark ? 'dark' : 'light'"
          />
          <label for="text" class="label-name">
            <span class="content-name">{{$t('phone_number')}}</span>
          </label>
          <p class="absolute -bottom-5 whitespace-nowrap danger-text text-sm z-[2]" v-for="error in validate.phone.$errors" :key="error.$uid">{{ $t(error.$message) }}</p>
        </div>
        <!-- <div class="relative">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="@/assets/icons/allMoney.svg"
            alt="user"
          />
          <input
            type="text"
            name="text"
            autocomplete="off"
            required
            :placeholder="$t('our_debt')"
            class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg" :class="$isDark ? 'dark' : 'light'"
          />
        </div>
        <div class="relative">
          <img
            class="absolute left-4 top-1/2 -translate-y-1/2"
            src="@/assets/icons/allMoney.svg"
            alt="user"
          />
          <input
            type="text"
            name="text"
            autocomplete="off"
            required
            placeholder="Mijoz qarzdorligi"
            class="w-full py-[14px] px-[24px] pl-12 focus:outline-none main-color-black border-[1.5px] borderBox dark:border-[#1a283a]  rounded-[12px] text-lg" :class="$isDark ? 'dark' : 'light'"
          />
        </div> -->


      </div>
    </template>
  </Modal>
</template>

<script>
import { getCurrentInstance, watchEffect } from "vue";
import { ref, computed } from "vue";
import { suppliersStore } from '../../../store/modules/pages/Suppliers';
import { useRouter, useRoute } from "vue-router";
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import PlusIcon from "@/assets/iconsVue/PlusIcon.vue";
import Modal from "@/components/base/Modal.vue";
import Notification from "@/components/base/Notification.vue";
import SunIcon from "@/assets/iconsVue/SunIcon.vue";
import Dropdown from "@/components/base/Dropdown.vue";
import MoonIcon from "@/assets/iconsVue/MoonIcon.vue";
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

export default {
    props: {
        isModalActive: {
            type: [Boolean],
            required: true,
        },
        formSupplier: {
          type: [String],
          required: false
        }
    },
    components: {
        PlusIcon,
        Modal,
        Notification,
        SunIcon,
        Dropdown,
        MoonIcon,

    },
    setup(props, context) {
        const suppliersStorage = suppliersStore()
        const instance = getCurrentInstance();
        const router = useRouter();
        const route = useRoute();
        const { t } = useI18n()
        const toast = useToast()
        const textBtn = ref('confirm')
        const isEdit = ref(false)
        let form = ref({
          date: '',
          number: '',
          name: '',
          phone: '',
          type: 'supplier',
        })


        const toggleModal = () => {
          // validate.value.$reset()
          // router.push('/suppliers?page=1')
          instance.parent.setupState.toggleModal()
        };


        const rules = computed(() => {
            return {
                number: {
                    required: helpers.withMessage('Пожалуйста, введите номер клиента', required)
                },
                name: {
                    required: helpers.withMessage('Пожалуйста, введите Ф.И.О.', required)
                },
                phone: {
                    required: helpers.withMessage('Пожалуйста, введите номер телефона', required)
                }
            }
        })
        const validate = useVuelidate(rules, form)


        async function onSubmit(){
          const result = await validate.value.$validate()
          if (result){
            if (isEdit.value) {
              const data = {
                phone: form.value.phone,
                number: form.value.number,
                type: 'supplier',
                name: form.value.name
              }
              await suppliersStorage.UPDATE_SUPPLIER_OR_CUSTOMER({params: data, id: route.query.supplier }).then( async response => {
                if (response.status == 200) {
                  suppliersStorage.updateSupplier = true
                  validate.value.$reset()
                  toast.success(t('successfully-edited'))
                  await instance.parent.setupState.FETCH_SUPPLIERS_LIST()
                  toggleModal()
                  isEdit.value = false
                  textBtn.value = 'confirm'
                }
              }) .catch(() => {
                toast.error(t('error-occured'))
              })
              
            } else {
              await suppliersStorage.POST_NEW_SUPPLIER_OR_CUSTOMER(form.value).then(async response => {
                if (response.status == 200) {
                  suppliersStorage.updateSupplier = true
                  validate.value.$reset()
                  toast.success(t('successfully-added'))
                  await instance.parent.setupState.FETCH_SUPPLIERS_LIST()
                  toggleModal()
                }
              }) .catch(() => {
                toast.error(t('error-occured'))
              })
            }
          }
        }

        watchEffect(() => {
          if (props.formSupplier) {
            textBtn.value = 'edit'
            isEdit.value = true
            form.value = props.formSupplier
          } else {
            textBtn.value = 'confirm'
            isEdit.value = false
            if (!props.isModalActive) {
              form.value = {
                date: '',
                number: '',
                name: '',
                phone: '',
                type: 'supplier',
              }
            }
          }
        })

        return {
            toggleModal,
            form,
            onSubmit,

            textBtn,
            validate,
            rules,
            textBtn,
            isEdit,
        };
    }
}
</script>

<style>

</style>