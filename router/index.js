import express from 'express'
import UserController from '../controllers/user-controller.js'
import SettingsController from '../controllers/setting-controller.js'
import TransactionController from '../controllers/transaction-controller.js'
import authMiddleware from '../middlewares/auth-middleware.js'

const Router = express.Router;

const router = new Router();

router.post('/login', UserController.login);
router.post('/logout', authMiddleware, UserController.logout);
router.get('/refresh', UserController.refresh);

router.get('/transactions', authMiddleware, TransactionController.getHistory);
router.post('/transactions/push', authMiddleware, TransactionController.push);

router.post('/sign/admin', authMiddleware, UserController.signAdmin);

router.get('/settings/:name', authMiddleware, SettingsController.getSetting);
router.post('/settings', authMiddleware, SettingsController.setSetting);

router.put('/user/cards', authMiddleware, UserController.setCardsCount);

router.post('/user/set-payed', authMiddleware, UserController.setPayed);

export default router;