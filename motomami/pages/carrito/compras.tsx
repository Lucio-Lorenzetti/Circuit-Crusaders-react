import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Header } from '../../componentes/Header';
import { Motos } from '../../componentes/Motos';
import { Confirmar } from '../../componentes/Confirmar';
import { FiltroEstilos } from '../../componentes/FiltroEstilos';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../../componentes/Footer';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
import Error404 from '../../componentes/error404';


function Compras() {
  const [allProducts, setAllProducts] = useState([]);
  const [motos, setMotos] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [isDivVisible, setDivVisible] = useState(true);
  const [id_estilo, setEstiloActual] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Página actual

  const router = useRouter();

  // Obtener el token de la URL utilizando el router
  const { token } = router.query;

  useEffect(() => {
    if (id_estilo === '') {
      fetch('https://circuit-crusaders-laravel-cjnz-w6idqpd3d-agusl1660s-projects.vercel.app/rest/motos')
        .then((response) => response.json())
        .then((motos) => setMotos(motos));
    } else {
      const obtenerMotosPorEstilo = async () => {
        try {
          fetch(`https://circuit-crusaders-laravel-cjnz-w6idqpd3d-agusl1660s-projects.vercel.app/rest/motos/estilos/${id_estilo}`)
            .then((response) => response.json())
            .then((motos) => setMotos(motos));
          setCurrentPage(1);
        } catch (error) {
          console.error(error);
        }
      };

      obtenerMotosPorEstilo();
    }
  }, [id_estilo]);
    return (
      <>
      <Head>
        <title>Motos</title>
          <link rel="icon" href="https://i.ibb.co/yV7W6Td/logomotomami.png" />
          <script src="/regist_serviceWorker.js" defer></script>
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <Header
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
                isDivVisible={isDivVisible}
                setDivVisible={setDivVisible} />
            </div>
            <div className="col-md-12 col-lg-2 col-sm-12">
              <FiltroEstilos
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                token={token} // Pasar el prop token a Confirmar
                countProducts={countProducts}
                setCountProducts={setCountProducts}
                isDivVisible={isDivVisible}
                setDivVisible={setDivVisible}
                id_estilo={id_estilo}
                setEstiloActual={setEstiloActual}
                motos={motos}
                setMotos={setMotos} />

            </div>
            <div className="col-md-12 col-lg-10 col-sm-12">
              <Motos
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
                isDivVisible={isDivVisible}
                setDivVisible={setDivVisible}
                id_estilo={id_estilo}
                setEstiloActual={setEstiloActual}
                motos={motos}
                setMotos={setMotos}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage} />
              <Confirmar
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                isDivVisible={isDivVisible}
                setDivVisible={setDivVisible}
                token={token} // Pasar el prop token a Confirmar
              />
              <ToastContainer />

            </div>

          </div>
        </div>
      <div>
          <Footer />
      </div></>
    );
 
}

export default Compras;
