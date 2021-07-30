//This is an example code for Navigator//
import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Title, Icon, Content, Row, Col } from 'native-base';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, Dimensions, ImageBackground, TextInput, ScrollView, Alert, StatusBar, BackHandler, Keyboard } from 'react-native';
import { fb } from '../config/ConfigFirebase';
import * as colors from '../assets/css/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
export default class login extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      email: '',
      password: '',
      validation: true,
      details: this.props.navigation.getParam('details'),
      from: this.props.navigation.getParam('from') ? this.props.navigation.getParam('from') : ""
    }
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    Alert.alert("Exit!", "Are you sure you want to exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
    // this.props.navigation.goBack(null);
    return true;

  }
  login_check = async () => {
    AsyncStorage.setItem('login', "1");
    if (this.state.email != "" && this.state.password != "") {
      // this.props.navigation.navigate("home")
      var email_arr = []
      fb.ref('/user_uuids/').on('value', async (snapshot) => {
        const temp_arr = snapshot.val()
        const email_arr = []
        const pwd_arr = []
        const uuid_arr = []
        Object.values(temp_arr).map((val, key) => {
          email_arr.push(val.email)
          pwd_arr.push(val.password)
          uuid_arr.push(val.uuid)
          // if(val.email == this.state.email && val.password == this.state.password){
          //   this.props.navigation.navigate('home')
          // }
        })

        if (email_arr.includes(this.state.email)) {
          const emailindex = email_arr.indexOf(this.state.email)
          if (pwd_arr[emailindex] == this.state.password) {

            global.user_id = (uuid_arr[emailindex])
            this.props.navigation.navigate('SideMenu')
          } else {
            alert("Password mismatch")
          }
        } else {
          alert("Email not exist")
        }
      })

    } else {
      alert("Please make ensure required feilds!")
    }
  }

  dashboard = () => {
    console.log("Dashboard")
    this.props.navigation.navigate('SideMenu')
  }
  render() {
    // const { navigate } = this.props.navigation;
    return (
      <Container>
       <StatusBar translucent={false}  backgroundColor={colors.status_bar} barStyle="light-content"  />
        {/* <ImageBackground source={require('../images/bg_pic.jpg')} style={{ height: "100%", width: "100%" }}> */}
        <Container style={{ alignItems: "center", justifyContent: "center", height: "100%", width: "100%", backgroundColor: colors.bg }}>
          <Content>
            <View style={{marginTop:55,marginBottom:20, height: 110, alignItems: "center", justifyContent: "center" }}>
              <Image source={require('../assets/img/logo.png')} style={{ marginLeft: 1, width: 100, height: 100, resizeMode: "contain" }} />

            </View>

            <View style={{ width: "100%", paddingLeft: 10, flexDirection: "row", alignItems: "center", paddingRight: 25 }}>
              {/* <MaterialCommunityIcons style={{ color: colors.blue, fontSize: 70, }} name={"book-open-page-variant"} /> */}
              {/* <Text style={{ fontSize: 35, color: colors.blue }}><Text style={{ color: colors.red }}>E</Text>mail<Text style={{ color: colors.red }}>*</Text></Text> */}
              <Image source={require('../assets/img/email.png')} style={{  marginLeft: 1, width: 40, height: 40, resizeMode: "contain" }} />
              <TextInput
                style={styles.emailaddress}
                onChangeText={TextInputValue =>
                  this.setState({ email: TextInputValue })}
                placeholder={"prasanna@gmail.com"}

                keyboardType="email-address"
              />
            </View>

            <View style={{ width: "100%", paddingLeft: 10, flexDirection: "row", alignItems: "center", paddingRight: 25 }}>
              {/* <Text style={{ fontSize: 35, color: colors.blue }}><Text style={{ color: colors.red }}>P</Text>assword<Text style={{ color: colors.red }}>*</Text></Text> */}
              <Image source={require('../assets/img/password.png')} style={{  marginLeft: 1, width: 40, height: 40, resizeMode: "contain" }} />
              <TextInput
                style={styles.emailaddress}
                onChangeText={TextInputValue =>
                  this.setState({ password: TextInputValue })}
                placeholder={"******"}
                secureTextEntry={true}
              />
            </View>




            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity onPress={() => { this.dashboard() }} style={{
                // backgroundColor: "#e1ebfc", alignItems: "center", justifyContent: "center", borderColor: "#fff",
                // borderWidth: 1,
                // fontSize: 15,
                // borderRadius: 20,
                marginTop: 20, width: 200, height: 50
              }}>
                <Image source={require('../assets/img/login1.png')} style={{ flex: 1, marginLeft: 8, width: null, height: null, resizeMode: "contain" }} />
                {/* <Text style={{ fontSize: 30, color: colors.blue }}><Text style={{ color: colors.red }}>Log</Text>in</Text> */}
              </TouchableOpacity>
              <Text onPress={() => { this.props.navigation.navigate("register") }} style={{ fontSize: 20, marginTop: 15, color: colors.red }}>Register?</Text>
              {/* <Text  style={{ color: "#fff", marginTop: 10, fontWeight: "bold" }}>New User?</Text> */}
            </View>
          </Content>

        </Container>



        {/* </ImageBackground> */}
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailaddress: {
    height: 50,
    width: "80%",
    marginTop: 20,
    marginBottom: 20,
    borderColor: "#fff",
    borderWidth: 1,
    fontSize: 15,
    borderRadius: 20,
    backgroundColor: "#e1ebfc",
    padding: 10,
    paddingLeft: 20,
    left:10,
    color: colors.blue
    // fontFamily:"robato"
  },
  loginuser: {
    height: 100, width: 100, resizeMode: "contain"
  }
});
