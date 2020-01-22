import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button } from 'semantic-ui-react'


function ProductsList({product, getUpdateProducts}) {

    //delete product
    const deleteProduct =  id => {
        console.log('eliminando', id)
        //delete the  registry

        //alerta
        Swal.fire({
            title: '¿Estas seguro?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6ab04c',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'
          }).then(async (result) => {
              //eliminar
            if (result.value) {
            
             try {
                 //cuando confirma ejecutar el eliminar
                 const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
                
                const result = await axios.delete(url);

                if(result.status = 200) {
                    Swal.fire(
                        'Eliminado!',
                        'Este Platillo a sido eliminado.',
                        'success'
                    )
                    //consultar la api
                     getUpdateProducts(true); 
                }                             
             } catch (error) {
                 console.log(error);
                 Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Hubo un Error, vuelve a intentarlo',
                  })
             }              
            }
            
          });
        
    }
    return(
            <li data-category={product.category} className="list-group-item d-flex justify-content-between aling-items-center">
                <p>
                    <span className="font-weight-bold">{product.id}</span>
                     {' '}{product.title}
                </p>
                <div>
                    <Link
                        to={`/products/edit/${product.id}`}
                    >
                    <Button content='Editar' primary />
                    </Link>

        
                        <Button content='Eliminar'
                         secondary
                         onClick={() => deleteProduct(product.id)}
                         />
                   
                 </div>
            </li>  
    )
}

export default ProductsList;