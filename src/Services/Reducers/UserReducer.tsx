import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginRequest, login } from '../APIs/UserAPI'

interface UserState {
    user: string | null
    loading: boolean,
    error: string | null,
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
}

export const userLogin = createAsyncThunk(
    'loginUser/status',
    async (data: LoginRequest) => {
      const response = await login(data)
      return response
    }
  )
  
export const createUserSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        logout: (state) => {
            state.user = null
            localStorage.removeItem('PhillyUser')
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state,action) => {
            state.loading = true
        })
        builder.addCase(userLogin.fulfilled, (state,action) => {
            state.loading = false
            state.user = action.payload
        })
        builder.addCase(userLogin.rejected, (state,action) => {
            state.loading = false
        })
    },
})

export const { logout } = createUserSlice.actions
export default createUserSlice.reducer;