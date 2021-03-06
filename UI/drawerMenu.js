import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

let config = require('../config');

export default class DrawerMenu extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)

    this.state = {
      student: null,
      id: this.props.navigation.getParam('id'),

    };
    
    this.__load = this.__load.bind(this);
  }

  emptyAsyncStorage = async ()=>{
    AsyncStorage.clear();
    this.props.navigation.navigate('StudentLogout');
  }

  componentDidMount() {
    this.__load();
  }

  __load() {
    let url = config.settings.serverPath + '/php_rest_diecs/api/student/read_single.php?id=' + this.state.id;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          alert.alert('Error', response.status.toString());
          throw Error('Error' + response.status);
        }
        return response.json()
      })
      .then((responseJson) => {
        this.setState({ student: responseJson });
      })
      .catch((error) => {
        console.log(error)
      });
  }

  render() {
    let student = this.state.student;
    return (
      <ScrollView style={drawerStyle.background}>
        <View style={drawerStyle.header}>

          <Image style={{ width: 100, height: 100, alignSelf: 'center' }} source={require('../Images/userlogo.jpg')} />

        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
            {student ? student.name : ''}
          </Text>
          <Text style={{ fontSize: 18 }}>
            {student ? student.id : ''}
          </Text>
        </View>
        <TouchableOpacity onPress={() => { this.props.navigation.navigate('StudentHome',{
          id:this.state.id,refresh: this.__load}) }}>
          <View style={drawerStyle.home}>
            <Image style={{ height: 50, width: 50, marginLeft: 10 }} source={require('../Images/home.png')} />
            <Text style={{ fontWeight: 'bold', fontSize: 25, justifyContent: 'center', marginLeft: 20 }}>
              HOME
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { this.props.navigation.navigate('StudentSearch',{
          id:this.state.id,refresh: this.__load}) }}>
          <View style={drawerStyle.search}>
            <Image style={{ height: 50, width: 50, marginLeft: 10 }} source={require('../Images/searchicon.png')} />
            <Text style={{ fontWeight: 'bold', fontSize: 25, justifyContent: 'center', marginLeft: 20 }}>
              SEARCH
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { this.props.navigation.navigate('StudentProfile',{
          id:this.state.id}) }}>
          <View style={drawerStyle.profile}>
            <Image style={{ height: 50, width: 50, marginLeft: 10 }} source={require('../Images/user.png')} />
            <Text style={{ fontWeight: 'bold', fontSize: 25, justifyContent: 'center', marginLeft: 20 }}>
              USER PROFILE
                    </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { this.props.navigation.navigate('sOrganizationStack') }}>
          <View style={drawerStyle.organization}>
            <Image style={{ height: 50, width: 50, marginLeft: 10 }} source={require('../Images/chart.png')} />
            <Text style={{ fontWeight: 'bold', fontSize: 20, justifyContent: 'center', marginLeft: 20 }}>
              ORGANIZATION CHART
                    </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { this.props.navigation.navigate('sSetting') }}>
          <View style={drawerStyle.setting}>
            <Image style={{ height: 50, width: 50, marginLeft: 10 }} source={require('../Images/setting.png')} />
            <Text style={{ fontWeight: 'bold', fontSize: 25, justifyContent: 'center', marginLeft: 20 }}>
              SETTING
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.emptyAsyncStorage}>
          <View style={drawerStyle.logout}>
            <Image style={{ height: 70, width: 70, marginLeft: 10 }} source={require('../Images/lock.png')} />
            <Text style={{ fontWeight: 'bold', fontSize: 25, justifyContent: 'center', marginLeft: 20 }}>
              LOG OUT
            </Text>
          </View>
        </TouchableOpacity>

      </ScrollView >
    );
  }
}

const drawerStyle = StyleSheet.create({
  header: {
    //flex: 1,
    //flexDirection: 'row',
    //alignItems: 'stretch',
    //justifyContent: 'space-between',
    margin: 20
  },
  background: {
    backgroundColor: 'white',
    opacity: 50,
  },
  home: {
    backgroundColor: '#ffe989',
    height: 70,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    backgroundColor: '#ffe577',
    height: 70,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notification: {
    backgroundColor: '#f9db57',
    height: 70,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    backgroundColor: '#fcd00f',
    height: 70,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  organization: {
    backgroundColor: '#fc990f',
    height: 70,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  setting: {
    backgroundColor: '#ef1515',
    height: 70,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logout: {
    backgroundColor: '#c10000',
    height: 70,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
