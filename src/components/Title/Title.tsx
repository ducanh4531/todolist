import React from 'react'
import styles from './Title.module.scss'

type TitleProps = {
  address: { street: string }
}

const Title = ({ address }: TitleProps) => {
  console.log(address.street)
  return <h1 className={styles.title}>To do list typescript</h1>
}

function equal(prevProps: TitleProps, nextProps: TitleProps) {
  return prevProps.address.street === nextProps.address.street
}

export default React.memo(Title, equal)
