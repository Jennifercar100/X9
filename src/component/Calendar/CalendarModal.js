import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

import { Calendar, LocaleConfig } from "react-native-calendars";
import { ptBR } from "./LocaleCalendar";

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

export default ({setVisible, handleFilter}) =>{

    const [dateNow, setDateNow] = useState(new Date());
    const [markedDates, setMarkedDates] = useState({});

    function handleOnDayPress(date){

        setDateNow(new Date(date.dateString));

        let markedDay = {};

        markedDay[date.dateString] = {
            selected: true,
            selectedColor: "#3b3dbf",
            textColor: "#fff"
        }

        setMarkedDates(markedDay);
    }

    function handleFilterDate(){
        handleFilter(dateNow);
        setVisible();
    }


    return(
        <View style={styles.Container}>
            <TouchableWithoutFeedback onPress={setVisible} >
                <View style={{flex: 2}}></View>
            </TouchableWithoutFeedback>
            <View style={styles.ModalContent}>

                <Calendar
                    onDayPress={handleOnDayPress}
                    markedDates={markedDates}
                    enableSwipeMonths={true}
                    theme={{
                        todayTextColor: "#ff0000",
                        selectedDayBackgroundColor: "#00adf5",
                        selectedDayTextColor: "#fff"
                    }}
                />

                <TouchableOpacity style={styles.ButtonFilter} onPress={handleFilterDate} >
                    <Text style={styles.ButtonFilterText}>Filtrar</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    Container:{
        flex: 1,
        backgroundColor: "rgba(34,34,34,0.4)"
    },
    ModalContent:{
        flex: 2,
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: 14,
    },
    ButtonFilter:{
        height: 45,
        backgroundColor: "#7a34eb",
        justifyContent: "center",
        alignItems: "center",
        bordeRadius: 8,
    },
    ButtonFilterText:{
        color: "#fff",
        fontSize: 19,
        fontWeight: "bold"
    }

});