import React, { Component } from "react";
import { ActivityIndicator, View, Text } from 'react-native'
import * as Font from 'expo-font'
import App from "./index.js";


export default class UlakApp extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  async componentWillMoun(){
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }
  
  render() {
    if (!this.state.isReady) {
        this.componentWillMoun();
        return(
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator />
          </View>
        );
    }
    return <App />;
  }
}