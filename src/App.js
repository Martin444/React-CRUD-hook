import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//import components
import Products from './Components/Posts';
import AddProduct from './Components/AddPost';
import EditProduct from './Components/EditPost';
import Product from './Components/Post';
import Header from './Components/Header/Header';
//axios
import axios from 'axios';

function App() {
  
  //state of products 
  const [ products, getProducts ] = useState([]);
  const [ updateProducts, getUpdateProducts ] = useState(true);

  useEffect(() => {

      //actualizar
      if(updateProducts) { 
        const consultApi = async () => {
        //consultar la api de json-server
        const result = await axios.get('https://jsonplaceholder.typicode.com/posts');

        //lo guardamos en la lista
        getProducts(result.data); 
      }
      consultApi();
      //cambiar a false la actualizacion de producto
      getUpdateProducts(false);
    }    
  }, [updateProducts]);

  return (
    <div className="App">
         <Router>
            <Header/>
            <main className="container mt-5">
              <Switch>
                  <Route exact path="/post" 
                         render={() => (
                            <Products
                              products={products}
                              getUpdateProducts={getUpdateProducts} 
                            />
                         )}
                   />
                  <Route exact path="/new-post" 
                         render={() => (
                            <AddProduct 
                             getUpdateProducts={getUpdateProducts}
                            />
                   )}/>
                  <Route exact path="/post/:id" component={Product} />
                  <Route exact path="/post/edit/:id" 
                         render={props =>{
                           //tomar el id del producto
                           const idProduct = parseInt(props.match.params.id);
                           //el producto qe se pasa al state
                           const product = products.filter(product => product.id === idProduct);
                           
                           return(
                             <EditProduct
                               product={product[0]}
                               getUpdateProducts={getUpdateProducts}
                             />
                           )
                   }} />
              </Switch>
            </main>
         </Router>
    </div>
  );
}

export default App;
