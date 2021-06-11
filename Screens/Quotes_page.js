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

    //1 - DECLARE VARIABLES
    const [isFetching, setIsFetching] = useState(false);

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
        setIsFetching(true);
        console.log("1---------")
        //OPTION 1 - LOCAL DATA
        AsyncStorage.getItem('quotes', (err, quotes) => {
            if (err) alert(err.message);
            else if (quotes !== null) {
                //Initially save data to store , before rendering data
                dispatch(get_addQuotes(JSON.parse(quotes)));
            }

            setIsFetching(false)
        });

        //OPTION 2 - FAKE API
        // let url = "https://my-json-server.typicode.com/mesandigital/demo/quotes";
        // axios.get(url)
        //     .then(res => res.data)
        //     .then((data) => dispatch(get_addQuotes(data)))
        //     .catch(error => alert(error.message))
        //     .finally(() => setIsFetching(false));
    };

    //==================================================================================================

    //4 - RENDER FLATLIST ITEM
    // const renderItem = ({ item, index }) => {
    //     return (
    //         <ListItem item={item} index={index} navigation={navigation} onDelete={onDelete} onEdit={onEdit} />
    //     )
    // };

    //==================================================================================================

    //5 - EDIT QUOTE
    const onEdit = (item) => {
        navigation.navigate('NewQuote', { quote: item, title: "Edit Quote" })
    };

    //==================================================================================================

    //6 - DELETE QUOTE
    const onDelete = (id) => {

        //OPTION 1 - UPDATE LOCAL STORAGE DATA
        AsyncStorage.getItem('quotes', (err, quotes) => {
            if (err) alert(err.message);
            else if (quotes !== null) {
                quotes = JSON.parse(quotes);

                //find the index of the quote with the id passed
                const index = quotes.findIndex((obj) => obj.id === id);

                // remove the quote
                if (index !== -1) quotes.splice(index, 1);

                //Update the local storage
                AsyncStorage.setItem('quotes',
                    JSON.stringify(quotes), // update list (after deleted data )
                    () => dispatch(deleteQuote(id)) // update quotes state (Delete data from state qoute)
                );
            }
        });

        //OPTION 2 - FAKE API
        // let url = "https://my-json-server.typicode.com/mesandigital/demo/quotes";
        // axios.delete(url, {data:{id:id}})
        //     .then((res) => dispatch(deleteQuote(id)))
        //     .catch(error => alert(error.message))
        //     .finally(() => setIsFetching(false));
    };

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
                    data={quotes}
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
                                    <Text>Author - {item.author}</Text>
                                </View>
                                <View style={{ justifyContent: "center", width: "50%", flexDirection: "row" }}>
                                    <TouchableOpacity onPress={() => { onEdit(item) }} style={{ alignItems: "center", width: "70%", flexDirection: "row-reverse" }}>
                                        <Text style={{ textAlign: "right", color: "blue" }}>EDIT</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { onDelete(index) }} style={{ alignItems: "center", width: "30%", flexDirection: "row-reverse" }}>
                                        <Text style={{ textAlign: "right", color: "red" }}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Divider style={{ backgroundColor: '#999' }} />
                            <View style={{ top: 5 }}>
                                <Text>{item.text}</Text>
                            </View>

                        </View>

                    )}
                    ListFooterComponent={<View style={{ flexGrow: 1, justifyContent: 'flex-end', height: 20 }} />}
                    keyExtractor={(item, index) => `quotes_${index}`} />

                <TouchableHighlight style={styles.floatingButton}
                    underlayColor='#ff7043'
                    onPress={() => navigation.navigate('NewQuote', { title: "New Quote" })}>
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