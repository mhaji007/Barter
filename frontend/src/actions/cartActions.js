import axios from "axios";
import Cookie from "js-cookie";
import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "../constants/cartConstants";

const addToCart = (ProductId, qty) => async (dispatch) => {
    try {
        const {data} = await axios.get("/api/products/" + ProductId);
        dispatch({type:CART_ADD_ITEM, payload: {
            product:data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            name: data.countInStock,
            qty
        }
    });
    } catch(error) {
    const {cart:{cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
    }
    const removeFromCart = (productId) => (dispatch, getState) => {
        dispatch({type: CART_REMOVE_ITEM, payload: productId});

        const {cart:{cartItems}} = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    }
}
export {addToCart, removeFromCart}

export {addToCart}