import { useState } from 'react';
import { Header } from '../../componentes/Header';
import { Motos } from '../../componentes/Motos';
import { Confirmar } from '../../componentes/Confirmar';

function Compras() {
	const [allProducts, setAllProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [countProducts, setCountProducts] = useState(0);
	const [isDivVisible, setDivVisible] = useState(true);


	return (
		<>
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