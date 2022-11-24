import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IUserInfo } from './type'

const initialState: IUserInfo = {
  avatar: '',
  userId: '',
  token: '',
  isLogged: false,
  email: ''
}

export const userInfoSlice = createSlice({
  name: 'userInfoReducer',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
        return {
            ...state,
            ...action.payload
        }
    },
  },
})
export const { setUserInfo } = userInfoSlice.actions
export const userInfoState = (state: RootState) => state.userInfoReducer
export default userInfoSlice.reducer
