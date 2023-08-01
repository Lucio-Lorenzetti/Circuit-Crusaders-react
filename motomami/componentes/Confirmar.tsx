import { useState } from "react";

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
  const toggleDivVisibility = () => {
    setDivVisible(!isDivVisible);
  };

  const enviarPedido = async () => {
    const pedido = {
      motos: allProducts.map((moto) => ({
        nro_moto: moto.nro_moto,
      })),
    };
    try {
      const response = await fetch('http://127.0.0.1:8000/rest/pedido', {
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
                    <p className="order-product-name mb-0">
                      {moto.marca}
                    </p>
                    <span className="order-product-price">
                      ${moto.monto * moto.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="cart-empty">No hay pedidos para confirmar.</p>
          )}

          <button className="btn-clear-all" onClick={enviarPedido}>
            Confirmar Pedido
          </button>

          <button className="btn-clear-all" onClick={toggleDivVisibility}>
            Volver
          </button>
        </div>
      )}
    </div>
  );
};
