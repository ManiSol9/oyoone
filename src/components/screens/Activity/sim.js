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

import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';


const { Slider_url } = "http://olosim.com/storage/app/public/"

var { width, height } = Dimensions.get('window');

export default class Sims extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loader:true,
      sims_data: [],
      tableHead: ['Simtype', 'Provider', 'Number', 'Price', 'Action'],
      tableData: [
        ['1', '2', '3', '4', '9'],
        ['a', 'b', 'c', 'd', '0'],
        ['1', '2', '3', '456\n789', '99'],
        ['a', 'b', 'c', 'd', 'io']
      ]
    };
  }

  componentWillMount() {
  }



  async componentDidMount() {
    axios.post('http://apis.olosim.com/sims.php', {
        "city": "Tirupati",
        "sim_type": null,
        "provider": null
    })
    .then(async (response) => {
        console.log(response.data)
        data = response.data
        
        sims_data = []
        sim_data = []
        for(i=0;i<=data.length;i++){
            sim_data.push([data[0].provider, data[0].sim_type, data[0].number, data[0].price, data[0].id])
        }


        this.setState({tableData: sim_data, loader: false})

      })
      .catch((error) => {
        console.log(error.message)
        this.setState({loader: false})
    })
  }

  back = () => {
    const { navigate } = this.props.navigation
    navigate("Dashboard")
  }

  shopping = () => {
    const { navigate } = this.props.navigation
    navigate("Shopping")
  }

  _onPressButton = () => {
    const { navigate } = this.props.navigation
    navigate("Newsim")
  }

  render() {
    const state = this.state;
      return (
        <Container>
            <Header style={{backgroundColor: '#FFF', borderBottomWidth: 1}}>
                <Left>
                <Button  onPress={ () => this.back()} transparent>
                    <Icon style={{color: '#000'}} name='arrow-back' />
                </Button>
                </Left>
                <Body>
                <Title style={{color: '#000'}}>Avaliable Sims</Title>
                </Body>
            </Header>
            <Content>
                <View>
                {
                    this.state.loader ?
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                :
                    <View style={styles.container}>
                        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                        <Rows data={state.tableData} textStyle={styles.text}/>
                        </Table>
                    </View>
                }
                </View>
            </Content>
        </Container>
    );
  }
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
  });