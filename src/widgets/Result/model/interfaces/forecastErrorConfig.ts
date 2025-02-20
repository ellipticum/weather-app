export interface IForecastErrorConfig {
    transitional: {
        silentJSONParsing: boolean
        forcedJSONParsing: boolean
        clarifyTimeoutError: boolean
    }
    adapter: string[]
    transformRequest: Array<any> // Обычно null или функции
    transformResponse: Array<any> // Обычно null или функции
    timeout: number
    xsrfCookieName: string
    xsrfHeaderName: string
    maxContentLength: number
    maxBodyLength: number
    env: Record<string, unknown>
    headers: {
        Accept: string
        [header: string]: string
    }
    params: {
        q: string
        appid: string
        units: string
        lang: string
    }
    method: string
    url: string
}
