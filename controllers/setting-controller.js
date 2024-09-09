import SettingService from "../services/setting-service.js";

class SettingController {
    async getSetting(req, res, next) {
        try {
            const setting = await SettingService.getSetting(req.params.name);
            return res.json(setting);
        } catch (e) {
            next(e)
        }
    }

    async setSetting(req, res, next) {
        try {
            const {name, value} = req.body;
            const setting = await SettingService.setSetting(name, value);
            return res.json(setting);
        } catch (e) {
            next(e)
        }
    }
}

export default new SettingController();