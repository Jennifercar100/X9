import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import { Camera, useCameraDevice, useCodeScanner ,useCameraPermission, PermissionsPage } from "react-native-vision-camera";

export default ({getCode}) => {

    const device = useCameraDevice('back')

    const [permissionCamera, setPermissionCamera] = useState(false);


    useEffect(() => {

        async function permission(){
            const newCameraPermission = await Camera.requestCameraPermission();
            if(newCameraPermission === 'granted'){
                setPermissionCamera(true);
            }
        }
       

        

        permission();

    }, []);

    const codeScanner = useCodeScanner({
        codeTypes: ['ean-13'],
        onCodeScanned: (codes, frame) => {
        let value = JSON.stringify(
            codes.map(({ value }) => value))

            getCode(value);
        }

        

      })

    async function permissionCameraAgain(){

        const newCameraPermission = await Camera.requestCameraPermission();
            if(newCameraPermission === 'granted'){
                setPermissionCamera(true);
            }
    }

    function view(){
        if(permissionCamera){
            return(
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={true}
                    codeScanner={codeScanner}
                    photoQualityBalance="balance"
                    />    
            )
        }else{
            return(
                <View style={styles.BoxModal}>
                    <TouchableOpacity onPress={permissionCameraAgain} style={styles.Button}>
                        <Text>Acessar camera</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    return(
        <View style={styles.container}>           
            {view()}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    BoxModal:{
        height: "auto",
        padding: 10,
        backgroundColor: "#fff",
        width: "100%",
    },
    Button:{
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#7a34eb"
    }
})