/* global window */
import client from './client';

async function authenticateSession() {
  if (!window.localStorage['feathers-jwt']) {
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
    client.set('user', userData);
    return userData;
  } catch (e) {
    window.location.replace(window.location.origin);
    return e;
  }
}
  
export default authenticateSession;