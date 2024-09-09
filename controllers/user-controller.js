import ApiError from "../exceptions/api-error.js";
import UserService from "../services/user-service.js";

class UserController {
    async signAdmin(req, res, next) {
        try {
            if(req.body.password !== process.env.ADMIN_PASSWORD) {
                return next(ApiError.BadRequest('The password is incorrect!'));
            }

            return res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }

    async setCardsCount(req, res, next) {
        try {
            await UserService.setCardsCount(req.user.id, req.body.value);

            return res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {username, password} = req.body;
            const userData = await UserService.login(username, password);

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "none", secure: true});

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await UserService.logout(refreshToken);

            res.clearCookie('refreshToken');

            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async setPayed(req, res, next) {
        try {
            const {email} = req.body;

            await UserService.setPayedStatus(email);

            return res.json('ok');
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken);

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "none", secure: true});

            return res.json(userData);

        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();