import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, SafeAreaView, View, Text,StatusBar, ActivityIndicator, Image,TouchableHighlight, BackHandler, LogBox, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'react-native-elements';
// import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get_addQuotes, deleteQuote } from "./stores/actions";
import {BASE_URL} from '../config/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Container, Content, Header, Row, Col, } from 'native-base';
import * as colors from '../assets/css/Colors'

// import ListItem from "./ListItem";
LogBox.ignoreAllLogs(true)
export default function product_edit(props) {
    const dispatch = useDispatch();
    const { navigation } = props;

    // const BASE_URL = 'http://192.168.43.137:9000';


    //1 - DECLARE VARIABLES
    const [itemName, setitemName] = useState("");
    const [itemId, setitemId] = useState("");
    const [itemDescription, setitemDescription] = useState("");
    const [itemAmount, setitemAmount] = useState(0);
    const [itemQty, setitemQty] = useState(0);

    let menu_data = {}

    // console.log("menu_data", menu_data)


    //==================================================================================================

    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        // getData()
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
    const add_data = () => {
        fetch(BASE_URL + "/insert_menu", {
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
                // "itemId": itemId,
                "itemImage": "itemImage",
                "itemName": itemName,
                "itemQty": itemQty
            })
        }).then((response) => response.json())
            .then(async (res) => {
                console.log("insert_menu res", res)
                navigation.navigate('product_list')
            }).catch((error) => {
                console.log("entire_details error", error)
            });
    };


    //==================================================================================================

    //7 - RENDER

    return (
        <Container style={{}}>
            <Header style={{ backgroundColor: "transparent" }}>
            <StatusBar translucent={false}  backgroundColor={colors.status_bar} barStyle="light-content"  />
            <Row style={{ width: "100%", }}>
                        <View style={{ alignItems: "center", justifyContent: "center", width: "20%" }}>
                            {/* <Text onPress={() => { navigation.navigate("mongo_curd") }}>Back</Text> */}
                            <FontAwesome onPress={() => { navigation.navigate("product_list") }} style={{ color: "#000", fontSize: 30, }} name={"hand-o-left"} />
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center", width: "60%" }}>
                            <Text>Add Product</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "20%" }}>
                            
                        </View>
                    </Row>
            </Header>
            <Content style={{ backgroundColor:colors.bg_color, paddingLeft: 20, paddingRight: 20 }}>
                
                <View style={styles.view_style}>
                    <Text>Item name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => { setitemName(text) }}
                        value={itemName}
                        placeholder="itemName"
                    />
                </View>
                <View style={styles.view_style}>
                    <Text>Price</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => { setitemAmount(text) }}
                        value={itemAmount}
                        placeholder="itemAmount"
                        keyboardType="numeric"

                    />
                </View>
                <View style={styles.view_style}>
                    <Text>Description</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => { setitemDescription(text) }}
                        value={itemDescription}
                        placeholder="itemDescription"
                    />
                </View>
                <View style={styles.view_style}>
                    <Text>Quantity</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => { setitemQty(text) }}
                        value={itemQty}
                        placeholder="itemQty"
                    />
                </View>
                <View style={styles.view_style, { height: 50, marginTop: 20, alignItems: "center", justifyContent: "center" }}>

                    <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }}
                        onPress={() => {
                            add_data()
                        }}>
                        {/* <Text>Add</Text> */}
                        <Image source={require('../assets/img/save.png')} style={{ flex: 1, marginLeft: 8, width: 50, height: 50, resizeMode: "contain" }} />
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
        // height: 40,
        // margin: 12,
        // borderWidth: 1,

        height: 50,
        width: "95%",
        marginTop: 20,
        marginBottom: 20,
        borderColor: "#fff",
        borderWidth: 1,
        fontSize: 15,
        borderRadius: 20,
        backgroundColor: "#e1ebfc",
        padding: 10,
        paddingLeft: 20,
        // color: colors.blue
    },
});