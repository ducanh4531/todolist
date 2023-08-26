import { produce } from 'immer'
import { Todo } from '../@types/todo.type'
import { ActionType } from './action'

type HandleNewTodo = (todos: Todo[]) => Todo[]

const syncReactToLocal = (handleNewTodos: HandleNewTodo) => {
  const todosStr = localStorage.getItem('todos')
  const todosObj: Todo[] = JSON.parse(todosStr || '[]')
  const newTodosObj = handleNewTodos(todosObj)

  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

const reducer = produce((draft: Todo[], action: ActionType) => {
  let handler: HandleNewTodo
  switch (action.type) {
    case 'load':
      return action.payload.todosObj
    case 'add':
      const todo: Todo = { name: action.payload.name, done: false, id: new Date().toISOString() }
      handler = (todosObj: Todo[]) => [...todosObj, todo]

      syncReactToLocal(handler)

      draft.push(todo)
      break
    case 'edit':
      handler = (todosObj: Todo[]) =>
        todosObj.map((todo) => {
          if (todo.id === (action.payload.currentTodo as Todo).id) {
            return action.payload.currentTodo as Todo
          }
          return todo
        })
      syncReactToLocal(handler)
      return handler(draft)
    case 'delete':
      handler = (todosObj: Todo[]) => todosObj.filter((todo) => todo.id !== action.payload.id)

      syncReactToLocal(handler)
      return handler(draft)
    case 'checkMark':
      handler = (todosObj: Todo[]) =>
        todosObj.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, done: action.payload.done }
          }
          return todo
        })
      syncReactToLocal(handler)
      return handler(draft)
    default:
      throw Error('Wrong action')
  }
})

export default reducer
