import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Switch,
  Image,
  PixelRatio,
  KeyboardAvoidingView,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  Dimensions,
  Keyboard,
  ToastAndroid,
  Alert,
  ActivityIndicator, TouchableWithoutFeedback
} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';

import Carousel from 'react-native-carousel-view';

import { BackHandler } from 'react-native';

import { onSignIn, isSignedIn, onSignOut, getAllAsyncStroage, removeBLE, SERVER_URL } from '../../../config/auth';

var { width, height } = Dimensions.get('window');
export default class Shopping_Content extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loader:false
    };
  }

  componentWillMount() {
  }


  menu = () => {
    const { navigate } = this.props.navigation
    navigate("Menu")
  }

  shopping = () => {
    const { navigate } = this.props.navigation
    navigate("Shopping")
  }

  async componentDidMount() {
    let USER_ID = await AsyncStorage.getItem("USER_ID");
    console.log(USER_ID)
    if(USER_ID == null){
      const { navigate } = this.props.navigation
      onSignOut();
      navigate("SignedOut")     
    }

  }

  render() {
      return (
        <View>
        <View style={{ flex: 1, flexDirection: 'column', width: '100%', height: '100%'}}>

          <View style={{
              borderWidth: 1,
              borderRadius: 2,
              borderColor: '#ddd',
              borderBottomWidth: 0,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.8,
              shadowRadius: 1,
              elevation: 1,
              backgroundColor: '#FFF'
          }}>

            <View style={{padding: 15, top: 0, backgroundColor: '#FFF', height: 50}}>
            <Text style={{ color: '#757575', fontWeight: 'bold', fontSize: 19, paddingLeft: 5,}}>SHOPPING</Text>                  
            </View>

          </View>

          <View style={{justifyContent: 'center', alignItems: 'center', height: 400}}>
            <Icon name='cog' style={{fontSize: 50, color: '#ff6f00'}}/>
            <Text style={{fontSize: 25}}>Page In Development</Text>
          </View>                              

        </View>

      </View>
     );
  }
}


const style = StyleSheet.create({
    container: {
        flex: 1,

    },
    box: {

    },
    container: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
    },
    contentContainer: {
        borderWidth: 0,
        borderColor: '#CCC',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerBlock: {fontSize: 20, color: '#3F51B5', paddingTop: 5, fontWeight: 'bold', paddingLeft: 20, paddingTop: 10},
middleLine: {borderBottomWidth: 2, borderColor: '#ff7200', width: 50, marginLeft: 20},
headerLine: { color: '#3F51B5', fontWeight: 'bold', fontSize: 55, textAlign: 'left', paddingLeft: 20},
iconstyle: {textAlign: 'right', padding: 5}
});
