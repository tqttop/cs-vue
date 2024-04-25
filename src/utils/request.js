import axios from 'axios';
import { useUserStore} from "@/store/user.js";
const userStore = useUserStore();
const baseURL='http://127.0.0.1:8000'
const instance = axios.create({
    baseURL,
    timeout: 50000
});

instance.interceptors.request.use(config => {
    // Do something before request is sent
   // const userStore = useUserStore();
   if (userStore.token) {
       config.headers.Authorization = userStore.token;
   }
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    // Do something with response data
    const res = response.data;
    if (res.code === 0) {
        return res
    }
    ElMessage.error(res.message);
    return Promise.reject(res.message);
}, error => {
    if (error.response.status === 403 ) {
        ElMessage.error('权限不足');
    }
    else {
        ElMessage.error("服务器错误");
        return Promise.reject(error);
    }
});

export default instance;
export {baseURL};