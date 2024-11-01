import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from "react-native";
import Scan from "../component/Scan";
import AddProduct from "../component/AddProduct";
import AsyncStorage from "@react-native-async-storage/async-storage";
import notifee, {AndroidImportance, AuthorizationStatus, EventType, TriggerType} from "@notifee/react-native";

export default props => {

    const [modalCamera, setModalCamera] = useState(false);
    const [modalProduct, setModalProduct] = useState(false);
    const [ean, setEan] =useState();
    const [products, setProducts] = useState();
    const [statusNotification, setStatusNotification] = useState(true);
    const [notificationId, setNotificationId] = useState();

    useEffect(() => {

        async function getPermission(){

            await notifee.getTriggerNotificationIds().then((ids) => {
                console.log(ids);
            })

            const settings = await notifee.requestPermission();
            if(settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED){
                console.log("Permission: ", settings.authorizationStatus);
                setStatusNotification(true);
            }else{
                setStatusNotification(false);
                console.log("usuario negou");
            }
            
        }

        getPermission();

    }, []);

    useEffect(() => {

        return notifee.onForegroundEvent(({type, detail}) => {
            switch(type){
                case EventType.DISMISSED:
                    console.log("Usuario descartou a notificação");
                    break;
                
                    case EventType.PRESS:
                    console.log("Tocou ", detail.notification)
            }
        })

    }, []);

    notifee.onBackgroundEvent(async ({type, detail}) => {
        const {notification, pressAction} = detail;

        if(type === EventType.PRESS){
            console.log("tocou na notificação");
        }
    });

    async function save(name, date, dateDefault){

        const storage = await AsyncStorage.getItem("@products");

        if(storage){
            
            const storageProduct = JSON.parse(storage);

            let search = storageProduct.filter(product => product.ean == ean);
            
            if(search.length > 0){
                Alert.alert("atenção!", "Esse produto ja foi adicionado antes");
                setModalProduct(false);
                return;
            }

                const notification = await triggerNotification(dateDefault);      

                let product =
                {
                    "name": name,
                    "ean": ean,
                    "date": date,
                    "notification": notification
                }; 

                storageProduct.push(product)

                await AsyncStorage.setItem("@products", JSON.stringify(storageProduct));

        }else{

            const notification = triggerNotification(dateDefault);

            let product =
            {
                "name": name,
                "ean": ean,
                "date": date,
                "notification": notification
            };

            

            await AsyncStorage.setItem("@products", JSON.stringify([product]));
            

        }
        setModalProduct(false);
        
        Alert.alert("sucesso", "A validate do produto "+name+" foi salva com sucesso para o dia "+ date)
    }

    function getCode(value){

        let remove = value.replace(/\["/, "");
        let remove2 = remove.replace(/\"]/,"");

        let newEan = "";
    
        if(remove2.length < 13){
    
            
    
            for(i = remove2.length; i < 13; i++){
                newEan += 0;
            }
    
            
        }


        setEan(newEan + remove2);
        setModalCamera(false);
        setModalProduct(true);
    }

    async function triggerNotification(date)
    {
    
        const trigger = {
          type: TriggerType.TIMESTAMP,
          timestamp: date
        }

        const notification = await notifee.createTriggerNotification({
            title: "produto vencnedo",
            body: "O produto vai vencer em 4 dias",
            android:{
                channelId: ean,
                importance: AndroidImportance.HIGH,
                pressAction:{
                    id: 'default'
                }
            }
        }, trigger)

        return notification;
    }

    function listNotifee()
    {
        notifee.getTriggerNotificationIds()
        .then((ids) => {
            console.log(ids);
        })
    }

    return(
        <View style={styles.container}>
            <Modal animationType="fade" transparent={true} visible={modalCamera} >
                <Scan getCode={getCode}/>
            </Modal>
            <Modal animationType="slide" transparent={true} visible={modalProduct} >
                <AddProduct setVisible={() => setModalProduct(false)} ean={ean} save={save}/>
            </Modal>
            <TouchableOpacity style={styles.button} onPress={() => setModalCamera(true)}>
                <Text style={styles.textButton}>Escanear Código</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        width: "100%",
        height: 50,
        backgroundColor: "#7a34eb",
        justifyContent: "center",
        alignItems: "center"
    },
    textButton:{
        fontSize: 20,
        color: "#fff"
    }
})