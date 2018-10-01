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
export default class Forgot extends Component {

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

    const {navigate} = this.props.navigation

    navigate("Verify", {user_id:59})

    /*
      this.setState({loader: true})
      var self = this;
      if (this.state.email !== null) {
              var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
              if (filter.test(this.state.email)) {

                axios.post('http://apis.olosim.com/forgotpassword.php', {"email": String(this.state.email)})
                .then(async (response) => {
                  console.log(response)
                    data = response.data
                    if(data.status == 'Message sent'){

                      const {navigate} = this.props.navigation

                      navigate("Verify", {user_id: data.user_id})

                    } else {
                      alert("Not a vaid email address")
                      self.setState({loader: false})
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

        */
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
              <Title style={{color: '#000'}}>FORGOT PASSWORD </Title>
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

                  </View>
                <View style={{width: '80%', padding: 5, marginTop: 25}}>
                    <Button onPress={()=> this.login()} block style={{backgroundColor: '#FFC300', width: '100%', alignSelf: 'center'}}>
                      <Text style={{textAlign: 'center', fontSize: 20, color: '#000', fontWeight: 'bold'}}>CHECK</Text>
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
