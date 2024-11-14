import { createSlice } from "@reduxjs/toolkit"

interface IInitialState {
    isOpenCartDrawer: boolean
    onOpenCartDrawer: boolean
    onCloseCartDrawer: boolean
}

const initialState: IInitialState = {
    isOpenCartDrawer: false,
    onOpenCartDrawer: false,
    onCloseCartDrawer: false
}

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        isOpenCartDrawerAction: (state) => {
            state.isOpenCartDrawer = !state.isOpenCartDrawer
        },
        onOpenCartDrawerAction: (state) => {
            state.onOpenCartDrawer = true
            state.isOpenCartDrawer = true
        },
        onCloseCartDrawerAction: (state) => {
            state.onCloseCartDrawer = false
            state.isOpenCartDrawer = false
        }
    }
})

export const { isOpenCartDrawerAction, onCloseCartDrawerAction, onOpenCartDrawerAction } = globalSlice.actions
export default globalSlice.reducer
