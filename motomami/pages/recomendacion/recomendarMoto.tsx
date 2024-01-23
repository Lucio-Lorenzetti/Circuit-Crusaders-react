import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const PaginaRecomendaciones = () => {
  const [descripcion, setDescripcion] = useState('');
  const [recomendacion, setRecomendacion] = useState('');

  const API_URL = 'https://api.openai.com/v1/completions';

  const handleChange = (e) => {
    setDescripcion(e.target.value);
  };

  const obtenerRecomendacionMoto = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer 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`,
    };

    const requestData = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: descripcion }],
      temperature: 0.7,
    };

    try {
      const response = await axios.post(API_URL, requestData, { headers });
      const recomendacion = response.data.choices[0].text;
      setRecomendacion(recomendacion);
    } catch (error) {
      console.error('Error en la respuesta de la API de ChatGPT:', error.message);
      // Puedes mostrar un mensaje de error al usuario si lo deseas
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    obtenerRecomendacionMoto();
  };

  const handleFiltrarMotos = () => {
    console.log('Filtrar nuestras motos');
    // Lógica para filtrar motos
  };

  const handleLimpiarRecomendacion = () => {
    setRecomendacion('');
  };

  return (
    <div className={styles["table-container"]}>
      <h1 className={styles["title"]}>Obtener una Recomendación</h1>
      <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary">Obtener Recomendación</button>
        </div>
      </form>
      {recomendacion && (
        <div>
          <h3 className={styles["subtitle"]}>La recomendación según sus preferencias es...</h3>
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
            <button onClick={handleFiltrarMotos} className="btn btn-success">Filtrar nuestras motos</button>
            <button onClick={handleLimpiarRecomendacion} className="btn btn-danger">Limpiar Recomendación</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginaRecomendaciones;