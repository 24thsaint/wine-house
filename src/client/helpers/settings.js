import client from '../client';

class Setting {
  constructor() {
    this.settingService = client.service('/api/settings');
  }

  async get(key) {
    const setting = await this.settingService.find({ key });
    if (setting.data.length === 0) {
      return false;
    }
    return setting.data[0].value;
  }

  async set(key, value) {
    let setting;
    const existingSetting = await this.settingService.find({ key });
    if (existingSetting.length > 0) {
      setting = await this.settingService.patch(existingSetting[0]._id, {value});
    } else {
      setting = await this.settingService.create({key, value});
    }
    return setting;
  }
}

const setting = new Setting();
export default setting;