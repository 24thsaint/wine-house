const assert = require('assert');
const app = require('../../src/app');

describe('\'verifications\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/verifications');

    assert.ok(service, 'Registered the service');
  });
});
