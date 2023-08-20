import React from 'react'
import styles from './Title.module.scss'

type TitleProps = {
  address: { street: string }
  onTitleClick: (value: any) => void
}

const Title = ({ address, onTitleClick }: TitleProps) => {
  console.log(address.street)
  return (
    <h1 className={styles.title} onClick={() => onTitleClick(100)}>
      To do list typescript
    </h1>
  )
}

// function equal(prevProps: TitleProps, nextProps: TitleProps) {
//   return prevProps.address.street === nextProps.address.street
// }

export default React.memo(Title)
