import { useState } from "react";

export const Confirmar = ({
	allProducts,
	setAllProducts,
	total,
	countProducts,
	setCountProducts,
	setTotal,
  isDivVisible,
	setDivVisible,
  
}) => {
    const [email, setEmail] = useState('');

    const handleInputChange = (event) => {
      setEmail(event.target.value);
    };

    const enviarPedido = async () => {
      const pedido = {
        email: email,
        motos: allProducts.map(moto => ({
           nro_moto:moto.nro_moto
        })) 
    };
      try {
        const response = await fetch('http://localhost/Circuit-Crusaders-laravel/public/rest/pedido', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(pedido)
        });

        if (response.ok) {
          // El pedido se ha enviado correctamente
          // Realiza las acciones necesarias
        } else {
          // Ocurrió un error al enviar el pedido
          // Realiza las acciones necesarias
        }
      } catch (error) {
        // Ocurrió un error en la solicitud
        // Realiza las acciones necesarias
      }
    };

  


    return (
      <div>
        {!isDivVisible && (

        <div className='container-items'>
          <h3>Ingrese su email</h3>
          <input type="text" name="email" id="email" value={email} onChange={handleInputChange} />
          <button onClick={enviarPedido}>Enviar Pedido</button>

        </div>
        )}
      </div>
    );

    
};


