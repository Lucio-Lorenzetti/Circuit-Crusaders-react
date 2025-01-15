import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';

initMercadoPago('APP_USR-121db433-4417-489d-8318-4d4710c71b46');

export const Confirmar = ({
  allProducts,
  setAllProducts,
  isDivVisible,
  setDivVisible,
  token,
}) => {
  const [preferenceId, setPreferenceId] = useState(null);
  const router = useRouter();

  const successUrl = `http://localhost:3000/carrito/compras?token=${encodeURIComponent(token)}`;

  const createPreference = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/rest/process_payment', {
        items: allProducts.map(({ marca, quantity, monto }) => ({
          title: marca,
          quantity,
          unit_price: monto,
        })),
        back_urls: {
          success: successUrl
        },
      });

      setPreferenceId(response.data.id);
    } catch (error) {
      console.error('Error al crear la preferencia:', error);
      alert('Hubo un problema al generar la preferencia. Inténtalo nuevamente.');
    }
  };

  const enviarPedido = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/rest/pedido',
        {
          motos: allProducts.map(({ nro_moto }) => ({ nro_moto })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert('El pedido se realizó correctamente.');
        setAllProducts([]); // Limpiar estado local
      }
    } catch (error) {
      console.error('Error en enviarPedido:', error);
      alert('Hubo un problema al procesar tu pedido.');
    }
  };

  useEffect(() => {
    const storedProducts = localStorage.getItem('allProducts');
    if (storedProducts) {
      setAllProducts(JSON.parse(storedProducts));
    }
  }, [setAllProducts]);

  useEffect(() => {
    // Verificar que `router.query` esté disponible y tenga el estado
    if (router.isReady) {
      const query = new URLSearchParams(router.asPath.split('?')[1]);
      const status = query.get('status'); // Obtener el estado del pago

      if (status === 'approved') {
        enviarPedido(); 
        router.push(`/carrito/compras?token=${encodeURIComponent(token)}`); // Redirigir manteniendo el token
      
      }
    }
  }, [router.isReady, router.asPath]);

  return (
    <div>
      {!isDivVisible && (
        <div className={styles.confirmar}>
          {allProducts.length > 0 ? (
            <div className={styles['order-list']}>
              {allProducts.map(({ marca, monto, quantity, cartItemId }) => (
                <div className={`${styles['order-item']} p-2 mb-3`} key={cartItemId}>
                  <div
                    className={`${styles['order-info']} d-flex justify-content-between align-items-center`}
                  >
                    <p className={`${styles['order-product-name']} mb-0`}>{marca}</p>
                    <span className={styles['order-product-price']}>
                      ${monto * quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles['cart-empty']}>No hay pedidos para confirmar.</p>
          )}

          <div className={`${styles['buttons-container']} mt-3`}>
            {preferenceId ? (
              <Wallet initialization={{ preferenceId }} />
            ) : (
              <button
                className={`${styles['button']} ${styles['button-left']}`}
                onClick={createPreference}
              >
                Comprar
              </button>
            )}
            <button
              className="pagination-button"
              onClick={() => setDivVisible(!isDivVisible)}
            >
              Volver
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Confirmar;
