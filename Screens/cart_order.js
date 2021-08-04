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
    StatusBar,
    Alert,
    Image,
    TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import UIStepper from 'react-native-ui-stepper';
import { update_menu, del_menu , del_all_menu} from "./stores/actions";
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
    const [isFetching, setIsFetching] = useState(true);
    const [total_amt, settotal_amt] = useState(0)

    //Access Redux Store State
    const dataReducer = useSelector((state) => state.dataReducers);
    console.log("IN STORE dataReducer -->", dataReducer)

    const { menus } = dataReducer;
    console.log("menus", menus)

    var item_arr = menus
    useEffect(() => {
        getData()
    });

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
        console.log("getData", item_arr)
        var amount = 0
        await item_arr.map((val, key) => {
            amount = (amount) + (Number(val.itemAmount) * Number(val.itemSelcted))
            console.log("total_amt", val)
        })
        await settotal_amt(amount)
        await setIsFetching(false)
    };

    const on_order = () => {
        var details = {
            "menus": JSON.stringify(item_arr),
            "menu_tot": total_amt
        }
        fetch(BASE_URL + "/order_menu", {
            method: 'post',
            headers: {
                // 'Authorization': 'Basic YWRtaW46MTIzNA==',
                'Content-Type': 'application/json',
                // 'X-API-KEY': 'RfTjWnZr4u7x!A-D' 
            },
            // body: formBody
            body: JSON.stringify({ details })
        }).then((response) => response.json())
            .then(async (res) => {
                console.log("insert_menu res", res)
                if(res.message== "success"){
                  await  AsyncStorage.removeItem('menus')
                  .then(()=>{
                    dispatch(del_all_menu())
                  })
                  .then(()=>{
                    navigation.navigate("product_list_cus")
                  })
                   
                }
                // navigation.navigate('product_list')
            }).catch((error) => {
                console.log("entire_details error", error)
            });
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
                <StatusBar translucent={false}  backgroundColor={colors.status_bar} barStyle="light-content"  />
                    <Row style={{ width: "100%", }}>
                        <View style={{ alignItems: "center", justifyContent: "center", width: "20%" }}>
                            {/* <Text onPress={() => { navigation.navigate("mongo_curd") }}>Back</Text> */}
                            <FontAwesome onPress={() => { navigation.navigate("mongo_curd") }} style={{ color: "#000", fontSize: 30, }} name={"hand-o-left"} />
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center", width: "60%" }}>
                            <Text style={{fontsize:20, fontWeight:"bold"}}>Confirm Order</Text>
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
                                        <View style={{ alignItems: "flex-end", justifyContent: "center", width: "40%", padding: 5, flexDirection: "row" }}>
                                            <Text style={{ fontSize: 18 }}>x{item.itemSelcted}     ${item.itemAmount}</Text>
                                        </View>
                                    </View>
                                    {
                                        (menus.length-1) != index &&
                                        <Divider style={{ backgroundColor: '#000' }} />
                                    }
                                    
                                </View>


                            )}
                            ListFooterComponent={<View style={{ flexGrow: 1, justifyContent: 'flex-end', height: 0 }} />}
                            keyExtractor={(item, index) => `quotes_${index}`} />
                    </View>
                    <View style={{ height: 5 }}></View>
                    <View style={{ alignItems: "center", justifyContent: "center", width: "100%", padding: 5, flexDirection: "row" , flexDirection: "row"}}>
                    <Image source={require('../assets/img/cash.png')} style={{  width: 25, height: 25, resizeMode: "contain" }} />

                        <Text style={{ fontSize: 18 }}>$ {total_amt}</Text>
                    </View>

                    <View style={{ height: 10 }}></View>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <TouchableOpacity
                            onPress={() => {
                                on_order()
                            }}
                            style={{ alignItems: "center", justifyContent: "center", backgroundColor: colors.bg_color, borderRadius: 5, height: 40, width: 120 }}
                        >
                            <Text style={{color:"#fff"}}>   MAKE ORDER :) </Text>
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

        // backgroundColor:colors.bg_color,
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