<template>
    <div class="flex flex-col w-full">
        <Hero/>
        <div v-if="this.$store.getters.getRole == 'ROLE_SUPER_ADMIN'" class="divider">Content Fetching Feature</div>
        <div v-if="this.$store.getters.getRole == 'ROLE_SUPER_ADMIN'" class="flex flex-row w-full lg:flex-row">
            <div class="flex flex-row w-full lg:flex-row justify-center">
                <Card title="Fetching Local Content" content="" />
                <Card title="Fetching Inter Content" content="" />
            </div>
        </div>
        <div class="divider">Content Status on Platform</div>
        <div class="flex flex-row w-full lg:flex-row">
            <div class="flex flex-row w-full lg:flex-row stats shadow">
                <Stat title="All Content" :content="allContent" />
                <Stat title="❌ Content" :content="incomplateContent" />
                <Stat title="✔ Content" :content="allContent - incomplateContent" />
                <Stat title="Local Content" :content="local_content" />
                <Stat title="Inter Content" :content="inter_content" />
            </div>
        </div>
    </div>
</template>
<script>
import { useViewModel } from './admin-landing-page.viewmodel';
import Drawer from '@/components/Drawer.vue';
import Card from '@/components/Card.vue';
import Hero from '@/components/Hero.vue';
import Stat from '@/components/Stat.vue';
export default {
    name: 'Admin Landing Page',
    components: {
        Drawer,
        Card,
        Hero,
        Stat
    },
    data() {
        return {
            page: 1,
            contents: [],
            query: '',
            totalPage: 0,
        };
    },
    setup() {
        const { pages, contents, isLoading, allContent, incomplateContent, local_content,inter_content } = useViewModel();
        return {
            pages,
            contents,
            isLoading,
            allContent,
            incomplateContent,
            local_content,
            inter_content
        };
    },
};
</script>
