<template>
  <div class="flex items-center justify-center flex-col py-20" :class="classes">
    <img :class="width ? width: 'w-[170px]'" src="@/assets/images/no-data.png" alt="image">
    <p class="mt-5 text-3xl font-medium" :class="[font, $isDark ? 'text-white' : 'main-color-black']">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: ['text', 'width', 'font', 'classes'],
};
</script>

<style lang="scss" scoped>
</style>