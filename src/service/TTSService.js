
export default{
    getVoice(text){
    // const list= []
    // var synth = window.speechSynthesis;
    // var toSpeak = new SpeechSynthesisUtterance(text);
    // toSpeak.voice = {
    //     default: false,
    //     lang: "th-TH",
    //     localService: true,
    //     name: "Kanya",
    //     voiceURI: "Kanya"
    // };
    // synth.speak(toSpeak);

        const voices =  window.speechSynthesis.getVoices()
            var utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.cancel();
            setTimeout(()=>{
                utterance.voice = window.speechSynthesis.getVoices()[16]
                utterance.volume = 100
                utterance.lang = 'th-Th';
                window.speechSynthesis.speak(utterance);
                console.log(utterance)
            
            },800)
            

}

}