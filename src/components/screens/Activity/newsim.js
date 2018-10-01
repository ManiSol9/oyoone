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

import axios from 'axios';


import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';

import Carousel from 'react-native-carousel-view';

import { BackHandler } from 'react-native';

import { onSignIn, isSignedIn, onSignOut, getAllAsyncStroage, removeBLE, SERVER_URL } from '../../../config/auth';

const { Slider_url } = "http://olosim.com/storage/app/public/"

var { width, height } = Dimensions.get('window');

export default class Newsim extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loader:true,
      slider_images: []
    };
  }

  componentWillMount() {
  }



  async componentDidMount() {
    let USER_ID = await AsyncStorage.getItem("USER_ID");
    console.log(USER_ID)
    if(USER_ID == null){
      const { navigate } = this.props.navigation
      onSignOut();
      navigate("SignedOut")     
    } else {

    axios.post('http://apis.olosim.com/pitcures.php')
    .then(async (response) => {
        console.log(response)
        data = response.data
        this.setState({slider_images: data, loader: false})
      })
      .catch((error) => {
        console.log(error.message)
        this.setState({loader: false})
    })

  }
    
  }

  menu = () => {
    const { navigate } = this.props.navigation
    navigate("Menu")
  }

  shopping = () => {
    const { navigate } = this.props.navigation
    navigate("Shopping")
  }

  _onPressButton = () => {
    const { navigate } = this.props.navigation
    navigate("Newsim")
  }

  render() {

    const { slider_images } = this.state

    console.log(slider_images)

      return (
        <View>
            <Text>New Sim</Text>
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
    innerBlock: {fontSize: 16, color: '#ff6f00', paddingTop: 5, fontWeight: 'bold'},
middleLine: {borderBottomWidth: 2, borderColor: '#ff7200', width: 50},
headerLine: { color: '#3F51B5', fontWeight: 'bold', fontSize: 55, textAlign: 'left' },
iconstyle: {textAlign: 'right', padding: 5}
});
