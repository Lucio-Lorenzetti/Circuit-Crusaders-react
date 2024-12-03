import { useEffect, useState } from 'react';

export const FiltroEstilos = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
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

  const [estilos, setEstilos] = useState([]);

  useEffect(() => {
    fetch('https://circuit-crusaders-laravel-cjnz-agusl1660-agusl1660s-projects.vercel.app/rest/estilos')
      .then((response) => response.json())
      .then((estilos) => setEstilos(estilos));
  }, []);

  return (
    <div>
      {isDivVisible && (
        <div>
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
          </div>      
          )}
    </div>
  );
};