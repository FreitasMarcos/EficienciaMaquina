import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import type, {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Inicial } from '../Inicial/Inicial';
import {NovoUsuario}  from '../Autencicacao/NovoUsuario/NovoUsuario'
import { Autenticacao } from '../Autencicacao/Autenticacao';

const Stack = createNativeStackNavigator();

export type ParamentroRota = {
    Autenticacao: undefined
    Inicial: undefined,
    NovoUsuario: undefined
}

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
          headerShown: false,
          }}
      >
          <Stack.Screen name="Autenticacao" component={Autenticacao} />
          <Stack.Screen name="Inicial" component={Inicial} />
          <Stack.Screen name="NovoUsuario" component={NovoUsuario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}