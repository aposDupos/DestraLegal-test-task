import {Col, Row} from "antd";
import {useState} from "react";
import {useGetContentQuery} from "@/store/api/contentApi";
import {Pagination} from "@/components/Pagination/Pagination";
import {ItemCard} from "@/components/ItemCard/ItemCard";
import styles from '@/styles/Home.module.scss'
export default function Home() {
    const [currentPage, setCurrentPage] = useState(1)

    const {data, isLoading, isFetching} = useGetContentQuery(currentPage)
    const loading = isFetching || isLoading
    const arrayOfTen = Array(10).keys()
    const items = loading ? [...arrayOfTen] : (data && data)
    return (
        <div className={styles.Home__container}>
            <Row align={"middle"} gutter={[16,16]} >
                {items.map((item, index) => (
                    <Col xs={24} sm={12} md={8} lg={6}  key={item?._id + index || index}>
                        <ItemCard  item={item} loading={loading}/>
                    </Col>
                ))}
            </Row>

            <Pagination current={currentPage} setCurrent={setCurrentPage}/>
        </div>
    )
}
