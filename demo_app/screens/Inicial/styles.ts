import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export const styles = StyleSheet.create({

    container:{
        padding:3,
        flex: 1,
        flexDirection: 'column'
    },

    title:{
        alignSelf: 'center',
        fontSize: 20,
    },

    conteinerCard:{
        flexDirection: 'row',
        alignContent: 'space-between',
        justifyContent: 'space-between',
        marginBottom: 15
    },

    card:{
        padding: 10,
        flexDirection: 'column',
        height: height/7,
        width:width/2.5,
        justifyContent: "center",
        alignContent: "center",
        borderRadius:7
    },

    cardContainerTitle:{
        fontSize: 50, 
        fontWeight: 'bold',
        color: 'white'
    },


    cardEficienciaContainer:{
        flexDirection: 'row',
        alignContent: 'space-between',
        justifyContent: 'space-between',
        marginBottom: 15
    },

    cardEficiencia:{
        padding: 10,
        flexDirection: 'column',
        height: height/7,
        width:width/2.5,
        justifyContent: "center",
        alignContent: "center",
        borderRadius:7
    }
})