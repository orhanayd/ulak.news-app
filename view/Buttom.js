import React from 'react';
import { Footer, Icon, FooterTab, Button, Text } from "native-base";

const routes = [
  {title: "Ana Sayfa", icon: 'home', iconType: 'Entypo', key: "Home"},
  {title: "Ajanslar", icon: 'network', iconType: 'Entypo', key: "Agency"},
  {title: "Haberlerde Ara", icon: 'search1', iconType: 'AntDesign', key: "Search"},
];

const INITIAL_STATE = {
  activeItemKey: 'Home'
}

export default class SideBar extends React.Component {

  constructor (props) {
    super(props)
    this.state = INITIAL_STATE
  }

  
  render() {
    let activeItemKey = this.state.activeItemKey;
    let routesTabs = [];
    routes.map((value, index)=>{
      if(activeItemKey===value.key){
        routesTabs.push(
          <Button onPress={() => this.props.navigation.navigate(value.key) && this.setState({activeItemKey: value.key})} key={index} active>
            <Icon active type={value.iconType} name={value.icon} />
            <Text>{value.title}</Text>
          </Button>
        );
      }else{
        routesTabs.push(
          <Button onPress={() => this.props.navigation.navigate(value.key) && this.setState({activeItemKey: value.key})} key={index}>
            <Icon type={value.iconType} name={value.icon} />
            <Text>{value.title}</Text>
          </Button>
        );
      }
    })
    return (
      <Footer>
        <FooterTab>
          {routesTabs}
        </FooterTab>
      </Footer>
    );
  }
}