import React from 'react';
import { Dimensions, View, ActivityIndicator, Image, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { Content, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Button } from 'native-base';
import HTML from 'react-native-render-html';
var unescape = require('lodash.unescape');

import Api from '../class/api';
import Funcs from '../class/funcs';

const funcs = new Funcs();
const api = new Api();

class New extends React.Component {
  static navigationOptions = {
    title: 'Ulak Haber',
  };

  constructor() {
    super();
    this.state = {
      isReady: false,
      loadingText: <ActivityIndicator size={'large'} />,
      newData: [],
    };
  }


  onShare = async () => {
    try {
      const result = await Share.share({
        message: unescape(funcs.decodeHtmlEntity(this.state.newData.title))+'... https://ulak.news/'+this.state.newData.seo_link,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  async getNew(id, agency){

    console.log("new.js => getNew("+id, agency+")")
    await this.setState({ isReady: false, newData: [] });
    let getNewData = await api.getNew(id, agency);

    if(getNewData){
      if(getNewData[0].data.status){
        this.setState({ isReady: true, newData: getNewData[0].data.result[0] });
      }else{
        this.setState({ loadingText: getNewData[0].data.desc, isReady: false });
      }
    }else{
      this.setState({ loadingText: <Text>Haberler Yüklenirken hata oluştu.</Text>, isReady: false });
    }

  }

  componentDidMount(){
    console.log("componentDidMount() => new.js")
    this.setState({ isReady: true });
    this.getNew(this.props.navigation.state.params.id, this.props.navigation.state.params.agency);
  }

  componentDidUpdate(prevProps){
    if(prevProps.navigation.state.params.id!==this.props.navigation.state.params.id){
      this.getNew(prevProps.navigation.state.params.id, prevProps.navigation.state.params.agency);
    }
  }

  render() {
    const {isReady, loadingText, newData} = this.state;
    if(isReady){
      return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: "https://images.ulak.news/images/web/"+newData.agency+".png"}} />
                <Body>
                  <Text>{unescape(funcs.decodeHtmlEntity(newData.title))}</Text>
                  <Text note>{newData.date}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body style={styles.mainConatinerStyle}>
                <Image source={{uri: newData.image}} style={{height: 200, width: Dimensions.get('window').width-35, flex: 1}}/>
                <HTML html={newData.text} imagesMaxWidth={Dimensions.get('window').width-35} />
              </Body>
            </CardItem>
          </Card>
        </Content>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.TouchableOpacityStyle}>
              <Button onPress={this.onShare} rounded iconLeft>
                <Icon name='md-share' />
                <Text>Paylaş</Text>
              </Button>
          </TouchableOpacity>
        </View>
      );
    }else{
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {loadingText}
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  mainConatinerStyle: {
    flexDirection: 'column',
    flex: 1
  },
  TouchableOpacityStyle: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 10,
    right: 15
  }
});

export default New;