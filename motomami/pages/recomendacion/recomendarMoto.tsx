import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
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

  return (
    <div className={styles['index-container']}>
      {/* Carousel code */}
      
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