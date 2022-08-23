import getNewContentAudio from '../assets/audio/getNewContent.mp3'
import SuccessSearch from '../assets/audio/SuccessSearch.mp3'


export default{
    getNewContent(){
        var audio = new Audio(getNewContentAudio);
        audio.play();
    },
    getSuccessSearch(){
        var audio = new Audio(SuccessSearch);
        audio.play();
    }
}