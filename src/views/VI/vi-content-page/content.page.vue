<template>
    <div class="p-1.5 w-full sm:w-auto overflow-hidden bg-white rounded-lg my-6 lg:mx-80">
        <div class="space-y-2 sm:space-y-0 sm:flex sm:-mx-1">
            <select aria-label="state" @change="getContentBySourceAndCategory" v-model="select" class="px-2 mx-2 select select-primary w-60 max-w-xs bg-primary text-base-100 lg:text-md md:text-md sm:text-xs">
                <option disabled value="">เลือกหมวดหมู่</option>
                <option v-for="opt in source" :value="opt" :key="opt" class="sm:text-sm md:text-md lg:text-md">
                    {{opt.source === 'all' ? 'ทั้งหมด' : opt.source}}
                    {{opt.type === 'all' ? '' : ' : ' + opt.type}}
                </option>
            </select>
            <div class="flex flex-col mt-8 space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:-mx-2">
                <input v-model="query" type="text" class="input input-bordered input-primary w-full max-w-xs mx-4" placeholder="หาข่าวอื่นๆ">
                <button @click="spellChecking()" class="px-4 py-2 btn btn-primary btn-md text-base-100 ">
                    Search
                </button>
            </div>
        </div>
    </div>
    <div v-if="contents.length != 0">
        <NewsDetailsVue :contents="contents"/>
        <div class="w-full sm:w-auto overflow-hidden bg-green-50 rounded-lg my-6 lg:mx-80">
            <div v-if="this.select.source != undefined" class="p-1">
                <v-pagination 
                v-model="page"
                :pages="pages" 
                :range-size="1"
                activeColor="#bbf7d0"
                @update:modelValue="getContentBySourceAndCategory"
                />
            </div>
            <div v-else class="p-1">
                <v-pagination 
                v-model="page"
                :pages="pages" 
                :range-size="1" 
                activeColor="#bbf7d0"
                @update:modelValue="searchContent"
                />
            </div>
        </div>
    </div>
    <div v-else>
        <img class="mx-auto" src="../../../assets/not_found_image.png" alt="not found icon">
        <p class="text-3xl font-bold text-center">Nothing Here...</p>
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
import SC from '@/service/SpellCorrection.js'
import TTS from '@/service/TTSService.js'

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
            pages : 1,
            contents: [],
            query : '',
            totalPage: 0, 
            source : [
                {"source": "all","type": "all"},
                {"source":"ไทยรัฐออนไลน์","type":"all"},
                {"source":"ไทยรัฐออนไลน์","type":"วิเคราะห์เศรษฐกิจ"},
                {"source":"ไทยรัฐออนไลน์","type":"การเงิน"},
                {"source":"ไทยรัฐออนไลน์","type":"นโยบาย"},
                {"source":"ไทยรัฐออนไลน์","type":"การตลาด"},
                {"source":"ไทยรัฐออนไลน์","type":"การลงทุน"},
                {"source":"สนุกออนไลน์","type":"ทั้งหมด"},
                {"source":"เด็กดี","type":"ชีวิตวัยรุ่น"}
            ],
            select : '' ,
            spell_error: true,
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
                    this.contents = res.data.data.getAllApprovedContent.content
                    this.pages = res.data.data.getAllApprovedContent.totalPages
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
                    this.pages = res.data.data.getAllContents.totalPages
                    Nprogress.done();
                });
            } else {
                ContentService()
                .getContents(value,this.page)
                .then((res) => {
                    this.contents = res.data.data.getNewsBySource.content
                    this.pages = res.data.data.getNewsBySource.totalPages
                    Nprogress.done();
                });
            }
        },
        searchContent(){
            Nprogress.start();
            ContentService()
            .searchContent(this.query,this.page)
            .then((res) => {
                this.contents = res.data.data.searchOnlyApprovedContent.content
                this.pages = res.data.data.searchOnlyApprovedContent.totalPages
                Nprogress.done();
            });

            
        },
        getContentBySourceAndCategory(){
            if(typeof this.select == 'string'){
                this.select = this.select
            }
            if(this.select.source == 'all' && this.select.type == 'all'){
                this.getAllContents();
            } else {
                Nprogress.start();
                ContentService()
                .getNewsBySourceAndCategory(this.select.source,this.select.type === 'all' ? 'ทั้งหมด' : this.select.type ,this.page)
                .then((res) => {
                    this.contents = res.data.data.getOnlyApprovedContentBySource.content
                    this.pages = res.data.data.getOnlyApprovedContentBySource.totalPages
                    Nprogress.done();
                });
            }
        },
        spellChecking(){
            SC.checkSpell(this.query)
            .then((res)=>{
                if(res.data.suggestion==null){
                    this.searchContent()
                }else{
                    const words = res.data.suggestion
                    console.log(words)
                    TTS.getVoice("คุณหมายถึง "+words[0]+" หรือ "+words[1]+'หรือ ค้นหาด้วยคำของคุณ')
                }
            })
            .catch((err)=>{
                console.log(err)
                this.searchContent()
            })
        }
    }
}
</script>