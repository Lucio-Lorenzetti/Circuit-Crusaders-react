import { useState } from 'react';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [user, setUser] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setError(true);
      return;
    }
    setError(false);
    try {
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
        setUser(true);
        // Realizar redirección
        window.location.href = '../carrito/compras';
      } else {
        setEmail("");
        setPassword("");
        setError(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
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
  );
};

export default Login;
