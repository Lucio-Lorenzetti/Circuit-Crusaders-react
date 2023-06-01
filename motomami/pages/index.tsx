import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>MotoMami</title>
      </Head>
      <div className={styles['index-container']}>
        {/*<div className={styles['background-image']}>*/}
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
        {/*</div>*/}
        
      </div>
    </>
  );
};

export default Home;
