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
  estadoActual,
  setEstadoActual
}) => {
  const handleChangeEstilo = (event) => {
    setEstadoActual(event.target.value);
    localStorage.setItem('estadoActual', event.target.value); // Guardar el valor en el almacenamiento local
  };

  const [estilos, setEstilos] = useState([]);

  useEffect(() => {
    fetch('https://circuit-crusaders-laravel-agusl1660.vercel.app/rest/estilos')
      .then((response) => response.json())
      .then((estilos) => setEstilos(estilos));
  }, []);

  useEffect(() => {
    const savedEstadoActual = localStorage.getItem('estadoActual'); // Recuperar el valor del almacenamiento local
    if (savedEstadoActual) {
      setEstadoActual(savedEstadoActual);
    }
  }, []);

  return (
    <div className="left-div">
      <h2>Filtrar por estilos</h2>
      {estilos.map((estilo) => (
        <div key={estilo.nro_estilo}>
          <div>
            <button className="enlace" value={estilo.nombre} onClick={handleChangeEstilo}>
              {estilo.nombre}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
