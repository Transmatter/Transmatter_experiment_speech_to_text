<template>
    {{this.sugg}}
</template>

<script>
    // import TTS from '../service/TTSService.js'
    import SC from '../service/SpellCorrection.js'
    export default{
        data(){
            return{
                text:"",
                sugg:""
            }
        },
        created(){
            this.text = this.$route.params.id
            SC.checkSpell(this.text).then((res)=>{
                this.sugg = res.data
            })
           
        }
    }

</script>