import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name : 'searchSlice',
    initialState: {search : ''},
    reducers : {
        setSearchValue : (state,action ) => {
            state.search = action.payload;
        }
    }
})

export const {setSearchValue} = searchSlice.actions;
export default searchSlice.reducer;