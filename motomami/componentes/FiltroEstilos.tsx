import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


export const FiltroEstilos = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
  token,
  isDivVisible,
  setDivVisible,
  id_estilo,
  setEstiloActual,
  motos,
  setMotos
}) => {
  const handleChangeEstilo = (event) => {
    const estiloSeleccionado = event.target.value;
    setEstiloActual(estiloSeleccionado);
  };
  const router = useRouter();

  const [estilos, setEstilos] = useState([]);
const handleRecuperarPedidos = () => {
    router.push({
      pathname: '/carrito/pedidosCliente',
      query: { token: token },
    });
  };

  const handlePedirRecomendacion = () => {
    router.push({
      pathname: '../recomendacion/recomendarMoto',
    });
  };

  useEffect(() => {
    fetch('https://circuit-crusaders-laravel-cjnz-w6idqpd3d-agusl1660s-projects.vercel.app/rest/estilos')
      .then((response) => response.json())
      .then((estilos) => setEstilos(estilos));
  }, []);

  return (
    <div className="filter-container">
      {isDivVisible && (
        <>
        
          <div className="filter-title">Filtrar por Estilo</div>
            {estilos.map((estilo) => (
              <div key={estilo.nro_estilo}>  
                <button
                  className={`d-flex justify-content-center filter-button ${
                    estilo.nro_estilo === parseInt(id_estilo) ? 'active' : ''}`}
                  value={estilo.nro_estilo}
                  onClick={handleChangeEstilo}
                >
                  {estilo.nombre}
                </button> 
              </div>
            ))}
            <button
              className={`d-flex justify-content-center filter-button ${id_estilo === '' ? 'active' : ''}`}
              value=""
              onClick={handleChangeEstilo}
            >
              LIMPIAR FILTROS
            </button>
            
        </>    
      )}
      <button className={`d-flex justify-content-center filter-button`}
              value="" onClick={handleRecuperarPedidos}>RECUPERAR PEDIDOS
            </button>
            <button className={`d-flex justify-content-center filter-button`}
              value="" onClick={handlePedirRecomendacion}>PEDIR RECOMENDACIÓN
            </button>
    </div>
  );
};