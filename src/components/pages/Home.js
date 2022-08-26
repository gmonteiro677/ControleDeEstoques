import styles from './Home.module.css'
import savings from '../../img/savings1.svg'
import LinkButton from '../layout/LinkButton.js'
import Footer from '../layout/Footer'

function Home() {
  return (
    <div>
      <section className={styles.home_container}>
        <h1>
          Bem vindo ao seu <span>Estoque</span>
        </h1>
        <p>Comece a gerenciar o seu estoque agora mesmo!</p>
        <LinkButton to="/newproject" text="Criar Estoque" />
        <img src={savings} alt="Costs" />
        <Footer />
      </section>
    </div>
  )
}

export default Home
