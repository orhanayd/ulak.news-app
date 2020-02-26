import React from 'react';
import { Keyboard, ActivityIndicator, View } from 'react-native';
import { Button, Icon, InputGroup, Input, Text } from 'native-base';
import NewsView from '../view/newsView';

import Api from '../class/api';

const api = new Api();

class Search extends React.Component {
  static navigationOptions = {
    title: 'Ulak ile Ara!',
  };

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      news: [],
      loading: false,
      q: '',
      q_s: '',
      desc: '',
    };
  }

  getSearchNews = async(q, search=false) => {
      if(q.length >= 3 ){

        if(!(search)){
          return false;
        }
        console.log("search.js => getSearchNews("+q+")")
        this.setState({ loading: true, isReady: false, news: []});
        let getSearchResult = await api.getSearchNews(q, 20);

        if(getSearchResult){
          if(getSearchResult[0].data.status){
            this.setState({ news: getSearchResult[0].data.result, isReady: true, loading: false, q_s: q });
          }else{
            this.setState({ desc: getSearchResult[0].data.desc, isReady: false, loading: false });
          }
        }else{
          this.setState({ desc: <Text>Arama Sonuçları Yüklenirken hata oluştu.</Text>, isReady: false, loading: false });
        }
    }
    
  }

  
  componentDidMount(){
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    console.log("componentDidMount() => search.js");
  }

  componentWillUnmount () {
    this.keyboardDidHideListener.remove();
  }


  _keyboardDidHide = () => {
    this.getSearchNews(this.state.q, true)
  }


  render() {
    var {isReady, news, loading, q_s, desc} = this.state;
      return (
        <View>
          <InputGroup style={{width: '100%'}}>
            <Input onChangeText={text => this.setState({q: text})} style={{width: '85%'}} placeholder='Ne aramak istersin ?' />
            <Button style={{width: '15%'}} iconLeft transparent>
              {loading ? <ActivityIndicator size={'large'} /> : <Icon name='ios-search' />}
            </Button>
          </InputGroup>

            {isReady &&
              <Text style={{fontSize: 20}}>{q_s} ile ilgili haberler;</Text>
            }
            {news.length > 0 ?
              <NewsView news={news} getNews={()=>this.getSearchNews(this.state.q, true)} navigation={this.props}  />
            : <Text>{desc==='Not Found' ? 'Aradığınızla ilgili haber bulunamadı.' : desc}</Text>}
        </View>
      );
  }
}

export default Search;