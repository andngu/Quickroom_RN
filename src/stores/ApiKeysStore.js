import { observable, action } from 'mobx';
import { ReactNativeAD } from 'react-native-azure-ad';

class ApiKeysStore {
  @observable CLIENT_ID = 'bcea607a-3dbd-4460-a882-b727c299eb1e';

  @observable AUTH_URL = 'https://login.microsoftonline.com/common/oauth2/authorize';

  @observable
  ADContext = new ReactNativeAD({
    client_id: this.CLIENT_ID,
    redirectUrl: 'http://localhost:3000/token',
    authority_host: this.AUTH_URL,
    client_secret: 'nfvT4386[(iqyoOWKTNE8!#',
    resources: ['https://graph.microsoft.com'],
  });

  @observable accessToken = null;

  @action
  getToken() {
    return this.ADContext.getAccessToken('https://graph.microsoft.com');
  }
}

export default new ApiKeysStore();
