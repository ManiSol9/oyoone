import React from "react";

import { Platform, StatusBar, HeaderRight, View, StyleSheet, Image } from "react-native";

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';


class Landing extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  }
  componentDidMount () {
  }
  register = () => {
    const { navigate } = this.props.navigation
    navigate("Register")
  }
  login = () => {
    const { navigate } = this.props.navigation
    navigate("Login")
  }
  render() {
    return (
        <Container style={{backgroundColor: '#FFFFFF', flex: 1}}>
          <Header style={{backgroundColor: '#FFFFFF'}} />
          <View style={{height: '60%', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{ resizeMode: 'contain', width:300, height: 300 }} source={{ uri: 'oyoone' }} />
          </View>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 0
          }}>
            <View style={{width: '80%', padding: 5, marginBottom: 5}}>
                <Button onPress={()=> this.register()} block style={{backgroundColor: '#FFC300', width: '100%', alignSelf: 'center'}}>
                  <Text style={{textAlign: 'center', fontSize: 20, color: '#000', fontWeight: 'bold'}}>Register Now</Text>
                </Button>
            </View>
            <View style={{width: '80%', padding: 5}}>
                <Button onPress={()=> this.login()} block style={{backgroundColor: '#FFC300', width: '100%', alignSelf: 'center'}}>
                  <Text style={{textAlign: 'center', fontSize: 20, color: '#000', fontWeight: 'bold'}}>Login</Text>
                </Button>
            </View>
          </View>
        </Container>
    );
  }
}

export default Landing;
