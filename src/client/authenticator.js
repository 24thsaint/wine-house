/* global window */
import client from './client';
import UserStatus from './helpers/userStatus';

async function authenticateSession() {
  if (!window.localStorage['feathers-jwt'] && window.location.pathname !== '/') {
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

    if (userData.status !== status) {
      user = await client.service('/api/users').patch(userData._id, {status});
    }

    client.set('user', user);
    client.set('wallet', JSON.parse(userData.wallet));
    
    if (window.location.pathname === '/') {
      window.location.replace(window.location.origin + '/dashboard');
    }
    return user;
  } catch (e) {
    // window.location.replace(window.location.origin);
    return e;
  }
}
  
export default authenticateSession;