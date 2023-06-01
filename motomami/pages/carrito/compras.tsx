import { useEffect, useState } from 'react';
import { Header } from '../../componentes/Header';
import { Motos } from '../../componentes/Motos';
import { Confirmar } from '../../componentes/Confirmar';
import { FiltroEstilos } from '../../componentes/FiltroEstilos';
import axios from 'axios';


function Compras() {
	const [allProducts, setAllProducts] = useState([]);
	const [motos, setMotos] = useState([]);
	const [total, setTotal] = useState(0);
	const [countProducts, setCountProducts] = useState(0);
	const [isDivVisible, setDivVisible] = useState(true);
	const [id_estilo, setEstiloActual] = useState("");


	useEffect(() => {
		if (id_estilo === "") {
		  	fetch('https://circuit-crusaders-laravel-agusl1660.vercel.app/rest/motos')
			.then((response) => response.json())
			.then((motos) => setMotos(motos));
		} else {
		  const obtenerMotosPorEstilo = async () => {
			try {
				fetch(`https://circuit-crusaders-laravel-agusl1660.vercel.app/rest/motos/estilos/${id_estilo}`)
				.then((response) => response.json())
				.then((motos) => setMotos(motos));
				
			} catch (error) {
			  console.error(error);
			  // Manejo de errores
			}
		  };
	  
		  obtenerMotosPorEstilo();
		}
	  }, [id_estilo]);
	  
  
	return (
		<>
			<FiltroEstilos
				allProducts={allProducts}
				setAllProducts={setAllProducts}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}
				isDivVisible={isDivVisible}
				setDivVisible={setDivVisible}
				id_estilo={id_estilo}
				setEstiloActual={setEstiloActual}
				motos={motos}
				setMotos={setMotos}
			 /> 
			

			<Header
				allProducts={allProducts}
				setAllProducts={setAllProducts}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}
				isDivVisible={isDivVisible}
				setDivVisible={setDivVisible}
			/>
			<Motos
				allProducts={allProducts}
				setAllProducts={setAllProducts}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}
				isDivVisible={isDivVisible}
				setDivVisible={setDivVisible}
				id_estilo={id_estilo}
				setEstiloActual={setEstiloActual}
				motos={motos}
				setMotos={setMotos}
			/>
            <Confirmar
				allProducts={allProducts}
				setAllProducts={setAllProducts}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}
				isDivVisible={isDivVisible}
				setDivVisible={setDivVisible}
			/>
		</>
	);
}

export default Compras;