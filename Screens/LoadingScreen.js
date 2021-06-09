import React, {useEffect} from 'react';
import { View, Text} from 'react-native';
// import { AppLoading } from 'expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SampleData from './stores/sample'

//1 - LOADING SCREEN
export default function LoadingScreen(props) {
    const { navigation } = props;
    useEffect(() => checkLocalData(), []);

    function checkLocalData(){
        //Check if LocalStorage has been populated with the sample data
        AsyncStorage.getItem('quotes', (err, data) => {
            //if it doesn't exist, extract from json file
            // console.log("SON.stringify(SampleData.quotes)", (SampleData.quotes))
            if (data === null){
                console.log("hi")
                AsyncStorage.setItem('quotes', JSON.stringify(SampleData.quotes));//save the initial data in Async

                navigation.navigate('Home_page'); //Navigate to the home page
            }else{
                console.log("hello")
                navigation.navigate('Home_page'); //Navigate to the home page
            }
        });
    }

    // return <AppLoading/>;
    return (
        <View style={{alignItems:"center", justifyContent:"center", height:"100%", width:"100%", flex:1}}>
            <Text>   Loading...</Text>
        </View>
    );
}