<template>
    <div class="flex justify-center">
        <h1 class="my-6 text-3xl font-bold">
            Home Page
        </h1>
    </div>
    <div v-for="content in contents" :key="content.id" class="border hover:bg-green-100 mx-80">
        <p class="px-6 py-2 text-sm">ผู้เขียน: {{content.author}}</p>
        <p class="px-6 py-6 text-xl font-bold">{{content.title}}</p>
        <p class="px-6 py-2 text-sm line-clamp-3">{{content.content}}</p>
        <p class="px-6 py-2 text-sm flex justify-end">{{content.public_date}}</p>
    </div>
</template>

<script>
import { useViewModel } from "./content/content-page/content.viewmodel";

export default {
    name: "HomePage",
    setup() {
        const {
            contents,
            isLoading
        } = useViewModel();

        return {
            contents,
            isLoading
        };
    }
};
</script>