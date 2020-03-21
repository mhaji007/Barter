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

        }});
    } catch(error) {

    }
}