import styles from './Home.module.css'
import savings from '../../img/savings1.svg'
import LinkButton from '../layout/LinkButton.js'

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>
        Bem vindo ao seu <span>Estoque</span>
      </h1>
      <p>Comece a gerenciar o seu estoque agora mesmo!</p>
      <LinkButton to="/newproject" text="Criar Estoque" />
      <img src={savings} alt="Costs" />
    </section>
  )
}

export default Home
