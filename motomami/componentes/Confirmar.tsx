import { useState } from "react";
import styles from '../styles/Home.module.css';

export const Confirmar = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
  isDivVisible,
  setDivVisible,
  token,
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
      const response = await fetch('https://circuit-crusaders-laravel-agusl1660.vercel.app/rest/pedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
        <div className={styles.confirmar}>
          {/* Mostrar la lista de pedidos aquí */}
          {allProducts.length ? (
            <div className={styles["order-list"]}>
              {allProducts.map((moto) => (
                <div className={`${styles["order-item"]} p-2 mb-3`} key={moto.cartItemId}>
                  <div className={`${styles["order-info"]} d-flex justify-content-between align-items-center`}>
                    <p className={`${styles["order-product-name"]} mb-0`}>
                      {moto.marca}
                    </p>
                    <span className={styles["order-product-price"]}>
                      ${moto.monto * moto.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles["cart-empty"]}>No hay pedidos para confirmar.</p>
          )}

          <div className={`${styles['buttons-container']} mt-3`}>
            <button className={`${styles['button']} ${styles['button-left']}`} onClick={enviarPedido}>
              Confirmar Pedido
            </button>
            <button className={`${styles['button']} ${styles['button-right']}`} onClick={toggleDivVisibility}>
              Volver
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
