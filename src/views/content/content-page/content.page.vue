<template>
    <div class="p-1.5 w-full sm:w-auto overflow-hidden bg-white rounded-lg my-6 lg:mx-80">
        <div class="space-y-2 sm:space-y-0 sm:flex sm:-mx-1">
            <ButtomVue @click="getContent('ไทยรัฐออนไลน์')" class="mx-2" buttonName="ไทยรัฐ" />
            <ButtomVue @click="getContent('sanook')" class="mx-2" buttonName="สนุก" />
            <ButtomVue @click="getContent('dek-d')" class="mx-2" buttonName="เด็กดี" />
            <ButtomVue @click="getContent('normal people')" class="mx-2" buttonName="อื่นๆ" />
            <ButtomVue @click="getContent('all')" class="mx-2" buttonName="ทังหมด" />
            <ButtomVue @click="getContent('all')" class="invisible" buttonName="ทังหมด" />
            <ButtomVue @click="getContent('all')" class="invisible" buttonName="ทังหมด" />
            <ButtomVue @click="getContent('all')" class="invisible" buttonName="ทังหมด" />
            <div class="flex flex-col mt-8 space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:-mx-2">
                <input v-model="query" type="text" class="px-4 py-2 text-gray-700 bg-white border rounded-md sm:mx-2 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="หาข่าวอื่นๆ">
                <button @click="searchContent()" class="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-600 rounded-md sm:mx-2 hover:bg-green-600 focus:outline-none focus:bg-green-600">
                    Search
                </button>
            </div>
        </div>
    </div>
    <NewsDetailsVue :contents="contents"/>
    <div class="w-full sm:w-auto overflow-hidden bg-green-50 rounded-lg my-6 lg:mx-80">
        <div class="p-1">
            <v-pagination 
                v-model="page"
                :pages="pages" 
                :range-size="1" 
                activeColor="#bbf7d0"
                @update:modelValue="getAllContents"
            />
        </div>
    </div>
</template>

<script>
import { useViewModel } from "./content.viewmodel";
import NewsDetailsVue from "@/components/NewsDetails.vue";
import ButtomVue from "@/widget/Buttom.vue";
import ContentService from "./content.service";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import Nprogress from 'nprogress';

export default {
    name: "Content Page",
    components: {
        NewsDetailsVue,
        ButtomVue,
        VPagination
    },
    data(){
        return {
            page : 1,
            contents: [],
            query : '',
            totalPage: 0 
        }
    },
    setup() {
        const {
            fetchSpecificContent,
            contents,
            pages,
            isLoading
        } = useViewModel();

        return {
            fetchSpecificContent,
            pages,
            contents,
            isLoading
        };
    },
    methods : {
        getAllContents(){
            Nprogress.start();
            ContentService()
                .getAllContents(this.page)
                .then((res) => {
                    this.contents = res.data.data.getAllContents.content
                    Nprogress.done();
            });
        },
        getContent(value) {
            Nprogress.start();
            if(value==="all"){
                ContentService()
                .getAllContents(this.page)
                .then((res) => {
                    this.contents = res.data.data.getAllContents.content
                    Nprogress.done();
                });
            } else {
                ContentService()
                .getContents(value,this.page)
                .then((res) => {
                    this.contents = res.data.data.getNewsBySource.content
                    Nprogress.done();
                });
            }
        },
        searchContent(){
            ContentService()
            .searchContent(this.query,this.page)
            .then((res) => {
                this.contents = res.data.data.searchNews.content
                    Nprogress.done();
            });
        }
    }
}
</script>