import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import ListProducts from "../component/ListProducts";
import { useIsFocused } from "@react-navigation/native";
import notifee from "@notifee/react-native";

export default props => {

    const [products, setProducts] = useState();
    const isFocused = useIsFocused();
    const [reload, setReload] = useState(false);

    useEffect(() => {

        let isActive = true;

        async function getProducts(){
            const storage = await AsyncStorage.getItem("@products");

            if(storage){
                setProducts(JSON.parse(storage));
            }
        }

        getProducts();

        return () => isActive = false;

    }, [isFocused, reload]);

    console.log(products)

    async function deleteProduct(ean)
    {

        let notification = products.filter(product => product.ean == ean);

        cancelNotification(notification[0].notification);

        let search = products.filter(product => product.ean != ean);
        
        const save = AsyncStorage.setItem("@products", JSON.stringify(search));

        Alert.alert("Sucesso", "Produto removido com sucesso");



        if(reload){
            setReload(false);
        }else{
            setReload(true);
        }
    }

    async function cancelNotification(id)
    {
        await notifee.cancelNotification(`${id}`);
    }

    function viewList()
    {
        if(products){
            return(
                <FlatList
                data={products}
                keyExtractor={item => `${item.ean}`}
                renderItem={({item}) => <ListProducts data={item} deleteProduct={deleteProduct}/>}
                />
            )
        }else{
            return(
                <Text style={styles.title}>Nenhum produto adicionado</Text>
            )
        }
    }

    return(
        <View style={styles.container}>
            {viewList()}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20
    },
    title:{
        fontSize: 20,
        color: "#000",
        width: "100%",
        textAlign: "center",
        marginTop: 20
    }
})