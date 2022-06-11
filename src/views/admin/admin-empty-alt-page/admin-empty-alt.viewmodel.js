import { ref, onMounted } from 'vue'
import AdminEmptyAltService from './admin-empty-alt.service'

export const useViewModel = () => {
    const contents = ref([])
    const pages = ref()
    const isLoading = ref(false)

    const fetchContent = () => {
        AdminEmptyAltService()
        .getEmptyAltContents()
        .then((res) => {
            contents.value = res.data.data.getAllEmptyAltNews.content
            pages.value = res.data.data.getAllEmptyAltNews.totalPages
            isLoading.value = false
        })
    }
    
    onMounted(() => {
        fetchContent()
    })
    
    return {
        pages,
        contents,
        isLoading
    }
}
