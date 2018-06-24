const { authenticate } = require('@feathersjs/authentication').hooks;
const { disallow } = require('feathers-hooks-common');

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ 
      async function noDuplicates(context) {
        const result = await context.app.service('/api/users').find({
          query: {
            username: context.data.username
          }
        });
        
        if (result.total >= 1) {
          throw new Error('Username is already taken');
        } else {
          return context;
        }
      }, 
      hashPassword() ],
    update: [ disallow() ],
    patch: [ hashPassword(),  authenticate('jwt') ],
    remove: [ disallow() ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
