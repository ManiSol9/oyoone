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

import Carousel from 'react-native-carousel-view';


var { width, height } = Dimensions.get('window');
export default class Dashboard extends Component {

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

  shopping = () => {
    const { navigate } = this.props.navigation
    navigate("Shopping")
  }

  render() {
      return (
        <Container>
          <Header>
            <Body style={{alignItems: 'center', width: '100%'}}>
              <Title style={{fontWeight: 'bold'}}>HOME</Title>
            </Body>
          </Header>
          <Content>

          <View style={{ height: height-50 }}>
            <View style={{height: 250, marginTop: 0, justifyContent: 'center', alignItems: 'center'}}>
                <Carousel
                    width={width-20}
                    height={220}
                    delay={2000}
                    indicatorAtBottom={true}
                    indicatorSize={25}
                    indicatorColor="#fb620c"
                    animate={false}
                >
                    <View style={style.contentContainer}>
                      <Image
                      style={{width: width, height: 220}}
                      source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2cxp2OWRnKmelSUzd8O7GR9a1u86IgoP38NplW8l404EFfZLU'}}
                      />
                    </View>
                    <View style={style.contentContainer}>
                      <Image
                      style={{width: width, height: 220}}
                      source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2cxp2OWRnKmelSUzd8O7GR9a1u86IgoP38NplW8l404EFfZLU'}}
                      />
                    </View>
                    <View style={style.contentContainer}>
                      <Image
                      style={{width: width, height: 220}}
                      source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2cxp2OWRnKmelSUzd8O7GR9a1u86IgoP38NplW8l404EFfZLU'}}
                      />
                    </View>
                </Carousel>
            </View>
            <View style={{height: 300, marginTop: 50}}>
              <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row', bottom: 30}}>
                  <View style={{ height: 150, width: '50%', borderWidth: 2, borderColor: '#3F51B5'}}>
                    <Text style={style.iconstyle}></Text>
                    <Text style={style.headerLine}><Icon active name="person" style={{color: '#3F51B5', fontSize: 50}} /></Text>
                    <View style={style.middleLine}></View>
                    <Text style={style.innerBlock}>SERVICE</Text>
                  </View>
                  <View style={{ height: 150, width: '50%', borderWidth: 2, borderLeftWidth: 0, borderColor: '#3F51B5'}}>
                    <Text style={style.iconstyle}></Text>
                    <Text style={style.headerLine}><Icon active name="bicycle" style={{color: '#3F51B5', fontSize: 50}} /></Text>
                    <View style={style.middleLine}></View>
                    <Text style={style.innerBlock}>NEW SIM</Text>
                  </View>
                </View>
              </View>
              <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row', bottom: 30}}>
                  <View style={{ height: 150, width: '50%', borderWidth: 2, borderColor: '#3F51B5'}}>
                    <Text style={style.iconstyle}></Text>
                    <Text style={style.headerLine}><Icon active name="paper" style={{color: '#3F51B5', fontSize: 50}} /></Text>
                    <View style={style.middleLine}></View>
                    <Text style={style.innerBlock}>SIM REPLACEMENT</Text>
                  </View>
                  <View style={{ height: 150, width: '50%', borderWidth: 2, borderLeftWidth: 0, borderColor: '#3F51B5'}}>
                    <Text style={style.iconstyle}></Text>
                    <Text style={style.headerLine}><Icon active name="chatbubbles" style={{color: '#3F51B5', fontSize: 50}} /></Text>
                    <View style={style.middleLine}></View>
                    <Text style={style.innerBlock}>CONTACT</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          </Content>
          <Footer>
            <FooterTab>
              <Button vertical style={{borderBottomWidth: 2, borderColor: 'white'}}>
                <Icon active name="ionic" style={{color: '#FFF'}} />
                <Text style={{color: '#FFF'}}>Home</Text>
              </Button>
              <Button vertical onPress = { () => this.shopping() }>
                <Icon active name="cart" style={{color: '#FFF'}} />
                <Text style={{color: '#FFF'}}>Shopping</Text>
              </Button>
              <Button vertical onPress = { () => this.menu() }>
                <Icon name="apps" style={{color: '#FFF'}}/>
                <Text style={{color: '#FFF'}}>Menu</Text>
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
iconstyle: {textAlign: 'right', padding: 5}
});
