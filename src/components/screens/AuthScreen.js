import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ReactNativeAD, ADLoginView } from 'react-native-azure-ad';

const CLIENT_ID = '124cfe16-f017-446a-ad4d-f539ac97de60'
const AUTH_URL = 'https://login.microsoftonline.com/common/oauth2/authorize'
const ADContext = new ReactNativeAD({
  client_id: CLIENT_ID,
  redirectUrl: 'http://localhost:3000/token',
  authority_host: AUTH_URL,
  client_secret: 'tsrwyhZIJCK2$#+uKF0681]',
  resources: [
    'https://graph.microsoft.com',
  ]
})

class AuthScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // this property will store user credential after logged in.
      info: null,
      // logout if this is true
      shouldLogout: false,
      displayType: 'before_login'
    }

  }
  

  render() {
    return (
      <View style={styles.container}>
        {this._renderContent.bind(this)()}
      </View>
    );
  }

  _renderContent() {
    switch(this.state.displayType) {
      case 'before_login' :
        return <TouchableOpacity style={styles.button}
          onPress={(this._showADLogin.bind(this))}>
          <Text style={{color : 'white'}}>Login</Text>
        </TouchableOpacity>
      case 'login' :
        // In fact we care if it successfully redirect to the URI, because
        // we alread have the access_token after successfully logged in.
        // set `hideAfterLogin` to `true` so that it won't display an error page.
        return (
          <ADLoginView
            key="webview"
            hideAfterLogin={true}
            style={{flex :1}}
            needLogout={this.state.shouldLogout}
            context={ADContext}
            onURLChange={this._onURLChange.bind(this)}
            onSuccess={this._onLoginSuccess.bind(this)}/>
        );
      case 'after_login' :
        return (
          <View>
          <Text>You're logged in as {this.state.info} </Text>,
          <TouchableOpacity style={styles.button}
            onPress={() => this.props.navigation.navigate('Building')}>
            <Text style={{color : 'white'}}>Buildings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}
            onPress={(this._logout.bind(this))}>
            <Text style={{color : 'white'}}>Logout</Text>
          </TouchableOpacity>
          </View>
        );
      break
    }
  }
  _onURLChange(e) {
    // listen to webview URL change, if the URL matches login URL redirect user
    // to start page.
    let isLoginPage = e.url === `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}`
    if(isLoginPage && this.state.shouldLogout) {
      console.log('logged out')
      this.setState({
        displayType : 'before_login',
        shouldLogout : false
      })
    }
  }
  _showADLogin() {
    this.setState({
      displayType : 'login'
    })
  }
  _logout() {
    this.setState({
      displayType : 'login',
      shouldLogout : true
    })
  }
  _onLoginSuccess(cred) {
    console.log('user credential', cred)
    let access_token = ADContext.getAccessToken('https://graph.microsoft.com')
    fetch('https://graph.microsoft.com/v1.0/me', {
      method : 'GET',
      headers : {
        Authorization : `bearer ${access_token}`
      }
    })
    .then(res => res.json())
    .then(user => {
      console.log(user)
      this.setState({
        displayType : 'after_login',
        info : user.displayName
      })
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button : {
    alignItems: 'center',
    justifyContent: 'center',
    margin : 24,
    backgroundColor : '#1a6ed1',
    padding : 12
  },
});

export default AuthScreen;