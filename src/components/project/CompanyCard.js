import { Link } from 'react-router-dom'
import styles from './ProjectCard.module.css'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function CompanyCard({
  id,
  name,
  budget,
  category,
  handleRemove,
  unity,
  quan
}) {
  const remove = e => {
    e.preventDefault()
    handleRemove(id)
  }

  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Categoria:</span> {category}
      </p>
      <p>
        <span>Unidade de medida:</span> {unity}
      </p>
      <p>
        <span>Quantidade no estoque:</span> {quan}
      </p>
    </div>
  )
}

export default CompanyCard
