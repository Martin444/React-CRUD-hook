import React, { useState } from 'react';
import Error from '../Components/Error/Error';
import axios from 'axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';


function AddProduct({history, getUpdateProducts}) {

    //state 
    const [ nameSaucer, getNameSaucer ] = useState('');
    //validacion
    const [error, getError ] = useState(false);

    //envio de datos del formulario
    const addProduct = async e => {
        e.preventDefault();

        if(nameSaucer === '') {
            getError(true);
            return;
        }
        getError(false);

        //create the new product
        try {
            const result = await axios.post('https://jsonplaceholder.typicode.com/posts/', {
                nameSaucer
            });
            
            //al tenener un status 201 de enviado podemos mostrael el msj
            if(result.status === 201) {
                Swal.fire(
                    'Producto Creado',
                    'El producto se creo correctamente',
                    'success'
                  )
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Hubo un Error, vuelve a intentarlo',
              })
        }

        //redirigir al usuario a productos
        getUpdateProducts(true);
        history.push('/products');
    }
    return(
        <div className="col-md-8 mx-auto">
            <h1 className="text-center">Agregar Nuevo Post</h1>
            <hr></hr>

            {(error) ? <Error message="Todos los campos son obligatorios"/> : null}

            <form 
                className="mt-5 px-5 py-2 shadow rounded"
                onSubmit={addProduct}
            >
                <div className="form-group pt-2 ">
                    <label>Nombre</label>
                    <input
                        type="text"
                        className="form-control rounded"
                        name="name"
                        placeholder="Nombre"
                        onChange={e => getNameSaucer(e.target.value)}
                    />
                </div>

                <input type="submit" className="mb-3 col-md-12 rounded font-weight-bold text-uppercase mt-5 btn btn-success btn-block py-3" value="Agregar" />
            </form>
        </div> 
    )
}

export default withRouter(AddProduct);