import TransactionService from "../services/transaction-service.js";

class TransactionController {
    async getHistory(req, res, next) {
        try {
            const history = await TransactionService.getTransactions(req.user.id);
            return res.json(history);
        } catch (e) {
            next(e)
        }
    }

    async push(req, res, next) {
        try {
            const {amount, status} = req.body;
            await TransactionService.makePush(req.user.id, amount, status);
            return res.sendStatus(200);
        } catch (e) {
            next(e)
        }
    }
}

export default new TransactionController();