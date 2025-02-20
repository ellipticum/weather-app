import { IForecastItem } from '@/widgets/Result/UI'

export interface IForecastResponse {
    list: IForecastItem[]
    city: {
        id: number
        name: string
    }
}
