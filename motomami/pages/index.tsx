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
            <img src="https://images.unsplash.com/photo-1525013066836-c6090f0ad9d8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fHw%3D" alt="Imagen 3" />
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1732310428404-5d5a76994ee8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Imagen 4" />
          </div>
          <div>
            <img src="https://lamoto.com.ar/wp-content/uploads/2022/03/Moto-cafe-racer-no-es-para-cualquiera.jpg" alt="Imagen 5" />
          </div>
          <div>
            <img src="https://images8.alphacoders.com/110/1105079.jpg" alt="Imagen 6" />
          </div>
        </Carousel>
        <div className={styles['logo-container']}>
            <img src="https://i.ibb.co/yV7W6Td/logomotomami.png" alt="Logo de la concesionaria" className={styles['logo']} />
          </div>
        <div className={styles['content-container']}>
          <div >
            <Link href="/autenticacion/login" legacyBehavior>
              <button className={styles['button']} style={{ width: '380px' }}>Iniciar Sesión</button>
            </Link>
          </div>
          <div >
            <Link href="/autenticacion/register" legacyBehavior>
              <button className={styles['button']}style={{ width: '380px' }}>Registrarse</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
