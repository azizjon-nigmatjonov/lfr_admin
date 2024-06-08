<template>
  <div
    ref="modalRef"
    @click="toggleModal"
    class="fixed top-0 left-0 w-full h-full bg-[#000] z-[99] flex items-center justify-center duration-500"
    :class="[isModalActive ? 'flex' : 'hidden', $isDark ? 'bg-opacity-[0.7]' : 'bg-opacity-[0.3]']"
  >
      <!-- <perfect-scrollbar class="items-center justify-center grid"> -->
        <div :class="[width ? width : '', $isDark ? 'bg-[#0b1929] border border-[#132f4c]' : 'bg-white']" class="relative p-4 rounded-[12px]">

            <span class="absolute right-4 top-4">
              <CancelIcon
                @click="closeModal"
                stroke="stroke-[#1d3260] dark:stroke-white rotate-45 hover:rotate-[-45deg] cursor-pointer duration-200"
                width="32"
                height="32"
              />
            </span>
            <slot name="modalHeader"></slot>

            <slot name="modalBody"></slot>

            <footer class="w-full flex items-center gap-3" :class="footerHide ? 'hidden' : ''">
              <button
                @click="closeModal"
                :class="$isDark ? 'bg-white bg-opacity-[0.1]' : 'bg-[#1d3260]'"
                class="basicBtn whitespace-nowrap w-full bg-opacity-20 flex justify-center main-color-black mt-8 text-center dark:text-white"
              >
                {{$t('cancel')}}
              </button>
              <button
                @click="submit"
                class="basicBtn whitespace-nowrap w-full bg-[#2597DE] flex justify-center text-white mt-8 text-center"
              >
                {{buttonText ? buttonText : $t('сonfirm')}}
              </button>
            </footer>
        </div>
      <!-- </perfect-scrollbar> -->
  </div>
</template>

<script>
import { ref } from 'vue'
import CancelIcon from "../../assets/iconsVue/PlusIcon.vue";
export default {
  props: ['isModalActive', 'width', 'buttonText', 'outsideClose', 'footerHide'],
  components: {
    CancelIcon,
  },
  setup(props, context) {
    const modalRef = ref(null)
    const closeModal = () => {
      context.emit('close')
    }

    const toggleModal = (e) => {
      if (props.outsideClose && modalRef.value == e.target) {
        closeModal()
      }
    }

    const submit = () => {
      context.emit('submitModal')
    }

    return {
        closeModal,
        modalRef,
        submit,
        toggleModal
    }
  },
};
</script>

<style lang="scss">

</style>