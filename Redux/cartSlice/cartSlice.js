import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    num: false,
    price:false,
    favProducts :false
}
const cart = createSlice({
    name: "cart",
    initialState,
    reducers: {
        SET_NUM_CARD: (state, action) => {
            state.num = action.payload.num
            state.price = Math.round(action.payload.price) 
        },
        SET_FAVOURITE: (state, action) => {
            state.favProducts = action.payload
            
        },
    }
})
export let { SET_NUM_CARD ,SET_FAVOURITE} = cart.actions
export default cart.reducer