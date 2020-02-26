import React from 'react';
import { Text, View } from 'react-native';

class MainTabs extends React.Component {
  static navigationOptions = {
    title: 'News',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>News Screen</Text>
      </View>
    );
  }
}

export default MainTabs;