import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ReactNativeAD, ADLoginView } from 'react-native-azure-ad';

const CLIENT_ID = '124cfe16-f017-446a-ad4d-f539ac97de60';
const AUTH_URL = 'https://login.microsoftonline.com/common/oauth2/authorize';
const ADContext = new ReactNativeAD({
  client_id: CLIENT_ID,
  redirectUrl: 'http://localhost:3000/token',
  authority_host: AUTH_URL,
  client_secret: 'tsrwyhZIJCK2$#+uKF0681]',
  resources: ['https://graph.microsoft.com'],
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 24,
    backgroundColor: '#1a6ed1',
    padding: 12,
  },
});

class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // this property will store user credential after logged in.
      info: null,
      // logout if this is true
      shouldLogout: false,
      displayType: 'before_login',
    };

    this.showADLogin = this.showADLogin.bind(this);
    this.onURLChange = this.onURLChange.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.logout = this.logout.bind(this);
  }

  onURLChange(e) {
    // listen to webview URL change, if the URL matches login URL redirect user
    // to start page.
    const isLoginPage = e.url === `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}`;
    if (isLoginPage && this.state.shouldLogout) {
      console.log('logged out');
      this.setState({
        displayType: 'before_login',
        shouldLogout: false,
      });
    }
  }

  onLoginSuccess(cred) {
    console.log('user credential', cred);
    const accessToken = ADContext.getAccessToken('https://graph.microsoft.com');
    fetch('https://graph.microsoft.com/v1.0/me', {
      method: 'GET',
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    })
      .then(res => res.json())
      .then((user) => {
        console.log(user);
        this.setState({
          displayType: 'after_login',
          info: user.displayName,
        });
      });
  }

  showADLogin() {
    this.setState({
      displayType: 'login',
    });
  }

  logout() {
    this.setState({
      displayType: 'login',
      shouldLogout: true,
    });
  }

  renderContent() {
    switch (this.state.displayType) {
      case 'before_login':
        return (
          <TouchableOpacity style={styles.button} onPress={this.showADLogin}>
            <Text style={{ color: 'white' }}>Login</Text>
          </TouchableOpacity>
        );
      case 'login':
        // In fact we care if it successfully redirect to the URI, because
        // we alread have the access_token after successfully logged in.
        // set `hideAfterLogin` to `true` so that it won't display an error page.
        return (
          <ADLoginView
            key="webview"
            hideAfterLogin
            style={{ flex: 1 }}
            needLogout={this.state.shouldLogout}
            context={ADContext}
            onURLChange={this.onURLChange}
            onSuccess={this.onLoginSuccess}
          />
        );
      case 'after_login':
        return (
          <View>
            <Text>
              {"You're logged in as "}
              {this.state.info}
            </Text>,
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Building')}
            >
              <Text style={{ color: 'white' }}>Buildings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.logout}>
              <Text style={{ color: 'white' }}>Logout</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        break;
    }
  }

  render() {
    return <View style={styles.container}>{this.renderContent.bind(this)()}</View>;
  }
}

export default AuthScreen;
