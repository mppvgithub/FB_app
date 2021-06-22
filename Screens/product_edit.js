import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, SafeAreaView, View, Text, ActivityIndicator, TouchableHighlight, BackHandler, LogBox, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'react-native-elements';
// import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get_addQuotes, deleteQuote } from "./stores/actions";

import { Container, Content, Header, Row, Col, } from 'native-base'
// import ListItem from "./ListItem";
LogBox.ignoreAllLogs(true)
export default function product_edit(props) {
    const dispatch = useDispatch();
    const { navigation } = props;

    const BASE_URL = 'http://192.168.43.137:9000';


    //1 - DECLARE VARIABLES
    const [itemName, setitemName] = useState("");
    const [itemId, setitemId] = useState("");
    const [itemDescription, setitemDescription] = useState("");
    const [itemAmount, setitemAmount] = useState(0);

    let menu_data = {}

    // console.log("menu_data", menu_data)


    //==================================================================================================

    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        getData()
    }, []);

    useEffect(() => {
        const backAction = () => {
            navigation.navigate("dashboard")
            return true;
        };
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, []);

    const getData = async () => {
        menu_data = await navigation.getParam('menu', {})
        await setitemName(menu_data.itemName);
        await setitemDescription(menu_data.itemDescription);
        await setitemAmount(menu_data.itemAmount);
        await setitemId(menu_data.itemId)
        await console.log("menu_data", menu_data, itemName, itemDescription, itemAmount, itemId)
    }
    //==================================================================================================

    //3 - GET FLATLIST DATA
    const update_data = () => {
        fetch(BASE_URL + "/update_menu", {
            method: 'post',
            headers: {
                // 'Authorization': 'Basic YWRtaW46MTIzNA==',
                'Content-Type': 'application/json',
                // 'X-API-KEY': 'RfTjWnZr4u7x!A-D' 
            },
            // body: formBody
            body: JSON.stringify({
                "itemAmount": itemAmount,
                "itemDescription": itemDescription,
                "itemId": itemId,
                // "itemImage": menu_data.itemImage,
                "itemName": itemName,
            })
        }).then((response) => response.json())
            .then(async (res) => {
                console.log("update_menu res", res)
            }).catch((error) => {
                console.log("entire_details error", error)
            });
    };


    //==================================================================================================

    //7 - RENDER

    return (
        <Container>
            <Header>
                <Row style={{ width: "100%" }}>
                    <View style={{ alignItems: "center", justifyContent: "center", width: "20%" }}>
                        <Text onPress={() => { navigation.navigate("product_list") }}>Menu</Text>
                    </View>
                    <View style={{ backgroundColor: "red", alignItems: "center", justifyContent: "center", width: "60%" }}>
                        <Text>Menu edit</Text>
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "center", width: "20%" }}>
                        {/* <Text>Next</Text> */}
                    </View>
                </Row>
            </Header>
            <Content style={{ paddingLeft: 20, paddingRight: 20 }}>
                <View style={styles.view_style}>
                    <Text>itemId: {itemId}</Text>
                </View>
                <View style={styles.view_style}>
                    <Text>itemName</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => { setitemName(text) }}
                        value={itemName}
                        placeholder="itemName"
                    />
                </View>
                <View style={styles.view_style}>
                    <Text>itemAmount</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => { setitemAmount(text) }}
                        value={itemAmount}
                        placeholder="itemAmount"
                        keyboardType="numeric"

                    />
                </View>
                <View style={styles.view_style}>
                    <Text>itemDescription</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => { setitemDescription(text) }}
                        value={itemDescription}
                        placeholder="itemDescription"
                    />
                </View>
                <View style={styles.view_style, { height: 50, marginTop: 20, alignItems: "center", justifyContent: "center" }}>

                    <TouchableOpacity style={{ width: 80, height: 40, backgroundColor: "#a3a3a3", alignItems: "center", justifyContent: "center" }}
                        onPress={() => {
                            update_data()
                        }}>
                        <Text>Update</Text>
                    </TouchableOpacity>
                </View>

            </Content>
        </Container>
    );

};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "transparent",
    },

    activityIndicatorContainer: {
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    view_style: {
        top: 10
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
});