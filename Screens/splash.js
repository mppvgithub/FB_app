import { Container, Header, Content, Row, Col } from 'native-base';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { FlatList, Image, StyleSheet, SafeAreaView, View, Text, Dimensions, TouchableOpacity, Alert, BackHandler, LogBox, } from 'react-native';
const screenWidth = Math.round(Dimensions.get('screen').width);
const screenHeight = Math.round(Dimensions.get('screen').height);
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

import AsyncStorage from '@react-native-async-storage/async-storage';
splash['navigationOptions'] = screenProps => ({
    header: null
})
export default function splash(props) {

    const { navigation } = props;



    const [name, setName] = useState("")
    const [login_status, setLogin_status] = useState(0)

    useEffect(() => {

        async function startingfunc() {
            await AsyncStorage.getItem('login', (err, data) => {

                console.log("login status", data)
               
                setLogin_status(data)

                if (data == 1) {
                    setTimeout (()=>{
                        navigation.navigate('SideMenu')
                    },1000)
                }
                else {
                    setTimeout (()=>{
                        navigation.navigate('login')
                    },1000)
                }
            });

            // await navigatefunc()
                // console.log("login_status---", login_status)
                // if (login_status == 1) {
                //     navigation.navigate('SideMenu')
                // }
                // else {
                //     navigation.navigate('login')
                // }
           
        }
        startingfunc();

    }, [])
    function navigatefunc() {
        // setTimeout(() => {
            console.log("login_status", login_status)
            if (login_status == 1) {
                navigation.navigate('SideMenu')
            }
            else {
                navigation.navigate('login')
            }
        // }, 2000)
    }
    // useEffect(() => {
    //     const backAction = () => {
    //         Alert.alert("Exit!", "Are you sure you want to exit?", [
    //             {
    //                 text: "Cancel",
    //                 onPress: () => null,
    //                 style: "cancel"
    //             },
    //             { text: "YES", onPress: () => BackHandler.exitApp() }
    //         ]);
    //         return true;
    //     };

    //     const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    //     return () => backHandler.remove();
    // }, [])

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerShown: false
    //     });
    //   }, []);

    return (
        <Container style={{ backgroundColor: "transparent", alignItems: "center", justifyContent: "center", flex: 1 }}>
            <Text>Checking login status...</Text>
        </Container>
    )

}


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

    card: {
        padding: 10, height: "100%", borderRadius: 5, elevation: 0, width: "100%",
        backgroundColor: "white",
        borderRadius: 15,
        padding: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    }
});