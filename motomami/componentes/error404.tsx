import React from 'react';
import Head from 'next/head';

const Error404 = () => {

  return (
    <div className='contenedorError404'>
        <Head>
            <title>404: This page could not be found</title>
            <link rel="icon" href="https://i.ibb.co/yV7W6Td/logomotomami.png" />
            <script  src="/regist_serviceWorker.js"></script> 
            <link rel="manifest" href="/manifest.json" />
        </Head>
        <h1 className='error404'>404</h1>
        <h2 className='mensajeError404'>This page could not be found.</h2>
    </div>
  );
};

export default Error404;