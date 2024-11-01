import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import CalendarModal from "./Calendar/CalendarModal";
import { format } from "date-fns";

export default ({ean, setVisible, save}) => {

    const [name, setName] = useState();
    const [eanScan, setEanScan] = useState(ean);
    const [modalVisible, setModalVisible] = useState(false);
    const [dateBr, setDateBr] = useState();
    const [dateDefault, setDateDefault] = useState(new Date());
    const [dateText, setDateText] = useState();

    useEffect(() => {


        let date = new Date(dateDefault);
        let onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000;
        let dateFormated = format(onlyDate, "yyyy-MM-dd");
        let dateFormatedText = format(onlyDate, "dd/MM/yyyy");
        let dateBr = new Date();
        setDateBr(dateBr.toLocaleString('pt-BR', { timeZoneName: 'longOffset', timeZone: 'America/Sao_Paulo' }));
        setDateDefault(dateFormated);
        setDateText(dateFormatedText);

    }, [dateDefault])

    function filterDateMovements(dateSelected){
        setDateDefault(dateSelected);
    }

    function sendData()
    {
        const dates = new Date(Date.now());
        const agendar = new Date(dateDefault);

        agendar.setMinutes(agendar.getMinutes() - 5040)

        let value = agendar.getTime() - dates.getTime();

        if(value < 0){
            Alert.alert("erro", "Por favor selecione uma data a cima de 4 dias para receber a notificação");
            return;
        }

        if(!name){
            Alert.alert("erro", "Por favor insira o nome do produto");
            return;
        }

        save(name, dateText, agendar.getTime());
    }

    function visible()
    {
        console.log('teste');
        setVisible();
    }

    return(
        <View style={{flex: 1, padding: 20, backgroundColor: "rgba(0,0,0,0.5)"}}>
            <TouchableOpacity style={styles.container} onPress={visible}/>
            
            <View style={styles.box}>
                <Text style={styles.title}>Adicionar Validade</Text>

                <View style={styles.boxInput}>
                    <View style={styles.boxIconInput}>
                        <TextInput style={styles.input}
                            placeholder="Nome do produto"
                            placeholderTextColor="#000"
                            value={name}
                            onChangeText={(text) => setName(text)} />
                    </View>
                </View>

                <View style={styles.boxInput}>
                    <View style={styles.boxIconInput}>
                        <TextInput style={styles.input}
                            placeholder="Código do produto" 
                            placeholderTextColor="#000"
                            value={eanScan} />
                    </View>
                </View>

                <TouchableOpacity style={styles.buttonCalendar} onPress={() => setModalVisible(true)}>
                    <Icon name="calendar" size={20} color="#000"/>
                    <Text style={styles.textCalendar}>{dateText}</Text>
                </TouchableOpacity>

                <Modal visible={modalVisible} animationType="fade" transparent={true}>
                    <CalendarModal setVisible={() => setModalVisible(false)}
                        handleFilter={filterDateMovements}/>
                </Modal>

                <TouchableOpacity style={styles.button} onPress={sendData}>
                    <Text style={styles.textButton}>Salvar</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.container} onPress={visible} />
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        
    },
    box:{
        width: "100%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10
    },
    close:{
        position: "absolute",
        right: 20,
        top: 20,
    },
    title:{
        width: "100%",
        textAlign: "center",
        fontSize: 22,
        color: "#000"
    },
    boxInput:{
        width: "100%",
        marginTop: 20
    },
    boxIconInput:{
        width: "100%",
        flexDirection: "row",
        alignItems: "center"
    },
    input:{
        width: "100%",
        borderBottomWidth: 1,
        color: "#000"
    },
    buttonCalendar:{
        flexDirection: 'row',
        marginTop: 20,
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
    textCalendar:{
        color: "#000",
        paddingLeft: 10,
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