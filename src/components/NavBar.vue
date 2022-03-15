<script>
import LinkButton from '@/widget/LinkButton.vue';
import ProfileIcon from '@/widget/ProfileIcon.vue';
import Buttom from '@/widget/Buttom.vue';
export default {
    components: {
        LinkButton,
        ProfileIcon,
        Buttom
    },
    methods:{
        mockLogin(){
            this.$store.state.login = !this.$store.state.login;
        }
    } 
};
</script>
<template>
    <div>
        <nav class="bg-white shadow">
            <div class="max-w-7xl mx-auto px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <a class="flex-shrink-0" href="/">
                            <h1 class="text-green-500 text-xl font-bold">My Template</h1>
                        </a>
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline space-x-4">
                                <LinkButton path="Home"/>
                                <LinkButton path="About"/>
                            </div>
                        </div>
                    </div>
                    <ProfileIcon v-if="this.$store.state.login"/>
                    <Buttom @click="mockLogin" v-else buttonName="Sign in"/>
                </div>
            </div>
            <div class="md:hidden">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <LinkButton path="Home"/>
                    <LinkButton path="About"/>
                </div>
            </div>
        </nav>
    </div>
</template>