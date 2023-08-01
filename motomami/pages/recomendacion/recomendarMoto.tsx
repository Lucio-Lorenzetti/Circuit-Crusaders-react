import { useState } from 'react';

const RecomendadorMotos = () => {
  const [descripcion, setDescripcion] = useState('');
  const [recomendaciones, setRecomendaciones] = useState('');

  const handleChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar la solicitud POST a la API de ChatGPT con la descripción ingresada
      const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_OPENAI_API_KEY', // Reemplazar con tu API key de OpenAI
        },
        body: JSON.stringify({
          prompt: `Quiero comprar una moto que sea ${descripcion}`,
          max_tokens: 100,
          temperature: 0.7,
          n: 1,
          stop: ['\n'],
        }),
      });

      if (response.ok) {
        // Procesar la respuesta y extraer las recomendaciones
        const data = await response.json();
        const recomendaciones = data.choices[0].text;
        setRecomendaciones(recomendaciones);
      } else {
        console.error('Error en la respuesta de la API');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Recomendador de Motos</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Ingresa una descripción de lo que buscas en una moto..."
          value={descripcion}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Enviar</button>
      </form>
      {recomendaciones && (
        <div>
          <h2>Recomendaciones:</h2>
          <p>{recomendaciones}</p>
        </div>
      )}
    </div>
  );
};

export default RecomendadorMotos;
