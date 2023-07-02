import '../styles/globals.css';

//SI CAMBIAS ALGO EN ESTA CLASE TE LO CAMBIAA EN TODAS LAS PAGE
export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
  }