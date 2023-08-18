import { createSlice } from '@reduxjs/toolkit'
import { User } from '@/types/User'

type UserState = {
  user: User | null
}

// initial user state
const initialState: UserState = {
  user: null,
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
      state.user = action.payload
    },
  },
})

//action selector
export const { setMongoUser } = userSlice.actions

// state selector
export const selectUser = (state: UserState) => state?.user

export default userSlice.reducer
