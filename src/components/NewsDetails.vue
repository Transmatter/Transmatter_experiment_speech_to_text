<template>
        <div v-for="content in contents" :key="content.id" @click="detail(content.id)" class="border rounded-lg hover:bg-green-100 lg:mx-80 cursor-pointer my-4">
            <p class="px-6 py-2 text-sm">ผู้เขียน: {{convertAuthor(content.author)}}</p>
            <p class="px-6 py-1 text-sm">{{content.category}}</p>
            <p class="px-6 py-6 text-xl font-bold hover:text-green-800">
                    {{content.title}}
            </p>
            <p class="px-6 py-2 text-sm flex justify-end">{{getDate(content.public_date)}}</p>
        </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/th'
export default {
    props: {
        contents: {
            type: Array,
            required: true
        }
    },
    methods : {
        detail(id){
            this.$router.push({
                name: 'Content Details',
                params: {
                    id: id
                }
            })
        },
        getDate(dateString){
            return dayjs(dateString).locale('th').format('DD MMMM YYYY');
        },
        convertAuthor(author){
            if(author == null) {
                return 'ไม่ทราบผู้เขียน'
            }
            if(author.length === 0){
                return 'ไม่ทราบผู้เขียน'
            }
            return author
        }
    }
}
</script>