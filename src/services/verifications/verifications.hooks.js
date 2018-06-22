const { authenticate } = require('@feathersjs/authentication').hooks;
const { disallow } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
      async function validationHook(context) {
        const service = context.app.service('/api/verifications');
        const result = await service.find({ 
          query: {
            userAddress: context.data.userAddress,
            isPending: true
          }
        });
        if (result.total >= 1) {
          throw new Error('User currently has a pending application review');
        } else {
          return context;
        }
      }
    ],
    update: [disallow()],
    patch: [],
    remove: [disallow()]
  },

  after: {
    all: [],
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
