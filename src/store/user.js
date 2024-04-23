import {defineStore} from 'pinia'
import {ref} from 'vue'
export const useUserStore = defineStore('user',()=>{
    const token = ref('')
    const username = ref('')
    const role = ref('')
    const user_phone = ref('')
    const id = ref('')
    const setToken = (value) => {
        token.value = value.token
        user_phone.value=value.user_phone
        role.value = value.role
        id.value = value.id
    }
    const removeToken = () => {
        token.value = ''
        username.value = ''
        role.value = ''
        user_phone.value = ''
        id.value = ''
    }
    const setName = (value) => {
        username.value = value
    }
    return {
        id,
        user_phone,
        role,
        username,
        token,
        setToken,
        removeToken,
        setName
    }
}, {
        persist: true,
    }
    // other options
)