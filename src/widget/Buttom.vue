<script>
export default {
    props:["buttonName"]
}
</script>
<template>
    <button class="px-2 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
        {{this.buttonName}}
    </button>
</template>