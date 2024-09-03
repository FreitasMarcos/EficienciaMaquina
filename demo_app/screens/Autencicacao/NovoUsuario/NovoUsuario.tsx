import { useState } from 'react'
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native'
import eficienciaMaquina from '../../../api/eficienciaMaquina'

import {useNavigation} from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ParamentroRota } from '../../routes/routes'
import { styles } from './styles'
import { LinearGradient } from 'expo-linear-gradient'

type Autenticacao = NativeStackNavigationProp<ParamentroRota, "Autenticacao">

export function NovoUsuario(){

    const [nome,setNome] = useState<string>('')
    const [cidade,setCidade] = useState<string>('')
    const [email,setEmail] = useState<string>('')
    const [senha,setSenha] = useState<string>('')

    const navegacaoAutenticacao = useNavigation<Autenticacao>()
    
    async function requestNovoUsuario(){
        console.log(nome, email, senha, cidade)
        await eficienciaMaquina.post('autenticacao/criar',{
            nome: nome,
            email: email,
            senha: senha,
            cidade: cidade
        },{
            headers:{
                "Content-Type": "application/json"
            }
        }).then((r)=>{
            Alert.alert(
                'Sucesso!!',
                'Usuário criado com sucesso.',
                [
                    {
                        text: 'Confirmar',
                    }
                ]
            )
            navegacaoAutenticacao.navigate('Autenticacao')
        }).catch((e)=>{
            Alert.alert(
                'Atenção',
                'Falha ao criar usuário.',
                [
                    {
                        text: 'Confirmar',
                    }
                ]
            )
        })
    }

    return(
        <LinearGradient colors={['#B3B3FF', '#535353']} style={styles.container}>
            <Text style={styles.title}>Novo Usuário</Text>
            <TextInput
                placeholderTextColor='white'
                style={styles.input} 
                placeholder='Nome'
                onChangeText={setNome}
                value={nome}
            />
            <TextInput
                placeholderTextColor='white'
                style={styles.input} 
                placeholder='Cidade'
                onChangeText={setCidade}
                value={cidade}/>
            <TextInput
                placeholderTextColor='white'
                style={styles.input} 
                placeholder='E-mail' 
                onChangeText={setEmail} 
                value={email}
            />
            <TextInput
                placeholderTextColor='white'
                style={styles.input} 
                placeholder='Senha' 
                secureTextEntry
                onChangeText={setSenha}
                value={senha}/>
            <TouchableOpacity style={styles.button} onPress={()=> requestNovoUsuario()}>
                <Text style={styles.buttonTitle}>Criar Conta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=> navegacaoAutenticacao.navigate('Autenticacao')}>
                <Text style={styles.buttonTitle}>Voltar</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}