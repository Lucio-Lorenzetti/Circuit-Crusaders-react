import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import config from './../../config';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Head from 'next/head';


const PaginaRecomendaciones = () => {
  const [descripcion, setDescripcion] = useState('');
  const [recomendacion, setRecomendacion] = useState('');

  const handleChange = (e) => {
    setDescripcion(e.target.value);
  };

  const enviarMensaje = async () => {
    try {
      const respuesta = await obtenerRespuestaGemini(descripcion);
      setRecomendacion(respuesta); // Corrected: Directly set the response text
    } catch (error) {
      console.error("Error in Gemini API:", error);
      // Handle the error appropriately (e.g., display an error message to the user)
    }
  };

  async function obtenerRespuestaGemini(mensaje) {
    try {
      // Usa process.env.API_KEY para mayor seguridad
      const genAI = new GoogleGenerativeAI(config.geminiApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = mensaje;
  
      // Utiliza generateContentStream para obtener la respuesta en fragmentos
      const result = await model.generateContentStream(prompt);
  
      // Acumula los fragmentos de texto en una cadena
      let textoCompleto = "";
      for await (const chunk of result.stream) {
        textoCompleto += chunk.text();
      }
  
      return textoCompleto; // Devuelve el texto completo generado
    } catch (error) {
      console.error("Error en la API de Gemini:", error);
      throw error; // Relanza el error para que sea manejado por la función llamadora
    }
  }

  const handleLimpiarRecomendacion = () => {
    setRecomendacion('');
  };

  const handleVolverAMotos = () => {
    window.history.back();
  };

  const imagenesCarrusel = [
    {
      src: "https://wallpapers.com/images/hd/dirt-bike-pictures-qbg8srizpfxmctsy.jpg",
      alt: "Imagen 1"
    },
    {
      src: "https://www.mundodeportivo.com/files/image_948_465/uploads/2022/06/28/6554d77d1ce37.jpeg",
      alt: "Imagen 2"
    },
    {
      src: "https://png.pngtree.com/background/20230612/original/pngtree-many-motorcycles-parked-in-a-row-outside-picture-image_3364614.jpg",
      alt: "Imagen 3"
    },
    {
      src: "https://cdn.pixabay.com/photo/2014/07/31/23/10/biker-407123_1280.jpg",
      alt: "Imagen 4"
    },
    {
      src: "https://soymotero.net/wp-content/uploads/2023/04/husqvarna_te_300_2023_2.jpg",
      alt: "Imagen 5"
    },
    {
      src: "https://s1.abcstatics.com/media/summum/2019/10/04/bike-biker-cafe-racer-2549942-k0AH--1248x698@abc.jpg",
      alt: "Imagen 6"
    },
    {
      src: "https://i.pinimg.com/736x/22/50/57/225057aab91c2d3b714dd899aafecd90.jpg",
      alt: "Imagen 7"
    }
  ];
  return (
    <>
      <Head>
        <title>Recomendacion</title>
      </Head>
      <div className={styles.carousel}>
        <Carousel
          showThumbs={false} 
          autoPlay 
          infiniteLoop 
          showStatus={false} 
          interval={5000} 
          emulateTouch 
          useKeyboardArrows 
        >
          {imagenesCarrusel.map((imagen, index) => (
            <div key={index}>
              <img src={imagen.src} alt={imagen.alt} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className={styles.overlay}>
        <div className={`${styles['table-container']} ${styles['translucent-background']}`}>
          <h1 className="filter-title">Obtener una Recomendación</h1>
          <div>
            <label className={styles["form-label"]}>Ingrese sus preferencias:</label>
          </div>
          <div>
            <textarea
              placeholder="Describa lo que busca en una moto..."
              value={descripcion}
              onChange={handleChange}
              className={styles["textarea"]}
            />
          </div>
          <div>
            <button type="submit" className="filter-button" onClick={enviarMensaje}>Obtener Recomendación</button>
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
                <button onClick={handleLimpiarRecomendacion} className="filter-button">Limpiar Recomendación</button>
              </div>
            </div>
          )}
          <div>
            <button onClick={handleVolverAMotos} className="filter-button">Ir a nuestras motos</button>
          </div>

        </div>
      </div>
    </>
  );
};

export default PaginaRecomendaciones;