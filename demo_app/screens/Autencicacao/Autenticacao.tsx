import React,{useState, useContext} from 'react'
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native'
import api from '../../api/eficienciaMaquina'
import {useNavigation} from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ParamentroRota } from '../routes/routes'
import { usuarioContext } from '../../Contexts/UserContext'
import { styles } from './styles'
import { LinearGradient } from 'expo-linear-gradient'

type TelaInicial = NativeStackNavigationProp<ParamentroRota, "Inicial">
type Criacaousuario = NativeStackNavigationProp<ParamentroRota, "Inicial">


export function Autenticacao(){

    const [email, setEmail] = useState<string>('')
const [senha, setSenha] = useState<string>('')
const {usuarioInfo, setUsuario} = useContext(usuarioContext)

const navegacaoInicial = useNavigation<TelaInicial>()
const navegacaoCriacaoUser = useNavigation<Criacaousuario>()

async function requesicaoAutenticacao(){

    console.log(email, senha)
    await api.post('autenticacao/entrar',{
        email:email,
        senha:senha
    },{
        headers:{
             "Content-Type": "application/json"
        }
    }).then(async (response) =>{
        setUsuario(response.data)
        setTimeout(() => {
            navegacaoInicial.navigate("Inicial")
        }, 1000);
    }).catch((e)=>{

    })
}

    return(
        <LinearGradient colors={['#B3B3FF', '#535353']} style={styles.container}>
            <Text style={styles.title}>Entrar</Text>
            <TextInput 
                style={styles.input}
                placeholder='E-mail'
                placeholderTextColor='white'
                onChangeText={setEmail}
                value={email}
            />
            <TextInput 
                style={styles.input}
                placeholder='Senha' 
                placeholderTextColor='white'
                secureTextEntry
                onChangeText={setSenha}
                value={senha}
            />
            <TouchableOpacity style={styles.buttonSignIn} onPress={() => requesicaoAutenticacao()}>
                <Text style={styles.buttonSignInTitle}>Acessar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSignUp} onPress={() => navegacaoCriacaoUser.navigate("NovoUsuario")}>
                <Text style={styles.buttonSignUpTitle}>Criar Conta</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}