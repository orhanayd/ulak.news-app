import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text, Button, Icon } from 'native-base';
import NewsView from '../view/newsView';
import Api from '../class/api';

const api = new Api();


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Son Dakika Haberler',
    headerStyle:{
      backgroundColor: '#3F51B5'
    },
    headerTintColor: '#fff',
    headerTitleStyle:{
      fontWeight: 'bold'
    }
  };

  constructor() {
    super();
    this.state = {
      isReady: false,
      loadingText: <ActivityIndicator size={'large'} />,
      error: false,
      newsData: []
    };
  }


  async getNews(){
    console.log("main.js => getNews()")

    await this.setState({ isReady: false, newsData: [], loadingText: <ActivityIndicator size={'large'} />, error: false });

    let getNewsData = await api.getAllNews(20);

    if(getNewsData){
      this.setState({ isReady: true, newsData: getNewsData[0].data });
    }else{
      this.setState({ loadingText: <Text>Haberler Yüklenirken hata oluştu.</Text>, error: true });
    }

  }

  componentDidMount(){
    console.log("componentDidMount() => main.js")
    this.getNews();
  }

  render() {
    const { newsData, isReady, loadingText, error } = this.state;
    if(isReady){
      return (
          <View>
            <NewsView news={newsData.result} getNews={()=>this.getNews()} navigation={this.props}  />
          </View>
      );
    }else{
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {loadingText}
          {error &&
            <Button onPress={()=>this.getNews()} iconLeft dark roundeds>
              <Icon name='refresh' />
              <Text>Tekrar Dene</Text>
            </Button>
          }
        </View>
      );
    }
  }
}

export default HomeScreen;