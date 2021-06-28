import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ActivityIndicator,
    TouchableHighlight,
    BackHandler,
    LogBox,
    Alert,
    TouchableOpacity,
    Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { get_addQuotes, get_addMenu, deleteQuote, add_menu } from "./stores/actions";
import { BASE_URL } from '../config/Constants'

import { Divider } from 'react-native-elements';
import { Container, Content, Header, Col, Row } from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import ListItem from "./ListItem";
LogBox.ignoreAllLogs(true)
export default function product_list_cus(props) {
    const dispatch = useDispatch();
    const { navigation } = props;

    // const BASE_URL = 'http://192.168.43.137:9000';

    //1 - DECLARE VARIABLES
    const [isFetching, setIsFetching] = useState(false);
    const [product_details, setProduct_details] = useState([])

    //Access Redux Store State
    const dataReducer = useSelector((state) => state.dataReducers);
    console.log("IN STORE dataReducer -->", dataReducer)
    const { quotes } = dataReducer;
    console.log("quotes", quotes)
    const { menus } = dataReducer;
    console.log("menus", menus)

    let menu_ = {} // save the async storage value
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

    //==================================================================================================

    //3 - GET FLATLIST DATA
    const getData = async () => {
        await AsyncStorage.getItem('menus', (err, menus) => {
            console.log("Get menus from async", menus)
            if (err) {
                alert(err.message);
            }
            else if (menus !== "null" && menus !== null) {
                dispatch(get_addMenu(JSON.parse(menus)));
            }
        });

        fetch(BASE_URL + "/menus_list", {
            method: 'post',
            headers: {
                // 'Authorization': 'Basic YWRtaW46MTIzNA==',
                'Content-Type': 'application/json',
                // 'X-API-KEY': 'RfTjWnZr4u7x!A-D' 
            },
            // body: formBody
            // body: JSON.stringify({
            //     "email": entire_email,

            // })
        }).then((response) => response.json())
            .then(async (res) => {
                console.log("product_details res", res)
                setProduct_details(res.data)
                console.log("product_details", product_details)
            }).catch((error) => {
                console.log("entire_details error", error)
            });
    };

    const addcart = (item) => {
        //details to save in store
        var details = {
            "itemAmount": item.itemAmount,
            "itemId": item.itemId,
            "itemName": item.itemName,
            "itemQty": item.itemQty,
            "itemSelcted": 1
        }
        console.log("details", details)
        var menu_arr = []
        AsyncStorage.getItem('menus', (err, menus) => {
            console.log("async menu", menus)
            if (err) alert(err.message)

            else if (menus !== "null" && menus !== null) {
                menus = JSON.parse(menus)
                console.log("available menus", menus)
                console.log("details------", details)
                menus.unshift(details)

                AsyncStorage.setItem('menus', JSON.stringify(menus), () => {
                    dispatch(add_menu(details));
                });
            } else {
                menu_arr.push(details)
                console.log("menu_arr", menu_arr)
                AsyncStorage.setItem('menus', JSON.stringify(menu_arr), () => {
                    dispatch(add_menu(details));
                });
            }
        })

        // to push details in store

    }


    //==================================================================================================

    //7 - RENDER
    if (isFetching) {
        return (
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator animating={true} />
            </View>
        );
    } else {
        return (
            <Container>
                <Header style={{ backgroundColor: "transparent" }}>
                    <Row style={{ width: "100%", }}>
                        <View style={{ alignItems: "center", justifyContent: "center", width: "20%" }}>
                            {/* <Text onPress={() => { navigation.navigate("mongo_curd") }}>Back</Text> */}
                            <FontAwesome onPress={() => { navigation.navigate("mongo_curd") }} style={{ color: "#000", fontSize: 30, }} name={"hand-o-left"} />
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center", width: "60%" }}>
                            <Text>Buy Product</Text>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center", width: "20%" }}>
                            {/* <Text>Next</Text> */}
                            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }} onPress={() => { navigation.navigate("cart") }}>
                                {/* <FontAwesome style={{ color: "#000", fontSize: 30, }} name={"opencart"} /> */}
                                <Image source={require('../assets/img/cart.png')} style={{  width: 25, height: 25, resizeMode: "contain" }} />
                                <Text style={{ backgroundColor: "red", borderRadius: 10, color: "#fff", fontSize: 10 }}>  {menus.length}  </Text>

                            </TouchableOpacity>
                        </View>
                    </Row>
                </Header>
                <Content style={styles.container}>
                    <FlatList
                        data={product_details}
                        // renderItem={renderItem}
                        renderItem={({ item, index }) => (
                            <View style={{
                                height: 150, width: "47%", marginTop: 10, marginLeft: '2%',
                                borderRadius: 15,
                                padding: 10,
                                elevation: 10,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.5,
                                shadowRadius: 5,
                                backgroundColor: "#ffc47d"
                            }}>
                                <View style={{ alignItems: "center", justifyContent: "center", height: 60, }}>
                                    <View style={{ alignItems: "center", justifyContent: "center", width: "100%", }}>
                                        <Text style={{ fontSize: 20 }}>{item.itemName}</Text>
                                    </View>

                                </View>
                                <View style={{ alignItems: "center", justifyContent: "center", height: 20, }}>
                                    <View style={{ alignItems: "center", justifyContent: "center", width: "100%", }}>
                                        <Text styles={{ fontWeight: 200, fontSize: 18 }}>${item.itemAmount}</Text>
                                    </View>

                                </View>
                                <Divider style={{ backgroundColor: '#999' }} />
                                <View style={{ height: 70, alignItems: "center", justifyContent: "center" }}>
                                    <TouchableOpacity onPress={() => { addcart(item) }} style={{ backgroundColor: "#4287f5", width: 85, height: 30, alignItems: "center", justifyContent: "center", borderRadius: 5 }}>
                                        <Text style={{ color: "#fff" }}>Add to Cart</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        )}
                        numColumns={2}
                        ListFooterComponent={<View style={{ flexGrow: 1, justifyContent: 'flex-end', height: 20 }} />}
                        keyExtractor={(item, index) => `quotes_${index}`} />
                </Content>
            </Container>

        );
    }
};

const styles = StyleSheet.create({

    container: {
        flex: 1,

        backgroundColor: "transparent",
        width: "100%"
    },

    activityIndicatorContainer: {
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    floatingButton: {
        backgroundColor: '#6B9EFA',
        borderColor: '#6B9EFA',
        height: 55,
        width: 55,
        borderRadius: 55 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 60,
        right: 15,
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
});