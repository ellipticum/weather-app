import React from 'react'

import styles from './styles.module.scss'

import Wrapper from '@/shared/UI/Wrapper'
import Container from '@/shared/UI/Container'
import DataProvider from '@/features/Providers/DataProvider'
import Search from '@/features/Search'
import Result from '@/widgets/Result/UI'
import Notification from '@/shared/UI/Notification'

const Home = () => {
    return (
        <DataProvider>
            <Wrapper>
                <Container>
                    <div className={styles.content}>
                        <Search />
                        <Result />
                        <Notification />
                    </div>
                </Container>
            </Wrapper>
        </DataProvider>
    )
}

export default Home
