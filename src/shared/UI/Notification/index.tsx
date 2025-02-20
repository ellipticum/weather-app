'use client'

import React, { useEffect } from 'react'
import { useData } from '@/features/Providers/DataProvider'
import styles from './styles.module.scss'
import classNames from 'classnames'

const Notification = () => {
    const { isNotificationHidden, setIsNotificationHidden, notificationMessage } = useData()

    useEffect(() => {
        if (isNotificationHidden) {
            return
        }

        setTimeout(() => {
            setIsNotificationHidden(true)
        }, 3500)
    }, [isNotificationHidden])

    return (
        <div
            className={classNames(styles.notification, { [styles.hidden]: isNotificationHidden })}
            onClick={() => setIsNotificationHidden(true)}
        >
            {notificationMessage}
        </div>
    )
}

export default Notification
