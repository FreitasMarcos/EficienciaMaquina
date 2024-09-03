import {StyleSheet, View,StatusBar} from 'react-native'
import Routes from './screens/routes/routes';
import { UsuarioContextProvider } from './Contexts/UserContext';

export default function App() {
  return (
    <View style={styles.container}>
       <StatusBar animated={false} />
      <UsuarioContextProvider>
        <Routes/>
      </UsuarioContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})