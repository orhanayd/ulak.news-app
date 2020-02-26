import React from 'react';
import { Text, View } from 'react-native';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Loading',
  };
  componentDidMount(){
    this.props.navigation.navigate("Home");
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }
}

export default HomeScreen;