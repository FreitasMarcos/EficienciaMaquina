import axios from "axios";

export const weather  = axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5/`
   /*  baseURL: `https://api.openweathermap.org/data/2.5/weather?q=${patrocinio}&units=metric&appid=e79512845a3faf57470de2b140b00312&lang=pt_br` */
   
})