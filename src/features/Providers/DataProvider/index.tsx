'use client'

import { createContext, Dispatch, useContext, useState } from 'react'
import { LayoutProps } from '@/shared/interfaces/layoutProps'
import { IForecastResponse } from '@/widgets/Result/model/interfaces/forecastResponse'

type Data = IForecastResponse | null

interface IDataContext {
    data: Data
    setData: Dispatch<Data>
    isLoading: boolean
    setIsLoading: Dispatch<boolean>
    notificationMessage: string
    setNotificationMessage: Dispatch<string>
    isNotificationHidden: boolean
    setIsNotificationHidden: Dispatch<boolean>
}

const DataContext = createContext<IDataContext | null>(null)

export const useData = () => {
    const value = useContext(DataContext)

    if (!value) {
        throw new Error(`${DataContext.displayName} must be inside the provider.`)
    }

    return value
}

const DataProvider = ({ children }: LayoutProps) => {
    const [data, setData] = useState<Data>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isNotificationHidden, setIsNotificationHidden] = useState<boolean>(true)
    const [notificationMessage, setNotificationMessage] = useState<string>('')

    return (
        <DataContext.Provider
            value={{
                data,
                setData,
                isLoading,
                setIsLoading,
                isNotificationHidden,
                setIsNotificationHidden,
                notificationMessage,
                setNotificationMessage
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider
