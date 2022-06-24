
import {useContext, useReducer} from "react";
import {TOGGLE_MODAL} from "../types";
import {ModalContext} from "./modalContext";
import {modalReducer} from "./modalReducer";

export const ModalState = ({children}) => {
    const [state, dispatch] = useReducer(modalReducer, {isActive: false})
    const toggleModal = () => {
        dispatch({type: TOGGLE_MODAL})
    }
    return (
        <ModalContext.Provider value={{
            toggleModal,
            modal: state
        }}>
            {children}
        </ModalContext.Provider>
    )
}
export const useModal = () => useContext(ModalContext)