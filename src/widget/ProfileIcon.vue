<script>
import MenuItem from './MenuItem.vue';
import ProfileButton from './ProfileButton.vue';

export default {
    components : {
        MenuItem,
        ProfileButton
    },
    methods:{
        mockLogout(){
            this.$store.state.login = !this.$store.state.login;
        }
    } 
}
</script>
<template>
    <div class="block">
        <div class="ml-4 flex items-center md:ml-6">
            <div class="ml-3 relative">
                <div class="relative inline-block text-left">
                    <div>
                        <ProfileButton />    
                    </div>
                    <div
                        v-if="this.$store.state.trigger"
                        class="
                            origin-top-right
                            absolute
                            right-0
                            mt-2
                            w-56
                            rounded-md
                            shadow-lg
                            bg-slate-50
                            ring-1 ring-black ring-opacity-5
                        "
                    >
                        <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <MenuItem content="Setting"/>                            
                            <MenuItem content="Account"/>                            
                            <MenuItem @click="mockLogout" content="Logout"/>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>