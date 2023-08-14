import { useState } from 'react'
import { Todo } from '../../@types/todo.type'
import { TaskInput } from '../TaskInput'
import { TaskList } from '../TaskList'
import styles from './TodoList.module.scss'

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  const handleAddTodo = (name: string) => {
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

  const handleStartEditTodo = (id: string) => {
    const foundTodo = todos.find((todo) => todo.id === id)

    if (foundTodo) {
      setCurrentTodo(foundTodo)
    }
  }

  const editTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) {
        return { ...prev, name }
      } else {
        return null
      }
    })
  }

  const finishEditTodo = () => {
    setCurrentTodo(null)
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === (currentTodo as Todo).id) {
          return currentTodo as Todo
        }
        return todo
      })
    )
  }

  const deleteTodo = (id: string) => {
    if (currentTodo) {
      setCurrentTodo(null)
    }
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput
          addTodo={handleAddTodo}
          editTodo={editTodo}
          finishEditTodo={finishEditTodo}
          currentTodo={currentTodo}
        />
        <TaskList
          todos={todos}
          doneTaskList={false}
          startEditTodo={handleStartEditTodo}
          deleteTodo={deleteTodo}
          doneTodo={handleDoneTodo}
        />
        <TaskList
          todos={todos}
          doneTaskList
          startEditTodo={handleStartEditTodo}
          deleteTodo={deleteTodo}
          doneTodo={handleDoneTodo}
        />
      </div>
    </div>
  )
}

export default TodoList
