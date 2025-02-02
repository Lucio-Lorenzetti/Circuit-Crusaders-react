import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Head from 'next/head';

function Pedidos() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Para mostrar un estado de carga
  const itemsPerPage = 5; // Número de motos por página
  const router = useRouter();
  const { token } = router.query; // Obtener el token de la URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) return; // Esperar hasta que el token esté disponible
        const response = await fetch(
          'https://circuit-crusaders-laravel-cjnz-agusl1660-agusl1660s-projects.vercel.app/rest/historial',
          {
            headers: {
              Authorization: `Bearer ${token}`, // Agregar el token a la cabecera de la solicitud
            },
          }
        );
        const responseData = await response.json();
        setData(responseData.data || []); // Manejar el caso en que `data` sea undefined
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Marcar como cargado
      }
    };

    fetchData();
  }, [token]);

  const imagenesCarrusel = [
    {
      src: "https://cdn.shopify.com/s/files/1/0608/7819/2888/files/kawasaki-ninja-2023.jpg?v=1674124860.jpg",
      alt: "Imagen 1"
    },
    {
      src: "https://www.mundodeportivo.com/files/image_948_465/uploads/2022/06/28/6554d77d1ce37.jpeg",
      alt: "Imagen 2"
    },
    {
      src: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D.jpg",
      alt: "Imagen 3"
    },
    {
      src: "https://images.unsplash.com/photo-1625677797043-42cc0255f62f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZW5kdXJvfGVufDB8fDB8fHww.jpg",
      alt: "Imagen 4"
    },
    {
      src: "https://andromedamoto.com/cdn/shop/articles/bmw-r-ninet-racer_83298855-cef8-44e7-b1f7-4de388c5b11e.jpg?v=1650974199.jpg",
      alt: "Imagen 5"
    },
    {
      src: "https://s1.abcstatics.com/media/summum/2019/10/04/bike-biker-cafe-racer-2549942-k0AH--1248x698@abc.jpg",
      alt: "Imagen 6"
    },
    {
      src: "https://motor.elpais.com/wp-content/uploads/2022/06/alquilar-moto-verano-1-1046x616.jpg",
      alt: "Imagen 7"
    }
  ];
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

  const handleNextPage = () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleVolverAMotos = () => {
    window.history.back();
  };

  // Mostrar un estado de carga mientras se obtienen los datos
  if (isLoading) {
    return <div className={styles.container}>Cargando...</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Pedidos</title>
          <link rel="icon" href="https://i.ibb.co/yV7W6Td/logomotomami.png" />
          <script src="/regist_serviceWorker.js" defer></script>
          <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className={styles.carousel}>
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          showStatus={false}
          interval={5000}
          emulateTouch
          useKeyboardArrows
        >
          {imagenesCarrusel.map((imagen, index) => (
            <div key={index}>
              <img src={imagen.src} alt={imagen.alt} />
            </div>
          ))}
        </Carousel>
      </div>

      <div className={styles.overlay}>
        <div className={`${styles['table-container']} ${styles['translucent-background']}`}>
          {data.length === 0 ? (
            <div>
              <p>Usted no ha realizado ningún pedido.</p>
              <button
                onClick={handleVolverAMotos}
                className="filter-button"
                style={{ position: 'absolute', right: '0' }}
              >
                Ir a nuestras motos
              </button>
            </div>
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
                      <td>
                        {item.moto.marca} - {item.moto.modelo}
                      </td>
                      <td>{item.moto.anio}</td>
                      <td>{item.moto.cilindrada}</td>
                      <td>{item.moto.monto}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pagination-container">
                <button
                  className="pagination-button"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>
                <button
                  className="pagination-button"
                  onClick={handleNextPage}
                  disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
                >
                  Siguiente
                </button>
              </div>
              <div style={{ display: 'flex', marginTop: '20px' }}>
                <button onClick={handleVolverAMotos} className="filter-button">
                  Ir a nuestras motos
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pedidos;
