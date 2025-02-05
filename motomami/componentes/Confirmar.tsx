import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

  const urlBack = `https://circuit-crusaders-react-agusl1660-agusl1660s-projects.vercel.app/carrito/compras?token=${encodeURIComponent(token)}`;

  const createPreference = async () => {
    try {
      localStorage.setItem("productosPendientes", JSON.stringify(allProducts)); // Guardar en localStorage

      const response = await axios.post('https://circuit-crusaders-laravel-cjnz-w6idqpd3d-agusl1660s-projects.vercel.app/rest/process_payment', {
        items: allProducts.map(({ marca, quantity, monto }) => ({
          title: marca,
          quantity,
          unit_price: monto,
        })),
        back_urls: {
          success: urlBack,
          failure: urlBack,
          pending: urlBack,
        },
      });

      setPreferenceId(response.data.id);
    } catch (error) {
      console.error('Error al crear la preferencia:', error);
    }
  };

  const enviarPedido = async (productos) => {
    const pedido = {
      motos: productos.map((moto) => ({
        nro_moto: moto.nro_moto,
      })),
    };
  
    try {
      const response = await fetch('https://circuit-crusaders-laravel-cjnz-w6idqpd3d-agusl1660s-projects.vercel.app/rest/pedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Usar `` para interpolar el token
        },
        body: JSON.stringify(pedido),
      });
      
      if (response.status === 200) {
        toast.success('La compra se realizó correctamente.');
        setAllProducts([]); // Limpiar estado local
      }
    } catch (error) {
      console.error('Error en enviarPedido:', error);
      toast.error('Hubo un problema al procesar tu compra.');
    }
  };
  
  useEffect(() => {
    const storedProducts = localStorage.getItem('allProducts');
    if (storedProducts) {
      setAllProducts(JSON.parse(storedProducts));
    }
    console.log('allProducts:', allProducts);
  }, [setAllProducts]);
  
  useEffect(() => {
    // Verificar que `router.query` esté disponible y tenga el estado
    if (router.isReady) {
      const query = new URLSearchParams(router.asPath.split('?')[1]);
      const status = query.get('status'); // Obtener el estado del pago
  
      if (status === 'approved') {
        const productosGuardados = localStorage.getItem("productosPendientes");
        if (productosGuardados) {
          setAllProducts(JSON.parse(productosGuardados)); // Restaurar productos
          enviarPedido(JSON.parse(productosGuardados)); // Pasar productos a enviarPedido()
          localStorage.removeItem("productosPendientes"); // Limpiar después del uso
        }
      }
    }
  }, [router.isReady, router.asPath, token]); // Agregar token a las dependencias del useEffect
  

  return (
    <div>
      {!isDivVisible && (
        <div className={styles.confirmar}>
          <div className="filter-container">

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
            <div className="table-container">
                <div>
                  {preferenceId ? (
                    <Wallet initialization={{ preferenceId }} />
                  ) : (
                    <button
                      className="filter-button"
                      onClick={createPreference}
                    >
                      Comprar
                    </button>
                  )}
                </div>
                <div>
                  <button
                    className="filter-button"
                    onClick={() => setDivVisible(!isDivVisible)}
                  >
                    Volver
                  </button>
                </div>
            </div>
            </div>

        </div>
      )}
    </div>
  );
};