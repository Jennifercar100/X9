import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Route from "./route/route";

export default props => {
    return(
        <NavigationContainer>
            <Route />
        </NavigationContainer>
    )
}