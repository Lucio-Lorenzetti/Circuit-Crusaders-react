import Head from 'next/head';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from '../styles/Home.module.css';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>MotoMami</title>
      </Head>
      <div className={styles['index-container']}>
        <Carousel
          className={styles['background-carousel']}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
          transitionTime={2000} 
        >
          <div>
            <img src="https://www.galgo.com/wp-content/uploads/2023/04/motos-cafe-racer.jpeg" alt="Imagen 1" />
          </div>
          <div>
            <img src="https://lamoto.com.ar/wp-content/uploads/2021/12/Motos-electricas-Ducati-prueba-lateral.jpg" alt="Imagen 2" />
          </div>
          <div>
            <img src="https://fondosmil.com/fondo/43749.jpg" alt="Imagen 3" />
          </div>
          <div>
            <img src="https://i.ytimg.com/vi/ma7K3DnPutM/maxresdefault.jpg" alt="Imagen 4" />
          </div>
          <div>
            <img src="https://lamoto.com.ar/wp-content/uploads/2022/03/Moto-cafe-racer-no-es-para-cualquiera.jpg" alt="Imagen 5" />
          </div>
          <div>
            <img src="https://images8.alphacoders.com/110/1105079.jpg" alt="Imagen 6" />
          </div>
        </Carousel>
        <div className={styles['content-container']}>
          <div className={styles['logo-container']}>
            <img src="https://i.ibb.co/W2Pmn2H/logomotomami.png" alt="Logo de la concesionaria" className={styles['logo']} />
          </div>
          <div className={styles['buttons-container']}>
            <Link href="/carrito/compras" passHref>
              <button className={styles['button']}>TIENDA</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
