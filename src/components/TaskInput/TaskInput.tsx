import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { Todo } from '../TodoList'
import styles from './TaskInput.module.scss'

interface TaskInputProps {
  setItems: Dispatch<SetStateAction<Todo[]>>
}

const TaskInput = ({ setItems }: TaskInputProps) => {
  const [name, setName] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setItems((prevState) => [...prevState, { name, done: false, id: prevState.length }])
    setName('')
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value)
  }

  return (
    <div className='mb-2'>
      <h1 className={styles.title}>To do list typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type='text' placeholder='caption goes here' value={name} onChange={handleChange} />
        <button type='submit'>➕</button>
      </form>
    </div>
  )
}

export default TaskInput
