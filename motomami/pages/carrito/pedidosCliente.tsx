import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';

function Pedidos() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { token } = router.query; // Obtener el token de la URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://circuit-crusaders-laravel-agusl1660.vercel.app/rest/historial', {
          headers: {
            Authorization: `Bearer ${token}` // Agregar el token a la cabecera de la solicitud
          }
        });
        const responseData = await response.json();
        setData(responseData.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <div className={styles["table-container"]}>
      {data.length === 0 ? (
        <table>
          <thead>
            <tr>
              <th>Usted no ha realizado ningún pedido</th>
            </tr>
          </thead>
        </table>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Moto</th>
              <th>Año</th>
              <th>Cilindrada</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.fecha_pedido}</td>
                <td>{item.moto.marca} - {item.moto.modelo}</td>
                <td>{item.moto.anio}</td>
                <td>{item.moto.cilindrada}</td>
                <td>{item.moto.monto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Pedidos;
