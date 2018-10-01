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

import { BackHandler } from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';

import Carousel from 'react-native-carousel-view';

import { onSignIn, isSignedIn, onSignOut, getAllAsyncStroage, removeBLE, SERVER_URL } from '../../../config/auth';

import Dashboard_Content from './dashboard_content'
import Shopping_Content from './shopping_content'
import Menu_Content from './menu_content'

var { width, height } = Dimensions.get('window');

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loader:false,
      tabvalue: 'Home'
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

  content_load = (value) => {
    console.log(value)
    this.setState({tabvalue: String(value)})
  }

  renderTab(){
    const {navigation} = this.props;
    console.log(this.state.tabvalue)
     switch(this.state.tabvalue){
        case 'Home': return <Dashboard_Content navigation={navigation}/>
        case 'Shop': return <Shopping_Content navigation={navigation}/>
        case 'Menu': return <Menu_Content navigation={navigation}/>
     }
  }



  render() {
      return (
        <Container>

          <Content style={{flex: 1, backgroundColor: '#fafafa'}}>

          {this.renderTab()}

          </Content>
          <Footer>
            <FooterTab style={style.tabs}>
              <Button vertical style={this.state.tabvalue == 'Home' ? style.active_menu : ''} onPress = { () => this.content_load('Home')}>
                <Icon active name="ionic" style={this.state.tabvalue == 'Home' ? style.activeMenuicon : style.normalMenuicon} />
                <Text style={this.state.tabvalue == 'Home' ? style.activeMenutext : style.normalMenutext}>Home</Text>
              </Button>
              <Button vertical style={this.state.tabvalue == 'Shop' ? style.active_menu : ''} onPress = { () => this.content_load('Shop') }>
                <Icon active name="cart" style={this.state.tabvalue == 'Shop' ? style.activeMenuicon : style.normalMenuicon} />
                <Text style={this.state.tabvalue == 'Shop' ? style.activeMenutext : style.normalMenutext}>Shopping</Text>
              </Button>
              <Button vertical style={this.state.tabvalue == 'Menu' ? style.active_menu : ''} onPress = { () => this.content_load('Menu') }>
                <Icon name="apps" style={this.state.tabvalue == 'Menu' ? style.activeMenuicon : style.normalMenuicon}/>
                <Text style={this.state.tabvalue == 'Menu' ? style.activeMenutext : style.normalMenutext}>Menu</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
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
iconstyle: {textAlign: 'right', padding: 5},
active_menu: {},
activeMenutext: { color: '#ff6f00', fontWeight: 'bold'  },
activeMenuicon: { color: '#ff6f00', fontWeight: 'bold' },
normalMenuicon: { color: '#757575' },
normalMenutext: { color: '#757575' },
tabs: {
  borderWidth: 1,
  borderRadius: 2,
  borderColor: '#ddd',
  borderBottomWidth: 0,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.8,
  shadowRadius: 2,
  elevation: 1,
  backgroundColor: '#FFF'
},
header: {
  backgroundColor: '#FFF',
  borderBottomWidth: 1,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.8,
  shadowRadius: 2,
  elevation: 1,
  borderColor: '#ddd',
  borderWidth: 1,
  borderRadius: 0,  
}
});
