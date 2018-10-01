import React from "react";
import { createRootNavigator } from "../config/router";
import { isSignedIn } from "../config/auth";
import { AsyncStorage } from "react-native";
//import SplashScreen from 'react-native-smart-splash-screen';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert(err));
      console.log(this.state)
  }
  componentDidMount () {

  }
  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    const Layout = createRootNavigator(signedIn);
    return <Layout />;
  }
}
