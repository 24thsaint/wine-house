import client from '../client';

class Verification {
  constructor() {
    this.service = client.service('/api/verifications');
  }

  async save(data) {
    data.isPending = true;
    return await this.service.create(data);
  }

  async find(id) {
    const result = await this.service.find({ query: { _id: id } });
    return result.data[0];
  }

  async getAllPending(limit = 10, page = 0) {
    const result = await this.service.find({ 
      query: {
        isPending: true,
        $skip: page * limit
      },
    });
    return result;
  }

  async verify(id) {
    const result = await this.service.find({
      query: {
        _id: id,
        isPending: true
      }
    });
    const pendingVerification = result.data[0];
    return await this.service.patch(pendingVerification._id, {isPending: false});
  }
}

export default Verification;