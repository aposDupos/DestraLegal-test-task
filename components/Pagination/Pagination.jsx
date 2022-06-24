import {Button, Pagination as PaginationAnt} from "antd";
import {useGetTotalContentQuery} from "@/store/api/contentApi";
import styles from './Pagination.module.scss'
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

export const Pagination = ({current, setCurrent}) => {
    const {data: count, isLoading, isFetching} = useGetTotalContentQuery()
    const screens = useBreakpoint()

    const onChange = page => {
        setCurrent(page)
    }
    const onPlusTenClickHandler = () => {
        setCurrent((current + 10) * 10 >= count ? Math.trunc(count/10) : current + 10)
    }
    const onMinusTenClickHandler = () => {
        setCurrent(current - 10 <= 1 ? 1 : current - 10)
    }
    return (
        <div className={styles.Pagination}>
            <div className={styles.Pagination__main}>
                <PaginationAnt
                    total={count || null}
                    current={current}
                    showTotal={total => `Всего ${total} карточек`}
                    onChange={onChange}
                    responsive
                    showSizeChanger={false}
                />
            </div>
            <div className={styles.Pagination__btns}>
                <Button size={screens.xs ? "small" : "middle"} onClick={onMinusTenClickHandler}>-10 страниц</Button>
                <Button size={screens.xs ? "small" : "middle"} onClick={onPlusTenClickHandler}>+10 страниц</Button>
            </div>
        </div>
    )
}