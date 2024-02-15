import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import config from './../../config';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';




const PaginaRecomendaciones = () => {
  const [descripcion, setDescripcion] = useState('');
  const [recomendacion, setRecomendacion] = useState('');

  const handleChange = (e) => {
    setDescripcion(e.target.value);
  };

  const enviarMensaje = async () => {
    let respuesta;

    respuesta = await obtenerRespuestaChatGPT(descripcion);
    
    setRecomendacion(respuesta);
  };

   async function obtenerRespuestaChatGPT(mensaje) {
    

    const url = 'https://api.openai.com/v1/chat/completions';
    const apiKey = config.openaiApiKey;
  console.log(apiKey);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    };
  
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: mensaje }],
      temperature: 0.7,
    };
  
    try {
      const respuesta = await axios.post(url, data, { headers });
      return respuesta.data.choices[0].message.content;
    } catch (error) {
      return 'Error al obtener la respuesta de ChatGPT.';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    obtenerRespuestaChatGPT(descripcion);
  };

  const handleVolverAMotos = () => {
    window.history.back()
  };

  const handleLimpiarRecomendacion = () => {
    setRecomendacion('');
  };

  return (
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
            <img src="https://i.pinimg.com/originals/b3/da/8c/b3da8ca68e89a5de199a3fd25e2ddb7e.png" alt="Imagen 1" />
          </div>
          <div>
            <img src="https://www.mundodeportivo.com/files/image_948_465/uploads/2022/06/28/6554d77d1ce37.jpeg" alt="Imagen 2" />
          </div>
          <div>
            <img src="https://png.pngtree.com/background/20230612/original/pngtree-many-motorcycles-parked-in-a-row-outside-picture-image_3364614.jpg" alt="Imagen 3" />
          </div>
          <div>
            <img src="https://cdn.pixabay.com/photo/2014/07/31/23/10/biker-407123_1280.jpg" alt="Imagen 4" />
          </div>
          <div>
            <img src="https://soymotero.net/wp-content/uploads/2023/04/husqvarna_te_300_2023_2.jpg" alt="Imagen 5" />
          </div>
          <div>
            <img src="https://s1.abcstatics.com/media/summum/2019/10/04/bike-biker-cafe-racer-2549942-k0AH--1248x698@abc.jpg" alt="Imagen 6" />
          </div>
        </Carousel>      
      
        <div className={`${styles['table-container']} ${styles['translucent-background']}`}>
        <h1 className={styles["title"]}>Obtener una Recomendación</h1>
          <div>
            <label className={styles["label"]}>Ingrese sus preferencias:</label>
            <textarea
              placeholder="Describa lo que busca en una moto..."
              value={descripcion}
              onChange={handleChange}
              className={styles["textarea"]}
            />
          </div>
          <div>
            <button type="submit" className={styles['button']} onClick={enviarMensaje}>Obtener Recomendación</button>
          </div>
        {recomendacion && (
          <div>
            <p className={styles["title"]}>La recomendación según sus preferencias es...</p>
            <div>
              <textarea
                readOnly
                rows={6}
                style={{ width: '100%', backgroundColor: '#f0f0f0' }}
                value={recomendacion}
                className={styles["textarea"]}
              />
            </div>
            <div>
              <button onClick={handleVolverAMotos} className={styles['button']}>Ir a nuestras motos</button>
              <button onClick={handleLimpiarRecomendacion} className={styles['button']}>Limpiar Recomendación</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaginaRecomendaciones;