import { useState } from "react";
//import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';

export const Confirmar = ({allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
  isDivVisible,
  setDivVisible,
  token, // Agregar el prop token
}) => {
 // initMercadoPago('TEST-d9fbc7c1-c76a-4e0a-bcd0-2a74330f9401');

  const toggleDivVisibility = () => {
    setDivVisible(!isDivVisible);
  };

  const pagar = async (formData) => {
    return new Promise((resolve, reject) => {
        fetch("https://garcia-sanchez-laravel-genaro08.vercel.app/rest/process_payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((response) => {
            if(response.status !== null && response.status == "approved"){
                alert("El pago se realizó correctamente.");
                enviarPedido();
            }else{
                alert("El pago no pudo realizarse, intentelo mas tarde");
            }
            
        })
        .catch((error) => {
            console.log("ERROR: "+error);
            // manejar la respuesta de error al intentar crear el pago
            alert("Error al realizar el pago, intentelo mas");
        });
    });
    };


  const enviarPedido = async () => {
    const pedido = {
      motos: allProducts.map((moto) => ({
        nro_moto: moto.nro_moto,
      })),
    };
    try {
      const response = await fetch('https://circuit-crusaders-laravel-agusl1660.vercel.app/rest/pedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Agregar el token a la cabecera de la solicitud
        },
        body: JSON.stringify(pedido),
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
        <div className="confirmar">
          {/* Mostrar la lista de pedidos aquí */}
          {allProducts.length ? (
            <div className="order-list">
              {allProducts.map((moto) => (
                <div className="order-item p-2 mb-3" key={moto.cartItemId}>
                  <div className="order-info d-flex justify-content-between align-items-center">
                    <p className="order-product-name mb-0 col-lg-4 ">
                      {moto.marca}
                    </p>
                    <span className="order-product-price col-lg-4 ">
                      ${moto.monto * moto.quantity}
                    </span>
                    <img
                        src={`data:image/jpeg;base64,${moto.foto}`}
                        className='product-image col-lg-4 '
                        alt='Imagen de la moto'
                      />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="cart-empty">No hay pedidos para confirmar.</p>
          )}

          <button className="btn-clear-all col-lg-4 " onClick={enviarPedido}>
            Confirmar Pedido
          </button>

          <button className="btn-clear-all col-lg-4 " onClick={toggleDivVisibility}>
            Volver
          </button>
        </div>
      )}
    </div>
  );
};
