import { useState } from "react";
import styles from '../styles/Home.module.css';
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';

export const Confirmar = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
  isDivVisible,
  setDivVisible,
  token
}) => {
  initMercadoPago('TEST-aba732a4-7d7a-4d60-9616-db2740b1bd51');
  const initialization = {
      amount: total
  };
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
      const response = await fetch('https://circuit-crusaders-laravel-cjnz-agusl1660-agusl1660s-projects.vercel.app/rest/pedido', {
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
  
  
const onSubmit = async (formData) => {
    return new Promise<void>((resolve, reject) => {
      fetch("https://circuit-crusaders-laravel-cjnz-agusl1660-agusl1660s-projects.vercel.app/rest/process_payment", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.status !== null && response.status === "approved") {
            alert("El pago se realizó correctamente.");
            resolve(); // Resuelve la promesa correctamente
          } else {
            alert("El pago no pudo realizarse, inténtelo más tarde");
            reject(); // Rechaza la promesa en caso de error
          }
        })
        .catch((error) => {
          console.log(formData)
          console.log("ERROR: " + error);
          alert("Error al realizar el pago, inténtelo más tarde");
          reject(); // Rechaza la promesa en caso de error
        });
     });
    };
    const onError = async (error) => {
      // callback llamado para todos los casos de error de Brick
        console.log("ERROR: "+error);
    };
    const onReady = async () => {
        
    };
  return (
    <div>
      {!isDivVisible && (
        <div className={styles.confirmar}>
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
          <CardPayment
              initialization={initialization}
              onSubmit={onSubmit}
              onReady={onReady}
              onError={onError}
            />
            <p ></p>

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
