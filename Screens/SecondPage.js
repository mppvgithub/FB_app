import React, { useState, useEffect } from 'react';
import { Dimensions, Platform, StyleSheet, ImageBackground, BackHandler, TextInput, Alert, ActivityIndicator, StatusBar, Image, View, TouchableOpacity } from 'react-native';
import { Container, Title, Header, Content, Col, Row, Grid, Form, Item, Input, Left, Button, Icon, Text, Label } from 'native-base';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fb } from '../config/ConfigFirebase';
import UUIDGenerator from 'react-native-uuid-generator';
import * as colors from '../assets/css/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import firebase, { Firebase } from 'react-native-firebase';

const { width, height } = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width

export default function FB_file_iamge({ navigation }) {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, SetEmail] = useState("");

  const [loader, setLoader] = useState(false);
  const [hidePassword, sethidePassword] = useState(true);
  const [validation, setValidation] = useState(false);
  const [showhide, setshowhide] = useState('eye-off');
  const [deviceid, setDeviceid] = useState('eye-off');
  const [app, setApp] = useState(Platform.OS);

  useEffect(() => {
    console.log("hiii")
  });

  async function login_check()  {
    if (email != "" && password != "") {
      // navigation.navigate("home")
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
          // if(val.email == email && val.password == password){
          //   navigation.navigate('home')
          // }
        })

        if (email_arr.includes(email)) {
          const emailindex = email_arr.indexOf(email)
          if (pwd_arr[emailindex] == password) {

            global.user_id = (uuid_arr[emailindex])
            navigation.navigate('home')
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

  const showSnackbar = async (msg) => {
    Snackbar.show({
      text: msg,
      duration: 2000,
    });
  }



  async function checkValidate() {
    if (username == '') {
      showSnackbar("User name can't be empty");
      return false;
    }
    else if (password == '') {
      showSnackbar("Password can't be empty");
      return false;
    } else {
      Login();
    }

  }

  async function setPasswordVisibility() {

    await sethidePassword(!hidePassword);
    if (hidePassword === true) {
      setshowhide("eye-off");
    }
    else {
      setshowhide("eye");
    }

  }




  return (
    <Container style={{backgroundColor:colors.bg}}>

      <StatusBar translucent={false} backgroundColor={colors.bg} barStyle="dark-content" />

      <Content>

        <View style={{ width: "100%", paddingLeft: 20, marginTop:30 }}>
          {/* <MaterialCommunityIcons style={{ color: colors.blue, fontSize: 70, }} name={"book-open-page-variant"} /> */}
          <Text style={{ fontSize: 25, color: colors.blue }}><Text style={{fontSize: 25, color: colors.red }}>E</Text>mail<Text style={{fontSize: 25, color: colors.red }}>*</Text></Text>
          <TextInput
            style={styles.emailaddress}
            onChangeText={TextInputValue =>
              SetEmail(TextInputValue)}
            placeholder={"prasanna@gmail.com"}

            keyboardType="email-address"
          />
        </View>

        <View style={{ width: "100%", paddingLeft: 20 }}>
          <Text style={{ fontSize: 25, color: colors.blue }}><Text style={{fontSize: 25, color: colors.red }}>P</Text>assword<Text style={{fontSize: 25, color: colors.red }}>*</Text></Text>
          <TextInput
            style={styles.emailaddress}
            onChangeText={TextInputValue =>
              setPassword(TextInputValue)}
            placeholder={"******"}
            secureTextEntry={true}
          />
        </View>

        <Row style={{ alignItems: "center", justifyContent: "center" }}>
          <Button onPress={() => { login_check() }} style={{
            backgroundColor: "#fff", alignItems: "center", justifyContent: "center", borderColor: "#fff",
            borderWidth: 1,
            fontSize: 15,
            borderRadius: 20,
            backgroundColor: "#fff", marginTop: 20, width: 200, height: 50
          }}>
            <Text style={{ fontSize: 20, color: colors.blue }}><Text style={{fontSize: 20, color: colors.red }}>Log</Text>in</Text>
          </Button>
         
        </Row>
        <Row style={{ alignItems: "center", justifyContent: "center", marginTop:20 }}>
        <Text onPress={() => { navigation.navigate("FB_file_iamge") }} style={{ fontSize: 20,  color: colors.blue }}><Text style={{ color: colors.red }}>New</Text>User?</Text>
        </Row>

      </Content>

    </Container>
  );
}



const styles = StyleSheet.create({
  Input: {
    flex: 1,
    color: "#a3a3a3",
    paddingLeft: 15
  },
  IconStyle: {
    fontSize: 16,
    color: "#a3a3a3",
  },
  Completed: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: "#a3a3a3",
    borderBottomWidth: 1,
    marginLeft: 5,
    marginRight: 8
  },
  SubView: {
    flexDirection: 'row',

  },
  navBarLeftButton: {
    alignItems: "flex-start",
    left: 0
  },
  itemui: {
    marginTop: 1,
    marginLeft: 5,
    marginRight: 8,
    paddingBottom: 0,
    borderColor: "#a3a3a3",
    // marginBottom:'4%'

  },
  itemui1: {
    marginTop: 1,
    marginLeft: 5,
    marginRight: 8,
    flex: 1,
    borderColor: "#a3a3a3",
    color: "#a3a3a3",
    // marginBottom:'4%'

  },
  container: {
    backgroundColor: "#a3a3a3",
    flex: 1,
    height: 731
  },
  ownstyle: {
    marginLeft: "4%",
    marginTop: "3%"
  },
  pick: {
    alignContent: "flex-start",
    marginLeft: "3%",
  },
  radiowidth: {
    marginBottom: 5,
    marginLeft: "15%"
  },
  Containstyle: {
    marginRight: "5%",
  },
  buttonstyle: {
    alignContent: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 25,
    backgroundColor: "#a3a3a3",
    marginLeft: 20,
    marginRight: 20,
    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 2.5
    },
    shadowRadius: 4,
    shadowOpacity: 0.3,
    elevation: 5

  },
  bgwhite: {
    backgroundColor: '#fff',
    borderColor: "#373345",
    marginBottom: 0,
    // marginTop:25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    height: '150%',
    // width:'100%'
    // flex: 3
  },
  bggray: {
    backgroundColor: '#373345',
    height: "100%",
    top: 20,
  },
  signcolor: {
    right: '15%',
    color: '#373345',
    fontWeight: "bold",
    fontSize: 28,
    marginLeft: "1%"
    // textAlign:""
  },
  imagestyle: {
    alignItems: "center"
  },
  secondrow: {
    display: "flex",
    // marginTop:"5%",
    borderTopColor: "#373345",
    borderTopWidth: 0.8,
    alignItems: "center",
    justifyContent: "center",
    height: 0
  },
  labelStyle: {
    color: "#abaab0",


  },
  textcolor: {
    color: "#FFF",

    paddingBottom: 0,
  },
  forgot: {
    color: '#abaab0',
    fontSize: 14,
    textAlign: 'right',
    marginTop: 5,
    right: '6%',

    // justifyContent: "flex-end"
  },
  touachableButton: {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 2
  },

  chechkbox: {
    paddingTop: 30,
    marginRight: 10,
    fontSize: 17,
    color: "#a3a3a3",
    width: 20
  },
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 10

  },

  TextInputStyleClass: {
    paddingLeft: 20,
    height: 40,
    flex: 1,
    borderWidth: 1,
    borderColor: "#a3a3a3",
    borderRadius: 25,
    backgroundColor: "#a3a3a3",
    color: "#a3a3a3"
  },
  searchSection: {
    justifyContent: 'center',
    flex: 1,
    margin: 10
  },
  searchIcon: {
    paddingLeft: '90%',
    position: 'absolute',
    fontSize: 17,
    color: "#a3a3a3",


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

})
