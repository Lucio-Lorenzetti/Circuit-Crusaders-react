import fetch from 'node-fetch';
import React, { useEffect, useState } from 'react';

function Motos() {
  const [motos, setMotos] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetch('https://circuit-crusaders-laravel-agusl1660.vercel.app/rest/motos')
      .then(response => response.json())
      .then(motos => setMotos(motos));
  }, []);

  const addToCart = (product) => {
    if (allProducts.find(item => item.id === product.id)) {
      const products = allProducts.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setTotal(total + product.price * product.quantity);
      setCountProducts(countProducts + product.quantity);
      return setAllProducts([...products]);
    }

    setTotal(total + product.price * product.quantity);
    setCountProducts(countProducts + product.quantity);
    setAllProducts([...allProducts, product]);
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

export default Motos;
