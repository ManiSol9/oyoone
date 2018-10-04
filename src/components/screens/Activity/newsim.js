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

import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';


import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';

import Carousel from 'react-native-carousel-view';

import { BackHandler } from 'react-native';

import { onSignIn, isSignedIn, onSignOut, getAllAsyncStroage, removeBLE, SERVER_URL } from '../../../config/auth';

const { Slider_url } = "http://olosim.com/storage/app/public/"

var { width, height } = Dimensions.get('window');

export default class Newsim extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
      tableData: [
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd']
      ]
    }
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }
  renderRow() {
    return (
      <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', height: 150, borderRadius: 5, padding: 10, borderWidth: 1 }}>
        <Text>fff</Text>
      </View>
    );
  }

  render() {

    const data = [1, 2, 3, 4, 5];

    return (
      <Container>

        <Header />
        <Content style={{ flex: 1, backgroundColor: '#fafafa' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {
              data.map((datum) => {
                return this.renderRow();
              })
            }
          </View>
        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});
