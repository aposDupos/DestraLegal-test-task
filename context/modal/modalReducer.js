import {TOGGLE_MODAL} from "../types";

const handlers = {
    [TOGGLE_MODAL]: state => ({isActive: !state.isActive}),
    DEFAULT: state => state
}

export const modalReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}