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
</template>

<script>
import { useViewModel } from "./content.viewmodel";
import NewsDetailsVue from "@/components/NewsDetails.vue";
import ButtomVue from "@/widget/Buttom.vue";
import ContentService from "./content.service";

export default {
    name: "Content Page",
    components: {
        NewsDetailsVue,
        ButtomVue
    },
    data(){
        return {
            contents: [],
            query : ''
        }
    },
    setup() {
        const {
            fetchSpecificContent,
            contents,
            isLoading
        } = useViewModel();

        return {
            fetchSpecificContent,
            contents,
            isLoading
        };
    },
    methods : {
        getContent(value) {
            if(value==="all"){
                ContentService()
                .getAllContents()
                .then((res) => {
                    this.contents = res.data.data.getAllContents
                });
            } else {
                ContentService()
                .getContents(value)
                .then((res) => {
                    this.contents = res.data.data.getNewsBySource
                });
            }
        },
        searchContent(){
            ContentService()
            .searchContent(this.query)
            .then((res) => {
                this.contents = res.data.data.searchNews
            });
        }
    }
}
</script>