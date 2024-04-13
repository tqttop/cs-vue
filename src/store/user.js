import {defineStore} from 'pinia'
import {ref} from 'vue'
export const useUserStore = defineStore('user',()=>{
    const token = ref('')
    const setToken = (value) => {
        token.value = value
    }
    const removeToken = () => {
        token.value = ''
    }
    return {
        token,
        setToken,
        removeToken
    }
}, {
        persist: true,
    }
    // other options
)