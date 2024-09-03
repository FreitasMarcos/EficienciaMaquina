import React, { useContext, useEffect, useState } from 'react'
import {View, Text,Dimensions, Image, ActivityIndicator} from  'react-native'
import { LineChart} from "react-native-chart-kit";
import { usuarioContext } from '../../Contexts/UserContext';
import { weather } from '../../api/weather';
import eficienciaMaquina from '../../api/eficienciaMaquina';
import { climaType } from './type';
import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';

interface eficienciaType{
    temperatura: number,
    eficiencia: number,
    criadoEm: Date
}

export function Inicial(){

    const {usuarioInfo} = useContext(usuarioContext)
    const [clima, setclima] = useState<climaType>()
    const [eficiencia, setEficiencia] = useState<eficienciaType[]>([])
    const [atual, setAtual]  = useState<eficienciaType>()

    async function weatherRequest(){
        await weather.get(`weather?q=${usuarioInfo?.cidade}&units=metric&appid=0da14e4cc3acc2080621d592a47cd9ff&lang=pt_br`,{
            headers:{
                "Content-Type": "multipart/form-data",
            }
        }).then((r)=>{
            setclima(r.data)
        }).catch((e)=>{
        })
    }

    async function requestSalvarDados(){

        await eficienciaMaquina.post('eficiencia-maquina/criar',{
            temperatura: clima?.main.temp,
            usuarioId: usuarioInfo?.id
        },{
            headers:{
                "Content-Type": "application/json"
            }
        }).then(async (response) =>{
            setAtual(response.data)
            console.log(atual)
        }).catch((e)=>{
            requestSalvarDados()
        })
    }

    async function retornaEficiencia(){
        await eficienciaMaquina.get(`eficiencia-maquina/eficienciaHistorico/${usuarioInfo?.id}`,{
            headers:{
                "Content-Type": "application/json"
            }
        }).then(async (response) =>{
            setEficiencia(response.data.slice(-15))
        }).catch((e)=>{
            console.log(e)
        })
    }

    useEffect(()=>{
        async function fetchData() {
            await weatherRequest();
            await requestSalvarDados(); 
            await retornaEficiencia(); 
        }
        fetchData(); 
        const interval = setInterval(() => {
            weatherRequest();
            atual?.criadoEm
            requestSalvarDados(); 
            retornaEficiencia(); 
        }, 30000);

        return () => clearInterval(interval);

    },[clima?.main.temp])

    return(
        <View style={styles.container}>
            <View style={styles.conteinerCard}>
                <LinearGradient colors={['#B3B3FF', '#535353']} style={styles.card}>
                    <Text style={{color: 'white'}}>Temperatura</Text>
                    <Text style={styles.cardContainerTitle}>{clima?.main.temp&&(Math.trunc(clima?.main.temp))}°C</Text>
                </LinearGradient>
                <LinearGradient colors={['#B3B3FF', '#535353']} style={styles.card}>
                    <Text style={{color: 'white'}}>Eficiência</Text>
                    <Text style={styles.cardContainerTitle}>{atual?.eficiencia}%</Text>
                </LinearGradient>
            </View>
            <Text style={{fontSize:30, alignSelf:'center' }}>Temperatura e Eficiência</Text>
            {
                eficiencia.length <=0 ?
                    <ActivityIndicator size="large" color='#449F94' />
                :
                    <LineChart
                        data={{
                        labels: eficiencia.map((item)=> String(item.temperatura)),
                        datasets: [
                            {
                                data: eficiencia.map(item => item.eficiencia),
                            },
                            
                        ]
                        }}
                        width={Dimensions.get("window").width} // from react-native
                        height={Dimensions.get("window").height/3}
                        yAxisSuffix="%"
                        xAxisLabel='°C'
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: '#535353',
                        backgroundGradientTo: '#B3B3FF',
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                    
            }
            <Text>Última atualização {moment(atual?.criadoEm).format('DD/MM/YYYY')} {String(atual?.criadoEm).slice(11,16)}</Text>
        </View>
    )
}