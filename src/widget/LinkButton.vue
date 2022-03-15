<script>
export default {
    props: ['path'],
};
</script>
<template>
    <router-link
        class="text-green-500 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
        :to="{name:this.path}"
    >
        {{ this.path }}
    </router-link>
</template>