<template>
    {{this.text}}
</template>

<script>
    import TTS from '../service/TTSService.js'
    export default{
        data(){
            return{
                text:""
            }
        },
        created(){
            this.text = this.$route.params.id
            TTS.getVoice(this.text)
           
        }
    }

</script>