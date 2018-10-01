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

var { width, height } = Dimensions.get('window');
export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loader:false
    };
  }

  componentWillMount(){

  }

  menu = () => {

    alert('Hiii')

  }

  back = () => {
    const { navigate } = this.props.navigation
    //navigate("Landing")
    this.props.navigation.goBack()
  }

  render() {
      return (
        <Container>
          <Header style={{backgroundColor: '#FFF', borderBottomWidth: 1}}>
            <Left>
              <Button  onPress={ () => this.back()} transparent>
                <Icon style={{color: '#000'}} name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title style={{color: '#000'}}>PROFILE</Title>
            </Body>
          </Header>
          <Content>


          </Content>
        </Container>
      );
  }
}
