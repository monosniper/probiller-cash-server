import TransactionModel from "../models/transaction-model.js";
import ApiError from "../exceptions/api-error.js";
import UserModel from "../models/user-model.js";
import dotenv from 'dotenv'
dotenv.config();

class TransactionService {
    async getTransactions(user) {
        const transactions = await TransactionModel.find({user}).sort({createdAt: -1});
        return transactions;
    }

    async makePush(user_id, amount, status) {
        if(amount) {
            if(amount !== 0) {
                await TransactionModel.create({
                    user: user_id, amount, status
                })
                if(status === 'success') {
                    const user = await UserModel.findById(user_id);
                    const newBalance = (parseInt(user.balance) + parseInt(amount));
                    await user.update({balance: newBalance});
                }
            } else {
                throw new ApiError.BadRequest('The amount of push can not be null');
            }
        } else {
            throw new ApiError.BadRequest('To create a transaction its need an amount');
        }
    }
}


export default new TransactionService();