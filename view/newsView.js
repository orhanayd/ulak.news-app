import React from 'react';
import { Image, View, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import ScrollUp from 'react-native-scroll-up';
var unescape = require('lodash.unescape');
import Funcs from '../class/funcs';

const funcs = new Funcs();


class newsView extends React.Component {
  constructor() {
    super()
    this.state = {
      toTopVisible: false
    };
  }

  render() {
    const { news, getNews, navigation } = this.props;
    let newsComp = [];
    if(typeof news === "undefined" || news.length < 1){
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 15 }}>
          <Text style={{fontSize: 16}}>Haberler yüklenirken sorun oluştu</Text>
        </View>
      );
    }else{
      news.map((item, index)=>{
        newsComp.push(
          <TouchableOpacity key={index} onPress={()=>navigation.navigation.navigate("New", {id: item.id, agency: item.agency})}>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: "https://images.ulak.news/images/web/"+item.agency+".webp"}} />
                  <Body>
                    <Text>{unescape(funcs.decodeHtmlEntity(item.title))}</Text>
                    <Text note>{item.agency_title}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={{uri: item.image }} style={{height: 200, width: null, flex: 1}}/>
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent>
                    <Icon active name="eye" />
                    <Text>{item.read_times} kere okundu</Text>
                  </Button>
                </Left>
                <Body>
                </Body>
                <Right>
                  <Text>{funcs.timeSince(item.date_u)}</Text>
                </Right>
              </CardItem>
            </Card>
          </TouchableOpacity>
        );
      })
      return (
        <View>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={getNews} />
            }
          >
            {newsComp}
          </ScrollView>
        </View>
      );
    }
  }
}

export default newsView;