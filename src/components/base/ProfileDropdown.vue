<template>
    <div class="uk-inline">
        <button class="uk-animation-fade w-[45px] h-[45px] flex items-center justify-center rounded-[12px]" type="button">
            <img
            src="../../assets/icons/baseIcons/user-square-2.svg"
            class=""
            width="30"
            height="30"
            alt="avatar"
          />
        </button>
        <div 
            class="uk-padding-remove rounded-[4px]" 
            style="min-width: 300px;" 
            uk-dropdown="pos: bottom-center; animation: uk-animation-slide-top-small; duration: 200; mode: click"
            :class="$isDark ? 'bg-[#011e3c] shadow-2xl shadow-[#111] border border-[#132f4c]' : 'bg-[#fff] shadow-lg'"
            >                
            <div class="p-4">
                <ul class="flex flex-col">
                    <li v-if="$can('read', 'settings-profile')">
                        <router-link :to="{ name: 'Profile' }">
                            <span class="flex justify-between py-4 group text-lg">
                                {{$t('profile')}}
                                <SmallArrowRight stroke="stroke-current" class="group-hover:mr-0 mr-2 duration-200" />
                            </span>
                        </router-link>
                    </li>
                    <li v-if="$can('read', 'settings-roles')">
                        <router-link :to="{ name: 'Roles' }">
                            <span class="flex justify-between py-4 group text-lg">
                                {{$t('roles')}}
                                <SmallArrowRight stroke="stroke-current" class="group-hover:mr-0 mr-2 duration-200" />
                            </span>
                        </router-link>
                    </li>
                    <li v-if="$can('read', 'settings-permissions')">
                        <router-link :to="{ name: 'Permissions' }">
                            <span class="flex justify-between py-4 group text-lg">
                                {{$t('permissions')}}
                                <SmallArrowRight stroke="stroke-current" class="group-hover:mr-0 mr-2 duration-200" />
                            </span>
                        </router-link>
                    </li>
                    <li v-if="$can('read', 'settings-users')">
                        <router-link :to="{ name: 'Users' }">
                            <span class="flex justify-between py-4 group text-lg">
                                {{$t('users')}}
                                <SmallArrowRight stroke="stroke-current" class="group-hover:mr-0 mr-2 duration-200" />
                            </span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import SmallArrowRight from '../../assets/iconsVue/SmallArrowRight.vue'
export default {
    components: {
        SmallArrowRight
    },
    setup() {

    }
}
</script>

<style scoped>
.router-link-exact-active {
    color: #141839 !important;
}
a {
    color: #8292aa !important;
}
.dark .router-link-exact-active {
    color: #fff !important;
}
.dark a {
    color: #ffffff99 !important;
}
.uk-dropdown {
    border-radius: 4px;
    border-top: 4px solid #5fc7d1;
}
</style>
