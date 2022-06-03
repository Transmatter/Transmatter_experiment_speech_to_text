import { ref, onMounted } from 'vue'
import ContentService from './content.service'

export const useViewModel = () => {
    const contents = ref([])
    const isLoading = ref(false)

    const fetchContent = () => {
        ContentService()
        .getAllContents()
        .then((res) => {
            contents.value = res.data.data.getAllContents
            isLoading.value = false
        })
    }
    
    onMounted(() => {
        fetchContent()
    })
    
    return {
        contents,
        isLoading
    }
}

