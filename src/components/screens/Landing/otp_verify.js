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

import axios from 'axios';

import { BackHandler } from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';

import { StackNavigator } from "react-navigation";

var { width, height } = Dimensions.get('window');


export default class Verify extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loader:false,
      email: null,
      password: null,
      confpassword: null,
      user_id: null,
      otp: null
    };
  }

  componentWillMount() {

  }

  componentWillUnmount() {
  }

 
  login = () => {
      this.setState({loader: true})
      var self = this;

      console.log(this.props.navigation)

     const { user_id } = this.props.navigation.state.params


    if(this.state.otp == null){

        alert("Please enter otp")
        self.setState({loader: false})

    } else {

        axios.post('http://apis.olosim.com/otpverify.php', {user_id: user_id, otp: String(this.state.otp)})
        .then(async (response) => {
          console.log(response)
            data = response.data
            if(data.response == 'otp verified successfully'){

             alert("User verified suucessfully")

              const {navigate} = this.props.navigation

              navigate("Dashboard")

            } else {
              alert("Otp is not matching")
              self.setState({loader: false})
            }
          })
          .catch((error) => {
            console.log(error.message)
            alert("Oops, Try again later...")
            self.setState({loader: false})
        })        

    }

  }

  send = () => {

    const { user_id } = this.props.navigation.state.params

    axios.post('http://apis.olosim.com/otpgenerate.php', {user_id: user_id})
    .then(async (response) => {
      console.log(response)
        data = response.data

        if(data.Status == 'Success'){
            alert("Otp sent again..")
        }

      })
      .catch((error) => {
        console.log(error.message)
        alert("Oops, Try again later...")
        self.setState({loader: false})
    })  
  }

  next = () => {
    const { navigate } = this.props.navigation
    navigate("Dashboard")
  }


  back = () => {
    const { navigate } = this.props.navigation
    navigate("Landing")
    //this.props.navigation.goBack()
  }

  render() {
      return (
        <Container style={{backgroundColor: '#FFFFFF', flex: 1}}>
          <Header style={{backgroundColor: '#FFC300'}}>
            <Left>
              <Button onPress={ () => this.back()} transparent>
                <Icon name='arrow-back' style={{color: '#000'}}/>
              </Button>
            </Left>
            <Body>
              <Title style={{color: '#000'}}>VERIFY PHONE NUMBER </Title>
            </Body>
          </Header>
          {
            this.state.loader ?
            <View style={{
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <ActivityIndicator size="large" color="#FFC300" />
            </View>
            :
            <View style={{
                alignItems: 'center',
                justifyContent: 'center'
              }}>

                  <View style={{marginTop: '10%', width: width, alignItems: 'center', justifyContent: 'center'}}>

                                  <TextInput style = {styles.input}
                                    underlineColorAndroid = "transparent"
                                    placeholder = "Otp"
                                    placeholderTextColor = "#000"
                                    autoCapitalize = "none"
                                    maxLength={4}
                                    keyboardType='numeric'
                                    value={this.state.otp}
                                    onChangeText={ (text) => this.setState({
                                        otp: text
                                    })}/>
                
                  </View>
                <View style={{width: '80%', padding: 5, marginTop: 25}}>
                    <Button onPress={()=> this.login()} block style={{backgroundColor: '#FFC300', width: '100%', alignSelf: 'center'}}>
                      <Text style={{textAlign: 'center', fontSize: 20, color: '#000', fontWeight: 'bold'}}>UPDATE</Text>
                    </Button>
                </View>
                <View style={{marginTop: 20}}>
                  <TouchableOpacity onPress={()=> this.send()}>
                  <Text>Send Again?</Text>
                  </TouchableOpacity>
                </View>
                <View style={{width: '80%', padding: 5, marginTop: 60}}>
                    <Button onPress={()=> this.next()} block style={{backgroundColor: '#FFC300', width: '100%', alignSelf: 'center'}}>
                      <Text style={{textAlign: 'center', fontSize: 20, color: '#000', fontWeight: 'bold'}}>SKIP & CONTINUE</Text>
                    </Button>
                </View>
              </View>
          }
        </Container>
      );
  }
}


const styles = StyleSheet.create({
   container: {
      //paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#FFC300',
      borderWidth: 1,
      width: '77%',
      padding: 5
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
})
