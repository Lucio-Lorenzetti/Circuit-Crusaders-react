import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Motos = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
  isDivVisible,
  setDivVisible,
  setEstiloActual,
  id_estilo,
  motos,
  setMotos,
  currentPage,
  setCurrentPage
}) => {
  const itemsPerPage = 9; // Cantidad de elementos por página
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = motos.slice(indexOfFirstItem, indexOfLastItem);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    const maxPage = Math.ceil(motos.length / itemsPerPage);
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const placeholderImage =
    'https://www.yodot.com/blog/wp-content/uploads/2019/08/error-loading-media-1024x581.png'; //Imagen por defecto por si se llega a dejar de funcionar algún link de imagen de alguna moto


  const addToCart = (moto) => {
    setTotal((prevTotal) => parseFloat(prevTotal) + parseFloat(moto.monto));
    setCountProducts((prevCount) => prevCount + 1);
    setAllProducts([
      ...allProducts,
      { ...moto, quantity: 1, cartItemId: Date.now() } // Agregar un identificador único para cada compra de moto
    ]);
  };

  return (
    <div>
      {isDivVisible && (
        <><div className="row">
          {motos.length === 0 ? (
            <p>No hay motos disponibles.</p>
          ) : (
            currentItems.map((moto) => (
              <div className='col-md-6 col-lg-4 col-sm-12' key={moto.nro_moto}>
                  <div className='item'>
                    <div className='info-product'>
                      <h2>{moto.modelo}</h2>
                      <img src={moto.foto_url || placeholderImage} className='product-image' />
                      <p className='price'>${moto.monto}</p>
                      <button onClick={() => addToCart(moto)}>Añadir al carrito</button>
                    </div>
                  </div>
                </div>
            ))
          )}
        </div>{motos.length !== 0 && (
        <div className="pagination-container">
          <button className="pagination-button" onClick={handlePreviousPage}>Anterior</button>
          <span className="pagination-text">Página {currentPage}</span>
          <button className="pagination-button" onClick={handleNextPage}>Siguiente</button>
        </div>
      )}</> 
      )}

     
    </div>
  );
  
};
