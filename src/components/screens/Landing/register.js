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

import { Container, Header, Title, Content, Item, Picker, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';

import axios from 'axios';

var { width, height } = Dimensions.get('window');
export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loader:false,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confpassword: '',
      phone: '',
      selected2: ''
    };
  }

  componentWillMount(){

  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }

  next_step = () => {

/*

    const { navigate } = this.props.navigation

    navigate("Otp_Verify", { user_id : 62})

    */

    const { firstname, lastname, email, password, confpassword, phone } = this.state

    console.log(this.state)

    if(firstname === '' || email === '' || password === '' || confpassword === '' || phone == '' || this.state.selected2 == '') {
      alert("Please fill all the fields")
    } else {
      if(password == confpassword) {

        this.setState({loader: true})

        var self = this;

                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (filter.test(this.state.email)) {
                    axios.post('http://apis.olosim.com/register.php',
                                {
                                  "email": String(this.state.email),
                                  "password" : String(this.state.password),
                                  "name": String(this.state.firstname),
                                  "phone": String(this.state.phone),
                                  "city": String(this.state.selected2)
                                }
                              )
                    .then(async (response) => {
                      console.log(response)
                        data = response.data
                        if(data.response === 'Email already registered'){
                          alert("Email already registered")
                          self.setState({loader: false})
                        } else {
                          alert("OTP sent to registered mobile number")
                          AsyncStorage.setItem("USER_ID", String(data.user_id));
                          self.setState({loader: false})
                          const { navigate } = this.props.navigation
                          navigate("Otp_Verify", { user_id: data.user_id})
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
        alert("Password and Confirm Password should be same")
      }
    }

  }

  forgot = () => {
    const { navigate } = this.props.navigation
    navigate("Forgot")
  }

  back = () => {
    const { navigate } = this.props.navigation
    //navigate("Landing")
    this.props.navigation.goBack()
  }


  onValidationPasssword = (text, name) => {

    var { password } = this.state

    if(password != null){
        if(password.length <= 5){
          alert("Please enter password more than 5 characters")
        }
    }
}

onValidationConfirmPasssword = (text, name) => {

    var { confirmpassword } = this.state

    if(confirmpassword != null) {
        if (confirmpassword.length <= 5) {
          alert("Please enter password more than 5 characters")
        }
    }
}

onValidationName = (text, name) => {

  var { firstname } = this.state

  var format = /^[a-zA-Z]*$/;

  if(firstname != null){
    if (format.test(firstname) == false){
      alert("Please enter valid name")
      this.setState({firstname: ''})
    }  
  }
}

onValidationEmail = (text, name) => {

  var { email } = this.state

  if(email != null){
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(this.state.email)) {

    } else {
      alert("Please enter valid email address")
      this.setState({email: null})
    }
  }

}

 onValidationPhone = () => {

  var { phone } = this.state

        if (isNaN(phone) || phone < 600000000 || phone > 9999999999) {
          alert("Please enter valid phone number")
          this.setState({phone: null})
        }
 }

  render() {
      return (
        <View
            style={styles.container}
            behavior="padding"
          >
          <ScrollView style={{flex: 1, width: '100%'}}>
            <Header style={{backgroundColor: '#FFC300'}}>
              <Left>
                <Button onPress={ () => this.back()} transparent style={{color: '#000'}}>
                  <Icon style={{color: '#000'}} name='arrow-back' />
                </Button>
              </Left>
              <Body >
                <Title style={{color: '#000'}}>REGISTER NOW</Title>
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
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TextInput style = {styles.input}
                       underlineColorAndroid = "transparent"
                       placeholder = "Name"
                       placeholderTextColor = "#000"
                       autoCapitalize = "none"
                       autoCorrect = {false}
                       value={this.state.firstname}
                       onChangeText = { (text) => this.setState({
                         firstname: text
                       })}
                       onEndEditing={(text) =>
                        this.onValidationName(text, 'firstname')
                        } />



                        <TextInput style = {styles.input}
                             underlineColorAndroid = "transparent"
                             placeholder = "Email"
                             placeholderTextColor = "#000"
                             autoCapitalize = "none"
                             autoCorrect = {false}
                             value={this.state.email}
                             onChangeText = { (text) => this.setState({
                               email: text
                             })}
                             onEndEditing={(text) =>
                              this.onValidationEmail(text, 'firstname')
                              } />

                        <TextInput style = {styles.input}
                                underlineColorAndroid = "transparent"
                                placeholder = "Phone Number"
                                keyboardType='numeric'
                                placeholderTextColor = "#000"
                                autoCapitalize = "none"
                                maxLength={10}
                                autoCorrect = {false}
                                value={this.state.phone}
                                onChangeText = { (text) => this.setState({
                                  phone: text
                                })}
                                onEndEditing={(text) =>
                                  this.onValidationPhone(text, 'firstname')
                                  }
                                />

                    <TextInput style = {styles.input}
                       underlineColorAndroid = "transparent"
                       placeholder = "Password"
                       maxLength={10}
                       placeholderTextColor = "#000"
                       autoCapitalize = "none"
                       secureTextEntry = {true}
                       autoCorrect = {false}
                       onChangeText = { (text) => this.setState({
                         password: text
                       })}
                       onEndEditing={(text) =>
                        this.onValidationPasssword(text, 'firstname')
                        }  />

                       <TextInput style = {styles.input}
                          underlineColorAndroid = "transparent"
                          placeholder = "Confirm Password"
                          placeholderTextColor = "#000"
                          maxLength={10}
                          autoCapitalize = "none"
                          secureTextEntry = {true}
                          autoCorrect = {false}
                          onEndEditing={(text) =>
                            this.onValidationConfirmPasssword(text, 'firstname')
                          }  
                          onChangeText = { (text) => this.setState({
                            confpassword: text
                          })}/>

                          <Item style = {styles.se_input} picker>
                            <Picker
                              mode="dropdown"
                              iosIcon={<Icon name="ios-arrow-down-outline" />}
                              //style = {styles.input}
                              placeholder="Select your City"
                              placeholderStyle={{ color: "#bfc6ea" }}
                              placeholderIconColor="#000"
                              selectedValue={this.state.selected2}
                              onValueChange={this.onValueChange2.bind(this)}
                            >
                              <Picker.Item label="----Select City----" value="" />
                              <Picker.Item label="Tirupathi" value="Tirupathi" />
                              <Picker.Item label="Nellore" value="Nellore" />
                              <Picker.Item label="Chandragiri" value="Chandragiri" />
                            </Picker>
                          </Item>

                    <View style={{width: '80%', padding: 5, marginTop: 25}}>
                        <Button onPress={()=> this.next_step()} block style={{backgroundColor: '#FFC300', width: '100%', alignSelf: 'center'}}>
                          <Text style={{textAlign: 'center', fontSize: 20, color: '#000', fontWeight: 'bold'}}>SAVE AND CONTINUE</Text>
                        </Button>
                    </View>
            </View>
            }
          </ScrollView>
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    width: '100%'
  },
    input: {
      margin: 15,
      height: 40,
      borderColor: '#FFC300',
      borderWidth: 1,
      width: '77%',
      padding: 5
  },
   se_input: {
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 5,
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
