import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import rightDrawerSlice from '../features/common/rightDrawerSlice'

const combinedReducer = {
  header : headerSlice,
  rightDrawer : rightDrawerSlice,
}

export default configureStore({
    reducer: combinedReducer
})