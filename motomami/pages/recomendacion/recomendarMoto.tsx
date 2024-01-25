import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import config from './../../config';




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
    <div className={styles["table-container"]}>
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
          <h3 className={styles["title"]}>La recomendación según sus preferencias es...</h3>
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
  );
};

export default PaginaRecomendaciones;