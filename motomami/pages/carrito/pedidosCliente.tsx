import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Pedidos() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de motos por página
  const router = useRouter();
  const { token } = router.query; // Obtener el token de la URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://circuit-crusaders-laravel-cjnz-agusl1660-agusl1660s-projects.vercel.app/rest/historial', {
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

  // Calcular las motos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Manejar cambios de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };
  const handleVolverAMotos = () => {
    window.history.back()
  };
  const handleNextPage = () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

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
                <button onClick={handleVolverAMotos} className={`${styles['button']}`}  style={{ position: 'absolute', right: '0' }}>Ir a nuestras motos</button>

              </tr>
            </thead>
          </table>
        ) : (
          <>
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
                {currentItems.map((item, index) => (
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

            <div className={styles.pagination}>
              <div className={styles.buttonContainer}>
                <button className={styles['button']} onClick={handlePreviousPage} disabled={currentPage === 1}>
                  Anterior
                </button>
              </div>
              {/*<span>{currentPage} de {Math.ceil(data.length / itemsPerPage)}</span>*/}
              <div className={styles.buttonContainer}>
                <button className={styles['button']} onClick={handleNextPage} disabled={currentPage === Math.ceil(data.length / itemsPerPage)}>
                  Siguiente
                </button>
              </div>
              <button onClick={handleVolverAMotos} className={`${styles['button']}`}  style={{ position: 'absolute', right: '0' }}>Ir a nuestras motos</button>

            </div>
            
          </>
        )}
      </div>
     
    </div>
    
  );
}

export default Pedidos;
