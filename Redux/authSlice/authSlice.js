import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedin: false,
    email: null,
    useName: null,
    cart: null,
    img: null,
    user:false,
    id:false,
    control:false
}
const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_ACTICE_USER: (state, action) => {
            state.isLoggedin = true 
            state.email = action.payload.email
            state.useName = action.payload.name
            state.cart = action.payload.cart
            state.fav = action.payload.fav
            state.img = action.payload.img
            state.id = action.payload.id
            if(action.payload.control){
                state.control = action.payload.control
            }
        },
        REMOVE_ACTICE_USER: (state, action) => {
            state.isLoggedin = false
            state.email = null
            state.useName = null
            state.cart = null
            state.fav = null
            state.id = null
            state.img = null
            state.control = null
        },
    }
})
export let { SET_ACTICE_USER, REMOVE_ACTICE_USER} = auth.actions
export default auth.reducer