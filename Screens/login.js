//This is an example code for Navigator//
import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Title, Icon, Content, Row, Col } from 'native-base';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight, Dimensions, ImageBackground, TextInput, ScrollView, Alert, StatusBar, BackHandler, Keyboard, AsyncStorage } from 'react-native';
import { fb } from '../config/ConfigFirebase';
import * as colors from '../assets/css/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

    this.props.navigation.goBack(null);
    return true;

  }
  login_check = async () => {
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
            this.props.navigation.navigate('home')
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

  dashboard = () =>{
    console.log("Dashboard")
    this.props.navigation.navigate('dashboard')
  }
  render() {
    // const { navigate } = this.props.navigation;
    return (
      <Container >
        <StatusBar
          barStyle="light-content"
          // dark-content, light-content and default
          hidden={false}
          //To hide statusBar
          backgroundColor={colors.bg}
          //Background color of statusBar only works for Android
          translucent={false}
          //allowing light, but not detailed shapes
          networkActivityIndicatorVisible={true}
        />
        {/* <ImageBackground source={require('../images/bg_pic.jpg')} style={{ height: "100%", width: "100%" }}> */}
        <Container style={{ alignItems: "center", justifyContent: "center", height: "100%", width: "100%", backgroundColor: colors.bg }}>
          {/* <Image
          style={styles.loginuser}
          source={require('.././img/login_user.png')}
        /> */}

          <View style={{ width: "100%", paddingLeft: 30 }}>
            <MaterialCommunityIcons style={{ color: colors.blue, fontSize: 70, }} name={"book-open-page-variant"} />
            <Text style={{ fontSize: 35, color: colors.blue }}><Text style={{ color: colors.red }}>E</Text>mail<Text style={{ color: colors.red }}>*</Text></Text>
            <TextInput
              style={styles.emailaddress}
              onChangeText={TextInputValue =>
                this.setState({ email: TextInputValue })}
              placeholder={"prasanna@gmail.com"}

              keyboardType="email-address"
            />
          </View>

          <View style={{ width: "100%", paddingLeft: 30 }}>
            <Text style={{ fontSize: 35, color: colors.blue }}><Text style={{ color: colors.red }}>P</Text>assword<Text style={{ color: colors.red }}>*</Text></Text>
            <TextInput
              style={styles.emailaddress}
              onChangeText={TextInputValue =>
                this.setState({ password: TextInputValue })}
              placeholder={"******"}
              secureTextEntry={true}
            />
          </View>




          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Button onPress={() => { this.dashboard() }} style={{
              backgroundColor: "#fff", alignItems: "center", justifyContent: "center", borderColor: "#fff",
              borderWidth: 1,
              fontSize: 15,
              borderRadius: 20,
              backgroundColor: "#fff", marginTop: 20, width: 200, height: 50
            }}>
              <Text style={{ fontSize: 30, color: colors.blue }}><Text style={{ color: colors.red }}>Log</Text>in</Text>
            </Button>
            <Text onPress={() => { this.props.navigation.navigate("register") }} style={{ fontSize: 20, top: 15, color: colors.blue }}><Text style={{ color: colors.red }}>New</Text>User?</Text>
            {/* <Text  style={{ color: "#fff", marginTop: 10, fontWeight: "bold" }}>New User?</Text> */}
          </View>
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
    backgroundColor: "#fff",
    padding: 10,
    paddingLeft: 20,
    color: colors.blue
    // fontFamily:"robato"
  },
  loginuser: {
    height: 100, width: 100, resizeMode: "contain"
  }
});
