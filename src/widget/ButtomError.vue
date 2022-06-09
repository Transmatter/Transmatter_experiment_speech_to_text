<script>
export default {
    props:["buttonName"]
}
</script>
<template>
    <button class="px-2 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80">
        {{this.buttonName}}
    </button>
</template>