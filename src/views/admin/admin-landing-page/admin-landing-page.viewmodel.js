import { ref, onMounted } from 'vue'
import AdminLandingPageService from './admin-landing-page.service'
import NProgress from 'nprogress'
// import { all } from 'core-js/fn/promise'

export const useViewModel = () => {
    const contents = ref([])
    const pages = ref()
    const allContent = ref()
    const incomplateContent = ref()
    const thaiRath = ref()
    const sanook = ref()
    const dek_d = ref()
    const isLoading = ref(false)

    const fetchContent = () => {
        AdminLandingPageService()
        .getAllContent()
        .then((res) => {
            allContent.value = res.data.data.getAllContents.totalElements
        });
        AdminLandingPageService()
        .getAllEmptyAltNews()
        .then((res) => {
            incomplateContent.value = res.data.data.getAllEmptyAltNews.totalElements
        })
        AdminLandingPageService()
        .getContentBySourceAndCategory("ไทยรัฐออนไลน์","ทั้งหมด")
        .then((res) => {
            thaiRath.value = res.data.data.getNewsBySourceAndType.totalElements
        })
        AdminLandingPageService()
        .getContentBySourceAndCategory("สนุกออนไลน์","ทั้งหมด")
        .then((res) => {
            sanook.value = res.data.data.getNewsBySourceAndType.totalElements
        })
        AdminLandingPageService()
        .getContentBySourceAndCategory("เด็กดี","ทั้งหมด")
        .then((res) => {
            dek_d.value = res.data.data.getNewsBySourceAndType.totalElements
        })
        isLoading.value = false
    }
    
    onMounted(() => {
        NProgress.start()
        fetchContent()
        NProgress.done()
    })
    
    return {
        pages,
        contents,
        isLoading,
        allContent,
        incomplateContent,
        thaiRath,
        sanook,
        dek_d,
    }
}
