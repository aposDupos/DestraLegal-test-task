import {useLoginMutation, useRefreshMutation} from "@/store/api/authApi";
import {useDispatch, useSelector} from "react-redux";
import {Loader} from "@/components/Loader/Loader";
import {useEffect} from "react";

export const RequireUser = ({children}) => {
    const dispatch = useDispatch()
    const [login, {isLoading, isFetching}] = useLoginMutation({
        fixedCacheKey: 'login',
        refetchOnMountOrArgChange: true
    })
    const [refresh, {isLoadingRefresh, isFetchingRefresh}] = useRefreshMutation()

    const auth = useSelector(state => state.auth)

    const refreshHandler = async () => {
        await refresh()
    }

    useEffect(()=>{
        refreshHandler()
    }, [])

    const loading = isLoading || isFetching

    if (auth.isLogged) {
        return <>{children}</>
    } else if (loading) {
        return <Loader size={'large'} spinning={true}/>
    } else {
        return <h1>Вы не зашли в аккаунт</h1>
    }
}