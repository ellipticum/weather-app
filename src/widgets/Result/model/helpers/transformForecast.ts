import { IForecastResponse } from '../interfaces/forecastResponse'
import { IForecastItem } from '../interfaces/forecastItem'
import { Granularity } from '../types/granularity'

export const transformForecast = (
    forecast: IForecastResponse,
    granularity: Granularity
): IForecastItem[] => {
    if (granularity === '3h') {
        return forecast.list
    } else {
        const groups: { [date: string]: IForecastItem[] } = {}
        forecast.list.forEach((item) => {
            const date = item.dt_txt.split(' ')[0]
            if (!groups[date]) groups[date] = []
            groups[date].push(item)
        })
        const aggregated: IForecastItem[] = Object.entries(groups).map(([date, items]) => {
            const avg = (field: (item: IForecastItem) => number) =>
                items.reduce((sum, item) => sum + field(item), 0) / items.length
            return {
                dt: items[0].dt,
                dt_txt: date,
                main: {
                    temp: avg((item) => item.main.temp),
                    feels_like: avg((item) => item.main.feels_like),
                    pressure: avg((item) => item.main.pressure),
                    humidity: avg((item) => item.main.humidity),
                    temp_min: avg((item) => item.main.temp_min),
                    temp_max: avg((item) => item.main.temp_max)
                },
                weather: items[0].weather,
                clouds: { all: avg((item) => item.clouds.all) },
                wind: {
                    speed: avg((item) => item.wind.speed),
                    deg: avg((item) => item.wind.deg)
                },
                visibility: avg((item) => item.visibility),
                pop: avg((item) => item.pop),
                sys: items[0].sys
            } as IForecastItem
        })
        aggregated.sort((a, b) => a.dt - b.dt)
        return aggregated
    }
}
