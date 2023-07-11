import { useState } from 'react';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';

const Register = () => {  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(false);
  const [user, setUser] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || email === '' || password === '') {
      setError(true);
      return;
    }
    if(password != passwordConfirmation){
      setPassword("");
      setPasswordConfirmation("");
      setError(true);
      return
    }
    setError(false);
    try {
      const response = await fetch('http://127.0.0.1:8000/rest/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password,
          password_confirmation: passwordConfirmation,
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
      <h1>Registrarse</h1>
      <form className={styles['register']} onSubmit={handleSubmit}>
      <div>
          <label>Nombre: </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email: </label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Contraseña: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Confirmar contraseña: </label>
          <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
        </div>
        <button className={styles['button']}>Registrarse</button>
      </form>
      {error && <p>Los campos no se han completado correctamente</p>}
    </div>
  );
};

export default Register;
