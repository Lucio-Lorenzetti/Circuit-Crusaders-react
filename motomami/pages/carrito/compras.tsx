import { useState } from 'react';
import { Header } from '../../componentes/Header';
import { Motos } from '../../componentes/Motos';
import { Confirmar } from '../../componentes/Confirmar';
import { FiltroEstilos } from '../../componentes/FiltroEstilos';


function Compras() {
	const [allProducts, setAllProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [countProducts, setCountProducts] = useState(0);
	const [isDivVisible, setDivVisible] = useState(true);
	const [estiloActual, setEstiloActual] = useState('');


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
				estadoActual={estiloActual}
				setEstadoActual={setEstiloActual}
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
				estiloActual={estiloActual}
				setEstiloActual={setEstiloActual}
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