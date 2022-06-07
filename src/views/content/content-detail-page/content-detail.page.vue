<template>
    <div class="lg:mx-64 lg:my-6 lg:px-3 border">
        <p class="text-2xl font-bold py-2">{{contentDetail.title}}</p>
        <p class="text-sm py-3 px-3">{{contentDetail.author}}</p>
        <p class="text-sm py-3 px-3">{{contentDetail.public_date}}</p>
        <p class="text-md py-3 px-3 leading-8 text-justify indent-8">{{contentDetail.content}}</p>
        <div class="inline-flex items-baseline" v-for="image in contentDetail.images" :key="image.url">
            <img class="my-2 mx-3 h-64" :src="image.url" :alt="image.alt"/>
        </div >
    </div>
</template>
<script>
import { defineComponent } from "vue"
// import { useViewModel } from "./content-detail.viewmodel"
import ContentDetailSerivce from "./content-detail.service"
export default defineComponent({
    name: 'ContentDetailPage',

    // setup() {
    //     const { contentDetail,isLoading } = useViewModel()
    //     return {
    //         contentDetail,
    //         isLoading
    //     }
    // }
    data() {
        return {
            contentDetail: {}
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