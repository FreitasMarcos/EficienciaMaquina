export interface climaType {
    coord: coord,
    weather: weather[],
    base: string,
    main: main,
    visibility: number,
    wind: wind,
    clouds: clouds,
    dt: number,
    sys: sys,
    timezone: number,
    id: number,
    name: string,
    cod: number

}

interface coord{
    lon: number
    lat: number
}

interface weather{
    id: number,
    main: string,
    description: string,
    icon: string,
}
interface weather{
    id: number,
    main: string,
    description: string,
    icon: string,
}

interface main{
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
}

interface wind {
    speed:number,
    deg:number,
    gust:number
}

interface clouds{
    all: number
}

interface sys{
    country: string,
    sunrise: number,
    sunset: number
}