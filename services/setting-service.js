import SettingModel from "../models/setting-model.js";

class TransactionService {
    async getSetting(name) {
        return SettingModel.findOne({name});
    }

    async setSetting(name, value) {
        return SettingModel.findOneAndUpdate({name}, {value}, {new: true});
    }
}


export default new TransactionService();