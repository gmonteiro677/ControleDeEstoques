import { Link } from 'react-router-dom'
import Container from './Container'
import styles from './Navbar.module.css'
import logo from '../../img/costs_logo1.png'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'

function Navbar() {
  const { signout } = useContext(AuthContext)

  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="Costs" />
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/home">Home</Link>
          </li>
          <li className={styles.item}>
            <Link to="/projects">Estoque</Link>
          </li>
          <li className={styles.item}>
            <Link to="/company">Produtos</Link>
          </li>
          <li className={styles.item} onClick={() => signout()}>
            <Link to="/">Sair</Link>
          </li>
        </ul>
      </Container>
    </nav>
  )
}

export default Navbar
