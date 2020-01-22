import React, {useState, useRef} from 'react';
import Error from '../Components/Error/Error';
import axios from 'axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';

function EditProduct(props) {

    //destructuring de props
    const {history, product, getUpdateProducts} = props;

    //generar refs
    const nameSaucerRef = useRef('');
     //validacion
     const [ error, getError ] = useState(false);
   


    const editProduct = async e => {
        e.preventDefault();
        //validacion
        const newNameSaucer = nameSaucerRef.current.value

        if(newNameSaucer === '' ){
            getError(true);
            return;
        }
         getError(false);
      

        //obtener los valores del formulario
        const editSaucer = {
            nameSaucer : newNameSaucer,       
        }
        //enviar el Request
        const url=`https://jsonplaceholder.typicode.com/posts/${product.id}`;

        try {
            //metodo put para acualizar
            const result = await axios.put(url, editSaucer);
            //al tenener un status 200 de editado podemos mostrael el msj
            if(result.status === 200) {
                Swal.fire(
                    'Producto Editado',
                    'El producto se editó correctamente',
                    'success'
                )
            }
        } catch (error) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Hubo un Error, vuelve a intentarlo',
              })
        }

        //redirigir al usuario
        getUpdateProducts(true);
        history.push('/products');
    }
    
    return(
        <div className="col-md-8 mx-auto">
        <h1 className="text-center">Editar Post</h1>
        <hr></hr>

        {(error) ? <Error message="Todos los campos son obligatorios"/> : null}

        <form 
            className="mt-5 px-5 py-2 shadow rounded"
            onSubmit={editProduct}
        >
            <div className="form-group pt-2 ">
                <label>Nombre</label>
                <input
                    type="text"
                    className="form-control rounded"
                    name="name"
                    placeholder="Nombre" 
                    ref={nameSaucerRef} 
                    defaultValue={product.nameSaucer}          
                />
            </div>

            <input type="submit" className="mb-3 col-md-12 rounded font-weight-bold text-uppercase mt-5 btn btn-success btn-block py-3" value="Editar Producto" />
        </form>
    </div> 
    )
}

export default withRouter(EditProduct);