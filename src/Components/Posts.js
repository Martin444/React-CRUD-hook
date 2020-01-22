import React, { Fragment } from 'react';
import ProductsList from './PostList';

function Products({products, getUpdateProducts}) {
    return(
        <Fragment>
          <h1 className="text-center">Post</h1>
          <hr></hr>

          <ul className="list-group mt-5">
              {products.map(product => (
                <ProductsList 
                    key={product.id}
                    product={product}
                    getUpdateProducts={getUpdateProducts}
                />
              ))}
          </ul>  
        </Fragment>
    )
}

export default Products;