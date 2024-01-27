import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Pedidos() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { token } = router.query; // Obtener el token de la URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/rest/historial', {
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
    <div className={styles['index-container']}>
        <Carousel
          className={styles['background-carousel']}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
          transitionTime={2000} 
        >
          <div>
            <img src="https://cdn.shopify.com/s/files/1/0608/7819/2888/files/kawasaki-ninja-2023.jpg?v=1674124860.jpg" alt="Imagen 1" />
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D.jpg" alt="Imagen 2" />
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1625677797043-42cc0255f62f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZW5kdXJvfGVufDB8fDB8fHww.jpg" alt="Imagen 3" />
          </div>
          <div>
            <img src="https://andromedamoto.com/cdn/shop/articles/bmw-r-ninet-racer_83298855-cef8-44e7-b1f7-4de388c5b11e.jpg?v=1650974199.jpg" alt="Imagen 4" />
          </div>
          <div>
            <img src="https://exclusivomotos.com/wp-content/uploads/2021/07/KTM-RC-8C.jpg" alt="Imagen 5" />
          </div>
          <div>
            <img src="https://motor.elpais.com/wp-content/uploads/2022/06/alquilar-moto-verano-1-1046x616.jpg" alt="Imagen 6" />
          </div>
        </Carousel>      
      
      <div className={`${styles['table-container']} ${styles['translucent-background']}`}>
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
      </div>
  );
}

export default Pedidos;
