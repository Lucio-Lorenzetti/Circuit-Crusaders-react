import { useState } from 'react';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (name === "" || email === '' || password === '') {
      setError(true);
      return;
    }

    if (password !== passwordConfirmation) {
      setPassword('');
      setPasswordConfirmation('');
      setError(true);
      return;
    }

    setError(false);

    try {
      const response = await fetch('https://circuit-crusaders-laravel-cjnz-w6idqpd3d-agusl1660s-projects.vercel.app/rest/register', {
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
        // Usuario registrado con éxito, obtener el token del cuerpo de la respuesta
        const data = await response.json();

        // Almacenar el token en el almacenamiento local
        setToken(data.access_token); // Almacenar el token en el estado

        // Realizar redirección a otra página
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

  return (
    <div>
      <Head>
        <title>Registro</title>
          <link rel="icon" href="https://i.ibb.co/yV7W6Td/logomotomami.png" />
          <script  src="/regist_serviceWorker.js"></script> 
          <link rel="manifest" href="/manifest.json" />
        </Head>
      <header className="header"  >
        <img  src="https://i.ibb.co/yV7W6Td/logomotomami.png" alt="Logo de la concesionaria" ></img>
      </header>
      <div className={styles['formulario']} style={{marginTop:55}} >
        
        <h1>Registrarse</h1>
        <form className={styles['register']} onSubmit={handleSubmit}>
          <div>
            <label className={styles["form-label"]}>Nombre: </label>
          </div>
          <div>
            <input className={styles["input-field"]} type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className={styles["form-label"]}>Correo Electrónico: </label>
          </div>
          <div>
            <input className={styles["input-field"]} type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className={styles["form-label"]}>Contraseña: </label>
          </div>
          <div>
            <input className={styles["input-field"]} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label className={styles["form-label"]}>Confirmar contraseña: </label>
          </div>
          <div>
            <input className={styles["input-field"]} type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
          </div>
          <button className={styles['button']}>Registrarse</button>
            <Link href="../" legacyBehavior>
            <button className={styles['buttonVolver']}>Volver</button>
          </Link>        
        </form>
        {error && <p>Los campos no se han completado correctamente</p>}
      </div>
    </div>
  );
};

export default Register;
