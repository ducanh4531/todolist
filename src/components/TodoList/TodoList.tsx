import { useEffect, useState } from 'react'
import { Todo } from '../../@types/todo.type'
import { TaskInput } from '../TaskInput'
import { TaskList } from '../TaskList'
import styles from './TodoList.module.scss'

// interface HandleNewTodo {
//   (todos: Todo[]): Todo[]
// }

type HandleNewTodo = (todos: Todo[]) => Todo[]

const syncReactToLocal = (handleNewTodos: HandleNewTodo) => {
  const todosStr = localStorage.getItem('todos')
  const todosObj: Todo[] = JSON.parse(todosStr || '[]')
  const newTodosObj = handleNewTodos(todosObj)

  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
  // const [currentTodo, setCurrentTodo] = useState<Todo | null>()

  useEffect(() => {
    const todosStr = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosStr || '[]')

    setTodos(todosObj)
  }, [])

  const handleAddTodo = (name: string) => {
    const todo: Todo = { name, done: false, id: new Date().toISOString() }
    const handler = (todosObj: Todo[]) => [...todosObj, todo]

    setTodos((prev) => [...prev, todo])

    syncReactToLocal(handler)
  }

  const handleDoneTodo = (id: string, done: boolean) => {
    const handler = (todosObj: Todo[]) =>
      todosObj.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })

    setTodos(handler)

    syncReactToLocal(handler)
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
    const handler = (todosObj: Todo[]) =>
      todosObj.map((todo) => {
        if (todo.id === (currentTodo as Todo).id) {
          return currentTodo as Todo
        }
        return todo
      })

    setCurrentTodo(null)
    setTodos(handler)

    syncReactToLocal(handler)
  }

  const deleteTodo = (id: string) => {
    if (currentTodo) {
      setCurrentTodo(null)
    }

    const handler = (todosObj: Todo[]) => todosObj.filter((todo) => todo.id !== id)

    setTodos(handler)

    syncReactToLocal(handler)
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
