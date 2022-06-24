import {Spin} from "antd";
import styles from "./Loader.module.scss"
export const Loader = ({size, spinning}) => {
return <Spin size={size} spinning={spinning} className={styles.Loader}/>
}