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

import axios from 'axios';


import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';

import Carousel from 'react-native-carousel-view';

import { BackHandler } from 'react-native';

import { onSignIn, isSignedIn, onSignOut, getAllAsyncStroage, removeBLE, SERVER_URL } from '../../../config/auth';

const { Slider_url } = "http://olosim.com/storage/app/public/"

var { width, height } = Dimensions.get('window');
export default class Dashboard_Content extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loader:true,
      slider_images: []
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
    } else {

    axios.post('http://apis.olosim.com/pitcures.php')
    .then(async (response) => {
        console.log(response)
        data = response.data
        this.setState({slider_images: data, loader: false})
      })
      .catch((error) => {
        console.log(error.message)
        this.setState({loader: false})
    })

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

  _onPressButton = () => {
    const { navigate } = this.props.navigation
    navigate("Sims")
  }

  render() {

    const { slider_images } = this.state

    console.log(slider_images)

      return (
        <View>
        <View style={{ flex: 1, flexDirection: 'column', width: '100%', height: '100%'}}>

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
            <Text style={{ color: '#757575', fontWeight: 'bold', fontSize: 19, paddingLeft: 5,}}>HOME</Text>                  
            </View>
          </View>

          <View>

          {
            this.state.loader?

            <View style={{
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <ActivityIndicator size="large" color="#FFC300" />
          </View>
            :

            <View>
                <View style={{height: 230, marginTop: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Carousel
                        width={width-20}
                        height={220}
                        delay={2000}
                        indicatorAtBottom={true}
                        indicatorSize={25}
                        indicatorColor="#fb620c"
                        animate={false}
                    >
                                            {slider_images.map(slider => {

                                              image_path = "http://olosim.com/storage/app/public/"+slider.slider

                                              console.log(image_path)
                                                    return (
                                                      <View  key={slider.id} style={style.contentContainer}>
                                                      <Image
                                                      style={{width: width, height: 200}}
                                                      resizeMode="stretch"
                                                      source={{uri: image_path }}
                                                      />
                                                      </View>
                                                    )
                                                })}
                                            

                      </Carousel>
                  </View>
              </View>
         }
        </View>
        </View>
        </View>
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
    innerBlock: {fontSize: 16, color: '#ff6f00', paddingTop: 5, fontWeight: 'bold'},
middleLine: {borderBottomWidth: 2, borderColor: '#ff7200', width: 50},
headerLine: { color: '#3F51B5', fontWeight: 'bold', fontSize: 55, textAlign: 'left' },
iconstyle: {textAlign: 'right', padding: 5}
});
