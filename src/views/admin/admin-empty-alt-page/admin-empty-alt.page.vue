<template>
    <div class="flex justify-center">
        <h1 class="my-6 text-3xl font-bold">News that have not Alternative text in the images</h1>
    </div>
    <div class="p-1.5 w-full sm:w-auto overflow-hidden bg-white rounded-lg my-6 lg:mx-80">
        <table class="border">
            <thead class="border">
                <tr>
                    <th class="px-7 py-3 text-center">No.</th>
                    <th class="px-7">Title</th>
                    <th class="px-7">Source</th>
                    <th class="px-7">Category</th>
                    <th class="px-7">Author</th>
                    <th class="px-7">Publish Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in contents" @click="seeDetail(item.id)" class="hover:bg-green-50 hover:underline cursor-pointer">
                    <td class="px-7 text-center py-3">{{index + 1}}</td>
                    <td class="px-7 text-left">{{item.title.substring(0,10) + "..."}}</td>
                    <td class="px-7 text-left">{{item.source.substring(0,10) + "..."}}</td>
                    <td class="px-7 text-left">{{item.category.substring(0,10) + "..."}}</td>
                    <td class="px-7 text-left">{{item.author.substring(0,10) + "..."}}</td>
                    <td class="px-7 text-left">{{getDate(item.public_date).substring(0,10) + "..."}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="w-full sm:w-auto overflow-hidden bg-green-50 rounded-lg my-6 lg:mx-80">
        <div class="p-1">
            <v-pagination
                v-model="page"
                :pages="pages"
                :range-size="1"
                activeColor="#bbf7d0"
                @update:modelValue="getAllEmptyAltNews"
            />
        </div>
    </div>
</template>

<script>
import { useViewModel } from './admin-empty-alt.viewmodel';
import AdminEmptyAltService from './admin-empty-alt.service';
import NewsDetailsVue from '@/components/NewsDetails.vue';
import VPagination from '@hennge/vue3-pagination';
import '@hennge/vue3-pagination/dist/vue3-pagination.css';
import Nprogress from 'nprogress';
import dayjs from 'dayjs';

export default {
    name: 'Content Page',
    components: {
        NewsDetailsVue,
        VPagination,
    },
    data() {
        return {
            page: 1,
            contents: [],
            query: '',
            totalPage: 0,
        };
    },
    methods: {
        getDate(dateString){
            return dayjs(dateString).locale('th').format('DD MMMM YYYY');
        },
        seeDetail(id){
            this.$router.push('/content/' + id);
        },
        getAllEmptyAltNews() {
            Nprogress.start();
            AdminEmptyAltService()
                .getEmptyAltContents(this.page)
                .then((response) => {
                    this.contents = response.data.data.getAllEmptyAltNews.content;
                    Nprogress.done();
                });
        },
    },
    setup() {
        const { pages, contents, isLoading } = useViewModel();
        Nprogress.start();
        Nprogress.done();
        return {
            pages,
            contents,
            isLoading,
        };
    },
};
</script>
