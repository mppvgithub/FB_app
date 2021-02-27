import React, { useState, useEffect } from 'react';
import { Dimensions, Platform, StyleSheet, ImageBackground, BackHandler, TextInput, Alert, ActivityIndicator, StatusBar, Image, View, TouchableOpacity } from 'react-native';
import { Container, Title, Header, Content, Col, Row, Grid, Form, Item, Input, Left, Button, Icon, Text, Label, Footer } from 'native-base';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fb } from '../config/ConfigFirebase';
import UUIDGenerator from 'react-native-uuid-generator';
import * as colors from '../assets/css/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
// import firebase, { Firebase } from 'react-native-firebase';

const { width, height } = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width

// const options = {
//   title: 'Select a photo',
//   takePhotoButtonTitle: 'Take a photo',
//   chooseFromLibraryButtonTitle: 'Choose from gallery'
// };
const options = {
  title: "Select an option",
  takePhotoButtonTitle: "Camera",
  chooseFromLibraryButtonTitle: "From my mobile"
};
export default function FirstPage({ navigation }) {

  const [imgSource, setImgSource] = useState("");
  const [user_name, setUser_name] = useState("false");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedPictureUri, setSelectedPictureUri] = useState("");

  const [hidePassword, sethidePassword] = useState(true);
  const [showhide, setshowhide] = useState('eye-off');
  const [deviceid, setDeviceid] = useState('eye-off');
  const [app, setApp] = useState(Platform.OS);

  const default_user = require('../images/user_default.png');
  useEffect(() => {
    console.log("hiii")
  });

  function pick_img() {
    // showImagePicker
    // launchImageLibrary
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        const uri = response.uri;
        setSelectedPictureUri(uri)
        setImgSource(source)
      }
    });
  }
  async function register_check  (){
    if (email != "" && password != "" && user_name != "") {
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

      if (email_arr.includes(email)) {
        alert("email already exist")
      } else {
        login_data()
      }

    } else {
      alert("Please make ensure required feilds!")
    }
  }

  async function  login_data () {
    console.log("hi")
    await UUIDGenerator.getRandomUUID().then(async (uuid) => {
      // console.log("uuid",uuid)
      await fb.ref('/user_info/' + uuid).set({
        user_name: user_name,
        email: email,
        // password: password,
        // id: uuid
      });
      await fb.ref('/user_uuids/' + uuid).set({
        email: email,
        password: password,
        uuid: uuid
      });
    });
    console.log("hiai")
    // fb.ref('/user_emaillids/' + uuid).set({
    //   email: this.state.email,
    // });

    await navigation.navigate("login")
  }

  async function Login() {
    setLoader(true)
    fetch(Constants.API_URL + 'doctorlogin', {
      method: 'post',
      headers: {
        'Authorization': Constants.AUTH,
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
        "username": username,
        "password": password,
        "device_id": deviceid

      })
    }).then((response) => response.json())
      .then((res) => {

        if (res.message == "Login Successful") {
          setLoader(false)
          showSnackbar(res.message);
          AsyncStorage.setItem('id', res.result.id.toString());
          navigation.navigate('Home');
        } else {
          setLoader(false)
          showSnackbar(res.message);
        }
      }).catch((error) => {
        console.log(error)
      });
  }

  const showSnackbar = async (msg) => {
    Snackbar.show({
      text: msg,
      duration: 2000,
    });
  }



  async function checkValidate() {
    if (email == '') {
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

        <View style={{ margin: '5%', marginLeft: 20, marginBottom: 0 }}>
          <Grid>
            <Col>
              <Text style={{ fontSize: 20, color: "#a3a3a3", fontFamily: "Helvetica-Bold" }}>Welcome</Text>
            </Col>
          </Grid>
        </View>

        <Row style={{ alignItems: "center", justifyContent: "center" }}>
        
            <Image
              style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 1 }}
              source={imgSource !=""?imgSource:default_user}
            />
        
        </Row>
        
        <Row style={{ margin: 10, alignItems: "center", justifyContent: "center" }}>
          <Text onPress={pick_img} style={{ fontSize: 17 }}>Take image</Text>
        </Row>
        <View style={{ width: "100%", paddingLeft: 30 }}>
          {/* <MaterialCommunityIcons style={{ color: colors.blue, fontSize: 70, }} name={"book-open-page-variant"} /> */}
            <Text style={{ fontSize: 20, color: colors.blue }}><Text style={{ fontSize: 20,color: colors.red }}>U</Text>sername<Text style={{ color: colors.red }}>*</Text></Text>
            <TextInput
              style={styles.emailaddress}
              onChangeText={TextInputValue =>
               setUser_name(TextInputValue)}
              placeholder={"Username *"}
              placeholderTextColor={"#d9e9fc"}
            />
          </View>


          <View style={{ width: "100%", paddingLeft: 30 }}>
            <Text style={{ fontSize: 20, color: colors.blue }}><Text style={{ fontSize: 20,color: colors.red }}>E</Text>mail<Text style={{ color: colors.red }}>*</Text></Text>
            <TextInput
              style={styles.emailaddress}
                onChangeText={TextInputValue =>
               setEmail(TextInputValue)}
              placeholder={" Email Id in Uplogic *"}
              placeholderTextColor={"#d9e9fc"}


              keyboardType="email-address"
            />
          </View>
          <View style={{ width: "100%", paddingLeft: 30 }}>
            <Text style={{ fontSize: 20, color: colors.blue }}><Text style={{fontSize: 20, color: colors.red }}>p</Text>assword<Text style={{ color: colors.red }}>*</Text></Text>
            <TextInput
              style={styles.emailaddress}
              onChangeText={TextInputValue =>
                setPassword(TextInputValue)}
              placeholder={"Password *"}
              placeholderTextColor={"#d9e9fc"}
              secureTextEntry={true}
            />
          </View>

          <Row style={{ alignItems: "center", justifyContent: "center" }}>
            <Button onPress={() => { register_check() }} style={{
              alignItems: "center", justifyContent: "center", 
              borderRadius: 20,
              backgroundColor: "#fff", marginTop: 20, width: 200, height: 50
            }}>
              <Text style={{ fontSize: 20, color: colors.blue }}><Text style={{ fontSize: 20,color: colors.red }}>R</Text>egister</Text>
            </Button>
            {/* <Text onPress={() => { navigation.navigate("login") }} style={{ fontSize: 20, top: 15, color: colors.blue }}><Text style={{ color: colors.red }}>Log</Text>in?</Text> */}
            {/* <Text onPress={() => { this.props.navigation.navigate("login") }} style={{ color: "#fff", marginTop: 10, fontWeight: "bold" }}>Login?</Text> */}
          </Row>

<Row style={{ alignItems: "center", justifyContent: "center" , marginTop:30}}>
<Text onPress={() => { navigation.navigate("SecondPage") }} style={{ fontSize: 20,  color: colors.blue }}><Text style={{ color: colors.red }}>Log</Text>in?</Text>

</Row>
        {/* <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <Text onPress={() => navigation.navigate('Forgot')} style={{ color: "#a3a3a3", fontSize: 14 }}>Forgot password ?</Text>
        </View> */}

      </Content>
      {/* <Footer /> */}
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
    height: 40,
    width: "80%",
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#fff",
    borderWidth: 1,
    fontSize: 13,
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 10,
    paddingLeft: 20,
    color: colors.blue
    // fontFamily:"robato"
  },

})
