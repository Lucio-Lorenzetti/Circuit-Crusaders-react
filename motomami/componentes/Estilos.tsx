import Link from "next/link";
import { useEffect, useState } from "react";

export const FiltroEstilos = ({
	allProducts,
	setAllProducts,
	total,
	countProducts,
	setCountProducts,
	setTotal,
	isDivVisible,
	setDivVisible,
}) => {
    const [estilos, setEstilos] = useState([]);

    useEffect(() => {
    fetch('https://circuit-crusaders-laravel-agusl1660.vercel.app/rest/motos/estilos/{id_estilo}')
      .then((response) => response.json())
      .then((estilos) => setEstilos(estilos));
    }, []);
    return (
        
    );
  
      
  };