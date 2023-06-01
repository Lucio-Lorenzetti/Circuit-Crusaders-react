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
    setEstiloActual(event.target.value);
  };
  
  const [estilos, setEstilos] = useState([]);

  useEffect(() => {
    fetch('https://circuit-crusaders-laravel-agusl1660.vercel.app/rest/estilos')
      .then((response) => response.json())
      .then((estilos) => setEstilos(estilos));
  }, []);

  return (
    <div className="left-div">
      <h2>Filtrar por estilos</h2>
      {estilos.map((estilo) => (
        <div key={estilo.nro_estilo}>
          <div>
            <button className="enlace" value={estilo.nro_estilo} onClick={handleChangeEstilo}>
              {estilo.nombre}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};


