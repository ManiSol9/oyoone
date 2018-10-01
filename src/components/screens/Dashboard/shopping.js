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
export default class Shopping extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loader:false
    };
  }

  componentWillMount(){

  }

  menu = () => {
    const { navigate } = this.props.navigation
    navigate("Menu")
  }

  home = () => {
    const { navigate } = this.props.navigation
    navigate("Dashboard")
  }

  render() {
      return (
        <Container>
          <Header>
            <Body style={{alignItems: 'center', width: '100%'}}>
              <Title style={{fontWeight: 'bold'}}>SHOPPING</Title>
            </Body>
          </Header>
          <Content>


          </Content>
          <Footer>
            <FooterTab>
              <Button vertical onPress = { () => this.home() }>
                <Icon active name="ionic" style={{color: '#FFF'}} />
                <Text style={{color: '#FFF'}}>Home</Text>
              </Button>
              <Button vertical style={{borderBottomWidth: 2, borderColor: 'white'}}>
                <Icon active name="cart" style={{color: '#FFF'}} />
                <Text style={{color: '#FFF'}}>Shopping</Text>
              </Button>
              <Button vertical onPress = { () => this.menu() }>
                <Icon name="apps" style={{color: '#FFF'}} />
                <Text style={{color: '#FFF'}}>Menu</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
  }
}
