import React, { Component } from 'react';
import { StyleSheet,Text,StatusBar, TouchableOpacity, Image, View, Alert} from 'react-native';
import { Container, Row, Col, Content } from 'native-base';
// import {Colors} from '../assets/css/Color'
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationActions } from 'react-navigation';
export default class LeftSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:'',
      real_name:'',
      user_name:'',
      hmo_id:'',
      profile_picture:null,
      image_url:null
    };
  }
navigateToScreen = (route) => () => {
const navigate = NavigationActions.navigate({
routeName: route
});
this.props.navigation.dispatch(navigate);
}

close = async(route)=>{
  this.props.navigation.navigate(route);
  this.props.navigation.closeDrawer()
}

componentDidMount= async ()=>{
 
  await AsyncStorage.getItem('id').then((value) => this.setState({ id : value }));
   this.ViewProfile();
   this.props.navigation.addListener('didFocus', this.componentDidFocus);
 }



componentDidFocus= async ()=>{

await AsyncStorage.getItem('id').then((value) => this.setState({ id : value }));
this.ViewProfile();
}

 ViewProfile = async () => {
 
}

handleDelete = async() => {
  // The user has pressed the "Delete" button, so here you can do your own logic.
  // ...Your logic
  this.props.navigation.closeDrawer()
  Alert.alert(
    "Logout App",
    "Do you want to logout?",
    [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Yes", onPress: () => this.logout_page() }
    ],
    { cancelable: false }
    )
  
};

logout_page = async() => {
  await this.storeData();
    const navigateAction = NavigationActions.navigate({
      routeName: 'Logout'
    });
    this.props.navigation.dispatch(navigateAction);
}

storeData = async () => {
  try {
    await AsyncStorage.setItem('id', '0');
  } catch (error) {
    this.showSnackbar("Something went wrong");
  }
};

  render() {
    return (
      <Container style={{ backgroundColor:"red" }}>
       
     
        <StatusBar translucent={false}  backgroundColor={"green"} barStyle="light-content"  />
        <TouchableOpacity   style={styles.Subheader}   onPress={()=>this.close('Profiles')}  >  
          <Row>
        <Col style={{marginTop:20,marginRight:20,marginLeft:20,width:'40%',justifyContent:'center',alignItems:'flex-end'}}> 
        {/* <Image source= {this.state.profile_picture} style={{ height: 90, width: 90,  borderRadius:50}} /> */}
        </Col>
        <Col style={{width:'60%',justifyContent:'center',textAlign:'left',marginTop:20,marginRight:20}}>
          </Col>   
        </Row>
        </TouchableOpacity>
        <Row style={styles.CompletedModal}>
             </Row>
             
          
        <TouchableOpacity style={{ marginTop:15 }}  onPress={()=>this.close('YourAppointment')}>
             <Row  style={styles.Subheader1}>
            
        <Col style={styles.ColImage}> 
        {/* <Image source={require('../assets/images/menu_doctor_appointment.png')} style={styles.Image} /> */}
        </Col>
       
        <Col  style={styles.ColText}>
          <Text style={{   fontSize: 14,  
            
            color:"#fff" }}>My Doctor Appointments</Text> 
          </Col>
          <Col style={styles.Colarrow}> 
           {/* <Image source={require('../assets/images/arrow-point-menu.png')} style={styles.ArrowImage} /> */}
           </Col>
      
        </Row>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop:15 }}  onPress={()=>this.close('Order')}>
             <Row  style={styles.Subheader1}>
            
        <Col style={styles.ColImage}> 
        {/* <Image source={require('../assets/images/menu_medicine_orders.png')} style={styles.Image} /> */}
        </Col>
       
        <Col  style={styles.ColText}>
          <Text style={{   fontSize: 14,  
            
            color:"#fff" }}>My Medication Orders</Text> 
          </Col>
          <Col style={styles.Colarrow}> 
           {/* <Image source={require('../assets/images/arrow-point-menu.png')} style={styles.ArrowImage} /> */}
           </Col>
      
        </Row>
        </TouchableOpacity>

      
        <TouchableOpacity style={{ marginTop:15 }}  onPress={()=>this.handleDelete()}>
             <Row  style={styles.Subheader1}>
            
        <Col style={styles.ColImage}> 
        {/* <Image source={require('../assets/images/logout.png')} style={styles.Image} /> */}
        </Col>

       
        <Col  style={styles.ColText}>
          <Text style={{   fontSize: 14,  
            
            color:"#fff" }}>Logout</Text> 
          </Col>
          <Col style={styles.Colarrow}> 
           {/* <Image source={require('../assets/images/arrow-point-menu.png')} style={styles.ArrowImage} /> */}
           </Col>
      
        </Row>
        </TouchableOpacity>

        

           <View style={{ justifyContent: 'center',
alignItems: 'center',
position: 'absolute',
bottom: 0, }}  onPress={()=>this.close('Labs')}>
             <Row  style={styles.Subheader1}>
            
      
       
        <Col  style={{     marginBottom:25,
            width:'100%',
            height:30,
            borderWidth:0,
            padding:0,
            margin:0,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:"#000", }}>
          <Text style={{   fontSize: 14,  
            color:"green" }}>Build Version : v 0.1</Text> 
          </Col>
         
      
        </Row>
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
    Subheader:{
        height:'9%',
        width:'90%',
        backgroundColor:"red",
        marginTop:60,
     
      },
      Subheader1:{
        height:'1%',
        backgroundColor:"red",
        marginTop:30
     
      },
      CompletedModal:{ 
        justifyContent:'center', 
        alignItems:'center', 
        borderBottomColor: "green",
      borderBottomWidth: 1,
       height:15,
       marginTop:40
      },
      ColImage:{
          marginLeft:10, 
          width:'17%',
          justifyContent:'center',
          alignItems:'flex-start'
        },
        Image:{ 
            height: 40, 
            width: 40,
            marginTop:10
        },
        ColText:{
            marginTop:-10,
            width:'62%',
            height:30,
            borderWidth:0,
            padding:0,
            margin:0,
            justifyContent:'flex-start',
            alignItems:'flex-start'
        },
        TextStyle:{ 
            fontSize: 14,  
            color:"green"
        },
        Colarrow:{
            width:'10%',
            justifyContent:'center', 
            marginLeft:5
        },
        ArrowImage:{ 
            height: 10, 
            width: 10,  
            color:"green"
        }
     
  });