import React from 'react'

import styles from './styles.module.scss'

import { LayoutProps } from '@/shared/interfaces/layoutProps'

const Wrapper = ({ children }: LayoutProps) => {
    return <div className={styles.wrapper}>{children}</div>
}

export default Wrapper
