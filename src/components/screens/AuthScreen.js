import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';
import { ADLoginView } from 'react-native-azure-ad';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 24,
    backgroundColor: '#1a6ed1',
    padding: 12,
  },
});

@inject(['ApiKeysStore'])
@observer
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
    const { AUTH_URL, CLIENT_ID } = this.props.ApiKeysStore;
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
    const { ADContext } = this.props.ApiKeysStore;
    console.log('user credential', cred);
    const accessToken = this.props.ApiKeysStore.getToken();
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
    const { ADContext } = this.props.ApiKeysStore;
    switch (this.state.displayType) {
      case 'before_login':
        return (
          <Button
            raised
            large
            rounded
            backgroundColor="#841617"
            title="LOGIN"
            onPress={this.showADLogin}
          />
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
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-evenly' }}>
            <Text>
              {"You're logged in as "}
              {this.state.info}
            </Text>,
            <Button
              raised
              rounded
              backgroundColor="#841617"
              title="BUILDINGS"
              onPress={() => this.props.navigation.navigate('BuildingsScreen')}
            />
            <Button raised rounded backgroundColor="#841617" title="LOGOUT" onPress={this.logout} />
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
