import axios from 'axios'
import { IForecastResponse } from '@/widgets/Result/model/interfaces/forecastResponse'
import { IForecastError } from '@/widgets/Result/model/interfaces/forecastError'

export const fetchData = async (city: string): Promise<IForecastResponse | IForecastError> => {
    try {
        const key = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
        const url = process.env.NEXT_PUBLIC_OPENWEATHER_API_URL
        const units = process.env.NEXT_PUBLIC_OPENWEATHER_UNITS || 'metric'
        const lang = process.env.NEXT_PUBLIC_OPENWEATHER_LANG || 'ru'

        if (!url) {
            throw new Error('Invalid API URL')
        }
        if (!key) {
            throw new Error('Invalid API Key')
        }

        const { data } = await axios.get<IForecastResponse>(`${url}/forecast`, {
            params: {
                q: city,
                appid: key,
                units,
                lang
            }
        })

        console.log(data)

        return data
    } catch (error: any) {
        console.error('Error fetching data:', error?.message || error)

        return error
    }
}
