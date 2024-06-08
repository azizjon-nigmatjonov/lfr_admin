<template>
  <div class="bg-[#eee] Skeleton" :class="[classes, $isDark ? 'dark' : 'light']"></div>
</template>

<script>
export default {
  props: ['classes'],
};
</script>

<style lang="scss" scoped>
.Skeleton {
	&.light {
		background-color: #e2e5e7;
		background-image:			
			linear-gradient(
				90deg, 
				rgba(#fff, 0), 
				rgba(#fff, 0.5),
				rgba(#fff, 0)
			);
	}
	&.dark {
		background-color: #182635;
		background-image:			
			linear-gradient(
				90deg, 
				rgba(#23303f, 0), 
				rgba(#23303f, 0.5),
				rgba(#23303f, 0)
			);
	}
	background-size: 500px 100%;
	background-repeat: no-repeat;
	background-position: left -500px top 0;
	animation: shine 1s ease infinite;
}
@keyframes shine {
    to {
        background-position: right -500px top 0;
    }
}
</style>