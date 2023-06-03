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
    <div>
        {isDivVisible && (
    <div className="sidebar">
      <div className="centered-div" >
        
      <h3>Estilos</h3>

        {estilos.map((estilo) => (
          <div  key={estilo.nro_estilo}>
            <ul className="category-list">       
              <li><button className="filter-button" value={estilo.nro_estilo} onClick={handleChangeEstilo}>
                  {estilo.nombre}</button>
              </li>       
            </ul>
          </div>
        ))}
        <h3>Sin estilos</h3>

        <button className="filter-button" value={""} onClick={handleChangeEstilo}>
            NO FILTRAR</button>
        
      </div>
    </div>
    )}
    </div>
  );
};


