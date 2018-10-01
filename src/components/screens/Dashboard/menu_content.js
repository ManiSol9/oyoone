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

import { Container, Header, Title, Content, Footer, List, ListItem, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';

import { onSignIn, isSignedIn, onSignOut, getAllAsyncStroage, removeBLE, SERVER_URL } from '../../../config/auth';

import Carousel from 'react-native-carousel-view';

import { BackHandler } from 'react-native';

import { StackActions, NavigationActions  } from 'react-navigation';



var { width, height } = Dimensions.get('window');
export default class Menu_Content extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loader:false
    };
  }

  componentWillMount() {
  }




  shopping = () => {
    const { navigate } = this.props.navigation
    navigate("Shopping")
  }
  home = () => {
    const { navigate } = this.props.navigation
    navigate("Dashboard")
  }


  componentDidMount() {
    let USER_ID = AsyncStorage.getItem('USER_ID')
    console.log(USER_ID)
    if(USER_ID == null){
      const { navigate } = this.props.navigation
      onSignOut();
      //navigate("SignedOut")     
    }

  }
  logout = () => {
    onSignOut();
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Landing' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  alert = (value) => {
          const {navigate} = this.props.navigation;
          if(value == 'Profile') {
            navigate("Profile")
          } else if(value == 'Address') {
            navigate("Address")
          } else if(value == 'Password') {
            navigate("Password")
          } else if(value == 'Orders') {
            navigate("Orders")
          } else if(value == 'Requests') {
            navigate("Requests")
          } else if(value == 'Verification'){
              navigate("Number")
          } else {
            alert("Page in Dovelopment")
          }
  }


  render() {
      return (
                  <View>
                    <View style={{ flex: 1, flexDirection: 'column', width: '100%', height: 460}}>

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
                        <Text style={{ color: '#757575', fontWeight: 'bold', fontSize: 19, paddingLeft: 5,}}>MENU</Text>                  
                        </View>

                      </View>

                      <View style={{padding: 15, height: 90}}>
                        <View style={{flex: 1, flexDirection: 'row'}} >
                          <View style={{width: '90%', borderBottomWidth: 2, borderBottomColor: '#757575', paddingBottom: 15, marginTop: 0}}>
                            <Text style={{ color: '#757575', fontWeight: 'bold', fontSize: 22, paddingLeft: 5}}>MANIKANTA PEDIREDDY</Text>
                            <Text style={{ color: '#757575', fontSize: 14, paddingLeft: 5}}>9666509290&nbsp;&nbsp;manikanta.nueve@gmail.com</Text>
                          </View>
                          <View style={{width: '10%', borderBottomWidth: 2, borderBottomColor: '#757575', paddingBottom: 15, marginTop: 5}}>
                            <Icon active name="paper-plane" style={{color: '#ff6f00'}} />
                          </View>
                        </View>
                      </View>

                      <List>
                        <ListItem onPress = { () => this.alert('Address')}>
                        <Icon name='home' /> 
                          <Text style={{paddingLeft: 20, width: '85%'}}>MANAGE ADDRESS</Text>
                          <Icon name='arrow-forward' style={{textAlign: 'right', marginLeft: 0}} />                        

                        </ListItem>
                        <ListItem onPress = { () => this.alert('Password')}>
                        <Icon name='eye' /> 
                          <Text style={{paddingLeft: 20, width: '85%'}}>PASSWORD UPDATE</Text>
                          <Icon name='arrow-forward' style={{textAlign: 'right', marginLeft: 0}} />                        

                        </ListItem>
                        <ListItem onPress = { () => this.alert('Orders')}>
                        <Icon name='cart' /> 
                        <Text style={{paddingLeft: 20, width: '85%'}}>YOUR ORDERS</Text>
                        <Icon name='arrow-forward' style={{textAlign: 'right', marginLeft: 0}} />                        

                        </ListItem>
                        <ListItem onPress = { () => this.alert('Requests')}>
                        <Icon name='chatboxes' />                        
                        <Text style={{paddingLeft: 20, width: '85%'}}>YOUR REQUESTS</Text>
                        <Icon name='arrow-forward' style={{textAlign: 'right', marginLeft: 0}} />                        
                        </ListItem>
                        <ListItem onPress = { () => this.alert('Verification')}>
                        <Icon name='keypad' />
                        <Text style={{paddingLeft: 20, width: '85%'}}>PHONE NUMBER VERIFICATION</Text>
                        <Icon name='arrow-forward' style={{textAlign: 'right', marginLeft: 0}} />
                        </ListItem>
                        
                      </List>

                    </View>
                    <View style={{top: 0, paddingLeft: 20}}>
                          <Button onPress = { () => this.logout()} style={{width: 150, alignContent: 'center', borderColor: '#ff6f00', borderWidth: 2, textAlign: 'center', padding: 5, backgroundColor: '#FFF'}}>
                            <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}> LOG OUT </Text>
                            <Text style={{marginLeft: -10}}><Icon active name="paper-plane" style={{color: '#ff6f00'}} /></Text>
                          </Button>
                    </View>
                  </View>
      );
  }
}
