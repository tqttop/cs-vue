import {defineStore} from 'pinia'
import {ref} from 'vue'
export const useUserStore = defineStore('user',()=>{
    const token = ref('')
    const username = ref('')
    const role = ref('')
    const user_phone = ref('')
    const id = ref('')
    const img = ref('')
    const setToken = (value) => {
        token.value = value.token
        user_phone.value=value.phone
        role.value =value.role
        id.value = value.id
        username.value = value.name
        img.value =`http://localhost:8000/${value.img}`
    }
    const removeToken = () => {
        token.value = ''
        username.value = ''
        role.value = ''
        user_phone.value = ''
        id.value = ''
        img.value = ''
    }
    const setName = (value) => {
        username.value = value
    }

    const setImg = (value) => {
        img.value = value
    }

    return {
        id,
        user_phone,
        role,
        username,
        token,
        setToken,
        removeToken,
        img,
        setName,
        setImg
    }
}, {
        persist: true,
    }
    // other options
)