import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li>
          <a href="https://www.facebook.com/" target="_blank">
            <FaFacebook style={{ color: '#FFF' }} />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/" target="_blank">
            <FaInstagram style={{ color: '#FFF' }} />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com" target="_blank">
            <FaLinkedin style={{ color: '#FFF' }} />
          </a>
        </li>
      </ul>
      <p className={styles.copy_right}>
        <span>Estoq</span> &copy; 2022
      </p>
    </footer>
  )
}

export default Footer
