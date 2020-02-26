import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Icon, Picker, Button, Text} from 'native-base';
import NewsView from '../view/newsView';

import Api from '../class/api';

const api = new Api();

class Agency extends React.Component {
  static navigationOptions = {
    title: 'Ajanslar',
  };

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      agencies: [],
      agencyNews: [],
      loadingText: <ActivityIndicator size={'large'} />,
      error: false,
      selected2: undefined
    };
  }

  async getAgencies(){
    console.log("new.js => getAgencies()");
    let agencyComp = [];
    await this.setState({ isReady: false, agencies: [], loadingText: <ActivityIndicator size={'large'} />, error: false });
    let getAgenciesData = await api.getAgencies();

    if(getAgenciesData){
      if(getAgenciesData[0].data.status){
        agencyComp.push(<Picker.Item key={0} label="Ajans Seçiniz" value={undefined} />);
        getAgenciesData[0].data.result.map((agency, index)=>{
          index = index+1;
          agencyComp.push(<Picker.Item key={index} label={agency.title} value={agency.id} />);
        })
        this.setState({ agencies: agencyComp, isReady: true });
      }else{
        this.setState({ loadingText: getAgenciesData[0].data.desc, isReady: false });
      }
    }else{
      this.setState({ loadingText: <Text>Ajanslar Yüklenirken hata oluştu.</Text>, isReady: false, error: true });
    }
    
  }

  async getAgencyNews(agency){
    console.log("new.js => getAgencyNews("+agency+")")
    await this.setState({ isReady: false, agencyNews: [], error: false });
    let getAgencyNewsData = await api.getAgencyNews(agency);

    if(getAgencyNewsData){
      if(getAgencyNewsData[0].data.status){
        this.setState({ agencyNews: getAgencyNewsData[0].data.result, isReady: true });
      }else{
        this.setState({ loadingText: getAgencyNewsData[0].data.desc, isReady: false });
      }
    }else{
      this.setState({ loadingText: <Text>Ajans Haberleri Yüklenirken hata oluştu.</Text>, isReady: false, error: true });
    }

  }
  
  componentDidMount(){
    console.log("componentDidMount() => agency.js");
    this.getAgencies();
  }

  componentWillUnmount(){
    console.log("componentWillUnmount() => agency.js");
    this.setState({ agencies: [], agencyNews: [], isReady: false, loadingText: <ActivityIndicator size={'large'} /> })
  }

  onValueChange2(value) {
    if(value !==undefined){
      this.getAgencyNews(value)
    }
    this.setState({
      selected2: value
    });
  }

  render() {
    const {isReady, loadingText, agencies, selected2, agencyNews, error} = this.state;

    if(isReady){
      return (
        <View>
               <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: '100%', height: 50, }}
                  placeholder="Ajans seçiniz."
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={selected2}
                  onValueChange={this.onValueChange2.bind(this)}
                >
                  {agencies}
                </Picker>
          {selected2 !== undefined &&
            <NewsView news={agencyNews} getNews={()=>this.getAgencyNews(selected2)} navigation={this.props}  />
          }
        </View>
      );
    }else{
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {loadingText}
          {error &&
          <Button onPress={()=>this.getAgencies()} iconLeft dark roundeds>
            <Icon name='refresh' />
            <Text>Tekrar Dene</Text>
          </Button>
          }
        </View>
      );
    }
  }
}

export default Agency;