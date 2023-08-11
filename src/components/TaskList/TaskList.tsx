import { Dispatch, SetStateAction } from 'react'
import { Todo } from '../TodoList'
import styles from './TaskList.module.scss'

interface TaskListProps {
  items: Todo[]
  doneTaskList?: boolean
  setItems: Dispatch<SetStateAction<Todo[]>>
}

const TaskList = ({ items, doneTaskList, setItems }: TaskListProps) => {
  // const itemsNotComplete = items.filter((item) => item.done === doneTaskList)

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setItems((prevState) => [...prevState, { name: event.currentTarget.value, done: false, id: prevState.length }])
  // }

  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Completed' : 'Not complete'}</h2>
      <div className={styles.tasks}>
        <div className={styles.task}>
          <input type='checkbox' className={styles.taskCheckbox} />
          <span className={`${styles.taskName} ${styles.taskNameDone}`}>Gym</span>
          <div className={styles.taskActions}>
            <button className={styles.taskBtn}>📝</button>
            <button className={styles.taskBtn}>🗑️</button>
          </div>
        </div>
        <div className={styles.task}>
          <input type='checkbox' className={styles.taskCheckbox} />
          <span className={styles.taskName}>Gym</span>
          <div className={styles.taskActions}>
            <button className={styles.taskBtn}>📝</button>
            <button className={styles.taskBtn}>🗑️</button>
          </div>
        </div>
        {/* {itemsNotComplete.map((item) => (
          <div key={item.id} className={styles.task}>
            <input type='checkbox' className={styles.taskCheckbox} />
            <span className={styles.taskName}>{item.name}Gym</span>
            <div className={styles.taskActions}>
              <button className={styles.taskBtn}>📝</button>
              <button className={styles.taskBtn}>🗑️</button>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  )
}

export default TaskList
