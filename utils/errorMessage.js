import {message} from "antd";

export const errorMessage = (msg, onClose = () => {}) => {
    message.error(msg, 2, onClose)
}