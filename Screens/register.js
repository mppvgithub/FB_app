//This is an example code for Navigator//
import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Title, Icon, Content, Row, Col } from 'native-base';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight, Dimensions,TouchableOpacity, ImageBackground, TextInput, ScrollView, Alert, StatusBar, BackHandler, Keyboard, AsyncStorage } from 'react-native';
import { fb } from '../config/ConfigFirebase';
import UUIDGenerator from 'react-native-uuid-generator';
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
      user_name: "",
      email: '',
      password: '',
      validation: true,
      // details: this.props.navigation.getParam('details'),
      // from: this.props.navigation.getParam('from') ? this.props.navigation.getParam('from') : ""
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
  register_check = async () => {
    if (this.state.email != "" && this.state.password != "" && this.state.user_name != "") {
      const email_arr = []

      fb.ref('/user_uuids/').on('value', (snapshot) => {
        const tem_arr = snapshot.val()
        if (tem_arr) {
          console.log(tem_arr)
          Object.values(tem_arr).map((val, key) => {
            email_arr.push(val.email)
          })
        }

      })

      if (email_arr.includes(this.state.email)) {
        alert("email already exist")
      } else {
        this.login_data()
      }

    } else {
      alert("Please make ensure required feilds!")
    }
  }

  login_data = async () => {
    console.log("hi")
    await UUIDGenerator.getRandomUUID().then(async (uuid) => {
      // console.log("uuid",uuid)
      await fb.ref('/user_info/' + uuid).set({
        user_name: this.state.user_name,
        email: this.state.email,
        // password: this.state.password,
        // id: uuid
      });
      await fb.ref('/user_uuids/' + uuid).set({
        email: this.state.email,
        password: this.state.password,
        uuid: uuid
      });
    });
    console.log("hiai")
    // fb.ref('/user_emaillids/' + uuid).set({
    //   email: this.state.email,
    // });

    await this.props.navigation.navigate("login")
  }
  render() {
    // const { navigate } = this.props.navigation;
    return (
      <Container >
        <StatusBar translucent={false}  backgroundColor={colors.status_bar} barStyle="light-content"  />
        <Container style={{ alignItems: "center", justifyContent: "center", height: "100%", width: "100%", backgroundColor: colors.bg }}>
          <Content>
            <View style={{ marginTop: 55, marginBottom: 20, height: 110, alignItems: "center", justifyContent: "center" }}>
              <Image source={require('../assets/img/logo.png')} style={{ marginLeft: 1, width: 100, height: 100, resizeMode: "contain" }} />

            </View>
            <View style={{ width: "100%", paddingLeft: 10, flexDirection: "row", alignItems: "center", paddingRight: 25 }}>
              {/* <MaterialCommunityIcons style={{ color: colors.blue, fontSize: 70, }} name={"book-open-page-variant"} />
            <Text style={{ fontSize: 30, color: colors.blue }}><Text style={{ color: colors.red }}>U</Text>sername<Text style={{ color: colors.red }}>*</Text></Text> */}
              <Image source={require('../assets/img/username.png')} style={{ marginLeft: 1, width: 40, height: 40, resizeMode: "contain" }} />

              <TextInput
                style={styles.emailaddress}
                onChangeText={TextInputValue =>
                  this.setState({ user_name: TextInputValue })}
                placeholder={"Username *"}
              />
            </View>


            <View style={{ width: "100%", paddingLeft: 10, flexDirection: "row", alignItems: "center", paddingRight: 25 }}>
              {/* <Text style={{ fontSize: 30, color: colors.blue }}><Text style={{ color: colors.red }}>E</Text>mail<Text style={{ color: colors.red }}>*</Text></Text> */}
              <Image source={require('../assets/img/email.png')} style={{ marginLeft: 1, width: 40, height: 40, resizeMode: "contain" }} />

              <TextInput
                style={styles.emailaddress}
                onChangeText={TextInputValue =>
                  this.setState({ email: TextInputValue })}
                placeholder={"Email Address *"}


                keyboardType="email-address"
              />
            </View>
            <View style={{ width: "100%", paddingLeft: 10, flexDirection: "row", alignItems: "center", paddingRight: 25 }}>
              {/* <Text style={{ fontSize: 30, color: colors.blue }}><Text style={{ color: colors.red }}>p</Text>assword<Text style={{ color: colors.red }}>*</Text></Text> */}
              <Image source={require('../assets/img/password.png')} style={{ marginLeft: 1, width: 40, height: 40, resizeMode: "contain" }} />

              <TextInput
                style={styles.emailaddress}
                onChangeText={TextInputValue =>
                  this.setState({ password: TextInputValue })}
                placeholder={"Password *"}
                secureTextEntry={true}
              />
            </View>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity onPress={() => { this.register_check() }} style={{
              //  alignItems: "center",justifyContent: "center",
               marginTop: 20, width: 200, height: 50
              }}>
                <Image source={require('../assets/img/login1.png')} style={{ flex: 1, marginLeft: 8, width: null, height: null, resizeMode: "contain" }} />
              </TouchableOpacity>
              <Text onPress={() => { this.props.navigation.navigate("login") }} style={{ fontSize: 20, marginTop: 15, color: colors.blue , textAlign:"center" }}>Login?</Text>
              {/* <Text onPress={() => { this.props.navigation.navigate("login") }} style={{ color: "#fff", marginTop: 10, fontWeight: "bold" }}>Login?</Text> */}
            </View>
          </Content>

        </Container>
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
    left: 10,
    color: colors.blue
    // fontFamily:"robato"
  },
});
