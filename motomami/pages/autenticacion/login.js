import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';

const Login = () => {
  // Definición de estados
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [token, setToken] = useState('');
  const router = useRouter();

  // Función que maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if (email === '' || password === '') {
      setError(true);
      return;
    }
    setError(false);

    try {
      // Realizar la solicitud POST al servidor para autenticar al usuario
      const response = await fetch('http://127.0.0.1:8000/rest/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password,
        }),
      });

      if (response.ok) {
        // Si la respuesta es exitosa, obtener el token del cuerpo de la respuesta
        const data = await response.json();
        setToken(data.access_token); // Almacenar el token en el estado

        // Realizar redirección a otra página pasando el token en los parámetros de la ruta
        router.push({
          pathname: '/carrito/compras',
          query: { token: data.access_token },
        });
      } else {
        // Si la respuesta no es exitosa, limpiar los campos de email y contraseña y mostrar un error
        setEmail('');
        setPassword('');
        setError(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Verificar el valor del token almacenado cada vez que cambie
  useEffect(() => {
    console.log('Token almacenado:', token);
  }, [token]);

  // Renderizar el componente del formulario de inicio de sesión
  return (
    <div className={styles['login-container']}>
      <div className={styles['formulario']}>
        <h1>Login</h1>
        <form className={styles['login']} onSubmit={handleSubmit}>
          <div>
            <label>Email: </label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Contraseña: </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className={styles['button']}>Iniciar Sesión</button>
        </form>
        {error && <p>Las credenciales son incorrectas</p>}
      </div>
    </div>
  );
};

export default Login;