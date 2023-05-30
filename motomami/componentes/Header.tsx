import { useState } from 'react';

export const Header = ({
	allProducts,
	setAllProducts,
	total,
	countProducts,
	setCountProducts,
	setTotal,
	isDivVisible,
	setDivVisible,
}) => {
	const [active, setActive] = useState(false);

	const toggleDivVisibility = () => {
		setDivVisible(!isDivVisible);
	  };

	const onDeleteProduct = (moto) => {
		const existingProduct = allProducts.find((item) => item.nro_moto === moto.nro_moto);
	  
		if (!existingProduct) {
		  return;
		}
	  
		const results = allProducts.filter((item) => item.nro_moto !== moto.nro_moto);
	  
		setTotal(parseFloat(total) - parseFloat(moto.monto));
		setCountProducts(countProducts - moto.quantity);
		setAllProducts(results);
	  };
	  
	
	{/*const onDeleteProduct = moto => {
		const results = allProducts.filter(
			item => item.id !== moto.nro_moto
		);

		setTotal(parseFloat(total) - parseFloat(moto.monto));
		setCountProducts(countProducts - moto.quantity);
		setAllProducts(results);
	};*/}

	const onCleanCart = () => {
		setAllProducts([]);
		setTotal(0);
		setCountProducts(0);
	};

	return (
		<header>
			<h1>Tienda</h1>
			{isDivVisible && (

			<div className='container-icon'>
				<div
					className='container-cart-icon'
					onClick={() => setActive(!active)}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						className='icon-cart'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
						/>
					</svg>
					<div className='count-products'>
						<span id='contador-productos'>{countProducts}</span>
					</div>
				</div>

				<div
					className={`container-cart-products ${
						active ? '' : 'hidden-cart'
					}`}
				>
					{allProducts.length ? (
						<>
							<div className='row-product'>
								{allProducts.map(moto => (
									<div className='cart-product' key={moto.nro_moto}>
										<div className='info-cart-product'>
											<span className='cantidad-producto-carrito'>
												{moto.quantity}
											</span>
											<p className='titulo-producto-carrito'>
												{moto.marca}
											</p>
											<span className='precio-producto-carrito'>
												${moto.monto}
											</span>
										</div>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='icon-close'
											onClick={() => onDeleteProduct(moto)}
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M6 18L18 6M6 6l12 12'
											/>
										</svg>
									</div>
								))}
							</div>

							<div className='cart-total'>
								<h3>Total:</h3>
								<span className='total-pagar'>${total}</span>
							</div>

							<button className='btn-clear-all' onClick={onCleanCart}>
								Vaciar Carrito
							</button>
							<button className='btn-clear-all' onClick={toggleDivVisibility}>
								Confirmar pedido
							</button>
						</>
					) : (
						<p className='cart-empty'>El carrito está vacío</p>
					)}
				</div>
			</div>
			)}
		</header>
	);
};