import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice/authSlice";
import cart from "./cartSlice/cartSlice"

const store = configureStore({
    reducer: {
        auth,cart
    }
})
export default store