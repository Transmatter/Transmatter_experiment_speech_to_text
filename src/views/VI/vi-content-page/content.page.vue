<template>
<KeyBoardEvent v-on:keyup="handleKeyPress"></KeyBoardEvent>
    <div class="p-1.5 w-full sm:w-auto overflow-hidden bg-white rounded-lg my-6 lg:mx-80">
        <div class="space-y-2 sm:space-y-0 sm:flex sm:-mx-1">
            <select aria-label="state" @change="loadselect" v-model="select" class="px-2 mx-2 select select-primary w-60 max-w-xs bg-primary text-base-100 lg:text-md md:text-md sm:text-xs">
                <option disabled value="">เลือกหมวดหมู่</option>
                <option v-for="opt in source" :value="opt" :key="opt" class="sm:text-sm md:text-md lg:text-md">
                    {{opt.source === 'all' ? 'ทั้งหมด' : opt.source}}
                    {{opt.type === 'all' ? '' : ' : ' + opt.type}}
                </option>
            </select>
            <div class="flex flex-col mt-8 space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:-mx-2">
                <input id="searchBox" v-model="query" type="text" class="input input-bordered input-primary w-full max-w-xs mx-4" placeholder="หาข่าวอื่นๆ">
                <button  id="searchButt" @click="spellChecking()" class="px-4 py-2 btn btn-primary btn-md text-base-100 ">
                    Search
                </button>
            </div>
        </div>
    </div>
    <div  v-if="contents.length != 0 && suggestion.length == 0">
        <NewsDetailsVue :contents="contents"/>
        <div class="w-full sm:w-auto overflow-hidden bg-green-50 rounded-lg my-6 lg:mx-80">
            <div>
                <button v-if="totalElements!=contents.length && !isload" @click="loadmore" id="readMore" class="btn btn-block btn-primary text-base-100">load more</button>
                <button v-else-if="isload" class="btn btn-block btn-primary text-base-100 loading"></button>
                <button v-else-if="totalElements==contents.length"  class="btn btn-block btn-disabled text-base-100">load more</button>
            </div>
        </div>
    </div>
    <div v-else-if="suggestion.length == 0">
        <img class="mx-auto" src="../../../assets/not_found_image.png" alt="not found icon">
        <p class="text-3xl font-bold text-center">Nothing Here...</p>
    </div>
    <div v-if="suggestion.length != 0">
        <div class="drawer-side">
    <label for="my-drawer-2" class="drawer-overlay"></label> 
    <ul class="menu p-4 h-4/5drawer-end overflow-y-auto w-4/5 bg-base-100 text-base-content">
        <!-- Sidebar content here -->
        <li id="sugg1" @click="searchContent(this.suggestion[0])"><a>{{this.suggestion[0]}}</a></li>
        <li id="sugg2" @click="searchContent(this.suggestion[1])" ><a>{{this.suggestion[1]}}</a></li>
        <li id="sugg3" @click="searchContent(this.query)"><a>{{this.query}}</a></li>
    </ul>
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
import SC from '@/service/SpellCorrection.js'
import TTS from '@/service/TTSService.js'
import AudioFeedBack from "../../../service/AudioFeedBack";


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
            size: 3,
            contents: [],
            query : '',
            totalElements: 0, 
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
            suggestion:[],
            isload: false
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
                .getAllContents(this.page,this.size)
                .then((res) => {
                    this.contents = res.data.data.getAllApprovedContent.content
                    this.totalElements = res.data.data.getAllApprovedContent.totalElements
                    this.isload = false;
                    AudioFeedBack.getNewContent()
                    Nprogress.done();
            });
        },
        searchContent(keyword=this.query){
            this.size = 3;
            console.log(keyword,this.select);
            Nprogress.start();
            if (typeof this.select == 'string' || (this.select.source == 'all' && this.select.type == 'all')){
                ContentService()
                .searchContent(keyword,this.page,this.size)
                .then((res) => {
                this.contents = res.data.data.searchOnlyApprovedContent.content
                this.totalElements = res.data.data.searchOnlyApprovedContent.totalElements
                this.query = keyword
                this.suggestion = []
                AudioFeedBack.getSuccessSearch()
                Nprogress.done();
            });
            } else {
                ContentService()
                .searchContentBySrcAndCate(this.query,this.select.source,this.select.type === 'all' ? 'ทั้งหมด' : this.select.type ,this.page,this.size)
                .then((res) => {
                    this.contents = res.data.data.searchOnlyApprovedContentSpecInSrcAndCate.content
                    this.totalElements = res.data.data.searchOnlyApprovedContentSpecInSrcAndCate.totalElements
                    this.isload = false;
                    AudioFeedBack.getNewContent()
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
                    this.suggestion = res.data.suggestion
                    console.log(words)
                    TTS.getVoice("คุณหมายถึง "+words[0]+" หรือ "+words[1]+'หรือ ค้นหาด้วยคำของคุณ')
                }
            })
            .catch((err)=>{
                console.log(err)
                // this.searchContent()
            })
            // this.searchContent()
        },
        loadselect(){
            this.isload = true;
            if(typeof this.select == 'string'){
                this.getAllContents();
            }
            if(this.query != ''){
                this.spellChecking();
            }
            else if((this.select.source == 'all' && this.select.type == 'all') || this.select == null){
                this.getAllContents();
            } else {
                Nprogress.start();
                ContentService()
                .getNewsBySourceAndCategory(this.select.source,this.select.type === 'all' ? 'ทั้งหมด' : this.select.type ,this.page,this.size)
                .then((res) => {
                    AudioFeedBack.getNewContent()
                    this.contents = res.data.data.getOnlyApprovedContentBySource.content
                    this.totalElements = res.data.data.getOnlyApprovedContentBySource.totalElements
                    this.isload = false;
                    Nprogress.done();
                });
            }
        },
        loadmore(){
            Nprogress.start();
            this.size+=3;
            this.isload = true;
            console.log(this.size)
            if (typeof this.select == 'string'){
                this.getAllContents();
            }else if(this.query !== '' && this.select.source == 'all' && this.select.type == 'all'){
                this.size = 3;
                this.searchContent(this.query);

            } else if(this.query !== ''){
                ContentService()
                .searchContentBySrcAndCate(this.query,this.select.source,this.select.type === 'all' ? 'ทั้งหมด' : this.select.type ,this.page,this.size)
                .then((res) => {
                    this.contents = res.data.data.searchOnlyApprovedContentBySource.content
                    this.totalElements = res.data.data.searchOnlyApprovedContentBySource.totalElements
                    this.isload = false;
                    AudioFeedBack.getNewContent()
                    Nprogress.done();
                });
            } else if((this.select.source == 'all' && this.select.type == 'all') || this.select == null){
                this.getAllContents();
                
            } else {
                Nprogress.start();
                ContentService()
                .getNewsBySourceAndCategory(this.select.source,this.select.type === 'all' ? 'ทั้งหมด' : this.select.type ,this.page,this.size)
                .then((res) => {
                    this.contents = res.data.data.getOnlyApprovedContentBySource.content
                    this.totalElements = res.data.data.getOnlyApprovedContentBySource.totalElements
                    this.isload = false;
                    AudioFeedBack.getNewContent()
                    Nprogress.done();
                });
            }
        },
        handleKeyPress: function (e){
        const keyCode = String(e.keyCode || e.code || e.keyIdentifier);
        console.log(keyCode)
        if(keyCode == '40'){
            document.getElementById("readMore").click();
        }
    }
    },
    
}
</script>