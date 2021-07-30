import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ActivityIndicator,
    StatusBar,
    TouchableHighlight,
    BackHandler,
    LogBox,
    Alert,
    Image,
    TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import UIStepper from 'react-native-ui-stepper';
import { update_menu, del_menu } from "./stores/actions";
import { BASE_URL } from '../config/Constants'
import * as colors from '../assets/css/Colors'

import { Divider } from 'react-native-elements';
import { Container, Content, Header, Col, Row } from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import ListItem from "./ListItem";
LogBox.ignoreAllLogs(true)
export default function cart(props) {
    const dispatch = useDispatch();
    const { navigation } = props;

    // const BASE_URL = 'http://192.168.43.137:9000';

    //1 - DECLARE VARIABLES
    const [isFetching, setIsFetching] = useState(false);
    const [product_details, setProduct_details] = useState([])

    //Access Redux Store State
    const dataReducer = useSelector((state) => state.dataReducers);
    console.log("IN STORE dataReducer -->", dataReducer)

    const { menus } = dataReducer;
    console.log("menus", menus)

    var items_arr = menus

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

    const on_change = () => {

    }

    const on_inc_dec = (data, index) => {
        items_arr[index].itemSelcted = data
        console.log("items_arr", data, items_arr)

        dispatch(update_menu(items_arr[index]));

        AsyncStorage.getItem('menus', (err, menus) => {
            console.log("async menu", menus)
            if (err) alert(err.message)
            else {
                AsyncStorage.setItem('menus', JSON.stringify(items_arr), () => {
                    console.log("async updated")
                });
            }
        })
    }

    const on_max_reached = (index) => {
        alert("Maximum Qty of" + items_arr[index].itemName + " is " + items_arr[index].itemQty)
    }

    const delete_menu = (item, itemId) => {
        dispatch(del_menu(itemId));

        AsyncStorage.getItem('menus', (err, menus) => {
            console.log("async menu", menus)
            if (err) alert(err.message)
            else {
                menus = JSON.parse(menus)
                menus.map((val, key) => {
                    if (val.itemId == itemId) {
                        menus.splice(key, 1)
                    }
                })
                AsyncStorage.setItem('menus', JSON.stringify(menus), () => {
                    console.log("async updated")
                });
            }
        })

    }
    const on_order = () => {
       
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
                    <StatusBar translucent={false}  backgroundColor={colors.status_bar} barStyle="light-content"  />
                        <View style={{ alignItems: "center", justifyContent: "center", width: "20%" }}>
                            {/* <Text onPress={() => { navigation.navigate("mongo_curd") }}>Back</Text> */}
                            <FontAwesome onPress={() => { navigation.navigate("mongo_curd") }} style={{ color: "#000", fontSize: 30, }} name={"hand-o-left"} />
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center", width: "60%" }}>
                        <Image source={require('../assets/img/cart.png')} style={{   width: 30, height: 30, resizeMode: "contain" }} />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "20%" }}>
                            {/* <FontAwesome style={{ color: "#000", fontSize: 30, }} name={"opencart"} />
                            <Text style={{ backgroundColor: "red", borderRadius: 10, color: "#fff", fontSize: 10 }}>  {menus.length}  </Text> */}
                        </View>
                    </Row>
                </Header>
                <Content style={styles.container}>
                    <View style={{
                        // height: 40,
                        width: "96%", marginTop: 10, left: '2%', right: '2%',
                        borderRadius: 15,
                        backgroundColor: "white",
                        padding: 10,
                        elevation: 10,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 0.5,
                        shadowRadius: 5,
                    }}>
                        <FlatList
                            data={menus}
                            // renderItem={renderItem}
                            renderItem={({ item, index }) => (
                                <View>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", height: 45, }}>
                                        <View style={{ alignItems: "flex-start", justifyContent: "center", width: "60%", flexDirection: "column", left: 5 }}>
                                            <Text style={{ fontSize: 20 }}>{item.itemName}</Text>
                                            <Text style={{ fontSize: 10, color: "#999" }}>$ {item.itemAmount}</Text>
                                        </View>
                                        <View style={{ alignItems: "center", justifyContent: "center", width: "40%", padding: 5, flexDirection: "row" }}>
                                            <TouchableOpacity style={{ right: 10 }}
                                                onPress={() => { delete_menu(item, item.itemId) }}
                                            >
                                                <Image source={require('../assets/img/cancel.png')} style={{ flex: 1, marginLeft: 8, width: 25, height: 25, resizeMode: "contain" }} />
                                            </TouchableOpacity>
                                            <UIStepper displayValue
                                                height={'97%'}
                                                width={'60%'}
                                                value={item.itemSelcted}
                                                initialValue={item.itemSelcted}
                                                minimumValue={1}
                                                maximumValue={item.itemQty}
                                                fontSize={14}
                                                borderColor={"#999"}
                                                textColor={"#000"}
                                                overrideTintColor
                                                tintColor={"#a3a3a3"}
                                                borderRadius={3}
                                                // fontFamily={colors.font_family}
                                                onValueChange={(text) => { on_change(item) }}
                                                onIncrement={(text) => { on_inc_dec(text, index) }}
                                                onDecrement={(text) => { on_inc_dec(text, index) }}
                                                onMaximumReached={(text) => { on_max_reached(index) }}
                                            />
                                            {/* <Text style={{ fontSize: 18 }}>- {item.itemSelcted} +</Text> */}
                                        </View>
                                    </View>
                                    <Divider style={{ backgroundColor: '#000' }} />
                                </View>


                            )}
                            ListFooterComponent={<View style={{ flexGrow: 1, justifyContent: 'flex-end', height: 0 }} />}
                            keyExtractor={(item, index) => `quotes_${index}`} />
                    </View>


                    <View style={{ height: 20 }}></View>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("cart_order")
                            }}
                            style={{ alignItems: "center", justifyContent: "center", }}
                        >
                            {/* <Text> CHECK OUT </Text> */}
                            <Image source={require('../assets/img/checkout1.png')} style={{  width: 50, height: 50, resizeMode: "contain" }} />
                        </TouchableOpacity>
                    </View>

                </Content>
            </Container>

        );
    }
};

const styles = StyleSheet.create({

    container: {
        flex: 1,

        backgroundColor:colors.bg_color,
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