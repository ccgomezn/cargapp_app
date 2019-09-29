import apisauce from 'apisauce';
import Driver from './Driver';
import User from './User';

/* URL
  'https://api.cargapp.co/api/v1/';
  'https://lite.cargapp.co/api/v1/';
*/

// CONSTRUCTOR
const create = (baseURL = 'https://api.cargapp.co/api/v1/') => {
  const api = apisauce.create({
    // BASE URL
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10  SECOND TIMEOUT...
    timeout: 10000,
  });
  const driver = new Driver(api);
  const user = new User(api);
  // RETURN API
  return {
    driver,
    user,
  };
};
// LET'S RETURN BACK OUR CREATE METHOD AS THE DEFAULT.
export default {
  create,
};