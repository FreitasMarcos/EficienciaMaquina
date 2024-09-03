import axios from "axios";

const eficienciaMaquina = axios.create({
    baseURL: 'http://10.0.2.2:5000/'
})

export default eficienciaMaquina