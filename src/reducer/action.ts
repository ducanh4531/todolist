import { Todo } from '../@types/todo.type'

export type ActionType = LoadAction | AddAction | EditAction | DeleteAction | DoneAction

type LoadAction = {
  type: 'load'
  payload: { todosObj: Todo[] }
}

type AddAction = {
  type: 'add'
  payload: { name: string }
}

type EditAction = {
  type: 'edit'
  payload: { currentTodo: Todo | null }
}

type DeleteAction = {
  type: 'delete'
  payload: { id: string }
}

type DoneAction = {
  type: 'checkMark'
  payload: {
    id: string
    done: boolean
  }
}

export const loadAction = (todosObj: Todo[]): LoadAction => {
  return { type: 'load', payload: { todosObj } }
}

export const addAction = (name: string): AddAction => {
  return { type: 'add', payload: { name } }
}

export const editAction = (currentTodo: Todo | null): EditAction => {
  return { type: 'edit', payload: { currentTodo } }
}

export const deleteAction = (id: string): DeleteAction => {
  return { type: 'delete', payload: { id } }
}

export const doneAction = ({ id, done }: DoneAction['payload']): DoneAction => {
  return { type: 'checkMark', payload: { id, done } }
}
