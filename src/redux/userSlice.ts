import { createSlice } from '@reduxjs/toolkit'

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

// userSlice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMongoUser: (state, action) => {
      const user = action.payload
      state.user = user
      state.status = 'succeeded'
    },
  },
})

//action selector
export const { setMongoUser } = userSlice.actions

// state selector
export const selectUser = (state: UserState) => state.user.user
export const getUserStatus = (state: UserState) => state.user.status
export const getUserError = (state: UserState) => state.user.error

export default userSlice.reducer