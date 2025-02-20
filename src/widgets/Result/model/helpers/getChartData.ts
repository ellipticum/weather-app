import { IForecastResponse } from '../interfaces/forecastResponse'
import { IForecastItem } from '../interfaces/forecastItem'
import { Metric } from '../types/metric'
import { Granularity } from '../types/granularity'
import { transformForecast } from './transformForecast'

export interface IChartData {
    time: string
    city: string
    value: number
    full: IForecastItem
}

export const getChartData = (
    forecasts: IForecastResponse[],
    metricType: Metric,
    granularity: Granularity
): IChartData[] => {
    let allData: IChartData[] = []
    forecasts.forEach((forecast) => {
        const transformed = transformForecast(forecast, granularity)
        transformed.forEach((item) => {
            let value = 0
            switch (metricType) {
                case 'temp':
                    value = item.main.temp
                    break
                case 'pressure':
                    value = item.main.pressure
                    break
                case 'humidity':
                    value = item.main.humidity
                    break
                case 'wind':
                    value = item.wind.speed
                    break
                default:
                    value = item.main.temp
            }
            allData.push({
                time: item.dt_txt,
                city: forecast.city.name,
                value,
                full: item
            })
        })
    })
    return allData
}
