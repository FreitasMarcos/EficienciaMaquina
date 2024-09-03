import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: 'center',
       /*  backgroundColor: '#007500' */
    },
    title:{
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white'
    },
    input:{
        backgroundColor: '#000000',
        color: 'white',
        width: width/1.2,
        height: height/ 19,
        borderRadius: 7,
        paddingLeft: 7,
        marginVertical: 7
    },

    button:{
        backgroundColor: 'white',
        width: width/1.2,
        height: height/ 19,
        borderRadius: 7,
        marginVertical: 5,

        justifyContent: "center",
    },

    buttonTitle:{
        fontWeight: 'bold',
        color: '#535353',
        textAlign:'center',
        fontSize: 18
    },



})