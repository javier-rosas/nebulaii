import { PayloadAction, createSlice } from '@reduxjs/toolkit'

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
export const selectListSpinner = (state: { listSpinner: boolean }) =>
  state.listSpinner

export default listSpinnerSlice.reducer
