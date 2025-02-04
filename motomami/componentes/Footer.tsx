import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Sobre Nosotros</h3>
          <p>
            Somos una concesionaria apasionada por las motos, comprometidos en ofrecer los mejores modelos y servicios a nuestros clientes.
          </p>
        </div>

        <div className="footer-section links">
          <h3>Enlaces útiles</h3>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Modelos</a></li>
            <li><a href="#">Contacto</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <div className="footer-section social">
          <h3>Seguinos</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <img src="https://img.icons8.com/?size=100&id=118497&format=png" alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/motomami" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/color/48/instagram-new--v1.png" alt="Instagram" />
            </a>
            <a href="https://twitter.com/motomami" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/color/48/twitter--v1.png" alt="Twitter" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        
        <p>&copy; 2025 Agustin Lelli y Lucio Adriel Lorenzetti. Todos los derechos reservados.</p>
        <p>Desarrollado con 💛 en Bahía Blanca</p>

        <button className="contact-button">Contáctanos</button>
      </div>
    </footer>
  );
};

export default Footer;
