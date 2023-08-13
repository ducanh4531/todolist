import { ChangeEvent } from 'react'
import { Todo } from '../../@types/todo.type'
import styles from './TaskList.module.scss'

interface TaskListProps {
  todos: Todo[]
  doneTaskList?: boolean
  doneTodo: (id: string, done: boolean) => void
}

const TaskList = ({ todos, doneTaskList, doneTodo }: TaskListProps) => {
  const filterTodoList = todos.filter((todo) => todo.done === doneTaskList)

  const handleCheckboxChange = (todoId: string) => (event: ChangeEvent<HTMLInputElement>) =>
    doneTodo(todoId, event.target.checked)

  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Completed' : 'Not complete'}</h2>
      <div className={styles.tasks}>
        {filterTodoList.map((todo) => (
          <div className={styles.task} key={todo.id}>
            <input
              type='checkbox'
              className={styles.taskCheckbox}
              checked={todo.done}
              onChange={handleCheckboxChange(todo.id)}
            />
            <span className={`${styles.taskName} ${todo.done && styles.taskNameDone}`}>{todo.name}</span>
            <div className={styles.taskActions}>
              <button className={styles.taskBtn}>📝</button>
              <button className={styles.taskBtn}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskList
