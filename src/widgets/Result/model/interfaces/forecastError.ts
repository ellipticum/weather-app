import { IForecastErrorConfig } from '@/widgets/Result/model/interfaces/forecastErrorConfig'

export interface IForecastError {
    message: string
    name: string
    stack: string
    config: IForecastErrorConfig
    code: string
    status: number
}
