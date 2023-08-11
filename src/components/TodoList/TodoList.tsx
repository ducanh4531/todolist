import { useState } from 'react'
import { TaskInput } from '../TaskInput'
import { TaskList } from '../TaskList'
import styles from './TodoList.module.scss'

export interface Todo {
  name: string
  done: boolean
  id: number
}

const TodoList = () => {
  const [items, setItems] = useState<Todo[]>([])

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput setItems={setItems} />
        <TaskList setItems={setItems} items={items} />
        <TaskList setItems={setItems} items={items} doneTaskList />
      </div>
    </div>
  )
}

export default TodoList
