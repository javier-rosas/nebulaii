import { createSlice } from '@reduxjs/toolkit'
import { User } from "@/types/User"

type UserState = {
  user: User | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

// initial user state
const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
}

type ActionType = {
  payload: User
}
// userSlice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMongoUser: (state: UserState, action: ActionType) => {
      const user = action.payload
      state.user = user
    },
    resetMongoUser: (state: UserState, action) => {
      state.user = null
    }
  },
})

//action selector
export const { setMongoUser } = userSlice.actions
export const { resetMongoUser } = userSlice.actions


// state selector
export const selectUser = (state: UserState) => state?.user
export const getUserStatus = (state: UserState) => state?.status
export const getUserError = (state: UserState) => state?.error

export default userSlice.reducer