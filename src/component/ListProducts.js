import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default ({data, deleteProduct}) => {

    function sendEan()
    {
        deleteProduct(data.ean)
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>produto: {data.name}</Text>
            <Text style={styles.title}>Validade: {data.date}</Text>
            <Text style={styles.title}>Código: {data.ean}</Text>
            <TouchableOpacity style={styles.button} onPress={sendEan}>
                <Text style={styles.textButton}>Deletar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        flex: 1,
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#fff",
        marginBottom: 20
    },
    title:{
        fontSize: 20,
        color: "#000",
        marginTop: 10
    },
    button:{
        width: "100%",
        height: 50,
        backgroundColor: "#7a34eb",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        borderRadius: 10
    },
    textButton:{
        fontSize: 20,
        color: "#fff"
    }
})