<template>
    <div class="lg:mx-64 lg:my-6 lg:px-3 border">
        <p class="text-2xl font-bold py-2">{{contentDetail.title}}</p>
        <p class="text-sm py-3 px-3">{{contentDetail.author}}</p>
        <p class="text-sm py-3 px-3">{{contentDetail.public_date}}</p>
        <p class="text-md py-3 px-3 leading-8 text-justify indent-8">{{contentDetail.content}}</p>
        <div class="inline-flex items-baseline" v-for="image in contentDetail.images" :key="image.url">
            <div>
                <img class="my-2 mx-3 h-64" :src="image.url" :alt="image.alt"/>
                <div v-if="(this.$store.getters.getRole == 'ROLE_SUPER_ADMIN' || this.$store.getters.getRole == 'ROLE_ADMIN') && this.$store.getters.getStatus == 'VERIFIED'">
                    <input class="my-2 mx-3 px-2 py-2 w-80 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" type="text" placeholder="somethign"/>
                </div>
            </div>
        </div >
        <div class="grid grid-cols-6 justify-item-end my-6" v-if="(this.$store.getters.getRole == 'ROLE_SUPER_ADMIN' || this.$store.getters.getRole == 'ROLE_ADMIN') && this.$store.getters.getStatus == 'VERIFIED'">
            <ButtomVue class="mx-2" buttonName="update" />
            <ButtomVue class="mx-2 invisible" buttonName="update" />
            <ButtomVue class="mx-2 invisible" buttonName="update" />
            <ButtomVue class="mx-2 invisible" buttonName="update" />
            <ButtomVue class="mx-2 invisible" buttonName="update" />
            <ButtomErrorVue @click="deleteId()" buttonName="delete" />
        </div>
    </div>
</template>
<script>
import { defineComponent } from "vue"
import ButtomErrorVue from "@/widget/ButtomError.vue";
import ButtomVue from "@/widget/Buttom.vue";
import ContentDetailSerivce from "./content-detail.service"
export default defineComponent({
    name: 'ContentDetailPage',
    components : {
        ButtomVue,
        ButtomErrorVue
    },
    data() {
        return {
            contentDetail: {}
        }
    },
    methods: {
        deleteId(){
            ContentDetailSerivce()
            .deleteContentById(this.$route.params.id)
            .then(() => {
                console.log('delete success')
                this.$router.push('/')
            })
        }
    },
    created(){
        ContentDetailSerivce()
        .getContentById(this.$route.params.id)
        .then((res) => {
            this.contentDetail = res.data.data.getContent
        })
    }
});
</script>