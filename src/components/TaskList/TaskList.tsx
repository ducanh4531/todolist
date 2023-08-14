import PropTypes from 'prop-types'
import { ChangeEvent } from 'react'
import { Todo } from '../../@types/todo.type'
import { TodoTypes } from '../../PropTypes/todo.proptypes'
import styles from './TaskList.module.scss'

interface TaskListProps {
  todos: Todo[]
  doneTaskList?: boolean
  startEditTodo: (id: string) => void
  deleteTodo: (id: string) => void
  doneTodo: (id: string, done: boolean) => void
}

const TaskList = ({ todos, doneTaskList, startEditTodo, deleteTodo, doneTodo }: TaskListProps) => {
  const filterTodoList = todos.filter((todo) => todo.done === doneTaskList)

  const handleCheckboxChange = (todoId: string) => (event: ChangeEvent<HTMLInputElement>) =>
    doneTodo(todoId, event.target.checked)

  const handleEditTodoChange = (todoId: string) => () => startEditTodo(todoId)

  const handleDeleteTodoChange = (todoId: string) => () => deleteTodo(todoId)

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
              <button className={styles.taskBtn} onClick={handleEditTodoChange(todo.id)}>
                📝
              </button>
              <button className={styles.taskBtn} onClick={handleDeleteTodoChange(todo.id)}>
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(TodoTypes).isRequired,
  doneTaskList: PropTypes.bool,
  startEditTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  doneTodo: PropTypes.func.isRequired
}

export default TaskList
