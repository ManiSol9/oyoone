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
          <View style={{ flex: 1, flexDirection: 'column', width: '100%', height: '100%'}}>


          <View style={{justifyContent: 'center', alignItems: 'center', height: 400}}>
            <Icon name='cog' style={{fontSize: 50, color: '#ff6f00'}}/>
            <Text style={{fontSize: 25}}>Page In Development</Text>
          </View>                              

        </View>

      </Container>
      );
  }
}
