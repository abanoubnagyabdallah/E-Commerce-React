// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../../app/store";
// import { axiosInstance } from "../../config/axios.config";
// import { createStandaloneToast } from '@chakra-ui/react'
// import cookieService from "../../services/cookieService";

// const { toast } = createStandaloneToast()

// interface ILoginSlice {
//     loading: boolean;
//     data: unknown | null;
//     error: string | null;
// }
// // interface IErrorResponse {
// //     message: string;
// //     error: {
// //         message: string;
// //     };
// // }

// const initialState: ILoginSlice = {
//     loading: false,
//     data: null,
//     error: null,
// };

// export const userLogin = createAsyncThunk("login/userLogin", async (user: { identifier: string; password: string }, thunkApi) => {
//     const { rejectWithValue } = thunkApi
//     try {
//         const { data } = await axiosInstance.post('/api/auth/local', { identifier: user.identifier, password: user.password })
//         return data;
//     }
//     catch (error) {
//         return rejectWithValue(error)
//     }
// })

// const loginSlice = createSlice({
//     name: "login",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(userLogin.pending, (state) => {
//             state.loading = true
//         })
//         builder.addCase(userLogin.fulfilled, (state, action: PayloadAction<unknown>) => {
//             state.loading = false
//             state.data = action.payload
//             state.error = null
//             const date = new Date()
//             const IN_DAYS = 3
//             const expiresAt = 1000 * 60 * 60 * 24 * IN_DAYS
//             date.setTime(date.getTime() + expiresAt)
//             const options = { path: "/", expires: date }
//             cookieService.set("jwt", action.payload.jwt, options)
//             toast({
//                 title: "Logged in Successfully",
//                 description: "",
//                 status: 'success',
//                 duration: 9000,
//                 isClosable: true,
//             })
//         })
//         builder.addCase(userLogin.rejected, (state, action: PayloadAction<unknown>) => {
//             state.loading = false
//             state.data = []
//             state.error = action.payload as string
//             toast({
//                 title: action.payload.response.data.error.message || "Something went wrong", // error here
//                 description: "",
//                 status: 'error',
//                 duration: 9000,
//                 isClosable: true,
//             })
//         })
//     }
// });

// export const selectLogin = (state: RootState) => state.login
// export default loginSlice.reducer;
