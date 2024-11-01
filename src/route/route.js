import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Escanear from "../pages/Escanear";
import ListaProdutos from "../pages/ListaProdutos";
import Icon from "react-native-vector-icons/FontAwesome";

const Bottom = createBottomTabNavigator();

export default props => {
    return(
        <Bottom.Navigator>
            <Bottom.Screen
                name="Escanear"
                component={Escanear}
                options={{
                    title:"Escanear",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="camera" color={color} size={size} />
                      ),
                }}
            />
            <Bottom.Screen
                name="Produtos"
                component={ListaProdutos}
                options={{
                    title:"Produtos",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="th-list" color={color} size={size} />
                      ),
                }}
            />
        </Bottom.Navigator>
    )
}