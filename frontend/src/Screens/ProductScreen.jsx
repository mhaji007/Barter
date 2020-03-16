import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {detailsProduct} from '../actions/productActions';

function ProductScreen(props) {
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const{product, loading, error} = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {
    
        };
    }, [])

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
    }
    
    return <div>

        <div className="back-to-results">
            <Link to="/">Back to result</Link>

        </div>
        {loading? <div>loading...</div>:
        error?<div>{error}</div>:
        <div className="details">
            <div className="details-image">
                <img src={product.image} alt="product"/>
            </div>
            <div className="details-info">
                <ul>
                    <li><h4>
                        {product.name}
                        </h4>
                        </li>
<li>{product.reating} Stars ({product.numReviews}) Reviews</li>
                <li>
                    <b>Price: ${product.price}</b>
                </li>
                <li>
                    Description:
                    <div>
                        {product.description}
                    </div>
                </li>
                </ul>
            </div>
            <div className="details-action">
                <ul>
                    <li>
                        Price: {product.price}
                    </li>
                    <li>
                        Status: {product.countInStock>0?"In Stock":""}
                    </li>
                    <li>
                        Qty: <select value={qty} onChange={(e)=>{setQty(e.target.value)}} name="">
                            {[...Array(product.countInStock).keys()].map(x=>
                            <option value={x+1}>{x+1}</option>
                            )}
                    
                        </select>
                    </li>
                    <li> {product.countInStock>0 ? <button onClick={handleAddToCart} className="button primary">Add to Cart</button>: <div>Out of Stock</div>}

                    </li>
                </ul>
            </div>
        </div>
        }
        
        
    </div>
}

export default ProductScreen;


