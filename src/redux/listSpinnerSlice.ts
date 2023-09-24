import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '@/redux/store'

// initial spinner state
const initialState = {
  listSpinner: false,
}

// listSpinnerSlice
export const listSpinnerSlice = createSlice({
  name: 'listSpinner',
  initialState,
  reducers: {
    setListSpinner(state, action: PayloadAction<boolean>) {
      state.listSpinner = action.payload
    },
  },
})

// action selector
export const { setListSpinner } = listSpinnerSlice.actions

// state selector
export const selectListSpinner = (state: RootState) =>
  state.listSpinner.listSpinner

export default listSpinnerSlice.reducer
