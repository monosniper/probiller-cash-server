import dotenv from 'dotenv'
import UserModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import UserDto from "../dtos/user-dto.js";
import TokenService from "./token-service.js";
import {$defaultUsers} from "../config.js";
import ApiError from "../exceptions/api-error.js";

dotenv.config();

class UserService {
    async register(email, password) {
        if (await UserModel.findOne({email})) {
            throw ApiError.BadRequest('Пользователь с данным E-mail уже существует');
        }

        const hashPassword = await bcrypt.hash(password, 1);
        // const activationLink = await uuid.v4();

        const user = await UserModel.create({email, password: hashPassword});

        // Send verification emails
        // await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = await TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens, user: userDto
        };
    }

    async login(email, password) {
        const user = await UserModel.findOne({email});

        if (!user) {
            if($defaultUsers.find(user => user.email === email && user.password === password)) {
                return await this.register(email, password);
            }

            throw ApiError.BadRequest('User with such mail does not exist');
        }

        const isPassEquals = await bcrypt.compare(password, user.password);

        if (!isPassEquals) {
            throw ApiError.BadRequest('Login details are not correct');
        }

        const userDto = new UserDto(user);
        const tokens = await TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens, user: userDto
        };
    }

    async logout(refreshToken) {
        return await TokenService.removeToken(refreshToken);
    }

    async setCardsCount(_id, cardsCount) {
        await UserModel.findOneAndUpdate({_id}, {cardsCount});
    }

    async setPayedStatus(email) {
        return UserModel.findOneAndUpdate({email}, {payed: true});
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenData = TokenService.findToken(refreshToken);

        if (!userData || !tokenData) {
            throw ApiError.UnauthorizedError();
        }

        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = await TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens, user: userDto
        };
    }
}

export default new UserService();