import { Container, Header, Content, Row, Col } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, SafeAreaView, View, Text, Dimensions, TouchableOpacity, ActivityIndicator, TouchableHighlight, LogBox, } from 'react-native';
const screenWidth = Math.round(Dimensions.get('screen').width);
const screenHeight = Math.round(Dimensions.get('screen').height);
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
export default function dashboard(props) {

    const { navigation } = props;
    const navigationOptions = {
        header: null
    }
    const [name, setName] = useState("")

    useEffect(() => {
        console.log("useEffect")
    }, [])

    return (
        <Container style={{ backgroundColor: "transparent",}}>
            <Header style={{ width: "100%" }}>
                <Row style={{ width: "100%" }}>
                    <View style={{ alignItems: "center", justifyContent: "center", width: "20%" }}>
                        <Text>Back</Text>
                    </View>
                    <View style={{ backgroundColor: "red", alignItems: "center", justifyContent: "center", width: "60%" }}>
                        <Text>Dashboard</Text>
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "center", width: "20%" }}>
                        <Text>Next</Text>
                    </View>
                </Row>

            </Header>
            <Content style={{  backgroundColor: "transparent",}}>
            <Row style={{height:10}}></Row>
                <Row style={{paddingLeft:10,paddingRight:10, height: screenHeight * 0.2, }}>
                    <Col style={{ padding: 5 }}>
                        <TouchableOpacity style={styles.card}>
                            <Col style={{ alignItems: "center", justifyContent: "center" }} >
                                <Row style={{ height: screenHeight * 0.08 }}>
                                    {/* <Image source={require('../assets/img/dashboard_img2.png')} style={{ flex: 1, marginLeft: 8, width: null, height: null, resizeMode: "contain" }} /> */}
                                </Row>
                                <Row style={{ height: "3%" }}></Row>
                                <Text style={{ fontSize: RFValue(12), textAlign: "center" }}>menu{"\n"}management</Text>
                            </Col>
                        </TouchableOpacity>
                    </Col>
                    <Col style={{ padding: 5 }}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('register')}} style={styles.card}>
                            <Col style={{ alignItems: "center", justifyContent: "center" }} >
                                <Row style={{ height: screenHeight * 0.08 }}>
                                    {/* <Image source={require('../assets/img/dashboard_img4.png')} style={{ flex: 1, width: null, height: null, resizeMode: "contain" }} /> */}
                                </Row>
                                <Row style={{ height: "3%" }}></Row>
                                <Text style={{ fontSize: RFValue(12), textAlign: "center" }}>Register{"\n"}profile</Text>
                            </Col>
                        </TouchableOpacity>
                    </Col>

                </Row>
                <Row style={{paddingLeft:10,paddingRight:10, height: screenHeight * 0.2, }}>
                    <Col style={{ padding: 5 }}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('LoadingScreen')}} style={styles.card}>
                            <Col style={{ alignItems: "center", justifyContent: "center" }} >
                                <Row style={{ height: screenHeight * 0.08 }}>
                                    {/* <Image source={require('../assets/img/dashboard_img2.png')} style={{ flex: 1, marginLeft: 8, width: null, height: null, resizeMode: "contain" }} /> */}
                                </Row>
                                <Row style={{ height: "3%" }}></Row>
                                <Text style={{ fontSize: RFValue(12), textAlign: "center" }}>TODO App{"\n"}redex</Text>
                            </Col>
                        </TouchableOpacity>
                    </Col>
                    <Col style={{ padding: 5 }}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('SideMenu')}} style={styles.card}>
                            <Col style={{ alignItems: "center", justifyContent: "center" }} >
                                <Row style={{ height: screenHeight * 0.08 }}>
                                    {/* <Image source={require('../assets/img/dashboard_img4.png')} style={{ flex: 1, width: null, height: null, resizeMode: "contain" }} /> */}
                                </Row>
                                <Row style={{ height: "3%" }}></Row>
                                <Text style={{ fontSize: RFValue(12), textAlign: "center" }}>Register profile{"\n"}firebase</Text>
                            </Col>
                        </TouchableOpacity>
                    </Col>

                </Row>
                <Row style={{height:20}}></Row>
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