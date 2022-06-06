<template>
    <div class="p-1.5 w-full sm:w-auto overflow-hidden bg-white rounded-lg my-6 lg:mx-80">
        <div class="space-y-2 sm:space-y-0 sm:flex sm:-mx-1">
            <ButtomVue @click="getContent('ไทยรัฐออนไลน์')" class="mx-2" buttonName="ไทยรัฐ" />
            <ButtomVue @click="getContent('sanook')" class="mx-2" buttonName="สนุก" />
            <ButtomVue @click="getContent('dek-d')" class="mx-2" buttonName="เด็กดี" />
            <ButtomVue @click="getContent('normal people')" class="mx-2" buttonName="อื่นๆ" />
            <ButtomVue @click="getContent('all')" class="mx-2" buttonName="ทังหมด" />
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
            contents: []
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
        if(value === "ไทยรัฐออนไลน์"){
            ContentService()
            .getThairathContents()
            .then((res) => {
                console.log(res.data.data);
                this.contents = res.data.data.getNewsBySource
                console.log(this.contents)
            })
        }
        if(value === "sanook"){
            ContentService()
            .getSanookContents()
            .then((res) => {
                console.log(res.data.data);
                this.contents = res.data.data.getNewsBySource
                console.log(this.contents)
            })
        }
        if(value === "dek-d"){
            ContentService()
            .getDekDContents()
            .then((res) => {
                this.contents = res.data.data.getNewsBySource
            })
        }
        if(value==="normal people"){
            ContentService()
            .getOtherContents()
            .then((res) => {
                this.contents = res.data.data.getNewsBySource
            })
        }
        if(value==="all"){
            ContentService()
            .getAllContents()
            .then((res) => {
                this.contents = res.data.data.getAllContents
            })
        }
        }
    }
};
</script>