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
export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loader:false,
      email: null,
      password: null
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    //BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }


  login = () => {
      this.setState({loader: true})
      var self = this;
      if (this.state.email !== null || this.state.password !== null) {
              var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
              if (filter.test(this.state.email)) {
                  axios.post('http://apis.olosim.com/login.php', {"email": String(this.state.email), "password" : String(this.state.password)})
                  .then(async (response) => {
                    console.log(response)
                      data = response.data
                      if(data.response === 'Email and Password are not matching'){
                        alert("Email and Password are not matching")
                        self.setState({loader: false})
                      } else {
                        AsyncStorage.setItem("USER_ID", String(data.userid));
                        self.setState({loader: false})

                        const resetAction = StackActions.reset({
                          index: 0,
                          actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
                        });
                        this.props.navigation.dispatch(resetAction);

                      }
                    })
                    .catch((error) => {
                      console.log(error.message)
                      alert("Oops, Try again later...")
                      self.setState({loader: false})
                  })
              } else {
                this.setState({loader: false})
                alert("Please enter valid email address")
              }
        } else {
          this.setState({loader: false})
          alert("Please fill all the fields")
        }
  }

  forgot = () => {
    const { navigate } = this.props.navigation
    navigate("Forgot")
  }

  register = () => {
    const { navigate } = this.props.navigation
    navigate("Register")
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
              <Title style={{color: '#000'}}>LOGIN </Title>
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
                                    placeholder = "Email"
                                    placeholderTextColor = "#000"
                                    autoCapitalize = "none"
                                    value={this.state.email}
                                    onChangeText={ (text) => this.setState({
                                        email: text
                                    })}/>

                                  <TextInput style = {styles.input}
                                    underlineColorAndroid = "transparent"
                                    placeholder = "Password"
                                    placeholderTextColor = "#000"
                                    autoCapitalize = "none"
                                    secureTextEntry = {true}
                                    value={this.state.password}
                                    onChangeText={ (text) => this.setState({
                                    password: text
                                })}/>

                  </View>
                <View style={{width: '80%', padding: 5, marginTop: 25}}>
                    <Button onPress={()=> this.login()} block style={{backgroundColor: '#FFC300', width: '100%', alignSelf: 'center'}}>
                      <Text style={{textAlign: 'center', fontSize: 20, color: '#000', fontWeight: 'bold'}}>LOGIN</Text>
                    </Button>
                </View>
                <View style={{marginTop: 20}}>
                  <TouchableOpacity onPress={()=> this.forgot()}>
                  <Text>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 20}}>
                  <Text>Dont't have an account?</Text>
                </View>
                <View style={{width: '80%', padding: 5, marginTop: 25}}>
                    <Button onPress={()=> this.register()} block style={{backgroundColor: '#FFC300', width: '100%', alignSelf: 'center'}}>
                      <Text style={{textAlign: 'center', fontSize: 20, color: '#000', fontWeight: 'bold'}}>Register Now</Text>
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
