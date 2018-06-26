/* global window, document */
import client from './client';
import UserStatus from './helpers/userStatus';

async function authenticateSession() {
  if (!window.localStorage['feathers-jwt'] && window.location.pathname !== '/') {
    document.body.innerHTML = '';
    window.location.replace(window.location.origin);
    return false;
  }
  
  const authenticationDetails = {
    strategy: 'jwt',
    accessToken: window.localStorage.getItem('feathers-jwt')
  };
  
  try {
    const result = await client.authenticate(authenticationDetails);
    const payload = await client.passport.verifyJWT(result.accessToken);
    const userData = await client.service('/api/users').get(payload.userId);

    const wallet = JSON.parse(userData.wallet);

    const status = await UserStatus.getStatus(wallet.address);
    let user = userData;

    if (userData.status !== status && status) {
      user = await client.service('/api/users').patch(userData._id, {status});
      console.log('User status updated to: ' + status);
    }

    client.set('user', user);
    client.set('wallet', JSON.parse(userData.wallet));

    return user;
  } catch (e) {
    if (window.location.pathname !== '/') {
      document.body.innerHTML = '';
      window.location.replace(window.location.origin);
    }
    return false;
  }
}
  
export default authenticateSession;