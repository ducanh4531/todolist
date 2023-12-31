import PropTypes from 'prop-types'
import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Todo } from '../../@types/todo.type'
import connect from '../../HOC/connect'
import { TodoTypes } from '../../PropTypes/todo.proptypes'
import { debug, log } from '../../constants'
import { Title } from '../Title'
import styles from './TaskInput.module.scss'

interface TaskInputProps {
  addTodo: (name: string) => void
  editTodo: (name: string) => void
  finishEditTodo: () => void
  currentTodo: Todo | null
}

const TaskInput = ({
  addTodo,
  editTodo,
  finishEditTodo,
  currentTodo,
  debug,
  log
}: TaskInputProps & typeof injectedProps) => {
  const [name, setName] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  // log(debug)

  const address = useMemo(() => ({ street: 'Hanoi' }), [])

  const handleTitleClick = useCallback((value: any) => console.log(value), [])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [name, currentTodo?.name])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTodo) {
      finishEditTodo()
    } else {
      addTodo(name)
      setName('')
    }
  }

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (currentTodo) {
      editTodo(target.value)
      setName('')
    } else {
      setName(target.value)
    }
  }

  return (
    <div className='mb-2'>
      <Title address={address} onTitleClick={handleTitleClick} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='caption goes here'
          value={currentTodo ? currentTodo.name : name}
          onChange={handleInputChange}
          ref={inputRef}
        />
        <button type='submit'>{currentTodo ? '✅' : '➕'}</button>
      </form>
    </div>
  )
}

TaskInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  finishEditTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.oneOfType([TodoTypes, PropTypes.oneOf([null])])
}

const injectedProps = { debug, log }

export default connect(injectedProps)(TaskInput)
