<template>
    <div class="flex flex-col w-full">
        <div class="flex flex-row w-full lg:flex-row">
            <Card title="All Content" :content="allContent" />
            <Card title="❌ Content" :content="incomplateContent" />
            <Card title="✔ Content" :content="allContent - incomplateContent" />
            <Card title="Local Content" :content="thaiRath + sanook + dek_d" />
            <Card title="Inter Content" :content="allContent - (thaiRath + sanook + dek_d)" />
        </div>
        <div class="divider"></div>
        <div class="flex flex-row w-full lg:flex-row">

        </div>
    </div>
</template>
<script>
import { useViewModel } from './admin-landing-page.viewmodel';
import Drawer from '@/components/Drawer.vue';
import Card from '@/components/Card.vue';
export default {
    name: 'Admin Landing Page',
    components: {
        Drawer,
        Card,
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
        const { pages, contents, isLoading, allContent, incomplateContent, thaiRath, sanook, dek_d } = useViewModel();
        return {
            pages,
            contents,
            isLoading,
            allContent,
            incomplateContent,
            thaiRath,
            sanook,
            dek_d,
        };
    },
};
</script>
