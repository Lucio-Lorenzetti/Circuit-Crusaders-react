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
    const toggleDivVisibility = () => {
      setDivVisible(!isDivVisible);
    };
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
        const response = await fetch('https://circuit-crusaders-laravel-agusl1660.vercel.app/rest/pedido', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(pedido)
        });

        if (response.ok) {
          alert('El pedido se hizo correctamente.');
          toggleDivVisibility();

        } else {
          alert('No se pudo enviar el pedido. Por favor, inténtelo nuevamente.');

        }
      } catch (error) {
        alert('No se pudo enviar el pedido. Por favor, inténtelo nuevamente.');

      }
    };

  


    return (
      <div>
        {!isDivVisible && (

        <><div className="confirmar">
            <p><h3 className="confirmar-text">Ingrese su email</h3></p>

            <input className="confirmar-input"type="text" name="email" id="email" value={email} onChange={handleInputChange} />
            <button className="confirmar-button" onClick={enviarPedido}>Enviar Pedido</button>


          </div><div className="pagination-container">
              <button className="pagination-button" onClick={toggleDivVisibility}>Volver</button>
            </div></>
        )}
      </div>
    );

    
};


