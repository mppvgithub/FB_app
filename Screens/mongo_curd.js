import { Container, Header, Content, Row, Col } from 'native-base';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { FlatList, Image, StyleSheet, SafeAreaView, View, StatusBar,Text, Dimensions, TouchableOpacity, Alert, BackHandler, LogBox, } from 'react-native';
const screenWidth = Math.round(Dimensions.get('screen').width);
const screenHeight = Math.round(Dimensions.get('screen').height);
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
// import { NetworkInfo } from "react-native-network-info";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as colors from '../assets/css/Colors'
export default function mongo_curd(props) {
    const { navigation } = props;

    const [name, setName] = useState("")
    const [IP_address, setIP_addre] = useState("")
    const [login_status, setLogin_status] = useState(0)
    const [getdata, SETgetdata] = useState("")



    const BASE_URL = 'http://192.168.43.137:9000';

    useEffect(() => {

        async function startingfunc() {
            await AsyncStorage.getItem('login', (err, data) => {

                console.log("login status", data)

                setLogin_status(data)

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

    function testapicall() {
        fetch(BASE_URL + "/testApi")
            .then((res) => res.text())
            .then((res) => {
                // console.log(res)
                SETgetdata(res)
            }).catch((err) => {
                console.log(err)
            })
    }


    return (
        <Container style={{ backgroundColor: colors.bg_color, }}>
        <Header style={{ width: "100%" , backgroundColor:"#fff"}}>
        <StatusBar translucent={false}  backgroundColor={colors.status_bar} barStyle="light-content"  />
            <Row style={{ width: "100%", }}>
                        <View style={{ alignItems: "center", justifyContent: "center", width: "20%" }}>
                            {/* <Text onPress={() => { navigation.navigate("mongo_curd") }}>Back</Text> */}
                            <FontAwesome onPress={() => { navigation.navigate("SideMenu") }} style={{ color: "#000", fontSize: 30, }} name={"hand-o-left"} />
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center", width: "60%" }}>
                            <Text style={{fontsize:20, fontWeight:"bold"}}>MERNN</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "20%" }}>
                            {/* <FontAwesome style={{ color: "#000", fontSize: 30, }} name={"opencart"} />
                            <Text style={{ backgroundColor: "red", borderRadius: 10, color: "#fff", fontSize: 10 }}>  {menus.length}  </Text> */}
                        </View>
                    </Row>
        </Header>
        <Content style={{ backgroundColor: "transparent", }}>
            <Row style={{ height: 10 }}></Row>
            <Row style={{ paddingLeft: 10, paddingRight: 10, height: screenHeight * 0.2, }}>
                <Col style={{ padding: 5 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('product_list') }} style={styles.card}>
                        <Col style={{ alignItems: "center", justifyContent: "center" }} >
                            <Row style={{ height: screenHeight * 0.08 }}>
                                <Image source={require('../assets/img/manage.png')} style={{ flex: 1, marginLeft: 8, width: null, height: null, resizeMode: "contain" }} />
                            </Row>
                            <Row style={{ height: "3%" }}></Row>
                            <Text style={{ fontSize: RFValue(12), textAlign: "center" }}>Manage{"\n"}Product</Text>
                        </Col>
                    </TouchableOpacity>
                </Col>
                <Col style={{ padding: 5 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('product_list_cus') }} style={styles.card}>
                        <Col style={{ alignItems: "center", justifyContent: "center" }} >
                            <Row style={{ height: screenHeight * 0.08 }}>
                                <Image source={require('../assets/img/buy.png')} style={{ flex: 1, width: null, height: null, resizeMode: "contain" }} />
                            </Row>
                            <Row style={{ height: "3%" }}></Row>
                            <Text style={{ fontSize: RFValue(12), textAlign: "center" }}>Buy{"\n"}Product</Text>
                        </Col>
                    </TouchableOpacity>
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
        borderRadius: 15,
        padding: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    }
});