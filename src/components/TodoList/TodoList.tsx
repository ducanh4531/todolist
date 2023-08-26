import { useEffect, useReducer, useState } from 'react'
import { Todo } from '../../@types/todo.type'
import { addAction, deleteAction, doneAction, editAction, loadAction } from '../../reducer/action'
import reducer from '../../reducer/reducer'
import { TaskInput } from '../TaskInput'
import { TaskList } from '../TaskList'
import styles from './TodoList.module.scss'

const TodoList = () => {
  const [todos, dispatch] = useReducer(reducer, [])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  useEffect(() => {
    const todosStr = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosStr || '[]')

    dispatch(loadAction(todosObj))
  }, [])

  const handleAddTodo = (name: string) => {
    dispatch(addAction(name))
  }

  const handleDoneTodo = (id: string, done: boolean) => {
    dispatch(doneAction({ id, done }))
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

    dispatch(editAction(currentTodo))
  }

  const deleteTodo = (id: string) => {
    if (currentTodo) {
      setCurrentTodo(null)
    }

    dispatch(deleteAction(id))
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
