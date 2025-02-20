import { IForecastItem } from '@/widgets/Result/model/interfaces/forecastItem'

export interface IForecastResponse {
    list: IForecastItem[]
    city: {
        id: number
        name: string
    }
}
