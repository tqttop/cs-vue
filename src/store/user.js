import {defineStore} from 'pinia'
import {ref} from 'vue'
export const useUserStore = defineStore('user',()=>{
    const token = ref('')
    const username = ref('')
    const role = ref('')
    const setToken = (value) => {
        token.value = value.token
        username.value =value.username
        role.value = value.role
    }
    const removeToken = () => {
        token.value = ''
        username.value = ''
        role.value = ''
    }
    return {
        role,
        username,
        token,
        setToken,
        removeToken
    }
}, {
        persist: true,
    }
    // other options
)