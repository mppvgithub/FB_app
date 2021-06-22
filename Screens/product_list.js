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
    TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'react-native-elements';
// import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get_addQuotes, deleteQuote } from "./stores/actions";

// import ListItem from "./ListItem";
LogBox.ignoreAllLogs(true)
export default function Home(props) {
    const dispatch = useDispatch();
    const { navigation } = props;

    const BASE_URL = 'http://192.168.43.137:9000';


    //1 - DECLARE VARIABLES
    const [isFetching, setIsFetching] = useState(false);
    const [product_details, setProduct_details] = useState([])

    //Access Redux Store State
    const dataReducer = useSelector((state) => state.dataReducers);
    console.log("dataReducer---->", dataReducer)
    const { quotes } = dataReducer;
    console.log("quotes", quotes)
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
    const getData = () => {
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

    const onDelete = (data) => {
        fetch(BASE_URL + "/del_menu", {
            method: 'post',
            headers: {
                // 'Authorization': 'Basic YWRtaW46MTIzNA==',
                'Content-Type': 'application/json',
                // 'X-API-KEY': 'RfTjWnZr4u7x!A-D' 
            },
            // body: formBody
            body: JSON.stringify({
                "itemId": data.itemId,

            })
        }).then((response) => response.json())
            .then(async (res) => {
                console.log("del_menu res", res)
               await setProduct_details([])
               await getData()
             
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
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={product_details}
                    // renderItem={renderItem}
                    renderItem={({ item, index }) => (
                        <View style={{
                            height: 150, width: "96%", marginTop: 10, marginLeft: '2%',
                            backgroundColor: "white",
                            borderRadius: 15,
                            padding: 10,
                            elevation: 10,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.5,
                            shadowRadius: 5,
                        }}>
                            <View style={{ flexDirection: "row", width: "100%", height: 40, }}>
                                <View style={{ alignItems: "flex-start", justifyContent: "center", width: "50%", }}>
                                    <Text>{item.itemName} ${item.itemAmount}</Text>
                                </View>
                                <View style={{ justifyContent: "center", width: "50%", flexDirection: "row" }}>
                                    <TouchableOpacity onPress={() => { navigation.navigate('product_edit', { menu: item }) }} style={{ alignItems: "center", width: "70%", flexDirection: "row-reverse" }}>
                                        <Text style={{ textAlign: "right", color: "blue" }}>EDIT</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { onDelete(item) }} style={{ alignItems: "center", width: "30%", flexDirection: "row-reverse" }}>
                                        <Text style={{ textAlign: "right", color: "red" }}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Divider style={{ backgroundColor: '#999' }} />
                            <View style={{ top: 5 }}>
                                <Text>itemDescription: {item.itemDescription}</Text>
                            </View>

                        </View>

                    )}
                    ListFooterComponent={<View style={{ flexGrow: 1, justifyContent: 'flex-end', height: 20 }} />}
                    keyExtractor={(item, index) => `quotes_${index}`} />

                <TouchableHighlight style={styles.floatingButton}
                    underlayColor='#ff7043'
                    onPress={() => navigation.navigate('product_add')}>
                    <Text style={{ fontSize: 25, color: 'white' }}>+</Text>
                </TouchableHighlight>
            </SafeAreaView>
        );
    }
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