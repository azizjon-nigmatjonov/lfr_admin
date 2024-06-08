<template>
  <div
    class="duration-300 z-[2] absolute -left-[130px] top-1/2 -translate-y-1/2 min-w-[150px] py-2 rounded-[12px]"
    :class="[additonalClasses, $isDark ? 'bg-[#011e3c] shadow-2xl shadow-[#111] border border-[#132f4c]' : 'bg-[#fff] shadow-2xl shadow-[#887]']"
  >
    <div class="relative w-full">
      <slot name="FunctionsPopupContent"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["additonalClasses", "hideArrow"],
};
</script>

<style scoped>
li {
  width: auto !important;
}
</style>
