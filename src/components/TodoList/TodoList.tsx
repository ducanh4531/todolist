import { useState } from 'react'
import { Todo } from '../../@types/todo.type'
import { TaskInput } from '../TaskInput'
import { TaskList } from '../TaskList'
import styles from './TodoList.module.scss'

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  // const [currentTodo, setCurrentTodo] = useState<Todo>()

  const addTodo = (name: string) => {
    const todo: Todo = { name, done: false, id: new Date().toISOString() }
    setTodos((prev) => [...prev, todo])
  }

  const handleDoneTodo = (id: string, done: boolean) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    )
  }

  // const editTask = (id: string) => {
  //   let todo: Todo = todos.find((todo) => todo.id === id) as Todo
  //   let newTodos = todos.filter((newTodo) => newTodo.id !== todo.id)
  //   todo = { name: todo.name, id, done: !todo.done }
  //   setTodos(() => [...newTodos, todo])
  // }

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} />
        <TaskList doneTodo={handleDoneTodo} todos={todos} doneTaskList={false} />
        <TaskList doneTodo={handleDoneTodo} todos={todos} doneTaskList />
      </div>
    </div>
  )
}

export default TodoList
