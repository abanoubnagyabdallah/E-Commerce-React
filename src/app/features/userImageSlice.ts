import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IUserImage {
    userImage: string
}


const initialState: IUserImage = {
    userImage: ''
}

const UserImageSlice = createSlice({
    name: "image",
    initialState,
    reducers: {
        setUserImage: (state, action: PayloadAction<string>) => {
            state.userImage = action.payload
        },

    }
})

export const { setUserImage } = UserImageSlice.actions
export default UserImageSlice.reducer
