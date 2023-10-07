import {configureStore} from '@reduxjs/toolkit'
import searchSlice from './slices/search.slice';

const store = configureStore({
    reducer : {
        searchProduct : searchSlice,
    }
})

export default store;