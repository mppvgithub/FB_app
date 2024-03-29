import { Container, Header, Content, Row, Col } from 'native-base';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { FlatList, Image, StyleSheet, SafeAreaView, View, Text, Dimensions, TouchableOpacity, Alert, BackHandler, LogBox, } from 'react-native';
const screenWidth = Math.round(Dimensions.get('screen').width);
const screenHeight = Math.round(Dimensions.get('screen').height);
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

import AsyncStorage from '@react-native-async-storage/async-storage';
dashboard['navigationOptions'] = screenProps => ({
    header: null
})
export default function dashboard(props) {

    const { navigation } = props;



    const [name, setName] = useState("")

    useEffect(() => {
        AsyncStorage.getItem('login', (err, data) => {

            console.log("login status", data)
        });
    })
    useEffect(() => {
        const backAction = () => {
            Alert.alert("Exit!", "Are you sure you want to exit?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, [])
    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerShown: false
    //     });
    //   }, []);

    return (
        <Container style={{ backgroundColor: "transparent", }}>
            <Header style={{ width: "100%", backgroundColor: "#fff", }}>
                <Row style={{ width: "100%" }}>
                    <View style={{ alignItems: "center", justifyContent: "center", width: "15%" }}>
                        {/* <Text onPress={() => { navigation.navigate("SideMenu") }}>Menu</Text> */}
                        <Image source={require('../assets/img/menu.png')} style={{ width: 30, height: 25, resizeMode: "contain" }} />
                    </View>
                    <View style={{  alignItems: "center", justifyContent: "center", width: "70%" }}>
                        <Text style={{fontsize:20, fontWeight:"bold"}}>Dashboard</Text>
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "center", width: "15%" }}>
                        {/* <Text>Next</Text> */}
                    </View>
                </Row>

            </Header>
            <Content style={{ backgroundColor: "#5b0a91", }}>
                <Row style={{ height: 10 }}></Row>
                <Row style={{ paddingLeft: 10, paddingRight: 10, height: screenHeight * 0.2, }}>
                    <Col style={{ padding: 5 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('mongo_curd') }} style={styles.card}>
                            <Col style={{ alignItems: "center", justifyContent: "center" , }} >
                                <Row style={{ height: screenHeight * 0.08 }}>
                                    <Image source={require('../assets/img/commercial.png')} style={{ flex: 1,  width: null, height: null, resizeMode: "contain" }} />
                                </Row>
                                <Row style={{ height: "3%" }}></Row>
                                <Text style={{ fontSize: RFValue(12), textAlign: "center" }}>Commercial</Text>
                                {/* <Text style={{ fontSize: RFValue(12), textAlign: "center" }}>Mongodb crud {"\n"} Redux</Text> */}
                            </Col>
                        </TouchableOpacity>
                    </Col>
                    <Col style={{ padding: 5 }}>
                        <TouchableOpacity onPress={() => { navigation.navigate('register') }} style={styles.card}>
                            <Col style={{ alignItems: "center", justifyContent: "center" }} >
                                <Row style={{ height: screenHeight * 0.08 }}>
                                    <Image source={require('../assets/img/new_user.png')} style={{ flex: 1, width: null, height: null, resizeMode: "contain" }} />
                                </Row>
                                <Row style={{ height: "3%" }}></Row>
                                <Text style={{ fontSize: RFValue(12), textAlign: "center" }}>Regsiter</Text>
                            </Col>
                        </TouchableOpacity>
                    </Col>

                </Row>
                <Row style={{ paddingLeft: 10, paddingRight: 10, height: screenHeight * 0.2, }}>
                    <Col style={{ padding: 5 }}>
                        <TouchableOpacity onPress={() => { navigation.navigate('LoadingScreen') }} style={styles.card}>
                            <Col style={{ alignItems: "center", justifyContent: "center" }} >
                                <Row style={{ height: screenHeight * 0.08 }}>
                                    <Image source={require('../assets/img/todo.png')} style={{ flex: 1,  width: null, height: null, resizeMode: "contain" }} />
                                </Row>
                                <Row style={{ height: "3%" }}></Row>
                                <Text style={{ fontSize: RFValue(12), textAlign: "center" }}>TODO App</Text>
                            </Col>
                        </TouchableOpacity>
                    </Col>
                    <Col style={{ padding: 5 }}>
                        <TouchableOpacity onPress={() => { navigation.navigate('FB_file_iamge') }} style={styles.card}>
                            <Col style={{ alignItems: "center", justifyContent: "center" }} >
                                <Row style={{ height: screenHeight * 0.08 }}>
                                    <Image source={require('../assets/img/firebase.png')} style={{ flex: 1,  width: null, height: null, resizeMode: "contain" }} />
                                </Row>
                                <Row style={{ height: "3%" }}></Row>
                                <Text style={{ fontSize: RFValue(12), textAlign: "center" }}>Firebase{"\n"}File Images</Text>
                            </Col>
                        </TouchableOpacity>
                    </Col>
                    

                </Row>
                <Row style={{ paddingLeft: 10, paddingRight: 10, height: screenHeight * 0.2, }}>
               
                    <Col style={{ padding: 5 }}>
                    <TouchableOpacity onPress={() => {  AsyncStorage.clear(); }} style={styles.card}>
                            <Col style={{ alignItems: "center", justifyContent: "center" }} >
                                <Row style={{ height: screenHeight * 0.08 }}>
                                    <Image source={require('../assets/img/clear_data.png')} style={{ flex: 1, marginLeft: 8, width: null, height: null, resizeMode: "contain" }} />
                                </Row>
                                <Row style={{ height: "3%" }}></Row>
                                <Text style={{ fontSize: RFValue(12), textAlign: "center" }}>Clear AsyncStorage</Text>
                            </Col>
                        </TouchableOpacity>
                    </Col>

                    <Col style={{ padding: 5 }}>
                        {/* <TouchableOpacity onPress={() => { navigation.navigate('SideMenu') }} style={styles.card}>
                            <Col style={{ alignItems: "center", justifyContent: "center" }} >
                                <Row style={{ height: screenHeight * 0.08 }}>
                                    <Image source={require('../assets/img/dashboard_img4.png')} style={{ flex: 1, width: null, height: null, resizeMode: "contain" }} />
                                </Row>
                                <Row style={{ height: "3%" }}></Row>
                                <Text style={{ fontSize: RFValue(12), textAlign: "center" }}>profile{"\n"}firebase</Text>
                            </Col>
                        </TouchableOpacity> */}
                    </Col>

                </Row>
               
                <Row style={{ height: 20 }}></Row>
            </Content>
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
        // backgroundColor:"#D4AF37",
        borderRadius: 15,
        padding: 10,
        elevation: 10,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    }
});