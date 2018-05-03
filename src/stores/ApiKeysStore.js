import { observable, action } from 'mobx';
import { ReactNativeAD } from 'react-native-azure-ad';

class ApiKeysStore {
  @observable CLIENT_ID = '124cfe16-f017-446a-ad4d-f539ac97de60';

  @observable AUTH_URL = 'https://login.microsoftonline.com/common/oauth2/authorize';

  @observable
  ADContext = new ReactNativeAD({
    client_id: this.CLIENT_ID,
    redirectUrl: 'http://localhost:3000/token',
    authority_host: this.AUTH_URL,
    client_secret: 'tsrwyhZIJCK2$#+uKF0681]',
    resources: ['https://graph.microsoft.com'],
  });

  @observable accessToken = null;

  @action
  getToken() {
    return this.ADContext.getAccessToken('https://graph.microsoft.com');
  }
}

export default new ApiKeysStore();
