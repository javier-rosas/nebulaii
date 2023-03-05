import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authenticateUser } from '@/services/userService'

type UserState = {
  user: any
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

// initial user state
const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
}

// authenticate User
export const apiAuthenticateUser = createAsyncThunk(
  'user/authenticate',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await authenticateUser(payload)
      return response
    } catch (e: any) {
      if (!e.response) throw e
      return rejectWithValue(e.response.data)
    }
  }
)

// userSlice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(apiAuthenticateUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(apiAuthenticateUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        console.log("slice action payload", action.payload)
        localStorage.setItem('user_token', action.payload)
      })
      .addCase(apiAuthenticateUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
  },
})

// state selector
export const selectUser = (state: UserState) => state.user.user
export const getUserStatus = (state: UserState) => state.user.status
export const getUserError = (state: UserState) => state.user.error

export default userSlice.reducer
