import { ChangeEvent, FormEvent, useState } from 'react'
import styles from './TaskInput.module.scss'

interface TaskInputProps {
  addTodo: (name: string) => void
}

const TaskInput = ({ addTodo }: TaskInputProps) => {
  const [name, setName] = useState<string>('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addTodo(name)
    setName('')
  }

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setName(target.value)
  }

  return (
    <div className='mb-2'>
      <h1 className={styles.title}>To do list typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type='text' placeholder='caption goes here' value={name} onChange={handleInputChange} />
        <button type='submit'>➕</button>
      </form>
    </div>
  )
}

export default TaskInput
