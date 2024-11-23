import axios, { AxiosRequestConfig, Method } from 'axios'
import { useRouter } from 'next/navigation'
import useStore from '@/context/store'
import { toast } from 'sonner'


interface AuthFetchProps {
    endpoint: string
    redirectRoute?: string
    formData?: any
    options?: AxiosRequestConfig<any>
    method?: Method
}

export function useFetch() {
    const setUser = useStore((state) => state.setUser);
    const router = useRouter()

    const authRouter = async ({
        endpoint,
        formData,
        redirectRoute,
        options,
        method = 'post' // default method is post
    }: AuthFetchProps) => {
        try {
            const { data } = await axios({
                url: `/api/${endpoint}`,
                method,
                data: formData,
                ...options
            })
            console.log(data.message);
            if (data.message) {
                toast(data.message);
            }
            if (data.userLogged) {
                setUser(data.userLogged)
            }
            if (redirectRoute) {
                router.push(redirectRoute)
                router.refresh();
            }
            return data
        } catch (error: any) {
            console.log(error.response.data.message || error);
        }
    }

    return authRouter
}