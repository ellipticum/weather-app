export interface IForecastItem {
    dt: number
    dt_txt: string
    main: {
        temp: number
        feels_like: number
        pressure: number
        humidity: number
        temp_min: number
        temp_max: number
    }
    weather: Array<{
        id: number
        main: string
        description: string
        icon: string
    }>
    clouds: { all: number }
    wind: { speed: number; deg: number }
    visibility: number
    pop: number
    sys: { pod: string }
}
