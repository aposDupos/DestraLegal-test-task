import {Button, Col, Form, Input, Row} from "antd";
import {LockOutlined, UserOutlined} from '@ant-design/icons'
import {useState} from "react";
import {useModal} from "context/modal/ModalState";
import {useLoginMutation} from "@/store/api/authApi";
import {useDispatch} from "react-redux";
import {errorMessage} from "utils/errorMessage";
import {ERRORS} from "constants";

export const LoginForm = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()

    const formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 20},
    }

    const [loading, setLoading] = useState(false)
    const {toggleModal} = useModal()
    const [login] = useLoginMutation({
        fixedCacheKey: 'login'
    })
    const onFinish = async (values) => {
        setLoading(true)
        const {error} = await login(values)
        setLoading(false)

        if (error) {
            return errorMessage(ERRORS[error.status])
        }
        toggleModal()
        form.resetFields()
    }

    return (
        <Row justify={"center"}>
            <Col span={24}>
                <Form
                    name={'login'}
                    {...formItemLayout}
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label={'Логин'}
                        name={'email'}
                        rules={[
                            {required: true, message: 'Пожалуйста, введите логин'},
                            {
                                type: 'email',
                                message: 'Не дури, введи нормальную почту',
                            },
                        ]}
                    >
                        <Input placeholder={"Введите логин"} prefix={<UserOutlined/>}/>
                    </Form.Item>
                    <Form.Item
                        label={'Пароль'}
                        name={'password'}
                        type={"password"}
                        rules={[
                            {required: true, message: 'Пожалуйста, введите пароль'},
                            {min: 6, message: 'Минимальное количество символов для пароля - 6!'}
                        ]}
                    >
                        <Input.Password placeholder={"Введите пароль"} prefix={<LockOutlined/>}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}