'use client'

import React, { useState, KeyboardEvent, ChangeEvent, MouseEvent } from 'react'

import classNames from 'classnames'

import styles from './styles.module.scss'

import { fetchData } from '@/widgets/Result/api/fetchData'
import { useData } from '@/features/Providers/DataProvider'
import { statusMap } from '@/widgets/Result/model/data/statusMap'

const Search = () => {
    const { setData, isLoading, setIsLoading, setIsNotificationHidden, setNotificationMessage } =
        useData()

    const [city, setCity] = useState<string>('')

    const [isFocused, setIsFocused] = useState<boolean>(false)

    const onFocus = () => setIsFocused(true)
    const onBlur = () => setIsFocused(false)

    const onClick = async () => {
        setIsLoading(true)

        const data = await fetchData(city)

        setIsLoading(false)

        if (!data || !('list' in data)) {
            const notFound = data.status === 404

            if (!notFound) {
                return
            }

            setIsNotificationHidden(false)
            setNotificationMessage(statusMap[data.status])

            return
        }

        setData(data)
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value)
    }

    const onKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'Enter':
                await onClick()
                break
        }
    }

    return (
        <div className={classNames(styles.search, { [styles.focused]: isFocused })}>
            <input
                className={styles.input}
                type='text'
                placeholder='название города'
                onChange={onChange}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <button
                disabled={isLoading}
                className={classNames(styles.button, { [styles.hidden]: city.length === 0 })}
                onClick={onClick}
            >
                добавить
            </button>
        </div>
    )
}

export default Search
