import {Card} from "antd";
import styles from "./ItemCard.module.scss"

export const ItemCard = ({item, loading}) => {
    return (
        <Card loading={loading} hoverable className={styles.ItemCard}>
            {!loading && <Card.Meta
                title={item.name}
                description={item.category}
            />
            }
        </Card>
    )
}