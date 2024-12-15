import { useState } from 'react';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
      const response = await fetch('https://circuit-crusaders-laravel-cjnz-agusl1660-agusl1660s-projects.vercel.app/rest/register', {
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
        <img className="col-md-12" src="https://i.ibb.co/yV7W6Td/logomotomami.png" alt="Logo de la concesionaria" ></img>
    
    <div className={styles['formulario']} style={{ marginTop: '20px' }}>
      
      <h1>Registrarse</h1>
      <form className={styles['register']} onSubmit={handleSubmit}>
        <div>
          <label>Nombre: </label>
        </div>
        <div>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '380px', height: '30px',fontSize: '18px' }}/>
        </div>
        <div>
          <label>Correo Electrónico: </label>
        </div>
        <div>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '380px', height: '30px',fontSize: '18px' }}/>
        </div>
        <div>
          <label>Contraseña: </label>
        </div>
        <div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '380px', height: '30px',fontSize: '18px' }} />
        </div>
        <div>
          <label>Confirmar contraseña: </label>
        </div>
        <div>
          <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}style={{ width: '380px', height: '30px',fontSize: '18px' }} />
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
