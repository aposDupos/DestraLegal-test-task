import {useModal} from "context/modal/ModalState";
import {Button, Modal, Typography} from "antd";
import {LoginForm} from "@/components/LoginForm/LoginForm";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "@/store/slices/authSlice";
import styles from './Login.module.scss'
export const Login = () => {
    const {toggleModal, modal: {isActive}} = useModal()
    const dispatch = useDispatch()
    const {isLogged, user} = useSelector(state => state.auth)

    const onClick = async (e) => {
        if (isLogged) {
            dispatch(logOut())
        } else {
            toggleModal()
        }
    }

    return (
        <div className={styles.Login}>
            <Typography.Text className={styles.Login__text}>ID: {user}</Typography.Text>
            <Button type={'primary'} onClick={onClick}>
                {isLogged ? 'Выйти' : 'Войти'}
            </Button>
            <Modal
                title={"Вход"}
                visible={isActive}
                footer={null}
                onCancel={toggleModal}
            >
                <LoginForm/>
            </Modal>
        </div>
    )
}