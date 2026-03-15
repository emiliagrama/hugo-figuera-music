const Footer = () => {

  return (
    <footer className="hf-footer">
      <p>Available for freelance and long-term collaborations.</p>

      <div className="hf-footer-contact">
        <a
          className="hf-footer-email"
          href="mailto:contact@hugofigueramusic.com?subject=Music%20Collaboration"
        >
          contact@hugofigueramusic.com
        </a>
      </div>

      <div className="footer-legal">
        © 2025 Hugo Figuera. All music registered with ASCAP. All rights reserved.
      </div>

      <div className="footer-credit">
        <a
          href="https://emiliagrama.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Site by Emilia Grama
        </a>
      </div>
    </footer>
  );
};

export default Footer;