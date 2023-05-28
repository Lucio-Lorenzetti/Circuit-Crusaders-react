import fetch from 'node-fetch';
import React, { useEffect, useState } from 'react';

export const Motos = ({
	allProducts,
	setAllProducts,
	countProducts,
	setCountProducts,
	total,
	setTotal,
}) => {

  const [motos, setMotos] = useState([]);
  
  useEffect(() => {
    fetch('https://circuit-crusaders-laravel-agusl1660.vercel.app/rest/motos')
      .then(response => response.json())
      .then(motos => setMotos(motos));
  }, []);

  const addToCart = (moto) => {
    if (allProducts.find(item => item.id === moto.nro_moto)) {
      const products = allProducts.map(item =>
        item.id === moto.nro_moto
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setTotal(parseFloat(total) + parseFloat(moto.monto));
      setCountProducts(countProducts + 1);
      return setAllProducts([...products]);
    }

    setTotal(parseFloat(total) + parseFloat(moto.monto));
    setCountProducts(countProducts + 1);
    setAllProducts([...allProducts, moto]);
    
  };
  

  return (
    <div>
      <div className='container-items'>
			  {motos.map(moto => (
          <div className='item' key={moto.nro_moto}>
              <div className='info-product'>
                <h2>{moto.marca} {moto.modelo} {moto.id_estilo} {moto.anio} </h2>
                <p className='price'>${moto.monto}</p>
                <button onClick={() => addToCart(moto)}>
							    Añadir al carrito
						    </button>
                </div>
          </div>  

        ))}
      </div>
      </div>
    );
}

