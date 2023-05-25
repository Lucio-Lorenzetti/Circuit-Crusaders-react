import fetch from 'node-fetch';
import React, { useEffect, useState } from 'react';

function Motos() {
  const [motos, setMotos] = useState([]);

  useEffect(() => {
    fetch('https://circuit-crusaders-laravel-agusl1660.vercel.app/rest/motos')
      .then(response => response.json())
      .then(motos => setMotos(motos));
  }, []);
  

  return (
    <div>
      <h2>Motos</h2>
      <ul>
        {motos.map(moto => (
          <li key={moto.nro_moto}>
            <h3>{moto.marca}</h3>
            <p>Modelo: {moto.modelo}</p>
            <p>Año: {moto.anio}</p>
            <p>Cilindrada: {moto.cilindrada}</p>
            <p>Patente: {moto.patente}</p>
            <p>Estilo: {moto.id_estilo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Motos;
